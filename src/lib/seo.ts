/**
 * Centralized SEO / GEO configuration.
 *
 * Single source of truth shared by metadata (layout), sitemap, robots,
 * JSON-LD structured data, the OG image, and llms.txt so every surface
 * stays consistent. Update company facts here, not in each file.
 */

/**
 * Canonical production origin (no trailing slash).
 *
 * ⚠️ DO NOT CHANGE WITHOUT READING `seo-baseline.md` §9 AND SPEC §2.4.
 * Production currently serves `www.aelvora.io` and 307-redirects the apex to it,
 * while this constant (and therefore the canonical tag, sitemap, og:url and
 * robots `Host:`) declares the apex. That inconsistency is real, but which
 * hostname search engines have indexed is unknown, and §2.4 is explicit that an
 * unnecessary canonical change is worse than a persisting inconsistency. Left
 * as-is deliberately; resolve only once GSC confirms the indexed hostname.
 */
export const SITE_URL = "https://aelvora.io";

export const SITE_NAME = "Aelvora";

/** Used as the <title> default and OG site title. */
export const SITE_TITLE_DEFAULT =
  "Aelvora — AI SaaS Development Agency | Custom AI Products, SaaS & MVPs";

/** `%s | Aelvora` for child routes. */
export const SITE_TITLE_TEMPLATE = "%s | Aelvora";

/**
 * Primary meta description. ~155 chars, leads with the core search intent
 * ("AI SaaS development") and the outcomes buyers care about.
 */
export const SITE_DESCRIPTION =
  "Aelvora is an AI SaaS development agency building custom AI products, LLM-powered tools, SaaS platforms, and MVPs for ambitious founders. Ship production-grade software fast.";

/** Shorter description for OG/Twitter cards. */
export const SITE_DESCRIPTION_SHORT =
  "AI SaaS development agency building custom AI products, SaaS platforms, and MVPs for ambitious founders.";

/**
 * Authenticated sending address (SPF, DKIM valid; DMARC p=none).
 * Replaced the old gmail address — outreach goes out from this domain, so the
 * site has to match it.
 */
export const CONTACT_EMAIL = "hello@aelvora.io";

/**
 * Keyword set targeting AI SaaS / AI product buyers and AI search engines.
 *
 * NOTE: this is NOT emitted as `<meta name="keywords">` any more — that tag has
 * been ignored by every major search engine for well over a decade and eighteen
 * stuffed terms read as spam to a human reviewer (spec §2.3). It survives only
 * as schema.org `knowsAbout`, where an entity-topic list is still meaningful.
 */
export const SITE_KEYWORDS: string[] = [
  "AI SaaS development",
  "AI SaaS development agency",
  "AI product development",
  "AI software development company",
  "custom SaaS development",
  "SaaS development agency",
  "LLM application development",
  "generative AI development",
  "AI integration services",
  "RAG pipeline development",
  "vector search development",
  "AI MVP development",
  "MVP development agency",
  "AI automation",
  "AI agents development",
  "Next.js development agency",
  "white label development for design studios",
  "premium web design",
  "Aelvora",
];

/**
 * Social / external profiles — emitted as schema.org `sameAs`.
 *
 * `github` was `https://github.com/aelvora`, which returns **404** — the org
 * does not exist. It had been live as a footer icon link and, worse, inside the
 * Organization `sameAs` array, where a profile that 404s is an actively bad
 * entity signal to search engines. Removed rather than repointed: the only real
 * GitHub account is a personal one, and this is a company profile block.
 *
 * Set `github` to a real org URL once one exists and it returns everywhere.
 */
export const SOCIAL_LINKS: Record<string, string | null> = {
  twitter: "https://twitter.com/aelvora",
  linkedin: "https://linkedin.com/company/aelvora",
  github: null,
};

/** Only profiles that actually resolve belong in `sameAs`. */
export const SAME_AS: string[] = Object.values(SOCIAL_LINKS).filter(
  (url): url is string => url !== null
);

/** Twitter handle for twitter:site / twitter:creator. */
export const TWITTER_HANDLE = "@aelvora";

// ─────────────────────────────────────────────────────────────────────────────
// Booking
// ─────────────────────────────────────────────────────────────────────────────

const CALENDLY_THEME =
  "hide_event_type_details=1&hide_gdpr_banner=1&background_color=1a1426&text_color=EDE4D7&primary_color=8E5CFF";

