import type { Metadata } from "next";
import { LenisProvider } from "@/components/LenisProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aelvora | Premium Websites, AI Products & SaaS Development",
  description:
    "Aelvora builds high-quality websites, AI-powered products, SaaS platforms, and MVPs for ambitious companies. Cinematic digital experiences that convert.",
  keywords:
    "web development, AI integration, SaaS development, MVP, AI products, premium web design, Aelvora",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://aelvora.com",
    title: "Aelvora | Premium Websites, AI Products & SaaS Development",
    description:
      "High-quality websites, AI-powered products, and SaaS platforms for ambitious companies.",
    images: [
      {
        url: "https://aelvora.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aelvora | Premium Websites, AI Products & SaaS Development",
    description:
      "High-quality websites, AI-powered products, and SaaS platforms for ambitious companies.",
    images: ["https://aelvora.com/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#080808" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* Inter Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Clash Display Font */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
