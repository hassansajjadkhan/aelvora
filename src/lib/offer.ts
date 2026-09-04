/**
 * The productized offer — single source of truth.
 *
 * Per DECISION-2 (default: Option A) the site sells one thing: an AI product
 * MVP, 21 days, fixed price. The homepage offer card, the /offer page, the
 * process timeline and the Service JSON-LD all read from here, so the hero and
 * the process can never drift apart again (audit item C2).
 *
 * Custom work is still accepted. It is simply not what the site markets.
 */

export const OFFER_NAME = "AI Product MVP";
export const OFFER_DAYS = 21;

/**
 * Fixed price for the 21-day engagement.
 *
 * `null` until the owner sets it (spec Section 10, item 2). While it is null,
 * every surface renders a visible `[OWNER: supply price]` marker instead of a
 * number. Set it to a display string, e.g. `"$14,000"`.
 *
 * Setting this also populates the `Offer` price in the Service JSON-LD, so
 * supply `OFFER_PRICE_NUMERIC` and `OFFER_CURRENCY` alongside it.
 */
export const OFFER_PRICE: string | null = null;
export const OFFER_PRICE_NUMERIC: number | null = null;
export const OFFER_CURRENCY = "USD";

/** What is in scope, verbatim from spec §5.2 §3. */
export const OFFER_INCLUDES: string[] = [
  "Deployed, working application on your domain",
  "Full source code, your repo, no lock-in",
  "Authentication + user accounts",
  "One AI feature running in production (LLM, RAG, or agent)",
  "Payments / billing integration",
  "30 days of post-launch support",
];

/**
 * What is out of scope. The spec is emphatic: these exclusions are the
 * strongest credibility signal on the page. Do not soften them.
 */
export const OFFER_EXCLUDES: string[] = [
  "SOC 2 / HIPAA compliance work",
  "Native mobile apps",
  "Ongoing feature development (separate retainer)",
];

export const OFFER_GUARANTEE =
  "Fixed price. If we go over 21 days, you don't pay more.";

/** The process, in days. Replaces the old weeks 1–12 timeline that contradicted the hero. */
export type ProcessStep = {
  number: string;
  title: string;
  window: string;
  description: string;
  deliverables: string[];
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Scope",
    window: "Days 1–3",
    description:
      "Technical brief, user flows, architecture decision. You sign off before anything is built.",
    deliverables: ["Technical brief", "User flows", "Architecture decision"],
  },
  {
    number: "02",
    title: "Design",
    window: "Days 4–7",
    description:
      "Interactive prototype of the core flow. Not a mockup — something you can click.",
    deliverables: ["Clickable prototype", "Core flow", "Sign-off"],
  },
  {
    number: "03",
    title: "Build",
    window: "Days 8–18",
    description:
      "Working demo every three days. Staging from day 8. No black boxes.",
    deliverables: ["Demo every 3 days", "Staging from day 8", "Production-grade code"],
  },
  {
    number: "04",
    title: "Launch",
    window: "Days 19–21",
    description:
      "Production deploy, analytics, handover. 30 days support after.",
    deliverables: ["Production deploy", "Analytics", "30-day support"],
  },
];

/** Fit / not-fit, spec §5.2 §6. */
export const FIT_YES: string[] = [
  "You know what you want built",
  "You can make decisions in a day",
  "You want to launch, then learn",
  "Your product needs AI at its core",
];

export const FIT_NO: string[] = [
  "You need SOC 2 or HIPAA on day one",
  "Your scope needs a committee",
  "You want a spec locked for 6 months",
  "You need native iOS and Android",
];

/**
 * Payment terms for the fixed-price engagement (spec §5.4, recommended 40/40/20).
 * Percentages must sum to 100.
 */
export const PAYMENT_TERMS: { share: string; when: string }[] = [
  { share: "40%", when: "On signing, before scope starts" },
  { share: "40%", when: "At the start of build (day 8)" },
  { share: "20%", when: "On production deploy and handover" },
];

/** The technology strip that replaced the fabricated client-logo rows (spec §5.2 §2). */
export const STACK: string[] = [
  "Next.js",
  "TypeScript",
  "Supabase",
  "OpenAI",
  "LangChain",
  "Vercel",
];
