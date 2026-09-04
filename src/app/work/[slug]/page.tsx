import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPageClient } from "@/components/CaseStudyPageClient";
import {
  CASE_STUDIES,
  getCaseStudy,
  isPublished,
  publishedCaseStudies,
} from "@/lib/case-studies";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

/**
 * `/work/[slug]` — case studies (spec §5.3).
 *
 * Only published case studies exist as routes. A project whose narrative fields
 * are still `null` in `lib/case-studies.ts` is not a thin page here — it 404s,
 * is absent from the sitemap, and is not linked from anywhere. See the header
 * comment in that file for why (spec §2.5 beats §5.3 under §0 rule 1).
 *
 * Fill a project's `problem`, `constraint`, `built`, `decisions`, `result` and
 * `clientType` and it appears here, in the sitemap, on the homepage, and on
 * /partners with no further code change.
 */

export function generateStaticParams() {
  return publishedCaseStudies().map((study) => ({ slug: study.slug }));
}

/**
 * Unpublished slugs must 404 rather than render on demand, and unknown slugs
 * must 404 too. `false` gives exactly that for anything not in the list above.
 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study || !isPublished(study)) return {};

  // Unique, non-templated per page (spec §2.5). Built from the project's own
  // result and summary, so no two case studies share a description.
  const description = `${study.result} ${study.summary} Built with ${study.stack.join(", ")}.`;

  return {
    title: `${study.title} — ${study.category} Case Study`,
    description,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${study.title} — ${study.category} Case Study | ${SITE_NAME}`,
      description,
      url: `/work/${study.slug}`,
      type: "article",
      images: [{ url: study.image, alt: study.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — ${study.category} Case Study | ${SITE_NAME}`,
      description,
      images: [study.image],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study || !isPublished(study)) notFound();

  /** BreadcrumbList (spec §2.6) — added alongside the site-wide graph. */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${SITE_URL}/#portfolio`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: study.title,
        item: `${SITE_URL}/work/${study.slug}`,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/work/${study.slug}#article`,
    headline: `${study.title} — ${study.category} Case Study`,
    description: study.summary,
    image: `${SITE_URL}${study.image}`,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/work/${study.slug}`,
    about: study.stack,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <CaseStudyPageClient study={study} />
    </>
  );
}

/** Guards against a slug being renamed in one place but not the other. */
if (process.env.NODE_ENV === "development") {
  const slugs = new Set(CASE_STUDIES.map((c) => c.slug));
  if (slugs.size !== CASE_STUDIES.length) {
    console.warn("[case-studies] duplicate slug detected in CASE_STUDIES");
  }
}
