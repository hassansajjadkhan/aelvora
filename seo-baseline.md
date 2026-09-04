# SEO Baseline — aelvora.io

**Captured:** 30 August 2026, immediately before the funnel restructure (spec v2, Section 2.1).
**Method:** `next dev` (Next.js 16.2.6) rendered output for every route, plus live `curl -I` against production.
**Purpose:** the before-state that Section 2.7 verification is measured against. Do not edit retroactively.

> Google Search Console access was **not** available at capture time, so no query/page
> performance export exists. Per Section 2.1 this must be set up before Phase 2 so there
> is a genuine before-and-after. See "Open gaps" at the bottom.

---

## 1. Routes

| URL | Status | Source |
|---|---|---|
| `https://aelvora.io/` | 200 | `src/app/page.tsx` |
| `https://aelvora.io/contact` | 200 | `src/app/contact/page.tsx` |
| `https://aelvora.io/sitemap.xml` | 200 | `src/app/sitemap.ts` |
| `https://aelvora.io/robots.txt` | 200 | `src/app/robots.ts` |
| `https://aelvora.io/opengraph-image` | 200 | `src/app/opengraph-image.tsx` |
| `https://aelvora.io/twitter-image` | 200 | `src/app/twitter-image.tsx` |
| `https://aelvora.io/llms.txt` | 200 | `public/llms.txt` |

**That is the complete set of routes.** There are exactly two HTML pages.

Linked but **non-existent** (404) — see "Pre-existing defects":
`/privacy`, `/terms`, `/cookies`.

---

## 2. Titles and meta descriptions

### `/`
- **title:** `Aelvora — AI SaaS Development Agency | Custom AI Products, SaaS & MVPs`
- **description:** `Aelvora is an AI SaaS development agency building custom AI products, LLM-powered tools, SaaS platforms, and MVPs for ambitious founders. Ship production-grade software fast.`
- **canonical:** `https://aelvora.io`
- **og:** title as above · description `AI SaaS development agency building custom AI products, SaaS platforms, and MVPs for ambitious founders.` · `og:url https://aelvora.io` · `og:type website` · `og:site_name Aelvora` · `og:locale en_US` · `og:image /opengraph-image`
- **twitter:** `summary_large_image`, `@aelvora` site + creator, `/twitter-image`

### `/contact`
- **title:** `Contact — Start Your AI SaaS or MVP Project | Aelvora`
- **description:** `Tell Aelvora about your AI SaaS, custom software, or MVP project. Send a brief or book a free 30-minute strategy call — we respond within 24 hours.`
- **canonical:** `https://aelvora.io/contact`
- **og:** title `Contact Aelvora — Start Your AI SaaS or MVP Project` · description `Send a project brief or book a free 30-minute strategy call with Aelvora's AI SaaS development team.` · `og:url https://aelvora.io/contact`
- **twitter:** inherits the site-level card (page does not override) — a pre-existing inconsistency.

### Site-wide meta (from `src/app/layout.tsx`)
- `robots: index, follow`
- `googlebot: index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1`
- `google-site-verification: 2d-Vm-wQv2QTOCTTiFKXZ0qC5-HMBrpBjDhX_0TTx_A`
- `application-name / author / creator / publisher: Aelvora`
- `category: technology`
- **`keywords`** — 18 stuffed terms, emitted on every page (scheduled for removal, Section 2.3):
  `AI SaaS development, AI SaaS development agency, AI product development, AI software development company, custom SaaS development, SaaS development agency, LLM application development, generative AI development, AI integration services, RAG pipeline development, vector search development, AI MVP development, MVP development agency, AI automation, AI agents development, Next.js development agency, premium web design, Aelvora`
- **No `noindex` anywhere.** Verified by grep over rendered output of both pages.

---

## 3. Heading hierarchy

### `/` — full hierarchy in document order (H1 count: **1** ✅)
```
H1  We build digital products that drive real business growth.
H2  How We Turn Vision Into Product          (Process)
  H3  Discovery
  H3  Design
  H3  Build
  H3  Launch
H2  Projects We're Proud Of                  (Portfolio)
  H3  Goali
  H3  WortGut
  H3  Dogar Farms
  H3  Savon AI
  H3  Underfloor Heating
  H3  Woeftime
H2  Clients Who Trust Us                     (Testimonials — fabricated, to be deleted)
H2  AI SaaS Development, Questions Answered  (FAQ)
  H3  What does an AI SaaS development agency do?
  H3  How much does it cost to build an AI SaaS product?
  H3  How long does it take to build an MVP?
  H3  Which AI models and technologies do you use?
  H3  Do you work with non-technical founders?
  H3  Do you provide support after launch?
H2  Your Next Big Thing Starts Here          (Calendly / close)
  H3  Let's Talk About Your Project
```

