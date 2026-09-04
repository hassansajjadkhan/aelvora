"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Tag,
  Eye,
  PenTool,
  Lock,
  KeyRound,
  LayoutDashboard,
  Server,
  BrainCircuit,
  Plug,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { ProjectForm } from "@/components/ProjectForm";
import { listenForCalendlyBooking } from "@/lib/analytics";
import {
  CALENDLY_PARTNER_URL,
  HAS_PARTNER_CALENDLY,
  CONTACT_EMAIL,
} from "@/lib/seo";
import { featuredProjects, caseStudyHref } from "@/lib/case-studies";

/**
 * /partners — Track B (spec §5.5).
 *
 * Written for one reader: the principal of an independent UK brand or identity
 * studio, 2–20 people, whose clients' actual product is software. They are not
 * looking for a developer. They are looking to stop turning down work without
 * risking the client relationship.
 *
 * This reader has never seen the homepage and must not need to. Nothing here
 * assumes it, and no link sends them there to understand something.
 *
 * The non-compete commitment (§4 below) is the load-bearing element of the
 * whole page: every objection a studio has reduces to that one.
 */

const HOW_IT_WORKS = [
  {
    icon: Tag,
    title: "White-label, under your brand",
    body: "We are your build team. Your client sees your studio delivering the work, start to finish.",
  },
  {
    icon: ShieldCheck,
    title: "You own the client",
    body: "The relationship is yours and stays yours. We have no contact with them and no claim on them.",
  },
  {
    icon: Lock,
    title: "Fixed price, your margin",
    body: "You get a fixed number for the build. What you quote your client on top of it is entirely your call.",
  },
  {
    icon: Eye,
    title: "Demos every three days",
    body: "You always have something to show and something to say, without having to ask us for a status update.",
  },
];

const WHAT_WE_BUILD = [
  { icon: KeyRound, label: "Authentication and user accounts" },
  { icon: LayoutDashboard, label: "Admin dashboards and client portals" },
  { icon: Server, label: "Backends and APIs behind an existing design" },
  { icon: BrainCircuit, label: "AI and LLM features" },
  { icon: Plug, label: "Third-party integrations" },
  { icon: PenTool, label: "Migrations off no-code platforms that hit a ceiling" },
];

const ENGAGEMENT_STEPS = [
  { step: "01", label: "You send the brief" },
  { step: "02", label: "We scope and quote within 48 hours" },
  { step: "03", label: "You quote your client" },
  { step: "04", label: "We build, with demos every three days" },
  { step: "05", label: "We hand over, you deliver" },
];

const sectionStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "1000px",
  marginInline: "auto",
  paddingLeft: "clamp(20px, 6vw, 48px)",
  paddingRight: "clamp(20px, 6vw, 48px)",
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
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
      marginBottom: "26px",
    }}
  >
    {children}
  </span>
);

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2
    id={id}
    className="font-display font-bold"
    style={{
      fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
      lineHeight: 1.12,
      color: "#EDE4D7",
      marginBottom: "22px",
    }}
  >
    {children}
  </h2>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontSize: "1.05rem",
      lineHeight: 1.75,
      color: "rgba(237,228,215,0.7)",
      maxWidth: "48rem",
    }}
  >
    {children}
  </p>
);

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.7 },
};

