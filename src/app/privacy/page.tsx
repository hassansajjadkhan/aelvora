import type { Metadata } from "next";
import { LegalPageClient } from "@/components/LegalPageClient";
import { PRIVACY } from "@/lib/legal";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: PRIVACY.metaTitle,
  description: PRIVACY.metaDescription,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `${PRIVACY.metaTitle} | ${SITE_NAME}`,
    description: PRIVACY.metaDescription,
    url: "/privacy",
    type: "website",
  },
};

export default function PRIVACYPage() {
  return <LegalPageClient doc={PRIVACY} />;
}
