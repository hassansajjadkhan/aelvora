"use client";

import { useState } from "react";
import { Send, Check, AlertCircle } from "lucide-react";
import { track, EVENTS, type FunnelTrack } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/seo";

/**
 * Three-field enquiry form (spec §5.2 §9, audit M2).
 *
 * Calendly was the only conversion path on the entire site. Not everyone books
 * on a first visit, and everyone who doesn't was leaving with no path at all.
 *
 * The `company` field is a honeypot: hidden from people, irresistible to bots.
 * It is not `display:none` — some bots skip those — but positioned off-screen
 * and removed from the accessibility tree and the tab order.
 */

type Status = "idle" | "sending" | "sent" | "error";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: "12px",
  background: "rgba(18,14,30,0.55)",
  border: "1px solid rgba(142,92,255,0.28)",
  color: "#EDE4D7",
  fontSize: "0.95rem",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.74rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 700,
  color: "#B89DFF",
  marginBottom: "8px",
};

const collectUtms = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem("aelvora_utm");
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
};

export const ProjectForm = ({
  funnelTrack = "founder",
  heading = "Not ready to book?",
  blurb = "Send a couple of lines about what you're building and we'll come back with a real answer, not a brochure.",
  messageLabel = "What are you building?",
  messagePlaceholder = "A rough idea is fine — what it does, who it's for, and where you're stuck.",
}: {
  funnelTrack?: FunnelTrack;
  heading?: string;
  blurb?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
}) => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"), // honeypot
          funnelTrack,
          utm: collectUtms(),
        }),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(
          json.error ??
            `Something went wrong. Please email ${CONTACT_EMAIL} directly.`
        );
        return;
      }

      track(EVENTS.formSubmitted, { funnel_track: funnelTrack });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError(
        `Something went wrong. Please email ${CONTACT_EMAIL} directly.`
      );
    }
  };

  return (
    <div
      style={{
        borderRadius: "22px",
        padding: "28px 26px",
        background:
          "linear-gradient(160deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
        border: "1px solid rgba(142,92,255,0.28)",
        width: "100%",
      }}
    >
      <h3
        className="font-display font-bold"
        style={{
          fontSize: "1.3rem",
          color: "#EDE4D7",
          marginBottom: "10px",
          lineHeight: 1.2,
        }}
      >
        {heading}
      </h3>
      <p
        style={{
          fontSize: "0.92rem",
          lineHeight: 1.6,
          color: "rgba(237,228,215,0.6)",
          marginBottom: "24px",
        }}
      >
        {blurb}
      </p>

      {status === "sent" ? (
        <div
          role="status"
          className="flex items-start"
          style={{
            gap: "12px",
            padding: "18px",
            borderRadius: "14px",
            background: "rgba(142,92,255,0.12)",
            border: "1px solid rgba(184,157,255,0.5)",
          }}
        >
          <Check
            className="w-5 h-5 flex-shrink-0"
            style={{ color: "#B89DFF", marginTop: "2px" }}
            aria-hidden="true"
          />
          <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#EDE4D7" }}>
            Got it. Check your inbox for a confirmation — a real reply follows
            shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          {/* Honeypot — off-screen, not focusable, hidden from assistive tech */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            <label htmlFor="company-website">Company website</label>
            <input
              id="company-website"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="contact-name" style={labelStyle}>
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              maxLength={200}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="contact-email" style={labelStyle}>
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={200}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="contact-message" style={labelStyle}>
              {messageLabel}
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              maxLength={5000}
              placeholder={messagePlaceholder}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
            />
          </div>

          {status === "error" && error && (
            <div
              role="alert"
              className="flex items-start"
              style={{
                gap: "10px",
                marginBottom: "16px",
                fontSize: "0.88rem",
                lineHeight: 1.55,
                color: "#D8C8FF",
              }}
            >
              <AlertCircle
                className="w-[16px] h-[16px] flex-shrink-0"
                style={{ marginTop: "3px" }}
                aria-hidden="true"
              />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center justify-center font-bold w-full"
            style={{
              padding: "14px 24px",
              gap: "10px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #8E5CFF, #B89DFF)",
              color: "#0a0a0a",
              fontSize: "0.95rem",
              cursor: status === "sending" ? "wait" : "pointer",
              opacity: status === "sending" ? 0.7 : 1,
            }}
          >
            <Send className="w-[16px] h-[16px]" aria-hidden="true" />
            {status === "sending" ? "Sending…" : "Send it"}
          </button>
        </form>
      )}
    </div>
  );
};
