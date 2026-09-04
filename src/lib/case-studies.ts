/**
 * Case studies — single source of truth for /work/[slug], the homepage work
 * section, and the proof section on /partners.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW A CASE STUDY GOES LIVE
 * ─────────────────────────────────────────────────────────────────────────────
 * Every project below has its factual shell filled in (title, category, client
 * type, stack, screenshot) because those are real and already published on the
 * site. The *narrative* fields — `problem`, `constraint`, `built`, `decisions`,
 * `result` — are `null`, because only the owner knows them, and spec rule 3
 * forbids inventing them.
 *
 * A project is published automatically once its narrative fields are filled
 * (see `isPublished`). Until then its `/work/[slug]` route returns 404, it is
 * absent from `sitemap.xml`, and nothing links to it.
 *
 * WHY 404 RATHER THAN A PAGE FULL OF `[OWNER: supply]` MARKERS — a deliberate
 * call, flagged for the owner:
 *   Spec §5.3 asks for these pages in Phase 4, and §2.5 requires every new page
 *   to carry "substantive unique body copy — a thin page is worse than no page."
 *   A case study whose entire story is placeholder markers is exactly the thin,
 *   low-quality indexed page §2.5 rules out, and §0 rule 1 says Section 2 wins.
 *   So the template, the routing, the schema and the links are all built and
 *   tested; they switch on the moment the facts land in this file. Fill one
 *   project in and it appears on the homepage, in the sitemap, and on /partners
 *   with no further code change.
 *
 * To publish: replace the `null`s for a project with real content and commit.
 */

export type CaseStudyDecision = {
  /** The specific technical choice made. */
  choice: string;
  /** Why it was made. This is the part a technical buyer actually reads. */
  why: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  /** Short label used on cards, e.g. "AI Tool". */
  category: string;
  /** One-line summary shown on cards and as the page's lead. */
  summary: string;
  /** Who the client was, in general terms, e.g. "UK heating installer". */
  clientType: string | null;
  stack: string[];
  image: string;
  /** Descriptive alt text — never a bare project name. */
  imageAlt: string;

  // ── Narrative. All required for the page to publish. ──
  /** The problem, 2–3 sentences. */
  problem: string | null;
  /** The constraint — timeline, budget, or technical limit. Constraints make a story credible. */
  constraint: string | null;
  /** What we built, 3–4 paragraphs. */
  built: string[] | null;
  /** 2–3 specific technical decisions and why. */
  decisions: CaseStudyDecision[] | null;
  /**
   * The result, as a concrete fact.
   * Format: "Quote-to-booking time cut from 9 days to 2."
   * Never an adjective. If no real figure exists, leave it null — the project
   * simply does not publish.
   */
  result: string | null;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "savon-ai",
    title: "Savon AI",
    category: "AI Tool",
    summary:
      "AI workflow product built around LLMs — natural inputs, structured automated outputs.",
    clientType: null,
    stack: ["Next.js", "OpenAI", "LangChain"],
    image: "/images/savonai/Screenshot (378).png",
    imageAlt:
      "Savon AI workflow interface showing a natural-language input turned into structured output",
    problem: null,
    constraint: null,
    built: null,
    decisions: null,
    result: null,
  },
  {
    slug: "underfloor-heating",
    title: "Underfloor Heating",
    category: "Lead-Gen Site",
    summary:
      "High-converting service site with calculators, trust signals, and a frictionless quote flow.",
    clientType: null,
    stack: ["Next.js", "Tailwind", "HubSpot"],
    image: "/images/underfloor heating/Screenshot (297).png",
    imageAlt:
      "Underfloor heating quote calculator with room inputs and an instant estimate",
    problem: null,
    constraint: null,
    built: null,
    decisions: null,
    result: null,
  },
  {
    slug: "goali",
    title: "Goali",
    category: "SaaS Platform",
    summary:
      "Goal-tracking platform that turns long-term ambitions into daily, actionable habits.",
    clientType: null,
    stack: ["Next.js", "Tailwind", "Supabase"],
    image: "/images/Goali/img 1.png",
    imageAlt:
      "Goali dashboard showing long-term goals broken down into daily tracked habits",
    problem: null,
    constraint: null,
    built: null,
    decisions: null,
    result: null,
  },
  {
    slug: "wortgut",
    title: "WortGut",
    category: "Premium Web",
    summary:
      "Cinematic brand site with motion-led storytelling and a polished, conversion-first flow.",
    clientType: null,
    stack: ["Next.js", "GSAP", "Framer Motion"],
    image: "/images/WortGut/img1.png",
    imageAlt: "WortGut brand site homepage with motion-led editorial layout",
    problem: null,
    constraint: null,
    built: null,
    decisions: null,
    result: null,
  },
  {
    slug: "dogar-farms",
    title: "Dogar Farms",
    category: "Web Experience",
    summary:
      "Modern farm & produce site with an editorial layout and a seamless ordering experience.",
    clientType: null,
    stack: ["Next.js", "Tailwind", "Sanity"],
    image: "/images/dogarfarms/img3.png",
    imageAlt:
      "Dogar Farms produce site with editorial product layout and ordering flow",
    problem: null,
    constraint: null,
    built: null,
    decisions: null,
    result: null,
  },
  {
    slug: "woeftime",
    title: "Woeftime",
    category: "Consumer App",
    summary:
      "Playful consumer experience with bold visuals, smooth interactions, and rich micro-animation.",
    clientType: null,
    stack: ["Next.js", "Framer Motion", "Tailwind"],
    image: "/images/woeftime/Screenshot (423).png",
    imageAlt:
      "Woeftime consumer app screen with bold illustrative visuals and animated interactions",
    problem: null,
    constraint: null,
    built: null,
    decisions: null,
    result: null,
  },
];

/**
 * The three projects the homepage leads with (spec §5.2 §4): AI capability,
 * measurable outcome, full SaaS build. The other three are retained in a
 * smaller grid lower on the page — never deleted, images and alt text kept.
 */
export const FEATURED_SLUGS = ["savon-ai", "underfloor-heating", "goali"] as const;

/** A case study is publishable only once every narrative field is real. */
export const isPublished = (c: CaseStudy): boolean =>
  c.problem !== null &&
  c.constraint !== null &&
  c.built !== null &&
  c.built.length > 0 &&
  c.decisions !== null &&
  c.decisions.length > 0 &&
  c.result !== null &&
  c.clientType !== null;

export const publishedCaseStudies = (): CaseStudy[] =>
  CASE_STUDIES.filter(isPublished);

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  CASE_STUDIES.find((c) => c.slug === slug);

export const featuredProjects = (): CaseStudy[] =>
  FEATURED_SLUGS.map((slug) => CASE_STUDIES.find((c) => c.slug === slug)!).filter(
    Boolean
  );

export const secondaryProjects = (): CaseStudy[] =>
  CASE_STUDIES.filter(
    (c) => !FEATURED_SLUGS.includes(c.slug as (typeof FEATURED_SLUGS)[number])
  );

/** `/work/[slug]` only when the story is real. */
export const caseStudyHref = (c: CaseStudy): string | null =>
  isPublished(c) ? `/work/${c.slug}` : null;
