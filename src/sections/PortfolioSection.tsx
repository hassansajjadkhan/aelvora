"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  result: string;
  image: string;
};

const projects: Project[] = [
  {
    title: "Goali",
    category: "SaaS Platform",
    description:
      "Goal-tracking platform that turns long-term ambitions into daily, actionable habits.",
    tags: ["Next.js", "Tailwind", "Supabase"],
    result: "Higher follow-through",
    image: "/images/Goali/img 1.png",
  },
  {
    title: "WortGut",
    category: "Premium Web",
    description:
      "Cinematic brand site with motion-led storytelling and a polished, conversion-first flow.",
    tags: ["Next.js", "GSAP", "Framer Motion"],
    result: "Premium brand presence",
    image: "/images/WortGut/img1.png",
  },
  {
    title: "Dogar Farms",
    category: "Web Experience",
    description:
      "Modern farm & produce site with an editorial layout and a seamless ordering experience.",
    tags: ["Next.js", "Tailwind", "Sanity"],
    result: "Direct-to-consumer launch",
    image: "/images/dogarfarms/img3.png",
  },
  {
    title: "Savon AI",
    category: "AI Tool",
    description:
      "AI workflow product built around LLMs — natural inputs, structured automated outputs.",
    tags: ["Next.js", "OpenAI", "LangChain"],
    result: "AI-powered workflows",
    image: "/images/savonai/Screenshot (378).png",
  },
  {
    title: "Underfloor Heating",
    category: "Lead-Gen Site",
    description:
      "High-converting service site with calculators, trust signals, and a frictionless quote flow.",
    tags: ["Next.js", "Tailwind", "HubSpot"],
    result: "Boosted qualified leads",
    image: "/images/underfloor heating/Screenshot (297).png",
  },
  {
    title: "Woeftime",
    category: "Consumer App",
    description:
      "Playful consumer experience with bold visuals, smooth interactions, and rich micro-animation.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    result: "Engaging UX from day one",
    image: "/images/woeftime/Screenshot (423).png",
  },
];

export const PortfolioSection = () => {
  return (
    <section
      id="portfolio"
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
            Selected Work
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
            Projects We&apos;re
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
              Proud Of
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
            A small selection of recent builds — premium web, SaaS, and AI products
            shipped for ambitious teams.
          </p>
        </motion.div>

        {/* 3 × 2 grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "26px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="group relative overflow-hidden"
              style={{
                borderRadius: "22px",
                background:
                  "linear-gradient(160deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
                border: "1px solid rgba(142,92,255,0.22)",
                backdropFilter: "blur(14px)",
                transition: "border-color 0.3s, transform 0.3s",
                display: "flex",
                flexDirection: "column",
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
              {/* Image */}
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: "16 / 10",
                  background: "#0a0716",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Top fade for category readability */}
                <div
                  className="absolute inset-x-0 top-0 pointer-events-none"
                  style={{
                    height: "80px",
                    background:
                      "linear-gradient(to bottom, rgba(7,5,15,0.65), transparent)",
                  }}
                />
                {/* Bottom fade into card */}
                <div
                  className="absolute inset-x-0 bottom-0 pointer-events-none"
                  style={{
                    height: "80px",
                    background:
                      "linear-gradient(to top, rgba(18,14,30,0.85), transparent)",
                  }}
                />
                {/* Category pill */}
                <div className="absolute" style={{ top: "16px", left: "16px" }}>
                  <span
                    className="inline-block font-bold uppercase"
                    style={{
                      fontSize: "0.68rem",
                      letterSpacing: "0.2em",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      background: "rgba(7,5,15,0.6)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(184,157,255,0.4)",
                      color: "#D8C8FF",
                    }}
                  >
                    {project.category}
                  </span>
                </div>
                {/* Arrow on hover — neon */}
                <div
                  className="absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    bottom: "16px",
                    right: "16px",
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(184,157,255,0.4) 0%, rgba(142,92,255,0.25) 60%, rgba(18,14,30,0.6) 100%)",
                    border: "1.5px solid rgba(184,157,255,0.8)",
                    boxShadow:
                      "0 0 18px rgba(142,92,255,0.6), 0 0 38px rgba(142,92,255,0.35)",
                  }}
                >
                  <ArrowUpRight
                    className="w-4 h-4"
                    style={{
                      color: "#FFFFFF",
                      filter:
                        "drop-shadow(0 0 4px rgba(216,200,255,0.95))",
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "22px 26px 24px",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <h3
                  className="font-display font-bold"
                  style={{
                    fontSize: "1.25rem",
                    color: "#EDE4D7",
                    marginBottom: "8px",
                    lineHeight: 1.2,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.88rem",
                    lineHeight: 1.55,
                    color: "rgba(237,228,215,0.6)",
                    marginBottom: "16px",
                  }}
                >
                  {project.description}
                </p>

                <div
                  className="flex flex-wrap"
                  style={{ gap: "8px", marginBottom: "18px" }}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-medium"
                      style={{
                        fontSize: "0.72rem",
                        padding: "5px 11px",
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

                <div
                  className="flex items-center"
                  style={{
                    gap: "10px",
                    paddingTop: "14px",
                    marginTop: "auto",
                    borderTop: "1px solid rgba(142,92,255,0.18)",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#B89DFF",
                      boxShadow: "0 0 10px rgba(184,157,255,0.9)",
                    }}
                  />
                  <span
                    className="font-semibold"
                    style={{
                      fontSize: "0.8rem",
                      color: "#D8C8FF",
                    }}
                  >
                    {project.result}
                  </span>
                </div>
              </div>

              {/* Neon underline at bottom-left */}
              <div
                className="absolute pointer-events-none"
                style={{
                  left: "26px",
                  bottom: "10px",
                  width: "60px",
                  height: "3px",
                  borderRadius: "2px",
                  background:
                    "linear-gradient(90deg, #B89DFF, rgba(184,157,255,0))",
                  boxShadow: "0 0 14px rgba(184,157,255,0.85)",
                  zIndex: 2,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
