# Handover — what you need to supply

Everything in the funnel spec is built. This is the list of real-world facts the
code is waiting on, in the order they matter. Run `npm run check:owner` at any
time to see what is still outstanding.

Nothing below was guessed. Where a fact was needed and missing, the code renders
a visible `[OWNER: supply …]` marker or leaves the feature gated — it was never
filled with something plausible-sounding. That is what put fabricated
testimonials on the live site once already.

---

## 1. Blocking — these are visible on production right now

Outreach is live, so anyone who clicks a link in those three emails sees these.

### The price
**File:** `src/lib/offer.ts`

```ts
export const OFFER_PRICE: string | null = "$14,000";      // display string
export const OFFER_PRICE_NUMERIC: number | null = 14000;  // for Offer schema
```

No marker renders any more. While `OFFER_PRICE` is null the price line is
simply omitted, the hero's secondary CTA reads "See what's included" instead of
"See what it costs", and `/offer`'s opening paragraph promises a number back
within 48 hours rather than claiming the page already shows one. The `Offer`
block is also omitted from the `/offer` Service schema, because an offer with no
price fails Rich Results validation.

Still the highest-priority item. Audit C3 — *no price anywhere* — is the reason
`/offer` exists, and the page that exists to state a price still doesn't state
one. Everything above is damage limitation, not a fix.

### The founder — optional, but the stronger page
**File:** `src/lib/seo.ts` → `FOUNDER`

**No longer blocking.** At your instruction the "Who you're working with"
section speaks as the studio rather than naming a person, so there are no
markers live. Every claim in it is one the site already stands behind: the work
is the work shown above it, the ownership terms are the terms on `/offer`, and
the stack is the stack in `offer.ts`. No number is claimed and no team size is
implied.

Setting `FOUNDER.name` switches it to a personal card — photo, name, role, bio,
real profile links. Worth revisiting: with the fabricated testimonials deleted
there is **no third-party proof left on this site**, and a company describing
itself is the weakest category of proof there is. A named person with a history
is the strongest thing that can go in that slot for studio principals and
technical founders who evaluate vendors for a living.

If you do fill it: put the photo in `public/` (square crop, renders at 240px)
and set `photo` and `photoAlt`.

---

## 2. Blocking — the form does not deliver without this

**Environment variables** (Vercel → Project → Settings → Environment Variables):

| Variable | Required | What it does |
|---|---|---|
| `RESEND_API_KEY` | **Yes** | Delivery for enquiries and the auto-reply |
| `CONTACT_TO` | No | Where enquiries land. Defaults to `hello@aelvora.io` |
| `CONTACT_FROM` | No | Verified Resend sender. Defaults to `Aelvora <hello@aelvora.io>` |
| `PUSH_WEBHOOK_URL` | No | POSTed on every submission — ntfy.sh, Slack, or Discord |

Without `RESEND_API_KEY` the endpoint **refuses** the submission: it logs the
full payload at error level (so the lead survives in Vercel logs) and tells the
visitor to email directly. It does not silently pretend to succeed.

`hello@aelvora.io` already has SPF and DKIM, so verifying the domain in Resend
should be quick. `PUSH_WEBHOOK_URL` is worth ten minutes — spec §7 is right that
reply speed compounds hard in B2B, and the difference between replying in five
minutes and five hours is measurable.

---

## 3. High value — the partner track is half-wired without them

### The 15-minute Calendly event type
**File:** `src/lib/seo.ts`

```ts
export const CALENDLY_PARTNER_SLUG: string | null = "15min";
```

Create the event type in Calendly first, then set this. Until you do,
`/partners` embeds the 30-minute booker and the heading says "One short call is
enough" instead of "Fifteen minutes is enough" — it does not claim 15 minutes
and then show a 30-minute calendar.

Two things you lose until this is set: the shorter ask (which converts better
for an audience buying capacity, not a vision), and the ability to tell partner
bookings from founder bookings in analytics without digging.

### Case study facts
**File:** `src/lib/case-studies.ts`

Six projects, each needing `clientType`, `problem`, `constraint`, `built`,
`decisions`, `result`. Fill one and it publishes itself — `/work/<slug>` starts
returning 200, it enters `sitemap.xml`, and the homepage, `/partners` and the
footer all start linking to it. No code change.

The lead three should be **Savon AI** (AI capability), **Underfloor Heating**
(measurable outcome), **Goali** (full SaaS build).

`result` must be a fact, not an adjective:

> ✅ "Quote-to-booking time cut from 9 days to 2."
> ❌ "Boosted qualified leads."

If a project genuinely has no figure, leave `result` null and it stays
unpublished. That is better than the adjectives that used to sit there.

