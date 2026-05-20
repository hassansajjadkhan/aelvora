"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { CheckCircle2 } from "lucide-react";

const solutions = [
  {
    tag: "SaaS",
    tagColor: "#8E5CFF",
    title: "Custom SaaS Products",
    description:
      "End-to-end SaaS platforms built to scale. From auth and billing to real-time dashboards — systems that grow with your revenue.",
    benefits: ["Multi-tenant architecture", "Payment & subscription systems", "API-first design", "CI/CD & automated deployment"],
    gradient: "linear-gradient(135deg, rgba(142,92,255,0.18) 0%, rgba(216,200,255,0.06) 100%)",
    borderColor: "rgba(142,92,255,0.35)",
  },
  {
    tag: "AI",
    tagColor: "#B89DFF",
    title: "AI-Powered Tools",
    description:
      "We integrate cutting-edge LLMs and machine learning into products your users actually want — not gimmicks, real automation.",
    benefits: ["LLM integration & prompt engineering", "Custom fine-tuned models", "Vector search & RAG pipelines", "Real-time inference systems"],
    gradient: "linear-gradient(135deg, rgba(184,157,255,0.15) 0%, rgba(142,92,255,0.05) 100%)",
    borderColor: "rgba(184,157,255,0.35)",
  },
  {
    tag: "MVP",
    tagColor: "#D8C8FF",
    title: "Rapid MVP Development",
    description:
      "Turn your idea into a shippable product in weeks, not months. We focus ruthlessly on what matters to validate your market.",
    benefits: ["Lean feature scoping", "Investor-ready presentation layer", "Scalable codebase from day one", "Launch support & iteration"],
    gradient: "linear-gradient(135deg, rgba(216,200,255,0.12) 0%, rgba(184,157,255,0.04) 100%)",
    borderColor: "rgba(216,200,255,0.30)",
  },
  {
    tag: "Web",
    tagColor: "#8E5CFF",
    title: "Premium Web Experiences",
    description:
      "Websites that stop people mid-scroll. With 3D, motion, and micro-interactions built for performance and SEO.",
    benefits: ["3D scenes & GSAP animations", "Sub-second load times", "Full SEO architecture", "Motion design system"],
    gradient: "linear-gradient(135deg, rgba(142,92,255,0.18) 0%, rgba(216,200,255,0.06) 100%)",
    borderColor: "rgba(142,92,255,0.35)",
  },
];

export const SolutionSection = () => {
  return (
    <section className="w-full py-24 md:py-32 lg:py-40 relative overflow-hidden" style={{ background: "transparent" }}>
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: 600,
          height: 500,
          background: "radial-gradient(ellipse at bottom right, rgba(216,200,255,0.07) 0%, transparent 70%)",
        }}
      />

      <Container size="lg" className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(142,92,255,0.15)",
              border: "1px solid rgba(142,92,255,0.4)",
              color: "#B89DFF",
            }}
          >
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#EDE4D7] leading-[1.1] mb-5">
            Everything You Need<br />
            <span style={{ background: "linear-gradient(135deg,#D8C8FF,#8E5CFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              to Build &amp; Scale
            </span>
          </h2>
          <p className="text-[#EDE4D7]/60 text-lg leading-relaxed">
            Four focused service lines. One team. Relentlessly high standards.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid md:grid-cols-2 gap-5"
        >
          {solutions.map((sol) => (
            <motion.div
              key={sol.title}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="group relative overflow-hidden rounded-2xl p-8 md:p-10"
              style={{
                background: sol.gradient,
                border: `1px solid ${sol.borderColor}`,
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = sol.tagColor;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = sol.borderColor;
              }}
            >
              {/* Hover shimmer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(142,92,255,0.12) 0%, transparent 60%)" }}
              />

              <div className="relative z-10">
                <span
                  className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
                  style={{
                    background: `${sol.tagColor}20`,
                    border: `1px solid ${sol.tagColor}50`,
                    color: sol.tagColor,
                  }}
                >
                  {sol.tag}
                </span>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-[#EDE4D7] mb-4 leading-tight">
                  {sol.title}
                </h3>

                <p className="text-[#EDE4D7]/60 leading-relaxed mb-8">
                  {sol.description}
                </p>

                <ul className="space-y-3">
                  {sol.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-[#EDE4D7]/75">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: sol.tagColor }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
