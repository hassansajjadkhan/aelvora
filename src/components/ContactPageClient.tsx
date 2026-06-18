"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { CalendlySection } from "@/sections/CalendlySection";

/**
 * The /contact page is an exact replica of the homepage's
 * "Your Next Big Thing Starts Here" section (CalendlySection),
 * rendered as a standalone page with the navbar and footer.
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
        <CalendlySection />
        <Footer />
      </main>
    </>
  );
};
