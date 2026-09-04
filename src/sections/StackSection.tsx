"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { STACK } from "@/lib/offer";

/**
 * The stack strip — replaces the fabricated client-logo marquee and the
 * unverifiable stat block that stood here (audit C1, H1).
 *
 * Honest, makes no unsupportable claim, and signals competence to a technical
 * buyer better than invented logos ever did. The wave background is the
 * section's existing treatment, kept unchanged.
 */
export const StackSection = () => {
  return (
    <section
      aria-labelledby="stack-heading"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: "transparent",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Animated wave background */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradA" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8E5CFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#B89DFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8E5CFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="waveGradB" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8E5CFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#D8C8FF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#8E5CFF" stopOpacity="0" />
          </linearGradient>
          <filter id="waveBlur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <g className="trust-wave-1">
          <path
            d="M -100 720 C 200 600, 500 820, 800 700 S 1400 580, 1700 720"
            fill="none"
            stroke="url(#waveGradA)"
            strokeWidth="14"
            filter="url(#waveBlur)"
            opacity="0.9"
          />
          <path
            className="trust-wave-line"
            d="M -100 720 C 200 600, 500 820, 800 700 S 1400 580, 1700 720"
            fill="none"
            stroke="url(#waveGradB)"
            strokeWidth="1.5"
          />
        </g>

        <g className="trust-wave-2">
          <path
            d="M -100 560 C 250 470, 550 640, 850 540 S 1400 420, 1700 560"
            fill="none"
            stroke="url(#waveGradA)"
            strokeWidth="10"
            filter="url(#waveBlur)"
            opacity="0.55"
          />
          <path
            className="trust-wave-line"
            d="M -100 560 C 250 470, 550 640, 850 540 S 1400 420, 1700 560"
            fill="none"
            stroke="url(#waveGradB)"
            strokeWidth="1"
            opacity="0.7"
          />
        </g>

        <g className="trust-wave-1" style={{ animationDuration: "22s" }}>
          <path
            d="M -100 820 C 300 760, 600 900, 900 820 S 1400 760, 1700 820"
            fill="none"
            stroke="url(#waveGradA)"
            strokeWidth="18"
            filter="url(#waveBlur)"
            opacity="0.7"
          />
        </g>
      </svg>

      <Container size="xl" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Label with flanking gradient lines */}
          <div
            className="flex items-center justify-center"
            style={{ gap: "20px", marginBottom: "36px", width: "100%" }}
          >
            <div
              style={{
                flex: 1,
                maxWidth: "180px",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(142,92,255,0.55))",
              }}
            />
            <h2
              id="stack-heading"
              className="font-semibold uppercase text-center"
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.18em",
                color: "rgba(184,157,255,0.7)",
                whiteSpace: "nowrap",
                fontFamily: "inherit",
              }}
            >
              Built with
            </h2>
            <div
              style={{
                flex: 1,
                maxWidth: "180px",
                height: "1px",
                background:
                  "linear-gradient(90deg, rgba(142,92,255,0.55), transparent)",
              }}
            />
          </div>

          <ul
            className="flex flex-wrap items-center justify-center"
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              gap: "14px 28px",
              maxWidth: "820px",
            }}
          >
            {STACK.map((tech) => (
              <li
                key={tech}
                className="font-display font-semibold"
                style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
                  color: "rgba(237,228,215,0.62)",
                  whiteSpace: "nowrap",
                }}
              >
                {tech}
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
};
