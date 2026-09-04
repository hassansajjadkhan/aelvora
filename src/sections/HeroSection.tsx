"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { OFFER_DAYS } from "@/lib/offer";

const GlobeScene = dynamic(
  () => import("@/three/scene/GlobeScene").then((m) => m.GlobeScene),
  { ssr: false }
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const },
  },
};

/**
 * The hero now states the same timeline the process section does (audit C2),
 * and the "Trusted by ambitious teams" row of invented companies — Acme, Echo,
 * Nova, Pulse — is gone (audit C1). The secondary CTA is a real crawlable link
 * to /offer, not a scroll button, so a price is one click from the fold.
 */
export const HeroSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#080808", minHeight: "100vh" }}
    >
      {/* 3D globe — bleeds off the right edge */}
      <div
        className="absolute inset-y-0 right-0"
        style={{ width: "100%", background: "#080808" }}
      >
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-[62%]"
          style={{ height: "100%", background: "#080808" }}
        >
          {/* radial glow behind the globe */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: "55%",
              transform: "translate(-50%, -50%)",
              width: "75%",
              height: "75%",
              background:
                "radial-gradient(circle, rgba(142,92,255,0.28) 0%, rgba(142,92,255,0.05) 45%, transparent 70%)",
            }}
          />
          <GlobeScene className="w-full h-full" />
        </div>
      </div>

      {/* left-edge fade so text stays readable over the globe on small screens */}
      <div
        className="absolute inset-0 lg:hidden pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #080808 35%, rgba(8,8,8,0.4) 100%)",
        }}
      />

      {/* Content wrapper — full-bleed, padding only */}
      <div
        className="relative z-10 flex items-center"
        style={{
          minHeight: "100vh",
          width: "100%",
          paddingLeft: "clamp(24px, 9vw, 160px)",
          paddingRight: "clamp(24px, 4vw, 64px)",
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
          style={{
            maxWidth: "640px",
            width: "100%",
            paddingTop: "120px",
            paddingBottom: "140px",
          }}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} style={{ marginBottom: "36px" }}>
            <div
              className="inline-flex items-center gap-2"
              style={{
                padding: "9px 18px",
                borderRadius: "999px",
                border: "1px solid rgba(184,157,255,0.30)",
                background: "rgba(142,92,255,0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: "#B89DFF" }} />
              <span
                className="font-medium"
                style={{ color: "#D8C8FF", fontSize: "0.875rem" }}
              >
                AI product development
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-bold tracking-tight"
            style={{
              fontSize: "clamp(2.1rem, 3.1vw, 3.3rem)",
              lineHeight: 1.16,
              color: "#EDE4D7",
              marginBottom: "32px",
            }}
          >
            We build your AI product&apos;s{" "}
            <span style={{ color: "#9D6BFF" }}>first working version</span> in{" "}
            <span style={{ color: "#9D6BFF" }}>{OFFER_DAYS} days.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.7,
              color: "rgba(237,228,215,0.62)",
              maxWidth: "33rem",
              marginBottom: "44px",
            }}
          >
            For founders who need something real in front of users, investors, or
            customers — not another deck. Fixed price, fixed timeline, deployed
            and yours.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center"
            style={{ gap: "16px" }}
          >
            <button
              onClick={() =>
                document
                  .querySelector("#book")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-2 font-bold transition-all duration-300"
              style={{
                padding: "16px 28px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #8E5CFF, #B89DFF)",
                color: "#0a0a0a",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 32px rgba(142,92,255,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Book a call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              href="/offer"
              className="inline-flex items-center font-semibold transition-all duration-300"
              style={{
                padding: "16px 28px",
                borderRadius: "12px",
                border: "1px solid rgba(184,157,255,0.35)",
                color: "#EDE4D7",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(142,92,255,0.8)";
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(142,92,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(184,157,255,0.35)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              See what it costs
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center"
        style={{ gap: "12px" }}
      >
        <span
          className="uppercase"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: "rgba(237,228,215,0.5)",
          }}
        >
          Scroll to explore
        </span>
        <div
          className="flex justify-center"
          style={{
            width: "24px",
            height: "38px",
            borderRadius: "12px",
            border: "1.5px solid rgba(184,157,255,0.5)",
            paddingTop: "7px",
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "4px",
              height: "8px",
              borderRadius: "2px",
              background: "#B89DFF",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};