### `/contact` — H1 count: **0** ❌
```
H2  Your Next Big Thing Starts Here
  H3  Let's Talk About Your Project
```
Pre-existing violation of "exactly one H1 per page". The page reuses `CalendlySection`,
whose top heading is an H2. Fixing this **adds** a heading; it removes nothing.

---

## 4. `sitemap.xml` (verbatim)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>https://aelvora.io</loc><lastmod>…</lastmod><changefreq>weekly</changefreq><priority>1</priority></url>
<url><loc>https://aelvora.io/contact</loc><lastmod>…</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
</urlset>
```
`lastmod` is generated at request time (`new Date()`), so it varies per fetch.

---

## 5. `robots.txt` (verbatim)

```
User-Agent: *
Allow: /

User-Agent: Googlebot
User-Agent: Google-Extended
User-Agent: Bingbot
User-Agent: GPTBot
User-Agent: OAI-SearchBot
User-Agent: ChatGPT-User
User-Agent: ClaudeBot
User-Agent: anthropic-ai
User-Agent: Claude-Web
User-Agent: PerplexityBot
User-Agent: Perplexity-User
User-Agent: Applebot
User-Agent: Applebot-Extended
User-Agent: CCBot
User-Agent: DuckDuckBot
User-Agent: YandexBot
Allow: /

Host: https://aelvora.io
Sitemap: https://aelvora.io/sitemap.xml
```
**No `Disallow` rule of any kind.** Crawling is fully permitted.

---

## 6. Structured data (JSON-LD)

### `/` — 2 blocks
1. **`@graph`** from `src/components/StructuredData.tsx` (rendered in `layout.tsx`, so present on every page):
   - `["Organization", "ProfessionalService"]` — `@id https://aelvora.io/#organization`,
     name `Aelvora`, alternateName `Aelvora Agency`, url, `logo` ImageObject `/logo.png`,
     `image /opengraph-image`, description, slogan `We build AI products that drive real business growth.`,
     `email aelvoraio@gmail.com`, `foundingDate 2024`, `areaServed Place/Worldwide`,
     `knowsAbout` (the 18 keywords), `sameAs` (twitter/linkedin/github),
     `contactPoint` (sales), `makesOffer` → `OfferCatalog` of 4 `Service` items
     (Custom SaaS Development, AI Product Development, MVP Development, Premium Web Experiences).
   - `WebSite` — `@id https://aelvora.io/#website`, `inLanguage en-US`, `publisher` → Organization.
2. **`FAQPage`** from `src/sections/FAQSection.tsx` — the 6 questions listed in §3 above.

### `/contact` — 1 block
Only the `@graph` (Organization + WebSite). No page-specific schema.

**No `Service`, `BreadcrumbList`, `Person`, or `Product` schema exists.**

---

## 7. Every internal link on the homepage, with anchor text

| href | anchor text | source |
|---|---|---|
| `/` | `Aelvora` (logo + wordmark) | Navbar |
| `#process` | `SaaS Development` | Footer › Services |
| `#process` | `MVP Development` | Footer › Services |
| `#process` | `AI Tools` | Footer › Services |
| `#process` | `Web Design` | Footer › Services |
| `#portfolio` | `Portfolio` | Footer › Company |
| `#process` | `Process` | Footer › Company |
| `#faq` | `FAQ` | Footer › Company |
| `/contact` | `Contact` | Footer › Company |
| `/privacy` | `Privacy Policy` | Footer › Legal — **404** |
| `/terms` | `Terms of Service` | Footer › Legal — **404** |
| `/cookies` | `Cookie Policy` | Footer › Legal — **404** |
| `mailto:aelvoraio@gmail.com` | `aelvoraio@gmail.com` (×3) | Calendly section, Footer |
| `https://twitter.com/aelvora` | (icon only, `aria-label="Twitter"`) | Footer |
| `https://linkedin.com/company/aelvora` | (icon only, `aria-label="LinkedIn"`) | Footer |
| `https://github.com/aelvora` | (icon only, `aria-label="GitHub"`) | Footer |

Navbar links (`Services`, `Work`, `Process`, `FAQ`, `Contact`) and both hero CTAs are
`<button onClick=scrollIntoView>`, **not** anchors — they carry no crawlable href.
The navbar "Start a Project" button scrolls to `#contact`, **an id that does not exist**
anywhere in the document (the section id is `#book`). Pre-existing dead control.

Existing crawlable in-page anchor targets: `#process`, `#portfolio`, `#faq`, `#book`.

---

## 8. Images and `alt` attributes

