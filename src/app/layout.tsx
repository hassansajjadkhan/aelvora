import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { LenisProvider } from "@/components/LenisProvider";
import { StructuredData } from "@/components/StructuredData";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE_DEFAULT,
  SITE_TITLE_TEMPLATE,
  SITE_DESCRIPTION,
  SITE_DESCRIPTION_SHORT,
  SITE_KEYWORDS,
  TWITTER_HANDLE,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE_DEFAULT,
    template: SITE_TITLE_TEMPLATE,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION_SHORT,
    // og:image is supplied by app/opengraph-image.tsx (file-based metadata).
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION_SHORT,
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    // twitter:image is supplied by app/twitter-image.tsx.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "2d-Vm-wQv2QTOCTTiFKXZ0qC5-HMBrpBjDhX_0TTx_A",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
        {/* Organization / WebSite / Service JSON-LD for SEO + AI search engines */}
        <StructuredData />
        <LenisProvider>{children}</LenisProvider>

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B7K4637NTX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B7K4637NTX');
          `}
        </Script>
      </body>
    </html>
  );
}
