import type { Metadata } from "next";
import { OfferPageClient } from "@/components/OfferPageClient";
import { PageViewTracker } from "@/components/PageViewTracker";
import { EVENTS } from "@/lib/analytics";
import { PAGE_META, SITE_URL, SITE_NAME } from "@/lib/seo";
import {
  OFFER_NAME,
  OFFER_DAYS,
  OFFER_PRICE_NUMERIC,
  OFFER_CURRENCY,
  OFFER_INCLUDES,
} from "@/lib/offer";

export const metadata: Metadata = {
  title: PAGE_META.offer.title,
  description: PAGE_META.offer.description,
  alternates: { canonical: "/offer" },
  openGraph: {
    title: `${PAGE_META.offer.title} | ${SITE_NAME}`,
    description: PAGE_META.offer.description,
    url: "/offer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_META.offer.title} | ${SITE_NAME}`,
    description: PAGE_META.offer.description,
  },
};

/**
 * `Service` schema for the productized offer (spec §2.6).
 *
 * Added alongside the site-wide Organization/WebSite graph, referencing it by
 * @id rather than replacing it. The `offers` block only carries a `price` once
 * `OFFER_PRICE_NUMERIC` is set — emitting an Offer with no price, or with a
 * made-up one, would fail Rich Results validation and misrepresent the product.
 */
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/offer#service`,
  name: `${OFFER_NAME} — ${OFFER_DAYS} days`,
  serviceType: "AI product MVP development",
  description: PAGE_META.offer.description,
  provider: { "@id": `${SITE_URL}/#organization` },
  url: `${SITE_URL}/offer`,
  areaServed: { "@type": "Place", name: "Worldwide" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Included in the 21-day build",
    itemListElement: OFFER_INCLUDES.map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
  ...(OFFER_PRICE_NUMERIC !== null
    ? {
        offers: {
          "@type": "Offer",
          price: OFFER_PRICE_NUMERIC,
          priceCurrency: OFFER_CURRENCY,
          availability: "https://schema.org/InStock",
          seller: { "@id": `${SITE_URL}/#organization` },
        },
      }
    : {}),
};

export default function OfferPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageViewTracker event={EVENTS.offerPageViewed} />
      <OfferPageClient />
    </>
  );
}
