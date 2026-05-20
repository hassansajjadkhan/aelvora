"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { AlertCircle, Clock, DollarSign, Zap, TrendingDown, Users } from "lucide-react";

const painPoints = [
  {
    icon: AlertCircle,
    title: "Technical Debt",
    description: "Legacy systems eating your runway while competitors ship faster.",
  },
  {
    icon: Clock,
    title: "Slow Time-to-Market",
    description: "Endless dev cycles let opportunities slip away before you launch.",
  },
  {
    icon: DollarSign,
    title: "Unpredictable Costs",
    description: "Bloated agencies with scope creep that doubles your budget.",
  },
  {
    icon: Zap,
    title: "Feature Gaps",
    description: "Your users need things your current team simply can't deliver.",
  },
  {
    icon: TrendingDown,
    title: "Scaling Bottlenecks",
    description: "Infrastructure that cracks under growth instead of powering it.",
  },
  {
    icon: Users,
    title: "Team Bandwidth",
    description: "Every dev resource consumed by maintenance, none left for vision.",
  },
];

/** Decorative wavy-dot pattern that sits at the bottom-right of each card. */
const CardWavePattern = () => {
  const dots = Array.from({ length: 8 }).flatMap((_, row) =>
    Array.from({ length: 32 }).map((_, col) => {
      const cx = col * 10 + 6;
      const baseY = 18 + row * 12;
      const cy = baseY + Math.sin((col / 32) * Math.PI * 2 + row * 0.6) * 6;
      return { key: `${row}-${col}`, cx, cy };
    })
  );

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 120"
      preserveAspectRatio="none"
      className="absolute pointer-events-none"
      style={{
        right: 0,
        bottom: 0,
        width: "70%",
        height: "60%",
        opacity: 0.85,
      }}
    >
      <defs>
        <radialGradient id="cardDotFade" cx="80%" cy="100%" r="100%">
          <stop offset="0%" stopColor="#B89DFF" stopOpacity="1" />
          <stop offset="55%" stopColor="#8E5CFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8E5CFF" stopOpacity="0" />
        </radialGradient>
        <filter id="cardDotGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <mask id="cardWaveMask">
          <rect width="320" height="120" fill="black" />
          <g filter="url(#cardDotGlow)">
            {dots.map((d) => (
              <circle key={d.key} cx={d.cx} cy={d.cy} r={1.1} fill="white" />
            ))}
          </g>
        </mask>
      </defs>

      {/* Soft outer halo behind the dots for extra neon bloom */}
      <g style={{ filter: "blur(6px)", opacity: 0.55 }}>
        {dots.map((d) => (
          <circle
            key={`halo-${d.key}`}
            cx={d.cx}
            cy={d.cy}
            r={1.8}
            fill="#B89DFF"
          />
        ))}
      </g>

      {/* Bright dots, fading via the gradient + mask */}
      <rect width="320" height="120" fill="url(#cardDotFade)" mask="url(#cardWaveMask)" />
    </svg>
  );
};

