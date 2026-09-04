/**
 * Legal page content.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHAT THIS IS, AND WHAT IT IS NOT
 * ─────────────────────────────────────────────────────────────────────────────
 * `/privacy`, `/terms` and `/cookies` were linked from the footer of every page
 * and all three returned 404 (see `seo-baseline.md` §12) — three broken internal
 * links site-wide, against the spec's own acceptance criteria.
 *
 * The substantive content below is NOT invented boilerplate. Every third party,
 * cookie, and data field named here was read out of this codebase:
 *
 *   Google Analytics (gtag.js, G-B7K4637NTX)  src/app/layout.tsx
 *   Google Fonts + Fontshare (font CDNs)       src/app/layout.tsx
 *   Google Search Console verification         src/app/layout.tsx
 *   Calendly (embedded iframe)                 src/lib/seo.ts, CalendlySection
 *   Resend (transactional email)               src/app/api/contact/route.ts
 *   Vercel (hosting, request logs)             deployment target
 *   sessionStorage key `aelvora_utm`           src/lib/analytics.ts
 *   Form fields: name, email, message          src/components/ProjectForm.tsx
 *   IP address, for rate limiting              src/app/api/contact/route.ts
 *
 * So the factual half is accurate and verifiable. The LEGAL IDENTITY half —
 * who the controller actually is, where they are registered, which
 * jurisdiction's law governs, and any data-protection registration — is not
 * something that can be derived from code, and inventing it would be both a
 * spec rule 3 violation and legally meaningless. Those fields are `null` and
 * render as `[OWNER: supply]` markers.
 *
 * ⚠️ THIS IS NOT LEGAL ADVICE AND HAS NOT BEEN REVIEWED BY A LAWYER. It is an
 * honest, accurate description of what the site does, structured as a policy,
 * so the footer links resolve and visitors can see how their data is handled.
 * Have it reviewed before relying on it — particularly the Terms, where the
 * liability and IP clauses interact with your actual client contracts.
 */

/** Registered legal identity. All `null` until supplied. */
export const LEGAL_ENTITY: {
  /** Registered company name, e.g. "Aelvora Ltd". */
  name: string | null;
  /** Companies House (or equivalent) number. */
  companyNumber: string | null;
  /** Registered address, one line per row. */
  address: string[] | null;
  /** Governing law, e.g. "England and Wales". */
  jurisdiction: string | null;
  /** ICO registration number, if registered. */
  dataProtectionRegistration: string | null;
} = {
  name: null,
  companyNumber: null,
  address: null,
  jurisdiction: null,
  dataProtectionRegistration: null,
};

/** Shown as "Last updated" on each policy. Bump when you change the content. */
export const LEGAL_LAST_UPDATED = "5 September 2026";

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "table"; head: string[]; rows: string[][] }
  /** Renders an `[OWNER: supply …]` marker inline. */
  | { kind: "owner"; what: string };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  slug: "privacy" | "terms" | "cookies";
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: LegalSection[];
};

/** The third parties this site actually loads or sends data to. */
const THIRD_PARTIES: string[][] = [
  [
    "Vercel",
    "Hosting and request logs",
    "IP address, user agent, requested URL",
    "vercel.com/legal/privacy-policy",
  ],
  [
    "Google Analytics",
    "Aggregate traffic and conversion measurement",
    "Cookie ID, IP address, pages viewed, events",
    "policies.google.com/privacy",
  ],
  [
    "Google Fonts",
    "Serving the Inter typeface",
    "IP address (from loading the font file)",
    "policies.google.com/privacy",
  ],
  [
    "Fontshare",
    "Serving the Clash Display typeface",
    "IP address (from loading the font file)",
    "fontshare.com",
  ],
  [
    "Calendly",
    "Booking calls, via an embedded scheduler",
    "Name, email, and anything you type when booking",
    "calendly.com/privacy",
  ],
  [
    "Resend",
    "Delivering enquiry emails and your auto-reply",
    "Name, email, message content",
    "resend.com/legal/privacy-policy",
  ],
];

