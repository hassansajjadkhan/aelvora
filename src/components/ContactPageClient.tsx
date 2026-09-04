"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { CalendlySection } from "@/sections/CalendlySection";
import { OFFER_DAYS } from "@/lib/offer";

/**
 * The /contact page wraps the homepage's booking section.
 *
 * It previously had **no H1 at all** — `CalendlySection`'s top heading is an
 * H2, so the page shipped with zero H1s (see `seo-baseline.md` §3). The header
 * below adds one. Nothing was removed to make room for it.
 */
export const ContactPageClient = () => {
  return (
    <>
      <NoiseOverlay />
      <Navbar />

      <main
        style={{
          width: "100%",
          background: "#080808",
          display: "flex",
          flexDirection: "column",
          paddingTop: "72px",
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: "1000px",
            marginInline: "auto",
            paddingLeft: "clamp(20px, 6vw, 48px)",
            paddingRight: "clamp(20px, 6vw, 48px)",
            paddingTop: "clamp(56px, 8vw, 96px)",
          }}
        >
          <span
            className="inline-block font-bold uppercase"
            style={{
              fontSize: "0.78rem",
              letterSpacing: "0.22em",
              padding: "8px 22px",
              borderRadius: "999px",
              background: "rgba(142,92,255,0.10)",
              border: "1px solid rgba(142,92,255,0.45)",
              color: "#B89DFF",
              marginBottom: "26px",
            }}
          >
            Contact
          </span>
          <h1
            className="font-display font-bold tracking-tight"
            style={{
              fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)",
              lineHeight: 1.12,
              color: "#EDE4D7",
              marginBottom: "22px",
              maxWidth: "20ch",
            }}
          >
            Tell us what you&apos;re{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg,#D8C8FF 0%, #B89DFF 45%, #8E5CFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              building.
            </span>
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "rgba(237,228,215,0.7)",
              maxWidth: "48rem",
            }}
          >
            Book a call, send a brief, or just email. Whichever is easiest — a
            rough idea is enough to start from, and we&apos;ll tell you straight
            whether a {OFFER_DAYS}-day build is the right shape for it.
          </p>
        </section>

        <CalendlySection />
        <Footer />
      </main>
    </>
  );
};
