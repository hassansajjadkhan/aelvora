import type { Metadata } from "next";
import { HomePageClient } from "@/components/HomePageClient";
import { SITE_DESCRIPTION, SITE_TITLE_DEFAULT } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE_DEFAULT },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomePageClient />;
}