export const PainPointsSection = () => {
  return (
    <section
      className="pt-32 md:pt-44 lg:pt-52 pb-24 md:pb-32 lg:pb-36 relative overflow-hidden"
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
      {/* Horizon glow arcs — left and right under the header */}
      <svg
        aria-hidden="true"
        className="absolute pointer-events-none"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        style={{ inset: 0, width: "100%", height: "100%", zIndex: 0 }}
      >
        <defs>
          <linearGradient id="ppArcLeft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8E5CFF" stopOpacity="0" />
            <stop offset="60%" stopColor="#D8C8FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8E5CFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ppArcRight" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#8E5CFF" stopOpacity="0" />
            <stop offset="60%" stopColor="#D8C8FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8E5CFF" stopOpacity="0" />
          </linearGradient>
          <filter id="ppArcBlur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        {/* Left arc */}
        <path
          d="M -40 460 Q 240 300 540 420"
          fill="none"
          stroke="url(#ppArcLeft)"
          strokeWidth="10"
          filter="url(#ppArcBlur)"
        />
        <path
          d="M -40 460 Q 240 300 540 420"
          fill="none"
          stroke="url(#ppArcLeft)"
          strokeWidth="1.4"
        />
        {/* Right arc */}
        <path
          d="M 1640 460 Q 1360 300 1060 420"
          fill="none"
          stroke="url(#ppArcRight)"
          strokeWidth="10"
          filter="url(#ppArcBlur)"
        />
        <path
          d="M 1640 460 Q 1360 300 1060 420"
          fill="none"
          stroke="url(#ppArcRight)"
          strokeWidth="1.4"
        />
      </svg>

      <Container size="xl" className="relative z-10">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col text-center"
          style={{
            maxWidth: "880px",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "72px",
            alignItems: "center",
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
              marginBottom: "28px",
            }}
          >
            The Reality
          </span>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(2rem, 3.6vw, 3.4rem)",
              lineHeight: 1.1,
              color: "#EDE4D7",
              marginBottom: "24px",
            }}
          >
            We Know What&apos;s
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg,#D8C8FF 0%, #B89DFF 45%, #8E5CFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Slowing You Down
            </span>
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "rgba(237,228,215,0.55)",
              maxWidth: "640px",
            }}
          >
            Most founders face the same wall. These aren&apos;t excuses —
            they&apos;re solvable problems.
          </p>
        </motion.div>

        {/* Cards grid: 1 / 2 / 3 columns */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "22px" }}
        >
          {painPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                }}
                className="group relative overflow-hidden"
                style={{
                  borderRadius: "22px",
                  padding: "28px 30px 34px",
                  minHeight: "215px",
                  background:
                    "linear-gradient(160deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
                  border: "1px solid rgba(142,92,255,0.22)",
                  backdropFilter: "blur(14px)",
                  transition: "border-color 0.3s, transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(142,92,255,0.55)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(142,92,255,0.22)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Wave dot pattern at bottom */}
                <CardWavePattern />

                {/* Large number watermark — top-right */}
                <span
                  className="absolute font-display font-bold select-none pointer-events-none"
                  style={{
                    top: "18px",
                    right: "26px",
                    fontSize: "3.2rem",
                    lineHeight: 1,
                    color: "rgba(142,92,255,0.22)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Top row: icon + title */}
                <div
                  className="flex items-start relative"
                  style={{ gap: "18px", zIndex: 2 }}
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0 relative"
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(184,157,255,0.35) 0%, rgba(142,92,255,0.18) 55%, rgba(18,14,30,0.4) 100%)",
                      border: "1.5px solid rgba(184,157,255,0.75)",
                      boxShadow:
                        "0 0 18px rgba(142,92,255,0.55), 0 0 38px rgba(142,92,255,0.35), inset 0 0 12px rgba(184,157,255,0.35)",
                    }}
                  >
                    <Icon
                      className="w-[22px] h-[22px]"
                      style={{
                        color: "#FFFFFF",
                        filter:
                          "drop-shadow(0 0 6px rgba(216,200,255,0.95)) drop-shadow(0 0 12px rgba(142,92,255,0.7))",
                      }}
                    />
                  </div>
                  <div style={{ paddingTop: "6px", paddingRight: "60px" }}>
                    <h3
                      className="font-display font-bold"
                      style={{
                        fontSize: "1.18rem",
                        color: "#EDE4D7",
                        lineHeight: 1.25,
                      }}
                    >
                      {point.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p
                  className="relative"
                  style={{
                    marginTop: "14px",
                    marginLeft: "70px",
                    paddingRight: "20px",
                    fontSize: "0.92rem",
                    lineHeight: 1.55,
                    color: "rgba(237,228,215,0.55)",
                    zIndex: 2,
                  }}
                >
                  {point.description}
                </p>

                {/* Glowing purple underline — left, just below the icon */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: "30px",
                    bottom: "14px",
                    width: "56px",
                    height: "3px",
                    borderRadius: "2px",
                    background:
                      "linear-gradient(90deg, #B89DFF, rgba(184,157,255,0))",
                    boxShadow: "0 0 14px rgba(184,157,255,0.85)",
                    zIndex: 2,
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
};