**Note:** these routes currently 404 by design. The template is built and
verified — I published a fixture through it end-to-end and confirmed the page,
the `BreadcrumbList` and `Article` schema, the sitemap entry and every inbound
link all work. They stay dark only because §2.5 forbids shipping a thin indexed
page, and a case study made of placeholder markers is exactly that.

---

## 4. Legal — needed, and not something I could write for you

**File:** `src/lib/legal.ts` → `LEGAL_ENTITY`

Registered name, company number, registered address, governing jurisdiction, and
ICO registration number if you have one.

**Not blocking, and no markers render.** While these are null the pages say
"Aelvora, contactable at hello@aelvora.io — full registered details available on
request" and, for governing law, "the jurisdiction in which Aelvora is
established… email us and we will confirm it in writing". Both are true as
written for a business with no registered company, and both switch to the real
details the moment you fill this in. If you *do* have a registered company, fill
it in — naming it is stronger than deferring.

`/privacy`, `/terms` and `/cookies` now exist and resolve — they used to 404
from the footer of every page. **The factual content is accurate**: every
processor, cookie and data field named was read out of this codebase (Vercel,
Google Analytics, Google Fonts, Fontshare, Calendly, Resend, the
`aelvora_utm` sessionStorage key, the form fields, the rate-limit IP). Nothing
in those tables is boilerplate.

> ⚠️ **These have not been reviewed by a lawyer and are not legal advice.** They
> are an honest description of what the site does, structured as a policy, so
> the links resolve and visitors can see how their data is handled. Get them
> reviewed — particularly the Terms, where the liability and IP clauses need to
> line up with your actual client contracts.

---

## 5. Measurement — do this before you judge anything

### Google Search Console
Not set up, or not accessible. **Set it up before you evaluate any of this.**
`seo-baseline.md` captured everything I could reach, but without GSC there is no
query or page performance before-and-after, so there is no way to tell whether
this work helped or hurt search.

The verification meta tag is already in `layout.tsx`, so this may just be a
matter of claiming the property.

### A Lighthouse run
`seo-baseline.md` §11 has no performance number, because there was no browser
harness available. Run Lighthouse against `https://www.aelvora.io/` and paste the
result into that section. Until then the only regression guard is HTML payload
size, which is a poor proxy.

Worth knowing before you run it: the hero globe pulls **1.4 MB** of textures and
`/logo.png` is **1.3 MB** for a 36px slot. Neither was in scope here, but both
are almost certainly hurting LCP.

### The hostname question
**Left deliberately unresolved.** Production 307-redirects `aelvora.io` →
`www.aelvora.io` while the canonical tag, sitemap, `og:url` and robots `Host:`
all declare the apex. The redirect being *temporary* rather than permanent makes
it worse than the spec assumed — search engines are being told not to
consolidate signals onto `www`.

The fix depends entirely on **which hostname is already indexed**, which needs
GSC. §2.4 is explicit that an unnecessary canonical change is worse than a
persisting inconsistency, so nothing was touched. Once GSC tells you:

1. Keep whichever hostname is indexed — not whichever looks tidier.
2. Set `SITE_URL` in `src/lib/seo.ts` to it.
3. Make the Vercel redirect from the other hostname **permanent (308)**, not 307.
4. Verify with `curl -I` that it lands in one hop.

---

## 6. Two decisions I took on the defaults

Both per the spec's own `DEFAULT`, both reversible in one file:

- **DECISION-1** — the stat block (`50+`, `30+`, `100% Satisfaction`, `4.9★`) was
  deleted. If the project and client counts are real *including prior agency
  work*, they can come back as "Our team has shipped 50+ projects". The
  satisfaction and rating figures should stay gone regardless — neither is
  verifiable.
- **DECISION-2** — Option A, productized. If 21 days is **not** genuinely
  deliverable at your current capacity, say so now and switch to Option B, and
  change `OFFER_DAYS` in `src/lib/offer.ts`. Every timeline claim on the site
  reads from that one constant, so the hero, the process and `/offer` cannot
  drift apart. Shipping a promise that breaks in delivery is worse than a
  vaguer hero.

---

## Quick reference

```bash
npm run check:owner    # what's still outstanding
npm run dev            # local
npm run build          # production build
```

| Where | What it holds |
|---|---|
| `src/lib/offer.ts` | Price, timeline, scope in/out, process, payment terms, stack |
| `src/lib/seo.ts` | Site metadata, FAQs, founder, Calendly, services |
| `src/lib/case-studies.ts` | All six projects; publishing gate |
| `src/lib/legal.ts` | Legal entity, policy content |
| `src/lib/analytics.ts` | The four conversion events, UTM capture, Calendly hook |
| `seo-baseline.md` | The before-state; do not edit retroactively |
