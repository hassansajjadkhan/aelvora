"use client";

import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { HeroSection } from "@/sections/HeroSection";
import { StackSection } from "@/sections/StackSection";
import { OfferSection } from "@/sections/OfferSection";
import { PortfolioSection } from "@/sections/PortfolioSection";
import { ProcessSection } from "@/sections/ProcessSection";
import { FitSection } from "@/sections/FitSection";
import { FounderSection } from "@/sections/FounderSection";
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
 * The homepage — Track A, founders (spec §5.1).
 *
 * Section order follows spec §5.2. Gone from this page: the six fabricated
 * testimonials, both placeholder client-logo rows, and the unverifiable stat
 * block (`100% Satisfaction`, `4.9★`) — audit C1 and H1, DECISION-1 default.
 *
 * New: the offer card, fit / not-fit, and the founder section. The founder is
 * the proof now that the invented testimonials are gone.
 *
 * Content is always rendered (and therefore server-rendered into the initial
 * HTML for crawlers and AI engines); the LoadingScreen is a self-dismissing
 * overlay on top, not a gate.
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
        {/* 1 · Hero — A */}
        <HeroSection />
        <SectionDivider />

        {/* 2 · Stack strip — B */}
        <div style={{ background: "#07050f" }}>
          <StackSection />
        </div>
        <SectionDivider flip />

        {/* 3 · The offer — A. The one section that reads heavier than its neighbours. */}
        <div style={{ background: "#080808" }}>
          <OfferSection />
        </div>
        <SectionDivider />

        {/* 4 · Selected work — A */}
        <div style={{ background: "#080808" }}>
          <PortfolioSection />
        </div>
        <SectionDivider />

        {/* 5 · Process, in days — B */}
        <div style={{ background: "#07050f" }}>
          <ProcessSection />
        </div>
        <SectionDivider flip />

        {/* 6 · Fit / not fit — A */}
        <div style={{ background: "#080808" }}>
          <FitSection />
        </div>
        <SectionDivider />

        {/* 7 · Founder — B */}
        <div style={{ background: "#07050f" }}>
          <FounderSection />
        </div>
        <SectionDivider flip />

        {/* 8 · FAQ — A */}
        <div style={{ background: "#080808" }}>
          <FAQSection />
        </div>
        <SectionDivider />

        {/* 9 · Close — A */}
        <div style={{ background: "#080808" }}>
          <CalendlySection />
        </div>
        <SectionDivider flip />

        <Footer />
      </main>
    </>
  );
};