/** Track A — founders. 30 minutes. */
export const CALENDLY_FOUNDER_URL = `https://calendly.com/aelvoraio/30min?${CALENDLY_THEME}`;

/**
 * Track B — studio partners. 15 minutes (spec §5.5 item 9): this audience is
 * buying capacity, not a vision, and the shorter ask converts better. A separate
 * Calendly event type also keeps partner bookings distinguishable in analytics.
 *
 * `null` until the owner creates the 15-minute event type in Calendly. While it
 * is null, /partners falls back to the 30-minute booker and drops the
 * "15 minutes" claim rather than embedding an iframe that 404s.
 * Set to the event slug, e.g. `"15min"` or `"studio-intro"`.
 */
export const CALENDLY_PARTNER_SLUG: string | null = null;

export const CALENDLY_PARTNER_URL = CALENDLY_PARTNER_SLUG
  ? `https://calendly.com/aelvoraio/${CALENDLY_PARTNER_SLUG}?${CALENDLY_THEME}`
  : CALENDLY_FOUNDER_URL;

export const HAS_PARTNER_CALENDLY = CALENDLY_PARTNER_SLUG !== null;

// ─────────────────────────────────────────────────────────────────────────────
// Founder (spec §5.2 §7 — with the testimonials gone, the founder is the proof)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * OPTIONAL. Left `null` at the owner's explicit instruction — the section
 * speaks as the studio rather than naming a person.
 *
 * Nothing here is inferred from the repo's git author or anywhere else: a
 * founder bio is a claim about a real person and must come from that person.
 *
 * Filling `name` switches the "Who you're working with" section from the studio
 * card to a personal one. That is the stronger version of the page — with the
 * fabricated testimonials deleted, a named human with a track record is the
 * most credible proof available to a studio principal or technical founder
 * evaluating a vendor. Worth revisiting.
 */
export const FOUNDER: {
  name: string | null;
  role: string | null;
  /** 3–4 sentences: what you've shipped, how long you've been building, why 21 days. */
  bio: string[] | null;
  /** Path under /public, e.g. "/images/founder.jpg". */
  photo: string | null;
  photoAlt: string | null;
  linkedin: string | null;
  github: string | null;
} = {
  name: null,
  role: null,
  bio: null,
  photo: null,
  photoAlt: null,
  linkedin: null,
  github: null,
};

// ─────────────────────────────────────────────────────────────────────────────
// Services
// ─────────────────────────────────────────────────────────────────────────────

