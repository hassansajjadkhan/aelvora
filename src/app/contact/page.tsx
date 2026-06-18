import type { Metadata } from "next";
import { ContactPageClient } from "@/components/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact — Start Your AI SaaS or MVP Project",
  description:
    "Tell Aelvora about your AI SaaS, custom software, or MVP project. Send a brief or book a free 30-minute strategy call — we respond within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Aelvora — Start Your AI SaaS or MVP Project",
    description:
      "Send a project brief or book a free 30-minute strategy call with Aelvora's AI SaaS development team.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