export const PartnersPageClient = () => {
  useEffect(() => listenForCalendlyBooking("partner"), []);

  const proof = featuredProjects();

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
        {/* ── 1 · Hero ───────────────────────────────────────────────────── */}
        <section
          style={{
            ...sectionStyle,
            paddingTop: "clamp(64px, 10vw, 120px)",
            paddingBottom: "clamp(48px, 7vw, 80px)",
          }}
        >
          <motion.div {...reveal}>
            <Eyebrow>For design studios</Eyebrow>
            <h1
              className="font-display font-bold tracking-tight"
              style={{
                fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)",
                lineHeight: 1.12,
                color: "#EDE4D7",
                marginBottom: "28px",
                maxWidth: "20ch",
              }}
            >
              Dev capacity for studios that{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg,#D8C8FF 0%, #B89DFF 45%, #8E5CFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                sell more than they can build.
              </span>
            </h1>
            <Body>
              You design the brand. Someone still has to build the product. We
              are that someone — under your name, on a fixed price, and without
              ever appearing in front of your client.
            </Body>
          </motion.div>
        </section>

        {/* ── 2 · The problem, in their language ─────────────────────────── */}
        <section
          aria-labelledby="problem-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(48px, 7vw, 88px)" }}
        >
          <motion.div {...reveal}>
            <H2 id="problem-heading">You know the conversation</H2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              <Body>
                A client you already have a good relationship with asks for a
                portal. Or a dashboard. Or a customer login, or an AI feature
                they read about last week. It sits just outside what your studio
                does, and it is attached to a project you want.
              </Body>
              <Body>
                So you either turn it down and watch it go somewhere that might
                keep the whole account, or you hand it to a developer you found
                three weeks ago and spend the next six weeks quietly anxious
                about work you can&apos;t see, can&apos;t explain, and can&apos;t
                fix. Neither of those is a good option. That is the entire
                problem we exist to remove.
              </Body>
            </div>
          </motion.div>
        </section>

        {/* ── 3 · How it works ───────────────────────────────────────────── */}
        <section
          aria-labelledby="how-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(48px, 7vw, 88px)" }}
        >
          <motion.div {...reveal}>
            <H2 id="how-heading">How it works</H2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ gap: "20px", marginTop: "16px" }}
          >
            {HOW_IT_WORKS.map(({ icon: Icon, title, body }) => (
              <motion.div
                key={title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                style={{
                  borderRadius: "22px",
                  padding: "26px 24px",
                  background:
                    "linear-gradient(160deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
                  border: "1px solid rgba(142,92,255,0.22)",
                  backdropFilter: "blur(14px)",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(160deg, rgba(184,157,255,0.32) 0%, rgba(142,92,255,0.18) 60%, rgba(18,14,30,0.4) 100%)",
                    border: "1.5px solid rgba(184,157,255,0.6)",
                    boxShadow: "0 0 14px rgba(142,92,255,0.45)",
                    marginBottom: "18px",
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{
                      color: "#FFFFFF",
                      filter: "drop-shadow(0 0 4px rgba(216,200,255,0.9))",
                    }}
                    aria-hidden="true"
                  />
                </div>
                <h3
                  className="font-display font-bold"
                  style={{
                    fontSize: "1.1rem",
                    color: "#EDE4D7",
                    marginBottom: "10px",
                    lineHeight: 1.25,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.65,
                    color: "rgba(237,228,215,0.62)",
                  }}
                >
                  {body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── 4 · The non-compete commitment ─────────────────────────────
            The load-bearing element of this page. Every objection a studio has
            reduces to this one, so it is stated in writing here, unqualified,
            rather than left for them to ask about. Visually distinct by design
            (spec §5.5 item 4) — the same emphasis treatment the homepage offer
            card uses, no new tokens.                                          */}
        <section
          aria-labelledby="noncompete-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(48px, 7vw, 88px)" }}
        >
          <motion.div
            {...reveal}
            style={{
              borderRadius: "22px",
              padding: "clamp(28px, 5vw, 52px)",
              border: "1.5px solid rgba(184,157,255,0.55)",
              background:
                "linear-gradient(160deg, rgba(142,92,255,0.16) 0%, rgba(18,14,30,0.75) 100%)",
              backdropFilter: "blur(14px)",
              boxShadow:
                "0 0 28px rgba(142,92,255,0.35), 0 0 70px rgba(142,92,255,0.18), inset 0 0 18px rgba(184,157,255,0.12)",
            }}
          >
            <div
              className="flex items-center"
              style={{ gap: "14px", marginBottom: "22px" }}
            >
              <ShieldCheck
                className="w-6 h-6 flex-shrink-0"
                style={{
                  color: "#FFFFFF",
                  filter: "drop-shadow(0 0 5px rgba(216,200,255,0.95))",
                }}
                aria-hidden="true"
              />
              <h2
                id="noncompete-heading"
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                  lineHeight: 1.15,
                  color: "#EDE4D7",
                }}
              >
                We will never contact your client
              </h2>
            </div>

            <p
              style={{
                fontSize: "1.15rem",
                lineHeight: 1.7,
                color: "#EDE4D7",
                fontWeight: 600,
                marginBottom: "18px",
                maxWidth: "46rem",
              }}
            >
              Not during the project. Not after it. Not for any reason.
            </p>
            <p
              style={{
                fontSize: "1.02rem",
                lineHeight: 1.75,
                color: "rgba(237,228,215,0.72)",
                maxWidth: "46rem",
              }}
            >
              No pitch, no follow-up, no &ldquo;just checking in&rdquo; a year
              later, no case study with their name on it without your written
              say-so. We do not approach them, and if they approach us we send
              them back to you. It goes in the contract, so you never have to
              raise it in a meeting and hope. Your client relationship is the
              asset you have spent years building; subcontracting a dashboard
              should not put it at risk.
            </p>
          </motion.div>
        </section>

        {/* ── 5 · What we build ──────────────────────────────────────────── */}
        <section
          aria-labelledby="build-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(48px, 7vw, 88px)" }}
        >
          <motion.div {...reveal}>
            <H2 id="build-heading">What we build</H2>
            <Body>
              The gaps studios actually hit — the things a brand project turns
              out to need three weeks in.
            </Body>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{
              listStyle: "none",
              padding: 0,
              margin: "28px 0 0",
              gap: "14px",
            }}
          >
            {WHAT_WE_BUILD.map(({ icon: Icon, label }) => (
              <motion.li
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="flex items-center"
                style={{
                  gap: "14px",
                  padding: "16px 20px",
                  borderRadius: "14px",
                  background: "rgba(142,92,255,0.08)",
                  border: "1px solid rgba(142,92,255,0.22)",
                }}
              >
                <Icon
                  className="w-[18px] h-[18px] flex-shrink-0"
                  style={{
                    color: "#B89DFF",
                    filter: "drop-shadow(0 0 4px rgba(184,157,255,0.7))",
                  }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    fontSize: "0.98rem",
                    lineHeight: 1.5,
                    color: "rgba(237,228,215,0.82)",
                  }}
                >
                  {label}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </section>

        {/* ── 6 · We build from your designs ─────────────────────────────── */}
        <section
          aria-labelledby="designs-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(48px, 7vw, 88px)" }}
        >
          <motion.div {...reveal}>
            <H2 id="designs-heading">We build from your designs</H2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              <Body>
                You send Figma. We build it faithfully — your spacing, your type
                scale, your components, your intent. We are not going to
                &ldquo;improve&rdquo; your work on the way through, and we are
                not going to hand back something that looks like a developer
                interpreted it from memory.
              </Body>
              <Body>
                Where a design genuinely can&apos;t survive contact with real
                data — a table with forty rows, an empty state you didn&apos;t
                draw, a field a user can break — we come back to you with the
                problem and a suggestion. You decide. It is your design system,
                and it stays that way.
              </Body>
            </div>
          </motion.div>
        </section>

        {/* ── 7 · Proof ─────────────────────────────────────────────────── */}
        <section
          aria-labelledby="proof-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(48px, 7vw, 88px)" }}
        >
          <motion.div {...reveal}>
            <H2 id="proof-heading">What that looks like built</H2>
            <Body>
              Three projects, framed by capability rather than client win — the
              kind of thing that sits behind a brand you might have designed.
            </Body>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "20px", marginTop: "28px" }}
          >
            {proof.map((project) => {
              const href = caseStudyHref(project);
              const card = (
                <div
                  className="group relative overflow-hidden h-full"
                  style={{
                    borderRadius: "22px",
                    background:
                      "linear-gradient(160deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
                    border: "1px solid rgba(142,92,255,0.22)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: "16 / 10", background: "#0a0716" }}
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 310px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div
                    style={{
                      padding: "20px 22px 22px",
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    <h3
                      className="font-display font-bold"
                      style={{
                        fontSize: "1.05rem",
                        color: "#EDE4D7",
                        marginBottom: "8px",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: 1.55,
                        color: "rgba(237,228,215,0.6)",
                        marginBottom: "14px",
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
                    {href && (
                      <span
                        className="inline-flex items-center font-semibold"
                        style={{
                          gap: "6px",
                          marginTop: "16px",
                          fontSize: "0.85rem",
                          color: "#D8C8FF",
                        }}
                      >
                        Read the case study
                        <ArrowUpRight className="w-[14px] h-[14px]" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={project.slug}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                >
                  {href ? (
                    <Link href={href} style={{ display: "block", height: "100%" }}>
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* ── 8 · How an engagement runs ─────────────────────────────────── */}
        <section
          aria-labelledby="engagement-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(48px, 7vw, 88px)" }}
        >
          <motion.div {...reveal}>
            <H2 id="engagement-heading">How an engagement runs</H2>
            <Body>
              Five steps, no unknowns. You always know what happens next and what
              to tell your client.
            </Body>

            <ol
              style={{
                listStyle: "none",
                padding: 0,
                margin: "28px 0 0",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {ENGAGEMENT_STEPS.map(({ step, label }) => (
                <li
                  key={step}
                  className="flex items-center"
                  style={{
                    gap: "18px",
                    padding: "16px 20px",
                    borderRadius: "14px",
                    background: "rgba(142,92,255,0.08)",
                    border: "1px solid rgba(142,92,255,0.22)",
                  }}
                >
                  <span
                    className="font-display font-bold flex-shrink-0"
                    style={{
                      fontSize: "0.85rem",
                      color: "#B89DFF",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {step}
                  </span>
                  <span
                    style={{
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      color: "rgba(237,228,215,0.82)",
                    }}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ol>
          </motion.div>
        </section>

        {/* ── 9 · CTA ───────────────────────────────────────────────────── */}
        <section
          id="book"
          aria-labelledby="partner-cta-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(64px, 9vw, 120px)" }}
        >
          <motion.div {...reveal}>
            <Eyebrow>Next step</Eyebrow>
            <h2
              id="partner-cta-heading"
              className="font-display font-bold"
              style={{
                fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
                lineHeight: 1.12,
                color: "#EDE4D7",
                marginBottom: "20px",
              }}
            >
              {HAS_PARTNER_CALENDLY
                ? "Fifteen minutes is enough"
                : "One short call is enough"}
            </h2>
            <Body>
              You&apos;re buying capacity, not a vision, so there is no deck and
              no discovery workshop. Tell us what you keep turning down, and
              we&apos;ll tell you straight whether we can build it. If you have
              a live brief, send it and we&apos;ll come back with a scope and a
              number within 48 hours.
            </Body>
          </motion.div>

          <motion.div
            {...reveal}
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{ gap: "26px", marginTop: "36px", alignItems: "start" }}
          >
            {/* Calendly */}
            <div
              id="calendly-embed"
              style={{
                lineHeight: 0,
                borderRadius: "22px",
                overflow: "hidden",
                background:
                  "linear-gradient(160deg, rgba(40,32,60,0.55) 0%, rgba(26,20,38,0.65) 100%)",
                border: "1px solid rgba(184,157,255,0.45)",
                boxShadow:
                  "0 0 28px rgba(142,92,255,0.35), 0 0 70px rgba(142,92,255,0.18)",
                width: "100%",
              }}
            >
              <iframe
                src={CALENDLY_PARTNER_URL}
                width="100%"
                height="600"
                title="Book a call with Aelvora about studio build capacity"
                style={{
                  display: "block",
                  background: "transparent",
                  border: "none",
                  colorScheme: "dark",
                  maxWidth: "100%",
                }}
              />
            </div>

            {/* Form — the lower-friction path for anyone not ready to book */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <ProjectForm
                funnelTrack="partner"
                heading="Or send the brief"
                blurb="Two lines is plenty. We'll come back with a scope and a fixed number within 48 hours — no call needed first."
                messageLabel="What does the client need?"
                messagePlaceholder="e.g. a client portal behind a brand we've just designed, login plus a dashboard, Figma is ready."
              />
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  color: "rgba(237,228,215,0.5)",
                }}
              >
                Prefer email?{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  style={{ color: "#D8C8FF", textDecoration: "underline" }}
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </motion.div>

          {!HAS_PARTNER_CALENDLY && (
            <p
              style={{
                marginTop: "20px",
                fontSize: "0.85rem",
                lineHeight: 1.6,
                color: "rgba(237,228,215,0.45)",
              }}
            >
              {/*
                The 15-minute partner event type does not exist in Calendly yet,
                so this embeds the 30-minute one and the copy above does not
                claim otherwise. Create it, set CALENDLY_PARTNER_SLUG in
                lib/seo.ts, and both the embed and the heading switch over.
              */}
              <Calendar
                className="w-[13px] h-[13px] inline-block"
                style={{ marginRight: "6px", verticalAlign: "-1px" }}
                aria-hidden="true"
              />
              Booking uses the standard call slot for now.
            </p>
          )}
        </section>

        <Footer />
      </main>
    </>
  );
};