/** Service lines — drive the OfferCatalog/Service JSON-LD and llms.txt. */
export const SERVICES: { name: string; description: string }[] = [
  {
    name: "AI Product MVP (21 days)",
    description:
      "A fixed-price, fixed-timeline build: a deployed AI product with authentication, billing, and one AI feature running in production (LLM, RAG, or agent), shipped in 21 days with full source code handover and 30 days of post-launch support.",
  },
  {
    name: "AI Product Development",
    description:
      "AI-powered products and tools using LLMs, fine-tuned models, RAG pipelines, vector search, and real-time inference — real automation, not gimmicks.",
  },
  {
    name: "Custom SaaS Development",
    description:
      "End-to-end, multi-tenant SaaS platforms with authentication, billing, real-time dashboards, and API-first architecture built to scale with revenue.",
  },
  {
    name: "White-Label Development for Design Studios",
    description:
      "Build capacity for brand and identity studios whose clients need software: authentication, admin dashboards, client portals, iOS and Android apps, backends behind an existing design, AI features, and migrations off no-code platforms — delivered under the studio's brand, with a standing commitment never to contact their client.",
  },
  {
    name: "Premium Web Experiences",
    description:
      "High-performance marketing sites with 3D, motion, and micro-interactions engineered for Core Web Vitals and SEO.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────

/**
 * FAQ content — rendered visibly AND emitted as FAQPage structured data.
 * Questions mirror real buyer queries that AI assistants are asked, which
 * makes the answers eligible to be cited in generative search results.
 *
 * Spec §5.2 §8: every original question is retained. Answers that contradicted
 * the 21-day offer (timeline, cost) were rewritten, not thinned — Section 2.2
 * permits improving this prose but never reducing it.
 *
 * One requested addition, "I'm not technical — can we still work together?", is
 * NOT added as a separate entry: "Do you work with non-technical founders?"
 * below is the same question, and shipping both would be duplicate content on
 * the one part of the page that carries real long-tail search value. That
 * existing answer was extended to cover the 21-day model instead.
 */
export const FAQS: { question: string; answer: string }[] = [
  {
    question: "What does an AI SaaS development agency do?",
    answer:
      "An AI SaaS development agency designs, builds, and ships software-as-a-service products that have artificial intelligence at their core. Aelvora handles the full stack — product strategy, UX, multi-tenant architecture, LLM and RAG integration, billing, deployment, and ongoing iteration — so founders get a production-grade AI SaaS without assembling an in-house team.",
  },
  {
    question: "How much does it cost to build an AI SaaS product?",
    answer:
      "Our productized engagement — an AI product MVP delivered in 21 days — is a single fixed price, published in full on the offer page along with exactly what is and isn't included. Larger custom builds are scoped separately and typically land between $15,000 and $60,000 depending on surface area. Every engagement is fixed-price, so there are no surprise invoices.",
  },
  {
    question: "How long does it take to build an MVP?",
    answer:
      "21 days for the productized AI product MVP: scope on days 1–3, a clickable prototype by day 7, build with a working demo every three days from day 8, and production deploy between days 19 and 21. Larger custom platforms take longer and are scoped individually, but the same rhythm applies — you see something working every few days rather than waiting for a reveal at the end.",
  },
  {
    question: "Which AI models and technologies do you use?",
    answer:
      "We integrate leading large language models (including Claude and GPT-class models), build retrieval-augmented generation (RAG) pipelines with vector search, fine-tune custom models when needed, and ship real-time inference systems. Our default stack is Next.js, TypeScript, Supabase, and Vercel, with OpenAI and LangChain for the AI layer.",
  },
  {
    question: "Do you work with non-technical founders?",
    answer:
      "Yes. Most of our clients are non-technical founders. We translate your vision into a clear technical brief you sign off on in the first three days, handle every engineering decision after that, and keep you involved with a working demo every three days in plain language — no jargon required. You do not need to know what a vector database is to get one.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. Every engagement includes 30 days of post-launch support and monitoring after handover, and we can continue as a long-term product partner as you scale.",
  },
  {
    question: "What happens if 21 days isn't enough?",
    answer:
      "You don't pay more. The price is fixed to the scope we agreed in the first three days, not to the calendar, so an overrun is our cost to absorb — which is precisely why we scope hard up front and why the exclusions on the offer page are stated so bluntly. If you change the scope mid-build we'll tell you what it costs before anything is built, and you decide.",
  },
  {
    question: "Who owns the code?",
    answer:
      "You do, completely and from day one. We build in your repository under your account, not ours. There is no license, no hosting lock-in, no proprietary framework you can only maintain through us, and no clause that makes leaving expensive. On handover you get the source, the infrastructure, and the deployment pipeline. Any developer can pick it up — that is the point.",
  },
  {
    question: "How do we work together across timezones?",
    answer:
      "Async by default. You get a working demo every three days rather than a status meeting, so progress is something you look at rather than something you're told about. We commit to a written overlap window — specific hours, agreed before the project starts — when we're reachable live for decisions that genuinely need a conversation. Everything else happens in writing, which also means every decision has a record.",
  },
  {
    question: "What happens on day 22?",
    answer:
      "Your product is deployed on your domain, the code is in your repository, analytics are running, and the 30-day support window has started — so day 22 is a normal day in which you're live and gathering real usage. In that window we fix anything broken and answer questions from whoever picks up the codebase. After it, most clients either move to a retainer for ongoing feature work or take it in-house; both are fine, and neither requires anything from us to unlock.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Per-page metadata — unique and non-templated (spec §2.5)
// ─────────────────────────────────────────────────────────────────────────────

export const PAGE_META = {
  offer: {
    title: "AI Product MVP in 21 Days — Fixed Price, Fixed Timeline",
    description:
      "The full scope of Aelvora's 21-day AI product MVP: what's included, what isn't, week-by-week deliverables, and payment terms. Fixed price — if we go over 21 days, you don't pay more.",
  },
  partners: {
    title: "White-Label Development for Design Studios",
    description:
      "Dev capacity for brand studios that sell more than they can build. White-label under your brand, fixed price so you set your own margin, demos every three days — and we never contact your client.",
  },
  work: {
    title: "Case Studies",
    description:
      "How Aelvora scoped, built, and shipped AI products and SaaS platforms — the constraints, the technical decisions, and the results.",
  },
} as const;
