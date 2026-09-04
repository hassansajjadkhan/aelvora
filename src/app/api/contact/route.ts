import { CONTACT_EMAIL, SITE_NAME } from "@/lib/seo";

/**
 * Server-side handling for the project enquiry form (spec §7 "Forms").
 *
 * Honeypot, rate limiting, validation, delivery, auto-reply, and an optional
 * push webhook — no new npm dependency: Resend is called over plain HTTP.
 *
 * ── CONFIGURATION ───────────────────────────────────────────────────────────
 *   RESEND_API_KEY     required for delivery. Without it the endpoint refuses
 *                      the submission rather than silently swallowing a lead.
 *   CONTACT_TO         where enquiries land. Defaults to hello@aelvora.io.
 *   CONTACT_FROM       verified Resend sender. Defaults to hello@aelvora.io.
 *   PUSH_WEBHOOK_URL   optional. POSTed on every submission — point it at
 *                      ntfy.sh, Slack, or Discord to get the phone alert
 *                      §7 asks for. Response speed compounds hard in B2B.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // submissions per IP per window
const MAX_FIELD = 5000;

/**
 * In-memory rate limiter.
 *
 * Deliberately dependency-free. On serverless this is per-instance, so it
 * throttles a naive flood but is not a hard global guarantee; if the form ever
 * attracts real abuse, move this to Upstash/Vercel KV. Good enough to stop the
 * bots that find every public form within days of launch.
 */
const hits = new Map<string, number[]>();

const rateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT_MAX;
};

const clientIp = (request: Request): string =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "unknown";

const isEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

type Submission = {
  name: string;
  email: string;
  message: string;
  /** "founder" | "partner" — which side of the funnel the form sat on. */
  funnelTrack: string;
  /** Outreach attribution, when the visit carried UTMs. */
  utm: Record<string, string>;
};

const sendViaResend = async (
  apiKey: string,
  payload: {
    from: string;
    to: string[];
    subject: string;
    html: string;
    replyTo?: string;
  }
) => {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
};

const notifyPush = async (submission: Submission) => {
  const url = process.env.PUSH_WEBHOOK_URL;
  if (!url) return;

  const text = `New ${submission.funnelTrack} enquiry — ${submission.name} <${submission.email}>: ${submission.message.slice(0, 200)}`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // `text` suits ntfy; `content` suits Discord; `text` also suits Slack.
      body: JSON.stringify({ text, content: text, title: "Aelvora enquiry" }),
    });
  } catch (error) {
    // A failed push must never fail the submission — the email is the record.
    console.error("[contact] push webhook failed:", error);
  }
};

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const str = (key: string): string =>
    typeof body[key] === "string" ? (body[key] as string).trim() : "";

  // Honeypot. Real users never see this field, so anything in it is a bot.
  // Return 200 so the bot believes it succeeded and does not retry.
  if (str("company") !== "") {
    return Response.json({ ok: true });
  }

  const name = str("name").slice(0, MAX_FIELD);
  const email = str("email").slice(0, MAX_FIELD);
  const message = str("message").slice(0, MAX_FIELD);
  const funnelTrack = str("funnelTrack") === "partner" ? "partner" : "founder";

  const utm: Record<string, string> = {};
  if (body.utm && typeof body.utm === "object") {
    for (const [key, value] of Object.entries(body.utm as object)) {
      if (typeof value === "string" && key.startsWith("utm_")) {
        utm[key] = value.slice(0, 200);
      }
    }
  }

  if (!name || !email || !message) {
    return Response.json(
      { ok: false, error: "Please fill in every field." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return Response.json(
      { ok: false, error: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  const submission: Submission = { name, email, message, funnelTrack, utm };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || CONTACT_EMAIL;
  const from = process.env.CONTACT_FROM || `${SITE_NAME} <${CONTACT_EMAIL}>`;

  if (!apiKey) {
    // No provider configured. Log the full submission at error level so the
    // lead survives in the platform logs, and tell the visitor the truth
    // rather than pretending the message was delivered.
    console.error(
      "[contact] RESEND_API_KEY is not set — submission NOT delivered:",
      JSON.stringify(submission)
    );
    return Response.json(
      {
        ok: false,
        emailFallback: true,
        error: `We couldn't send that just now. Please email ${CONTACT_EMAIL} directly — it reaches the same inbox.`,
      },
      { status: 503 }
    );
  }

  const utmRows = Object.entries(utm)
    .map(([k, v]) => `<tr><td>${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`)
    .join("");

  try {
    await sendViaResend(apiKey, {
      from,
      to: [to],
      replyTo: email,
      subject: `New ${funnelTrack} enquiry — ${name}`,
      html: `
        <h2>New ${escapeHtml(funnelTrack)} enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>What they're building:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        ${utmRows ? `<h3>Attribution</h3><table>${utmRows}</table>` : ""}
      `,
    });
  } catch (error) {
    console.error("[contact] delivery failed:", error, JSON.stringify(submission));
    return Response.json(
      {
        ok: false,
        emailFallback: true,
        error: `We couldn't send that just now. Please email ${CONTACT_EMAIL} directly — it reaches the same inbox.`,
      },
      { status: 502 }
    );
  }

  // Auto-reply. Failure here must not fail the submission: the enquiry is
  // already in the inbox, and telling the visitor it failed would be wrong.
  try {
    await sendViaResend(apiKey, {
      from,
      to: [email],
      subject: `Thanks — we've got your message`,
      html: `
        <p>Hi ${escapeHtml(name.split(" ")[0] || name)},</p>
        <p>Thanks for getting in touch. Your message is in front of us and you'll
        get a real reply — not an automated one — shortly.</p>
        <p>For reference, here's what you sent:</p>
        <blockquote style="white-space:pre-wrap;border-left:3px solid #8E5CFF;padding-left:12px;color:#555">${escapeHtml(message)}</blockquote>
        <p>If it's easier, you can also reply straight to this email.</p>
        <p>— ${escapeHtml(SITE_NAME)}</p>
      `,
    });
  } catch (error) {
    console.error("[contact] auto-reply failed (enquiry was delivered):", error);
  }

  await notifyPush(submission);

  return Response.json({ ok: true });
}
