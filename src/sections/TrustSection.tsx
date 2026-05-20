"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import {
  Hexagon,
  BrainCircuit,
  Globe,
  Activity,
  Share2,
  Disc,
  Sparkles,
  Compass,
  Layers,
  Building2,
  Rocket,
  Users,
  CheckCircle2,
  Star,
} from "lucide-react";

const logos = [
  { name: "InnovateLabs", icon: Hexagon },
  { name: "FutureAI", icon: BrainCircuit },
  { name: "CloudVenture", icon: Globe },
  { name: "DataFlow", icon: Activity },
  { name: "NeuralNet", icon: Share2 },
  { name: "Veritas", icon: Disc },
  { name: "Luminary", icon: Sparkles },
  { name: "Axiom", icon: Compass },
  { name: "Crestline", icon: Layers },
  { name: "Orbit", icon: Building2 },
];

const stats = [
  {
    icon: Rocket,
    number: "50+",
    label: "Projects Delivered",
    description: "Successful digital products launched across industries.",
  },
  {
    icon: Users,
    number: "30+",
    label: "Happy Clients",
    description: "Long-term partnerships built on trust and results.",
  },
  {
    icon: CheckCircle2,
    number: "100%",
    label: "Satisfaction Rate",
    description: "We don't just meet expectations, we exceed them.",
  },
  {
    icon: Star,
    number: "4.9★",
    label: "Average Rating",
    description: "Consistently rated 4.9 stars by our amazing clients.",
  },
];

const doubledLogos = [...logos, ...logos];

export const TrustSection = () => {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "transparent", width: "100%", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}
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

      {/* Heading with flanking gradient lines */}
      <Container size="xl" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-5"
          style={{ marginBottom: "44px" }}
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
          <span
            className="font-semibold uppercase text-center"
            style={{
              fontSize: "0.78rem",
              letterSpacing: "0.18em",
              color: "rgba(184,157,255,0.7)",
              whiteSpace: "nowrap",
            }}
          >
            Trusted by ambitious founders &amp; fast-growing companies
          </span>
          <div
            style={{
              flex: 1,
              maxWidth: "180px",
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(142,92,255,0.55), transparent)",
            }}
          />
        </motion.div>
      </Container>

      {/* Logo marquee */}
      <div className="relative overflow-hidden" style={{ marginBottom: "64px", width: "100%" }}>
        <div
          className="absolute left-0 top-0 h-full z-10 pointer-events-none"
          style={{
            width: "140px",
            background: "linear-gradient(to right, #07050f, transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 h-full z-10 pointer-events-none"
          style={{
            width: "140px",
            background: "linear-gradient(to left, #07050f, transparent)",
          }}
        />
        <div className="flex animate-marquee w-max">
          {doubledLogos.map((logo, i) => {
            const Icon = logo.icon;
            return (
              <div
                key={`${logo.name}-${i}`}
                className="flex items-center"
                style={{ paddingLeft: "26px", paddingRight: "26px" }}
              >
                <Icon
                  className="w-[18px] h-[18px]"
                  style={{ color: "rgba(184,157,255,0.65)", flexShrink: 0 }}
                />
                <span
                  className="font-display font-semibold"
                  style={{
                    marginLeft: "10px",
                    fontSize: "1rem",
                    color: "rgba(237,228,215,0.55)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {logo.name}
                </span>
                <span
                  style={{
                    marginLeft: "26px",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(142,92,255,0.6)",
                    flexShrink: 0,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Stat cards */}
      <Container size="xl" className="relative z-10">
        <div
          className="relative"
          style={{
            width: "100%",
            maxWidth: "1200px",
            marginInline: "auto",
          }}
        >
          {/* Cards grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 relative"
            style={{
              gap: "22px",
              zIndex: 1,
              justifyItems: "stretch",
              width: "100%",
              marginInline: "auto",
            }}
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
                    },
                  }}
                  className="flex flex-col items-center text-center"
                  style={{
                    padding: "44px 26px 38px",
                    borderRadius: "22px",
                    border: "1px solid rgba(184,157,255,0.18)",
                    background:
                      "linear-gradient(180deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
                    backdropFilter: "blur(14px)",
                    transition: "border-color 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(142,92,255,0.55)";
                    el.style.transform = "translateY(-6px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(184,157,255,0.18)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {/* Circular icon */}
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "50%",
                      border: "1px solid rgba(142,92,255,0.35)",
                      background: "rgba(142,92,255,0.12)",
                      marginBottom: "26px",
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: "#B89DFF" }}
                    />
                  </div>

                  {/* Big number */}
                  <div
                    className="font-display font-bold"
                    style={{
                      fontSize: "clamp(2.7rem, 3.4vw, 3.5rem)",
                      lineHeight: 1,
                      background: "linear-gradient(160deg, #EDE4D7 0%, #B89DFF 55%, #8E5CFF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      marginBottom: "16px",
                    }}
                  >
                    {stat.number}
                  </div>

                  {/* Label */}
                  <p
                    className="font-semibold uppercase"
                    style={{
                      fontSize: "0.82rem",
                      letterSpacing: "0.14em",
                      color: "#EDE4D7",
                      marginBottom: "16px",
                    }}
                  >
                    {stat.label}
                  </p>

                  {/* Accent divider */}
                  <div
                    style={{
                      width: "30px",
                      height: "2px",
                      borderRadius: "2px",
                      background: "#8E5CFF",
                      marginBottom: "16px",
                    }}
                  />

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "0.86rem",
                      lineHeight: 1.6,
                      color: "rgba(237,228,215,0.5)",
                      maxWidth: "210px",
                    }}
                  >
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
