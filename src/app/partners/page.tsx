import type { Metadata } from "next";
import { PartnersPageClient } from "@/components/PartnersPageClient";
import { PageViewTracker } from "@/components/PageViewTracker";
import { EVENTS } from "@/lib/analytics";
import { PAGE_META, SITE_URL, SITE_NAME, CONTACT_EMAIL } from "@/lib/seo";

export const metadata: Metadata = {
  title: PAGE_META.partners.title,
  description: PAGE_META.partners.description,
  alternates: { canonical: "/partners" },
  openGraph: {
    title: `${PAGE_META.partners.title} | ${SITE_NAME}`,
    description: PAGE_META.partners.description,
    url: "/partners",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_META.partners.title} | ${SITE_NAME}`,
    description: PAGE_META.partners.description,
  },
};

/**
 * `Service` schema for the white-label offering.
 *
 * Added, never replacing the site-wide Organization/WebSite graph in
 * `layout.tsx` — it references that Organization by @id instead (spec §2.6).
 */
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/partners#service`,
  name: "White-Label Development for Design Studios",
  serviceType: "White-label software development",
  description:
    "Build capacity for brand and identity studios whose clients need software. Authentication, admin dashboards and client portals, iOS and Android apps, backends and APIs behind an existing design, AI and LLM features, third-party integrations, and migrations off no-code platforms — delivered white-label under the studio's brand, at a fixed price the studio marks up, with a standing commitment never to contact the studio's client.",
  provider: { "@id": `${SITE_URL}/#organization` },
  url: `${SITE_URL}/partners`,
  audience: {
    "@type": "Audience",
    audienceType: "Brand and identity design studios",
  },
  areaServed: { "@type": "Place", name: "Worldwide" },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `${SITE_URL}/partners`,
    availableLanguage: ["English"],
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    description:
      "Fixed price per project. The studio sets its own margin on top.",
    availability: "https://schema.org/InStock",
    seller: { "@id": `${SITE_URL}/#organization` },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "White-label build capacity",
    itemListElement: [
      "Authentication and user accounts",
      "Admin dashboards and client portals",
      "iOS and Android apps",
      "Backends and APIs behind an existing design",
      "AI and LLM features",
      "Third-party integrations",
      "Migrations off no-code platforms",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
  email: CONTACT_EMAIL,
};

export default function PartnersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageViewTracker event={EVENTS.partnersPageViewed} />
      <PartnersPageClient />
    </>
  );
}
