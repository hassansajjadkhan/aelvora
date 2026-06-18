/**
 * Global JSON-LD structured data (schema.org).
 *
 * Server component — emitted into the initial HTML so search engines and
 * AI answer engines (Google AI Overviews, ChatGPT, Perplexity, etc.) can
 * parse who Aelvora is and what it offers. Page-specific schema (e.g.
 * FAQPage) is colocated with its own section.
 */
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_DESCRIPTION_SHORT,
  CONTACT_EMAIL,
  SAME_AS,
  SERVICES,
  SITE_KEYWORDS,
} from "@/lib/seo";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": ORG_ID,
      name: SITE_NAME,
      alternateName: "Aelvora Agency",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
      image: `${SITE_URL}/opengraph-image`,
      description: SITE_DESCRIPTION,
      slogan: "We build AI products that drive real business growth.",
      email: CONTACT_EMAIL,
      foundingDate: "2024",
      areaServed: {
        "@type": "Place",
        name: "Worldwide",
      },
      knowsAbout: SITE_KEYWORDS,
      sameAs: SAME_AS,
      contactPoint: {
        "@type": "ContactPoint",
        email: CONTACT_EMAIL,
        contactType: "sales",
        availableLanguage: ["English"],
      },
      makesOffer: {
        "@type": "OfferCatalog",
        name: "AI SaaS Development Services",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.description,
            provider: { "@id": ORG_ID },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION_SHORT,
      inLanguage: "en-US",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export const StructuredData = () => {
  // Escape `<` so the JSON can never break out of the <script> context.
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};