export const PRIVACY: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  metaTitle: "Privacy Policy",
  metaDescription:
    "What data aelvora.io collects, why, who it is shared with, how long it is kept, and the rights you have over it. Written from what the site actually does.",
  intro:
    "This policy explains exactly what happens to your data when you use aelvora.io. It describes what the site genuinely does, not what a template says it might.",
  sections: [
    {
      heading: "Who is responsible for your data",
      blocks: [
        {
          kind: "p",
          text: "The data controller for aelvora.io is:",
        },
        { kind: "owner", what: "registered legal entity name, company number and registered address" },
        {
          kind: "p",
          text: "You can reach us about anything in this policy at hello@aelvora.io.",
        },
      ],
    },
    {
      heading: "What we collect, and when",
      blocks: [
        {
          kind: "p",
          text: "Nothing about you is collected simply because you read a page, beyond what is described under Analytics and Hosting below. We do not have accounts, and there is nothing to sign up for.",
        },
        {
          kind: "table",
          head: ["When", "What", "Why"],
          rows: [
            [
              "You submit the enquiry form",
              "Your name, email address, and the message you write",
              "So we can read it and reply. Nothing else is done with it.",
            ],
            [
              "You submit the enquiry form",
              "Your IP address",
              "Rate limiting, to stop the form being flooded. Held in memory only, and never stored with your message.",
            ],
            [
              "You book a call",
              "Whatever Calendly asks for — typically name, email, and your answers to the booking questions",
              "Scheduling the call. This is collected by Calendly, on Calendly's systems.",
            ],
            [
              "You arrive from a campaign link",
              "The utm_ parameters in the URL",
              "So we can tell which outreach a visit came from. Stored in your browser's sessionStorage and cleared when you close the tab.",
            ],
            [
              "Any page view",
              "Cookie ID, IP address, pages and events",
              "Aggregate analytics. See the Cookie Policy.",
            ],
          ],
        },
        {
          kind: "p",
          text: "We do not collect special category data, we do not buy or enrich contact data from third parties, and we do not run advertising or retargeting pixels of any kind.",
        },
      ],
    },
    {
      heading: "Our lawful basis",
      blocks: [
        {
          kind: "list",
          items: [
            "Enquiries and bookings — legitimate interests, and steps taken at your request before entering a contract. You contacted us; replying is the obvious purpose.",
            "Analytics cookies — your consent, which you can withdraw at any time. See the Cookie Policy for how.",
            "Security and rate limiting — legitimate interests in keeping the site available and abuse-free.",
          ],
        },
      ],
    },
    {
      heading: "Who your data is shared with",
      blocks: [
        {
          kind: "p",
          text: "We do not sell data and we do not share it for anyone else's marketing. The processors below are the complete list of third parties that receive data through this site:",
        },
        {
          kind: "table",
          head: ["Processor", "What it does", "What it receives", "Their policy"],
          rows: THIRD_PARTIES,
        },
        {
          kind: "p",
          text: "Some of these providers are based in, or transfer data to, the United States. Where that happens it is covered by the providers' own standard contractual clauses and equivalent safeguards.",
        },
      ],
    },
    {
      heading: "How long we keep it",
      blocks: [
        {
          kind: "list",
          items: [
            "Enquiry emails — kept in our inbox while the conversation is live and for up to 24 months after, then deleted.",
            "Analytics data — retained according to the Google Analytics retention setting on the property, currently the platform default.",
            "UTM parameters — held in your own browser only, and gone when you close the tab.",
            "IP addresses used for rate limiting — held in server memory for at most one hour and never written to storage.",
          ],
        },
      ],
    },
    {
      heading: "Your rights",
      blocks: [
        {
          kind: "p",
          text: "You can ask us for a copy of what we hold about you, to correct it, to delete it, to restrict what we do with it, to receive it in a portable format, or to object to processing based on legitimate interests. Email hello@aelvora.io and we will respond within one month.",
        },
        {
          kind: "p",
          text: "If you think we have handled your data badly, you can complain to the relevant supervisory authority. In the UK that is the Information Commissioner's Office at ico.org.uk.",
        },
        { kind: "owner", what: "ICO (or equivalent) registration number, if registered" },
      ],
    },
    {
      heading: "Changes",
      blocks: [
        {
          kind: "p",
          text: "If this policy changes materially we will update the date at the top. There is no mailing list to notify, because we do not run one.",
        },
      ],
    },
  ],
};

