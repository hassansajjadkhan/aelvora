"use client";

import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { HeroSection } from "@/sections/HeroSection";
import { TrustSection } from "@/sections/TrustSection";
import { ProcessSection } from "@/sections/ProcessSection";
import { PortfolioSection } from "@/sections/PortfolioSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { FAQSection } from "@/sections/FAQSection";
import { CalendlySection } from "@/sections/CalendlySection";
import { Footer } from "@/components/Footer";

/** Thin gradient line that visually separates sections */
const SectionDivider = ({ flip = false }: { flip?: boolean }) => (
  <div
    aria-hidden="true"
    style={{
      width: "100%",
      height: "1px",
      background: flip
        ? "linear-gradient(90deg, rgba(142,92,255,0.0) 0%, rgba(184,157,255,0.20) 30%, rgba(216,200,255,0.35) 50%, rgba(184,157,255,0.20) 70%, rgba(142,92,255,0.0) 100%)"
        : "linear-gradient(90deg, rgba(142,92,255,0.0) 0%, rgba(142,92,255,0.35) 30%, rgba(184,157,255,0.50) 50%, rgba(142,92,255,0.35) 70%, rgba(142,92,255,0.0) 100%)",
    }}
  />
);

/**
 * The interactive homepage. Content is always rendered (and therefore
 * server-rendered into the initial HTML for crawlers and AI engines); the
 * LoadingScreen is a self-dismissing overlay on top, not a gate.
 */
export const HomePageClient = () => {
  return (
    <>
      <NoiseOverlay />
      <LoadingScreen />

      <Navbar />
      {/*
        Sections alternate between two tones:
        A = #080808  (pure near-black)
        B = #07050f  (deep black with purple cast)
      */}
      <main
        style={{
          width: "100%",
          background: "#080808",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "80px",
        }}
      >
        {/* A */}
        <HeroSection />
        <SectionDivider />

        {/* B */}
        <div style={{ background: "#07050f" }}>
          <TrustSection />
        </div>
        <SectionDivider flip />

        {/* A */}
        <div style={{ background: "#080808" }}>
          <ProcessSection />
        </div>
        <SectionDivider />

        {/* A */}
        <div style={{ background: "#080808" }}>
          <PortfolioSection />
        </div>
        <SectionDivider />

        {/* B */}
        <div style={{ background: "#07050f" }}>
          <TestimonialsSection />
        </div>
        <SectionDivider flip />

        {/* A */}
        <div style={{ background: "#080808" }}>
          <FAQSection />
        </div>
        <SectionDivider />

        {/* A */}
        <div style={{ background: "#080808" }}>
          <CalendlySection />
        </div>
        <SectionDivider flip />

        <Footer />
      </main>
    </>
  );
};
