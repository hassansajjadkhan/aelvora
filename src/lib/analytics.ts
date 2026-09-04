/**
 * Conversion tracking.
 *
 * The four events the funnel spec asks for (§5.1) are fired through a single
 * provider-agnostic `track()` so the two tracks — founders (A) and studio
 * partners (B) — can be measured separately. A blended conversion rate is
 * meaningless: agency sites convert ~2–4% of organic traffic but 8–15% of
 * referral traffic, and Track B is entirely referral.
 *
 * NOTE ON PROVIDER — deviation from spec §7, flagged deliberately:
 * the spec asks for Plausible or PostHog. Google Analytics (gtag.js) is already
 * installed and loading on every page. Adding a second analytics script would
 * cost page speed, and Section 2.2 forbids shipping anything that increases LCP.
 * So `track()` emits to whichever of gtag / plausible / posthog is present on
 * `window`. GA4 receives the events today; dropping a Plausible or PostHog
 * snippet into `layout.tsx` later starts feeding it too, with no code change here.
 */

export const EVENTS = {
  callBooked: "call_booked",
  formSubmitted: "form_submitted",
  offerPageViewed: "offer_page_viewed",
  partnersPageViewed: "partners_page_viewed",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

/** Which side of the funnel an event belongs to. */
export type FunnelTrack = "founder" | "partner";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: { props?: Props }) => void;
    posthog?: { capture?: (event: string, props?: Props) => void };
  }
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/**
 * UTM parameters for the current visit.
 *
 * Outreach links are tagged (e.g.
 * `/partners?utm_source=outreach&utm_medium=email&utm_campaign=studios`), but a
 * studio principal who lands on /partners and books two pages later has lost
 * the query string. So the first-seen UTM set is stashed in sessionStorage and
 * attached to every subsequent event in the visit.
 */
const visitUtms = (): Props => {
  if (typeof window === "undefined") return {};

  const stored = (() => {
    try {
      const raw = window.sessionStorage.getItem("aelvora_utm");
      return raw ? (JSON.parse(raw) as Props) : null;
    } catch {
      return null;
    }
  })();

  const search = new URLSearchParams(window.location.search);
  const fresh: Props = {};
  for (const key of UTM_KEYS) {
    const value = search.get(key);
    if (value) fresh[key] = value;
  }

  if (Object.keys(fresh).length > 0) {
    try {
      window.sessionStorage.setItem("aelvora_utm", JSON.stringify(fresh));
    } catch {
      /* private mode / storage disabled — events still fire, just untagged */
    }
    return fresh;
  }

  return stored ?? {};
};

/** Fire a conversion event to every analytics provider present on the page. */
export const track = (event: EventName, props: Props = {}) => {
  if (typeof window === "undefined") return;

  const payload: Props = {
    ...visitUtms(),
    ...props,
    page_path: window.location.pathname,
  };

  window.gtag?.("event", event, payload);
  window.plausible?.(event, { props: payload });
  window.posthog?.capture?.(event, payload);

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.info("[analytics]", event, payload);
  }
};

/**
 * Calendly fires a `calendly.event_scheduled` postMessage when a booking
 * completes. The spec is specific that this — not an outbound-click proxy —
 * is what must record `call_booked`, because a click is not a booking.
 *
 * Returns a teardown function.
 */
export const listenForCalendlyBooking = (funnelTrack: FunnelTrack) => {
  if (typeof window === "undefined") return () => {};

  const onMessage = (e: MessageEvent) => {
    if (typeof e.origin !== "string" || !e.origin.includes("calendly.com")) return;

    const data = e.data as { event?: string } | null;
    if (data?.event !== "calendly.event_scheduled") return;

    track(EVENTS.callBooked, { funnel_track: funnelTrack });
  };

  window.addEventListener("message", onMessage);
  return () => window.removeEventListener("message", onMessage);
};
