import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { publishedCaseStudies } from "@/lib/case-studies";

/**
 * Nothing that was in the baseline sitemap is ever removed from it — `/` and
 * `/contact` stay exactly as they were (spec §2.2). `/offer` and `/partners`
 * are added as new indexable surface area on genuinely distinct topics.
 *
 * `/work/[slug]` entries appear automatically as case studies are published in
 * `lib/case-studies.ts`. An unpublished case study is absent here and 404s on
 * its route, so the sitemap never advertises a thin page (spec §2.5).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/offer`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/partners`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...publishedCaseStudies().map((study) => ({
      url: `${SITE_URL}/work/${study.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
