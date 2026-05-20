"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { Layers, BrainCircuit, Rocket, Globe, CheckCircle2 } from "lucide-react";

const services = [
  {
    tag: "SaaS",
    icon: Layers,
    title: "Custom SaaS Products",
    description:
      "End-to-end SaaS platforms built to scale. From auth and billing to real-time dashboards — systems that grow with your revenue.",
    features: [
      "Multi-tenant architecture",
      "Payment & subscription systems",
      "API-first design",
      "CI/CD & automated deployment",
    ],
  },
  {
    tag: "AI",
    icon: BrainCircuit,
    title: "AI-Powered Tools",
    description:
      "We integrate cutting-edge LLMs and machine learning into products your users actually want — not gimmicks, real automation.",
    features: [
      "LLM integration & prompt engineering",
      "Custom fine-tuned models",
      "Vector search & RAG pipelines",
      "Real-time inference systems",
    ],
  },
  {
    tag: "MVP",
    icon: Rocket,
    title: "Rapid MVP Development",
    description:
      "Turn your idea into a shippable product in weeks, not months. We focus relentlessly on what matters to validate your market.",
    features: [
      "Lean feature scoping",
      "Investor-ready presentation layer",
      "Scalable codebase from day one",
      "Launch support & iteration",
    ],
  },
  {
    tag: "Web",
    icon: Globe,
    title: "Premium Web Experiences",
    description:
      "Websites that stop people mid-scroll. With 3D, motion, and micro-interactions built for performance and SEO.",
    features: [
      "3D scenes & GSAP animations",
      "Sub-second load times",
      "Full SEO architecture",
      "Motion design system",
    ],
  },
];

/** Dotted wave pattern — anchored to bottom-left OR bottom-right depending on card. */
const ServiceDotPattern = ({ side = "left" }: { side?: "left" | "right" }) => {
  const dots = Array.from({ length: 7 }).flatMap((_, row) =>
    Array.from({ length: 28 }).map((_, col) => {
      const cx = col * 11 + 6;
      const baseY = 20 + row * 13;
      const cy = baseY + Math.sin((col / 28) * Math.PI * 2.2 + row * 0.7) * 7;
      return { key: `${row}-${col}`, cx, cy };
    })
  );

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 130"
      preserveAspectRatio="none"
      className="absolute pointer-events-none"
      style={{
        [side]: 0,
        bottom: 0,
        width: "55%",
        height: "55%",
        opacity: 0.85,
        transform: side === "right" ? "scaleX(-1)" : undefined,
      }}
    >
      <defs>
        <radialGradient id={`srvDotFade-${side}`} cx="20%" cy="100%" r="100%">
          <stop offset="0%" stopColor="#B89DFF" stopOpacity="1" />
          <stop offset="55%" stopColor="#8E5CFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8E5CFF" stopOpacity="0" />
        </radialGradient>
        <filter id={`srvDotGlow-${side}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <mask id={`srvDotMask-${side}`}>
          <rect width="320" height="130" fill="black" />
          <g filter={`url(#srvDotGlow-${side})`}>
            {dots.map((d) => (
              <circle key={d.key} cx={d.cx} cy={d.cy} r={1.1} fill="white" />
            ))}
          </g>
        </mask>
      </defs>

      <g style={{ filter: "blur(6px)", opacity: 0.5 }}>
        {dots.map((d) => (
          <circle key={`halo-${d.key}`} cx={d.cx} cy={d.cy} r={1.8} fill="#B89DFF" />
        ))}
      </g>

      <rect
        width="320"
        height="130"
        fill={`url(#srvDotFade-${side})`}
        mask={`url(#srvDotMask-${side})`}
      />
    </svg>
  );
};

export const ServicesSection = () => {
  return (
    <section
      id="services"
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
      <Container size="xl" className="relative z-10">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col text-center"
          style={{
            maxWidth: "920px",
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
            Our Expertise
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
            Everything You Need
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
              to Build &amp; Scale
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
            Four focused service lines. One team. Relentlessly high standards.
          </p>
        </motion.div>

        {/* 2x2 grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "26px" }}
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            const dotSide: "left" | "right" = i % 2 === 0 ? "left" : "right";
            return (
              <motion.div
                key={service.title}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="group relative overflow-hidden"
                style={{
                  borderRadius: "24px",
                  padding: "34px 38px 40px",
                  minHeight: "360px",
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
                {/* Dot pattern (alternating side) */}
                <ServiceDotPattern side={dotSide} />

                {/* Large number watermark — top-right */}
                <span
                  className="absolute font-display font-bold select-none pointer-events-none"
                  style={{
                    top: "26px",
                    right: "34px",
                    fontSize: "3.6rem",
                    lineHeight: 1,
                    color: "rgba(142,92,255,0.20)",
                    letterSpacing: "-0.02em",
                    zIndex: 2,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Top row: icon + tag + title */}
                <div className="relative" style={{ zIndex: 2 }}>
                  <div className="flex items-start" style={{ gap: "22px" }}>
                    {/* Square neon icon */}
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "16px",
                        background:
                          "linear-gradient(160deg, rgba(184,157,255,0.35) 0%, rgba(142,92,255,0.18) 60%, rgba(18,14,30,0.4) 100%)",
                        border: "1.5px solid rgba(184,157,255,0.7)",
                        boxShadow:
                          "0 0 22px rgba(142,92,255,0.55), 0 0 44px rgba(142,92,255,0.3), inset 0 0 14px rgba(184,157,255,0.35)",
                      }}
                    >
                      <Icon
                        className="w-8 h-8"
                        style={{
                          color: "#FFFFFF",
                          filter:
                            "drop-shadow(0 0 6px rgba(216,200,255,0.95)) drop-shadow(0 0 14px rgba(142,92,255,0.7))",
                        }}
                      />
                    </div>

                    <div style={{ paddingTop: "4px", paddingRight: "70px" }}>
                      {/* Tag pill */}
                      <span
                        className="inline-block font-bold uppercase"
                        style={{
                          fontSize: "0.7rem",
                          letterSpacing: "0.22em",
                          padding: "5px 14px",
                          borderRadius: "999px",
                          background: "rgba(142,92,255,0.18)",
                          border: "1px solid rgba(142,92,255,0.45)",
                          color: "#B89DFF",
                          marginBottom: "12px",
                        }}
                      >
                        {service.tag}
                      </span>
                      <h3
                        className="font-display font-bold"
                        style={{
                          fontSize: "1.5rem",
                          color: "#EDE4D7",
                          lineHeight: 1.2,
                        }}
                      >
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      marginTop: "20px",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      color: "rgba(237,228,215,0.6)",
                      maxWidth: "94%",
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Feature list with check icons */}
                  <ul
                    style={{
                      marginTop: "26px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      paddingLeft: 0,
                      listStyle: "none",
                    }}
                  >
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center"
                        style={{ gap: "12px" }}
                      >
                        <CheckCircle2
                          className="w-[18px] h-[18px] flex-shrink-0"
                          style={{
                            color: "#B89DFF",
                            filter:
                              "drop-shadow(0 0 4px rgba(184,157,255,0.7))",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "0.92rem",
                            color: "rgba(237,228,215,0.78)",
                          }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Neon underline at bottom-center */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: "50%",
                    bottom: "14px",
                    transform: "translateX(-50%)",
                    width: "120px",
                    height: "3px",
                    borderRadius: "2px",
                    background:
                      "linear-gradient(90deg, transparent, #B89DFF, transparent)",
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