| alt | `sizes` | source file | intrinsic | weight |
|---|---|---|---|---|
| `Aelvora` | — | `/logo.png` (footer, 32px) | 1024×1024 | 1325 KB |
| `Aelvora logo` | — | `/logo.png` (navbar, 36px) | 1024×1024 | 1325 KB |
| `Goali` | `(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw` | `/images/Goali/img 1.png` | 1838×908 | 975 KB |
| `WortGut` | same | `/images/WortGut/img1.png` | 1826×917 | 57 KB |
| `Dogar Farms` | same | `/images/dogarfarms/img3.png` | 1837×917 | 639 KB |
| `Savon AI` | same | `/images/savonai/Screenshot (378).png` | 1920×1080 | 779 KB |
| `Underfloor Heating` | same | `/images/underfloor heating/Screenshot (297).png` | 1920×1080 | 526 KB |
| `Woeftime` | same | `/images/woeftime/Screenshot (423).png` | 1920×1080 | 608 KB |

**Every image has a non-empty `alt`**, but all eight are bare labels with no descriptive value.
Section 2.2 permits improving them; none may be blanked.

**H5 confirmed.** The portfolio grid is capped at `max-w-7xl` (1280 px), so a card is
never wider than ~400 CSS px — but `sizes` ends in `33vw`, which on a 2560 px viewport
resolves to ~845 px and selects the 1080 w candidate. The `<img src>` fallback is
`w=3840`. The `sizes` tail must become a fixed px value.

Also present but not `next/image`: the three 2048×1024 earth textures
(`earth-day.jpg` 500 KB, `earth-night.png` 717 KB, `earth-specular.jpg` 218 KB)
loaded by the hero globe, and `/logo.png` at 1325 KB for a 36 px slot.

---

## 9. Hostname / canonical state (Section 2.4 input)

Measured live, 30 Aug 2026:

```
curl -I https://aelvora.io
  → HTTP/1.1 307 Temporary Redirect
    Location: https://www.aelvora.io/

curl -I https://www.aelvora.io
  → HTTP/1.1 200 OK   (X-Vercel-Cache: HIT, X-Nextjs-Prerender: 1)
```

So:
- **Served hostname:** `www.aelvora.io`
- **Declared canonical, sitemap URLs, `og:url`, robots `Host:`:** `https://aelvora.io` (apex, non-www)
- **The apex → www redirect is `307 Temporary`, not a permanent 301/308.**

This is the inconsistency described in Section 2.4, and it is worse than the spec assumed:
the redirect is temporary, so search engines are told *not* to consolidate signals onto `www`.

**Which hostname is actually indexed could not be determined** (no GSC access from this
environment). Per Section 2.4's own instruction — *"If you cannot determine which hostname
is indexed, do nothing here and flag it for the owner"* — **no canonical or redirect change
was made.** This is deliberately left as the last open item.

---

## 10. Homepage body copy (text dump, in document order)

> Kept verbatim so Section 2.2's "never strip the substantive body copy" can be audited.

**Hero**
- Badge: `Launch your AI SaaS MVP in 21 days`
- H1: `We build digital products that drive real business growth.`
- Sub: `Custom SaaS platforms, AI tools, and premium web experiences for ambitious founders and forward-thinking companies.`
- CTAs: `Book a Strategy Call` · `View Our Work`
- `Trusted by ambitious teams` — Acme, Echo, Nova, Pulse *(fabricated)*
- `Scroll to explore`

**Trust strip**
- `Trusted by ambitious founders & fast-growing companies`
- Logo marquee *(fabricated)*: InnovateLabs, FutureAI, CloudVenture, DataFlow, NeuralNet, Veritas, Luminary, Axiom, Crestline, Orbit
- Stats *(unverifiable)*: `50+ Projects Delivered` · `30+ Happy Clients` · `100% Satisfaction Rate` · `4.9★ Average Rating`, each with a one-line description.

**Process** — `Our Process` / `How We Turn Vision Into Product` /
`A clear, collaborative process where you're involved at every milestone — no surprises, just results.` /
`What We Build`: AI Products, Websites, Web Apps, SaaS Platforms, MVPs
- `01 Discovery · Week 1–2` — "Deep research, sharp questions, and a clear technical brief. We map your users, study your competitors, and define exactly what to build." → Technical requirements · User journey mapping · Architecture proposal
- `02 Design · Week 2–4` — "High-fidelity designs and interactive prototypes tailored to your brand. You see every detail before a line of code is written." → Design system · Interactive prototypes · Web & guidelines
- `03 Build · Week 4–12` — "Agile sprints with weekly demos. Production-grade code reviewed, tested, and optimized for speed — no black boxes." → Weekly progress demos · Staging environment · Automated test suite
- `04 Launch · Ongoing` — "Zero-downtime deployment, monitoring setup, and a 30-day support window. We don't disappear after shipping." → Production deployment · Analytics setup · 30-day support

**C2 confirmed:** the hero promises 21 days; this section spans weeks 1–12. Both are visible in one scroll.

**Portfolio** — `Selected Work` / `Projects We're Proud Of` /
`A small selection of recent builds — premium web, SaaS, and AI products shipped for ambitious teams.`

