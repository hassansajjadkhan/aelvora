"use client";

import { motion } from "framer-motion";
import {
  Search,
  Palette,
  Code2,
  Rocket,
  ClipboardList,
  Map,
  Inbox,
  Layers,
  Globe,
  Server,
  CheckCircle2,
  BarChart3,
  LineChart,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Deliverable = { label: string; icon: LucideIcon };
type Step = {
  number: string;
  title: string;
  duration: string;
  icon: LucideIcon;
  description: string;
  deliverables: Deliverable[];
};

const steps: Step[] = [
  {
    number: "01",
    title: "Discovery",
    duration: "Week 1–2",
    icon: Search,
    description:
      "Deep research, sharp questions, and a clear technical brief. We map your users, study your competitors, and define exactly what to build.",
    deliverables: [
      { label: "Technical requirements", icon: ClipboardList },
      { label: "User journey mapping", icon: Map },
      { label: "Architecture proposal", icon: Inbox },
    ],
  },
  {
    number: "02",
    title: "Design",
    duration: "Week 2–4",
    icon: Palette,
    description:
      "High-fidelity designs and interactive prototypes tailored to your brand. You see every detail before a line of code is written.",
    deliverables: [
      { label: "Design system", icon: Layers },
      { label: "Interactive prototypes", icon: ClipboardList },
      { label: "Web & guidelines", icon: Code2 },
    ],
  },
  {
    number: "03",
    title: "Build",
    duration: "Week 4–12",
    icon: Code2,
    description:
      "Agile sprints with weekly demos. Production-grade code reviewed, tested, and optimized for speed — no black boxes.",
    deliverables: [
      { label: "Weekly progress demos", icon: BarChart3 },
      { label: "Staging environment", icon: Server },
      { label: "Automated test suite", icon: CheckCircle2 },
    ],
  },
  {
    number: "04",
    title: "Launch",
    duration: "Ongoing",
    icon: Rocket,
    description:
      "Zero-downtime deployment, monitoring setup, and a 30-day support window. We don't disappear after shipping.",
    deliverables: [
      { label: "Production deployment", icon: Globe },
      { label: "Analytics setup", icon: LineChart },
      { label: "30-day support", icon: Clock },
    ],
  },
];

/** Dotted wave pattern for the bottom-left of the header column */
const HeaderWavePattern = () => {
  const dots = Array.from({ length: 9 }).flatMap((_, row) =>
    Array.from({ length: 36 }).map((_, col) => {
      const cx = col * 10 + 6;
      const baseY = 20 + row * 14;
      const cy = baseY + Math.sin((col / 36) * Math.PI * 2.4 + row * 0.55) * 9;
      return { key: `${row}-${col}`, cx, cy };
    })
  );

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 380 160"
      preserveAspectRatio="none"
      className="pointer-events-none"
      style={{ width: "100%", height: "auto", opacity: 0.85 }}
    >
      <defs>
        <radialGradient id="procHeaderFade" cx="25%" cy="100%" r="100%">
          <stop offset="0%" stopColor="#B89DFF" stopOpacity="1" />
          <stop offset="55%" stopColor="#8E5CFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8E5CFF" stopOpacity="0" />
        </radialGradient>
        <filter id="procDotGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <mask id="procHeaderMask">
          <rect width="380" height="160" fill="black" />
          <g filter="url(#procDotGlow)">
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
        width="380"
        height="160"
        fill="url(#procHeaderFade)"
        mask="url(#procHeaderMask)"
      />
    </svg>
  );
};