export const COOKIES: LegalDoc = {
  slug: "cookies",
  title: "Cookie Policy",
  metaTitle: "Cookie Policy",
  metaDescription:
    "Every cookie and browser storage key aelvora.io sets, what each one does, how long it lasts, and how to refuse them.",
  intro:
    "This site sets very few cookies. Below is all of them, what each does, and how to turn them off.",
  sections: [
    {
      heading: "What is set",
      blocks: [
        {
          kind: "table",
          head: ["Name", "Set by", "Purpose", "Lasts"],
          rows: [
            [
              "_ga",
              "Google Analytics",
              "Distinguishes one visitor from another so visits can be counted",
              "2 years",
            ],
            [
              "_ga_B7K4637NTX",
              "Google Analytics",
              "Keeps session state for this specific analytics property",
              "2 years",
            ],
            [
              "aelvora_utm",
              "This site",
              "Remembers which campaign link you arrived from, so a booking can be attributed to it. Browser sessionStorage, not a cookie — it is never sent to a server.",
              "Until you close the tab",
            ],
          ],
        },
        {
          kind: "p",
          text: "There are no advertising cookies, no retargeting pixels, and no cross-site trackers. The Calendly scheduler sets its own cookies when you interact with it; those are governed by Calendly's policy.",
        },
      ],
    },
    {
      heading: "How to refuse them",
      blocks: [
        {
          kind: "list",
          items: [
            "Browser settings — every major browser can block or clear cookies for a single site. This is the most reliable option and it works regardless of anything we do.",
            "Google's opt-out — the official Google Analytics opt-out browser add-on at tools.google.com/dlpage/gaoptout blocks analytics across all sites that use it.",
            "Do Not Track / Global Privacy Control — if your browser sends these signals, they are honoured.",
          ],
        },
        {
          kind: "p",
          text: "Blocking every cookie on this site costs you nothing. Nothing here needs a cookie to work — there is no login, no basket, and no saved state.",
        },
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  slug: "terms",
  title: "Terms of Service",
  metaTitle: "Terms of Service",
  metaDescription:
    "The terms covering use of aelvora.io — what the site is, what published pricing and timelines mean, and where the actual contract for a project lives.",
  intro:
    "These terms cover your use of this website. They are not the contract for a project — that is a separate signed agreement, and where the two differ, the signed agreement wins.",
  sections: [
    {
      heading: "Who you are contracting with",
      blocks: [
        { kind: "owner", what: "registered legal entity name, company number and registered address" },
      ],
    },
    {
      heading: "What this site is",
      blocks: [
        {
          kind: "p",
          text: "aelvora.io describes services we offer and work we have done. It is an invitation to get in touch, not an offer capable of acceptance. Submitting the enquiry form or booking a call does not create a contract and does not oblige either of us to proceed.",
        },
      ],
    },
    {
      heading: "Pricing and timelines shown here",
      blocks: [
        {
          kind: "p",
          text: "Where a price or a delivery window is published on this site, it applies to the scope described alongside it and nothing else. A quote for your specific project is confirmed in writing before any work starts, and that written quote is what binds us.",
        },
        {
          kind: "p",
          text: "The fixed-price commitment on the offer page means what it says: the price is fixed to the scope signed off at the start, and an overrun in days is our cost, not yours. A change to the scope is quoted before it is built, and you decide whether it goes ahead.",
        },
      ],
    },
    {
      heading: "Intellectual property",
      blocks: [
        {
          kind: "p",
          text: "The content, design, and code of this website belong to us. Project work is different: for client engagements, ownership of the delivered source code transfers to the client, as stated on the offer page and set out in the project agreement.",
        },
        {
          kind: "p",
          text: "Project names and screenshots shown in the work section remain the property of their respective owners and appear here to describe work carried out.",
        },
      ],
    },
    {
      heading: "Acceptable use",
      blocks: [
        {
          kind: "list",
          items: [
            "Do not use the enquiry form to send unsolicited marketing, malware, or anything unlawful.",
            "Do not attempt to disrupt the site, circumvent rate limiting, or access anything you have not been given access to.",
            "Do not scrape the site to reproduce it, in whole or in part, as your own.",
          ],
        },
      ],
    },
    {
      heading: "Accuracy and availability",
      blocks: [
        {
          kind: "p",
          text: "We try to keep this site accurate and up to date, but we do not warrant that it is error-free or continuously available. Content may change without notice. Any placeholder marked as pending is exactly that, and should not be relied on.",
        },
      ],
    },
    {
      heading: "Liability",
      blocks: [
        {
          kind: "p",
          text: "Nothing here limits liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot lawfully be limited. Subject to that, we are not liable for indirect or consequential loss arising from your use of this website. Liability arising from a project is governed by that project's agreement, not by these terms.",
        },
      ],
    },
    {
      heading: "Governing law",
      blocks: [
        {
          kind: "p",
          text: "These terms, and any dispute arising from them, are governed by the law of:",
        },
        { kind: "owner", what: "governing jurisdiction, e.g. England and Wales" },
      ],
    },
  ],
};

export const LEGAL_DOCS: LegalDoc[] = [PRIVACY, TERMS, COOKIES];
