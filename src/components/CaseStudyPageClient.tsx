"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * Case study template (spec §5.3).
 *
 * Order is deliberate: summary → problem → constraint → what we built →
 * technical decisions → result → CTA. The constraint sits early because
 * constraints are what make a story credible, and the technical decisions
 * section is the part a technical buyer actually reads, so it gets real space
 * rather than a bullet list.
 *
 * This component only ever renders a published study — the route 404s before
 * reaching it otherwise — so every field below is non-null by construction.
 */

const sectionStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "820px",
  marginInline: "auto",
  paddingLeft: "clamp(20px, 6vw, 48px)",
  paddingRight: "clamp(20px, 6vw, 48px)",
};

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.7 },
};

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2
    id={id}
    className="font-display font-bold"
    style={{
      fontSize: "clamp(1.6rem, 2.8vw, 2.3rem)",
      lineHeight: 1.15,
      color: "#EDE4D7",
      marginBottom: "20px",
    }}
  >
    {children}
  </h2>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontSize: "1.05rem",
      lineHeight: 1.8,
      color: "rgba(237,228,215,0.72)",
    }}
  >
    {children}
  </p>
);

export const CaseStudyPageClient = ({ study }: { study: CaseStudy }) => {
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
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <section
          style={{
            ...sectionStyle,
            paddingTop: "clamp(48px, 8vw, 88px)",
            paddingBottom: "clamp(32px, 5vw, 48px)",
          }}
        >
          {/* Visible breadcrumb, matching the BreadcrumbList schema */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center"
            style={{
              gap: "8px",
              marginBottom: "26px",
              fontSize: "0.82rem",
              color: "rgba(237,228,215,0.5)",
            }}
          >
            <Link href="/" style={{ color: "rgba(237,228,215,0.5)" }}>
              Home
            </Link>
            <ChevronRight className="w-[13px] h-[13px]" aria-hidden="true" />
            <Link href="/#portfolio" style={{ color: "rgba(237,228,215,0.5)" }}>
              Work
            </Link>
            <ChevronRight className="w-[13px] h-[13px]" aria-hidden="true" />
            <span aria-current="page" style={{ color: "#D8C8FF" }}>
              {study.title}
            </span>
          </nav>

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
              marginBottom: "24px",
            }}
          >
            {study.category}
          </span>

          <h1
            className="font-display font-bold tracking-tight"
            style={{
              fontSize: "clamp(2.1rem, 4.4vw, 3.4rem)",
              lineHeight: 1.12,
              color: "#EDE4D7",
              marginBottom: "20px",
            }}
          >
            {study.title}
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              lineHeight: 1.7,
              color: "rgba(237,228,215,0.8)",
              marginBottom: "22px",
            }}
          >
            {study.summary}
          </p>

          <div className="flex flex-wrap items-center" style={{ gap: "10px" }}>
            <span
              style={{
                fontSize: "0.88rem",
                color: "rgba(237,228,215,0.55)",
              }}
            >
              {study.clientType}
            </span>
            <span aria-hidden="true" style={{ color: "rgba(237,228,215,0.3)" }}>
              ·
            </span>
            {study.stack.map((tag) => (
              <span
                key={tag}
                className="font-medium"
                style={{
                  fontSize: "0.75rem",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  background: "rgba(142,92,255,0.12)",
                  border: "1px solid rgba(142,92,255,0.32)",
                  color: "#D8C8FF",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* ── Hero image ─────────────────────────────────────────────────── */}
        <section
          style={{ ...sectionStyle, paddingBottom: "clamp(40px, 6vw, 64px)" }}
        >
          <motion.div
            {...reveal}
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: "16 / 10",
              borderRadius: "22px",
              border: "1px solid rgba(142,92,255,0.28)",
              background: "#0a0716",
            }}
          >
            <Image
              src={study.image}
              alt={study.imageAlt}
              fill
              priority
              sizes="(max-width: 860px) 100vw, 740px"
              className="object-cover"
            />
          </motion.div>
        </section>

        {/* ── The problem ────────────────────────────────────────────────── */}
        <section
          aria-labelledby="problem-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(40px, 6vw, 64px)" }}
        >
          <motion.div {...reveal}>
            <H2 id="problem-heading">The problem</H2>
            <Body>{study.problem}</Body>
          </motion.div>
        </section>

        {/* ── The constraint ─────────────────────────────────────────────── */}
        <section
          aria-labelledby="constraint-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(40px, 6vw, 64px)" }}
        >
          <motion.div
            {...reveal}
            style={{
              borderRadius: "22px",
              padding: "clamp(24px, 4vw, 36px)",
              background:
                "linear-gradient(160deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
              border: "1px solid rgba(142,92,255,0.28)",
            }}
          >
            <H2 id="constraint-heading">The constraint</H2>
            <Body>{study.constraint}</Body>
          </motion.div>
        </section>

        {/* ── What we built ──────────────────────────────────────────────── */}
        <section
          aria-labelledby="built-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(40px, 6vw, 64px)" }}
        >
          <motion.div {...reveal}>
            <H2 id="built-heading">What we built</H2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              {study.built!.map((para) => (
                <Body key={para.slice(0, 40)}>{para}</Body>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Technical decisions ────────────────────────────────────────── */}
        <section
          aria-labelledby="decisions-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(40px, 6vw, 64px)" }}
        >
          <motion.div {...reveal}>
            <H2 id="decisions-heading">Technical decisions</H2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginTop: "4px",
              }}
            >
              {study.decisions!.map((decision) => (
                <div
                  key={decision.choice}
                  style={{
                    borderRadius: "18px",
                    padding: "24px 26px",
                    background: "rgba(142,92,255,0.08)",
                    border: "1px solid rgba(142,92,255,0.22)",
                  }}
                >
                  <h3
                    className="font-display font-bold"
                    style={{
                      fontSize: "1.08rem",
                      color: "#EDE4D7",
                      marginBottom: "10px",
                      lineHeight: 1.3,
                    }}
                  >
                    {decision.choice}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.98rem",
                      lineHeight: 1.75,
                      color: "rgba(237,228,215,0.68)",
                    }}
                  >
                    {decision.why}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── The result ─────────────────────────────────────────────────── */}
        <section
          aria-labelledby="result-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(40px, 6vw, 64px)" }}
        >
          <motion.div
            {...reveal}
            style={{
              borderRadius: "22px",
              padding: "clamp(28px, 5vw, 44px)",
              border: "1.5px solid rgba(184,157,255,0.55)",
              background:
                "linear-gradient(160deg, rgba(142,92,255,0.16) 0%, rgba(18,14,30,0.75) 100%)",
              boxShadow:
                "0 0 28px rgba(142,92,255,0.35), 0 0 70px rgba(142,92,255,0.18)",
            }}
          >
            <H2 id="result-heading">The result</H2>
            <p
              className="font-display font-bold"
              style={{
                fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)",
                lineHeight: 1.35,
                color: "#EDE4D7",
              }}
            >
              {study.result}
            </p>
          </motion.div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <section
          style={{ ...sectionStyle, paddingBottom: "clamp(64px, 9vw, 110px)" }}
        >
          <motion.div {...reveal}>
            <H2 id="cta-heading">Want something like this?</H2>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.75,
                color: "rgba(237,228,215,0.7)",
                marginBottom: "28px",
              }}
            >
              The productized version of this is a fixed price and a fixed
              timeline — the full scope, including what it doesn&apos;t cover, is
              published.
            </p>
            <Link
              href="/offer"
              className="group inline-flex items-center font-bold"
              style={{
                padding: "16px 28px",
                gap: "10px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #8E5CFF, #B89DFF)",
                color: "#0a0a0a",
                fontSize: "0.95rem",
                boxShadow: "0 0 22px rgba(142,92,255,0.45)",
              }}
            >
              See what it costs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
};
