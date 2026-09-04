import type { Metadata } from "next";
import { LegalPageClient } from "@/components/LegalPageClient";
import { TERMS } from "@/lib/legal";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: TERMS.metaTitle,
  description: TERMS.metaDescription,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `${TERMS.metaTitle} | ${SITE_NAME}`,
    description: TERMS.metaDescription,
    url: "/terms",
    type: "website",
  },
};

export default function TERMSPage() {
  return <LegalPageClient doc={TERMS} />;
}
