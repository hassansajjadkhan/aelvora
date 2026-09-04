import type { Metadata } from "next";
import { LegalPageClient } from "@/components/LegalPageClient";
import { COOKIES } from "@/lib/legal";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: COOKIES.metaTitle,
  description: COOKIES.metaDescription,
  alternates: { canonical: "/cookies" },
  openGraph: {
    title: `${COOKIES.metaTitle} | ${SITE_NAME}`,
    description: COOKIES.metaDescription,
    url: "/cookies",
    type: "website",
  },
};

export default function COOKIESPage() {
  return <LegalPageClient doc={COOKIES} />;
}