export const ProcessSection = () => {
  return (
    <section
      id="process"
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
      <div
        className="relative z-10"
        style={{
          width: "100%",
          paddingLeft: "clamp(28px, 6vw, 96px)",
          paddingRight: "clamp(28px, 6vw, 96px)",
        }}
      >
        <div
          className="grid grid-cols-1 lg:[grid-template-columns:minmax(0,1fr)_minmax(0,1.6fr)]"
          style={{
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* LEFT: Header column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col text-center lg:sticky lg:[top:120px] lg:[margin-top:140px]"
            style={{
              alignSelf: "start",
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
                marginBottom: "32px",
              }}
            >
              Our Process
            </span>
            <h2
              className="font-display font-bold"
              style={{
                fontSize: "clamp(2.2rem, 3.6vw, 3.4rem)",
                lineHeight: 1.05,
                color: "#EDE4D7",
                marginBottom: "26px",
              }}
            >
              How We Turn
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
                Vision Into
                <br />
                Product
              </span>
            </h2>
            <div
              style={{
                width: "84px",
                height: "3px",
                borderRadius: "2px",
                background:
                  "linear-gradient(90deg, #B89DFF, rgba(184,157,255,0))",
                boxShadow: "0 0 14px rgba(184,157,255,0.85)",
                marginBottom: "26px",
              }}
            />
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.65,
                color: "rgba(237,228,215,0.55)",
                maxWidth: "380px",
                marginBottom: "28px",
              }}
            >
              A clear, collaborative process where you&apos;re involved at every
              milestone — no surprises, just results.
            </p>

            {/* What we build */}
            <p
              className="font-bold uppercase"
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.22em",
                color: "#B89DFF",
                marginBottom: "16px",
              }}
            >
              What We Build
            </p>
            <div
              className="flex flex-wrap justify-center"
              style={{ gap: "10px", maxWidth: "400px", marginBottom: "56px" }}
            >
              {[
                "AI Products",
                "Websites",
                "Web Apps",
                "SaaS Platforms",
                "MVPs",
              ].map((item) => (
                <span
                  key={item}
                  className="font-medium"
                  style={{
                    fontSize: "0.85rem",
                    padding: "8px 16px",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(160deg, rgba(142,92,255,0.14) 0%, rgba(18,14,30,0.55) 100%)",
                    border: "1px solid rgba(184,157,255,0.45)",
                    color: "#EDE4D7",
                    boxShadow: "0 0 12px rgba(142,92,255,0.3)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            <div style={{ maxWidth: "380px" }}>
              <HeaderWavePattern />
            </div>
          </motion.div>

          {/* RIGHT: Timeline */}
          <div
            className="relative"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {/* Vertical spine — runs the full height of the timeline */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "31px",
                top: "0",
                bottom: "0",
                width: "2px",
                background:
                  "linear-gradient(to bottom, rgba(184,157,255,0.0), rgba(184,157,255,0.55) 10%, rgba(184,157,255,0.55) 90%, rgba(184,157,255,0.0))",
                boxShadow: "0 0 10px rgba(142,92,255,0.6)",
              }}
            />

            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative flex"
                  style={{
                    gap: "26px",
                    marginBottom: i === steps.length - 1 ? 0 : "24px",
                    alignItems: "center",
                  }}
                >
                  {/* Numbered node + horizontal connector */}
                  <div
                    className="flex items-center flex-shrink-0 relative"
                    style={{ width: "100px" }}
                  >
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        background:
                          "radial-gradient(circle at 50% 50%, rgba(184,157,255,0.35) 0%, rgba(142,92,255,0.18) 55%, rgba(18,14,30,0.55) 100%)",
                        border: "1.5px solid rgba(184,157,255,0.75)",
                        boxShadow:
                          "0 0 22px rgba(142,92,255,0.6), 0 0 46px rgba(142,92,255,0.3), inset 0 0 12px rgba(184,157,255,0.35)",
                        position: "relative",
                        zIndex: 2,
                      }}
                    >
                      <span
                        className="font-display font-bold"
                        style={{
                          fontSize: "0.95rem",
                          color: "#EDE4D7",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {step.number}
                      </span>
                    </div>
                    {/* Horizontal connector line to card */}
                    <div
                      className="flex-1"
                      style={{
                        height: "2px",
                        marginLeft: "0px",
                        background:
                          "linear-gradient(90deg, rgba(184,157,255,0.7), rgba(184,157,255,0))",
                        boxShadow: "0 0 8px rgba(142,92,255,0.55)",
                      }}
                    />
                    {/* Small dot at end of connector */}
                    <div
                      style={{
                        position: "absolute",
                        right: "-2px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#B89DFF",
                        boxShadow: "0 0 10px rgba(184,157,255,0.9)",
                      }}
                    />
                  </div>

                  {/* Step card */}
                  <div
                    className="flex-1 relative overflow-hidden"
                    style={{
                      borderRadius: "18px",
                      padding: "12px 24px 14px",
                      background:
                        "linear-gradient(160deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
                      border: "1px solid rgba(142,92,255,0.22)",
                      backdropFilter: "blur(14px)",
                    }}
                  >
                    {/* Header row: icon + title + duration */}
                    <div
                      className="flex items-center"
                      style={{ gap: "20px" }}
                    >
                      {/* Neon square icon */}
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                          marginTop: "22px",
                          alignSelf: "flex-start",
                          width: "50px",
                          height: "50px",
                          borderRadius: "12px",
                          background:
                            "linear-gradient(160deg, rgba(184,157,255,0.35) 0%, rgba(142,92,255,0.18) 60%, rgba(18,14,30,0.4) 100%)",
                          border: "1.5px solid rgba(184,157,255,0.7)",
                          boxShadow:
                            "0 0 18px rgba(142,92,255,0.55), 0 0 38px rgba(142,92,255,0.3), inset 0 0 12px rgba(184,157,255,0.35)",
                        }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{
                            color: "#FFFFFF",
                            filter:
                              "drop-shadow(0 0 5px rgba(216,200,255,0.95)) drop-shadow(0 0 12px rgba(142,92,255,0.7))",
                          }}
                        />
                      </div>

                      <div
                        className="flex-1 flex items-center justify-between"
                        style={{ gap: "14px" }}
                      >
                        <div>
                          <h3
                            className="font-display font-bold"
                            style={{
                              fontSize: "1.25rem",
                              color: "#EDE4D7",
                              lineHeight: 1.15,
                            }}
                          >
                            {step.title}
                          </h3>
                        </div>
                        <span
                          className="font-bold uppercase flex-shrink-0"
                          style={{
                            fontSize: "0.72rem",
                            letterSpacing: "0.22em",
                            color: "#B89DFF",
                          }}
                        >
                          {step.duration}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        marginTop: "2px",
                        marginLeft: "70px",
                        fontSize: "0.88rem",
                        lineHeight: 1.5,
                        color: "rgba(237,228,215,0.6)",
                      }}
                    >
                      {step.description}
                    </p>

                    {/* Deliverable pills */}
                    <div
                      className="flex flex-wrap"
                      style={{
                        marginTop: "10px",
                        marginLeft: "70px",
                        gap: "8px",
                      }}
                    >
                      {step.deliverables.map((d) => {
                        const DIcon = d.icon;
                        return (
                          <span
                            key={d.label}
                            className="inline-flex items-center font-medium"
                            style={{
                              fontSize: "0.78rem",
                              padding: "7px 14px 7px 12px",
                              gap: "8px",
                              borderRadius: "999px",
                              background: "rgba(142,92,255,0.12)",
                              border: "1px solid rgba(142,92,255,0.35)",
                              color: "#D8C8FF",
                            }}
                          >
                            <DIcon
                              className="w-[14px] h-[14px]"
                              style={{
                                color: "#B89DFF",
                                filter:
                                  "drop-shadow(0 0 4px rgba(184,157,255,0.7))",
                              }}
                            />
                            {d.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
