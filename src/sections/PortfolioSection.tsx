"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { ArrowUpRight } from "lucide-react";
import {
  featuredProjects,
  secondaryProjects,
  caseStudyHref,
  type CaseStudy,
} from "@/lib/case-studies";

/**
 * Selected work.
 *
 * Three projects lead — AI capability, measurable outcome, full SaaS build —
 * each linking to its case study. The other three are retained in a smaller
 * grid below, images and alt text intact (spec §5.2 §4: do not delete them).
 *
 * The "result" line is gone from every card. It used to read "Higher
 * follow-through", "Premium brand presence", "Boosted qualified leads" —
 * adjectives in the highest-value real estate on the page, carrying zero
 * information (audit H2). Spec §5.2 §4 is explicit: where no real figure
 * exists, delete the field rather than substitute an adjective. Real figures
 * go in `lib/case-studies.ts` → `result`, which also publishes the case study.
 *
 * `sizes` is now a fixed px tail rather than `33vw`. The grid is capped at
 * `max-w-7xl`, so a card is never wider than ~390px; `33vw` on a wide monitor
 * was resolving to ~845px and pulling the 1080w candidate (audit H5).
 */

const FEATURED_SIZES = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 390px";
const SECONDARY_SIZES = "(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 250px";

const ProjectCard = ({
  project,
  compact = false,
}: {
  project: CaseStudy;
  compact?: boolean;
}) => {
  const href = caseStudyHref(project);

  const card = (
    <div
      className="group relative overflow-hidden h-full"
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
        style={{ aspectRatio: "16 / 10", background: "#0a0716" }}
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes={compact ? SECONDARY_SIZES : FEATURED_SIZES}
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
        {/* Arrow on hover — only meaningful when the card is a link */}
        {href && (
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
                filter: "drop-shadow(0 0 4px rgba(216,200,255,0.95))",
              }}
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: compact ? "18px 20px 20px" : "22px 26px 24px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <h3
          className="font-display font-bold"
          style={{
            fontSize: compact ? "1.05rem" : "1.25rem",
            color: "#EDE4D7",
            marginBottom: "8px",
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontSize: compact ? "0.82rem" : "0.88rem",
            lineHeight: 1.55,
            color: "rgba(237,228,215,0.6)",
            marginBottom: "16px",
          }}
        >
          {project.summary}
        </p>

        <div
          className="flex flex-wrap"
          style={{ gap: "8px", marginTop: "auto" }}
        >
          {project.stack.map((tag) => (
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
          background: "linear-gradient(90deg, #B89DFF, rgba(184,157,255,0))",
          boxShadow: "0 0 14px rgba(184,157,255,0.85)",
          zIndex: 2,
        }}
      />
    </div>
  );

  // Only a published case study gets a link. No href is ever rendered to a
  // route that would 404.
  return href ? (
    <Link href={href} style={{ display: "block", height: "100%" }}>
      {card}
    </Link>
  ) : (
    card
  );
};

export const PortfolioSection = () => {
  const featured = featuredProjects();
  const secondary = secondaryProjects();

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
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
            id="portfolio-heading"
            className="font-display font-bold"
            style={{
              fontSize: "clamp(2rem, 3.6vw, 3.4rem)",
              lineHeight: 1.1,
              color: "#EDE4D7",
              marginBottom: "24px",
            }}
          >
            Things We&apos;ve
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
              Actually Shipped
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
            AI products, SaaS platforms, and the web work around them — built,
            deployed, and handed over.
          </p>
        </motion.div>

        {/* Featured three */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "26px" }}
        >
          {featured.map((project) => (
            <motion.div
              key={project.slug}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* The rest — retained, smaller */}
        <div style={{ marginTop: "72px" }}>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-bold uppercase text-center"
            style={{
              fontSize: "0.74rem",
              letterSpacing: "0.22em",
              color: "#B89DFF",
              marginBottom: "28px",
            }}
          >
            Also from the studio
          </motion.h3>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "20px", maxWidth: "980px", marginInline: "auto" }}
          >
            {secondary.map((project) => (
              <motion.div
                key={project.slug}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                <ProjectCard project={project} compact />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
