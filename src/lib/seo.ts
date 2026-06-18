/**
 * Centralized SEO / GEO configuration.
 *
 * Single source of truth shared by metadata (layout), sitemap, robots,
 * JSON-LD structured data, the OG image, and llms.txt so every surface
 * stays consistent. Update company facts here, not in each file.
 */

/** Canonical production origin (no trailing slash). */
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

export const CONTACT_EMAIL = "aelvoraio@gmail.com";

/** Keyword set targeting AI SaaS / AI product buyers and AI search engines. */
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
  "premium web design",
  "Aelvora",
];

/** Social / external profiles — emitted as schema.org `sameAs`. */
export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/aelvora",
  linkedin: "https://linkedin.com/company/aelvora",
  github: "https://github.com/aelvora",
};

export const SAME_AS: string[] = Object.values(SOCIAL_LINKS);

/** Twitter handle for twitter:site / twitter:creator. */
export const TWITTER_HANDLE = "@aelvora";

/** Service lines — drive the OfferCatalog/Service JSON-LD and llms.txt. */
export const SERVICES: { name: string; description: string }[] = [
  {
    name: "Custom SaaS Development",
    description:
      "End-to-end, multi-tenant SaaS platforms with authentication, billing, real-time dashboards, and API-first architecture built to scale with revenue.",
  },
  {
    name: "AI Product Development",
    description:
      "AI-powered products and tools using LLMs, fine-tuned models, RAG pipelines, vector search, and real-time inference — real automation, not gimmicks.",
  },
  {
    name: "MVP Development",
    description:
      "Rapid MVP development that turns an idea into a shippable, investor-ready product in weeks with a scalable codebase from day one.",
  },
  {
    name: "Premium Web Experiences",
    description:
      "High-performance marketing sites with 3D, motion, and micro-interactions engineered for Core Web Vitals and SEO.",
  },
];

/**
 * FAQ content — rendered visibly AND emitted as FAQPage structured data.
 * Questions mirror real buyer queries that AI assistants are asked, which
 * makes the answers eligible to be cited in generative search results.
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
      "Cost depends on scope, but most AI SaaS MVPs land between $15,000 and $60,000. We scope ruthlessly, prioritize the features that validate your market, and offer fixed-price engagements so there are no surprise invoices. Book a strategy call for a tailored estimate.",
  },
  {
    question: "How long does it take to build an MVP?",
    answer:
      "A focused MVP typically ships in 4 to 8 weeks. We work in agile sprints with weekly demos, so you see progress continuously and can adjust scope before launch instead of after.",
  },
  {
    question: "Which AI models and technologies do you use?",
    answer:
      "We integrate leading large language models (including Claude and GPT-class models), build retrieval-augmented generation (RAG) pipelines with vector search, fine-tune custom models when needed, and ship real-time inference systems. Our default stack is Next.js, TypeScript, and modern cloud infrastructure.",
  },
  {
    question: "Do you work with non-technical founders?",
    answer:
      "Yes. Most of our clients are non-technical founders. We translate your vision into a clear technical brief, handle every engineering decision, and keep you involved at each milestone with plain-language updates — no jargon required.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. Every engagement includes post-launch support, monitoring, and a window for iteration. We respond within 48 hours and can continue as a long-term product partner as you scale.",
  },
];