| Project | Category | Description | Stack | "Result" |
|---|---|---|---|---|
| Goali | SaaS Platform | Goal-tracking platform that turns long-term ambitions into daily, actionable habits. | Next.js, Tailwind, Supabase | Higher follow-through |
| WortGut | Premium Web | Cinematic brand site with motion-led storytelling and a polished, conversion-first flow. | Next.js, GSAP, Framer Motion | Premium brand presence |
| Dogar Farms | Web Experience | Modern farm & produce site with an editorial layout and a seamless ordering experience. | Next.js, Tailwind, Sanity | Direct-to-consumer launch |
| Savon AI | AI Tool | AI workflow product built around LLMs — natural inputs, structured automated outputs. | Next.js, OpenAI, LangChain | AI-powered workflows |
| Underfloor Heating | Lead-Gen Site | High-converting service site with calculators, trust signals, and a frictionless quote flow. | Next.js, Tailwind, HubSpot | Boosted qualified leads |
| Woeftime | Consumer App | Playful consumer experience with bold visuals, smooth interactions, and rich micro-animation. | Next.js, Framer Motion, Tailwind | Engaging UX from day one |

**H2 confirmed:** every "result" is an adjective. Not one is a fact.

**Testimonials** — `Clients Who Trust Us`, six entries *(all fabricated)*:
Sarah Chen (Founder, TechFlow) · Marcus Johnson (CEO, StartupHub) · Elena Rodriguez (CTO, DataVault) ·
James Miller (Founder, NeuralWrite) · Lisa Park (PM, CloudSync) · David Chen (Founder, LuxeBrand).

**FAQ** — `AI SaaS Development, Questions Answered` /
`Everything founders ask before building an AI product or SaaS with us.`
Six Q&As, full text in `src/lib/seo.ts` → `FAQS`. **This is the highest-value indexed prose on
the site** and is retained and expanded, never reduced.

**Close** — `Ready to Build?` / `Your Next Big Thing Starts Here` /
`Whether you have a full brief or just an idea on a napkin — let's talk and figure out the path forward together.` ·
`48H Response Guarantee` · `NDA Available on Request` · `Fixed-Price Engagements` ·
`Book a Call` / `Let's Talk About Your Project` / perks (30-minute session, Google Meet, any timezone, free) ·
Calendly iframe (`calendly.com/aelvoraio/30min`) · `Prefer Email? aelvoraio@gmail.com` /
`We typically reply within 24 hours`

**Footer** — `Premium websites, AI products, and SaaS platforms for ambitious founders worldwide. Cinematic builds that ship.` ·
`© 2026 Aelvora. All rights reserved. Crafted with care.` · `Available for new projects`

---

## 11. Performance reference points

No Lighthouse run was possible from this environment (no Chrome/CI harness available), so
the numeric performance baseline is **not** captured. What is recorded instead, as a proxy
that any later regression can be measured against:

- **Homepage HTML payload (dev render): 297,286 bytes.** Production render: `Content-Length: 274,513`.
- `/contact` HTML: 57,298 bytes.
- Homepage image weight above the fold is dominated by the hero globe's three textures
  (**1.4 MB combined**) plus `/logo.png` (**1.3 MB** for a 36 px slot).
- Six portfolio PNGs total **3.5 MB** of source, served through `next/image`.
- Client bundle carries `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`,
  `framer-motion` and `lenis`. The homepage is a single `"use client"` tree.

**Action for the owner:** run Lighthouse against `https://www.aelvora.io/` and paste the
numbers into this section *before* the next deploy, so Section 2.7's "not lower than the
baseline" check has something real to compare against. Until that exists, the payload
figures above are the only regression guard.

---

## 12. Pre-existing defects found while capturing (not caused by this work)

1. **`/privacy`, `/terms`, `/cookies` are linked from the footer of every page and all return 404.**
   Three broken internal links site-wide.
2. **`/contact` has no H1.**
3. **Navbar "Start a Project" targets `#contact`, an id that does not exist.** Dead control on every page.
4. **Footer links use bare hash hrefs (`#process`, `#faq`, `#portfolio`)**, so on `/contact` they
   resolve against a page that has no such anchors.
5. **`/contact` does not override `twitter:title`/`twitter:description`**, so its card advertises the homepage.
6. **Apex → www redirect is 307 (temporary), not permanent.** See §9.
7. **`meta keywords`** — 18 terms, ignored by search engines since ~2009.

---

## 13. Open gaps at baseline

- **Google Search Console is not set up / not accessible.** Required before Phase 2 per
  Section 2.1 so query and page performance have a before-and-after.
- **No Lighthouse number.** See §11.
- **Which hostname is indexed is unknown.** Section 2.4 is therefore deliberately unexecuted.
