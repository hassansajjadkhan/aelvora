"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Code2, Mail } from "lucide-react";
import { FOUNDER, CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/seo";
import { OFFER_DAYS, STACK } from "@/lib/offer";

/**
 * "Who you're working with" (spec §5.2 §7).
 *
 * Renders one of two cards:
 *
 *   FOUNDER.name set  → a personal card: photo, name, role, bio, real profiles.
 *   FOUNDER.name null → the studio card below (current state, by owner choice).
 *
 * ── WHY THIS ISN'T `[OWNER: supply]` MARKERS ANY MORE ───────────────────────
 * It used to render five of them, live on production, while outreach was
 * landing in studio principals' inboxes. Every claim in the studio card below
 * is instead something the site already stands behind elsewhere: the work is
 * the work shown above it, the ownership terms are the terms on /offer, and the
 * stack is the stack in `lib/offer.ts`. No number is claimed, no team size is
 * implied, and no track record is invented.
 *
 * ── AND WHY THE PERSONAL CARD IS STILL THE BETTER PAGE ──────────────────────
 * With the fabricated testimonials gone, there is no third-party proof left on
 * this site. A named person with a history is the strongest thing that can go
 * here for the audience this page is written for. The studio card is honest and
 * it is not weak — but it is a company describing itself, which is the weakest
 * category of proof there is. Fill `FOUNDER` in `lib/seo.ts` and it upgrades.
 */

const cardStyle: React.CSSProperties = {
  borderRadius: "22px",
  padding: "clamp(26px, 4vw, 44px)",
  background:
    "linear-gradient(160deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
  border: "1px solid rgba(142,92,255,0.22)",
  backdropFilter: "blur(14px)",
};

const Eyebrow = () => (
  <span
    className="inline-block font-bold uppercase"
    style={{
      fontSize: "0.74rem",
      letterSpacing: "0.22em",
      color: "#B89DFF",
      marginBottom: "16px",
    }}
  >
    Who you&apos;re working with
  </span>
);

const linkStyle: React.CSSProperties = {
  gap: "10px",
  padding: "11px 18px",
  borderRadius: "12px",
  border: "1px solid rgba(184,157,255,0.45)",
  background: "rgba(142,92,255,0.10)",
  color: "#EDE4D7",
  fontSize: "0.88rem",
};

const Para = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontSize: "1rem",
      lineHeight: 1.75,
      color: "rgba(237,228,215,0.7)",
    }}
  >
    {children}
  </p>
);

/** Company card. Every claim is one the site already makes elsewhere. */
const StudioCard = () => (
  <div
    className="grid grid-cols-1 md:[grid-template-columns:minmax(0,240px)_minmax(0,1fr)]"
    style={{ gap: "clamp(24px, 4vw, 48px)", alignItems: "start", ...cardStyle }}
  >
    {/* Mark, in place of a portrait */}
    <div
      className="relative flex items-center justify-center"
      style={{
        width: "100%",
        maxWidth: "240px",
        aspectRatio: "1 / 1",
        borderRadius: "22px",
        border: "1.5px solid rgba(184,157,255,0.5)",
        background:
          "linear-gradient(160deg, rgba(184,157,255,0.18) 0%, rgba(18,14,30,0.6) 100%)",
        boxShadow: "0 0 22px rgba(142,92,255,0.35)",
      }}
    >
      <Image
        src="/logo.png"
        alt="Aelvora"
        width={96}
        height={96}
        sizes="96px"
        style={{
          objectFit: "contain",
          filter: "drop-shadow(0 0 8px rgba(216,200,255,0.55))",
        }}
      />
    </div>

    <div>
      <Eyebrow />

      <h2
        id="founder-heading"
        className="font-display font-bold"
        style={{
          fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
          lineHeight: 1.15,
          color: "#EDE4D7",
          marginBottom: "8px",
        }}
      >
        Aelvora
      </h2>

      <p
        style={{
          fontSize: "0.92rem",
          color: "rgba(184,157,255,0.85)",
          marginBottom: "22px",
        }}
      >
        AI product &amp; SaaS studio
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        <Para>
          We build AI products and SaaS platforms, and the work above is ours —
          scoped, built, deployed, and handed over. There is no separate delivery
          team you get passed to after the call: the people who scope it are the
          people who build it.
        </Para>
        <Para>
          Everything ships in your repository, on your infrastructure, under your
          accounts. No proprietary framework, no hosting you can only leave at a
          price, no licence to renew. When the {OFFER_DAYS} days are up you own
          the product outright — that&apos;s a term of the engagement, not a
          courtesy.
        </Para>
        <Para>
          The default stack is {STACK.slice(0, -1).join(", ")} and{" "}
          {STACK[STACK.length - 1]} — chosen because it ships quickly and because
          any developer you hire later can pick it up without us.
        </Para>
      </div>

      <div className="flex flex-wrap" style={{ gap: "12px" }}>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center font-semibold"
          style={linkStyle}
        >
          <Mail
            className="w-[15px] h-[15px]"
            style={{ color: "#B89DFF" }}
            aria-hidden="true"
          />
          {CONTACT_EMAIL}
        </a>

        {SOCIAL_LINKS.linkedin && (
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-semibold"
            style={linkStyle}
          >
            <ExternalLink
              className="w-[15px] h-[15px]"
              style={{ color: "#B89DFF" }}
              aria-hidden="true"
            />
            LinkedIn
          </a>
        )}

        <Link
          href="/offer"
          className="inline-flex items-center font-semibold"
          style={linkStyle}
        >
          How we work
        </Link>
      </div>
    </div>
  </div>
);

/** Personal card — used as soon as `FOUNDER.name` is set. */
const PersonCard = () => (
  <div
    className="grid grid-cols-1 md:[grid-template-columns:minmax(0,240px)_minmax(0,1fr)]"
    style={{ gap: "clamp(24px, 4vw, 48px)", alignItems: "start", ...cardStyle }}
  >
    <div
      className="relative overflow-hidden"
      style={{
        width: "100%",
        maxWidth: "240px",
        aspectRatio: "1 / 1",
        borderRadius: "22px",
        border: "1.5px solid rgba(184,157,255,0.5)",
        background:
          "linear-gradient(160deg, rgba(184,157,255,0.18) 0%, rgba(18,14,30,0.6) 100%)",
        boxShadow: "0 0 22px rgba(142,92,255,0.35)",
      }}
    >
      {FOUNDER.photo ? (
        <Image
          src={FOUNDER.photo}
          alt={FOUNDER.photoAlt ?? FOUNDER.name ?? "Founder of Aelvora"}
          fill
          sizes="240px"
          className="object-cover"
        />
      ) : (
        <Image
          src="/logo.png"
          alt="Aelvora"
          width={96}
          height={96}
          sizes="96px"
          style={{
            objectFit: "contain",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>

    <div>
      <Eyebrow />

      <h2
        id="founder-heading"
        className="font-display font-bold"
        style={{
          fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
          lineHeight: 1.15,
          color: "#EDE4D7",
          marginBottom: "8px",
        }}
      >
        {FOUNDER.name}
      </h2>

      {FOUNDER.role && (
        <p
          style={{
            fontSize: "0.92rem",
            color: "rgba(184,157,255,0.85)",
            marginBottom: "22px",
          }}
        >
          {FOUNDER.role}
        </p>
      )}

      {FOUNDER.bio && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          {FOUNDER.bio.map((para) => (
            <Para key={para.slice(0, 40)}>{para}</Para>
          ))}
        </div>
      )}

      <div className="flex flex-wrap" style={{ gap: "12px" }}>
        {FOUNDER.linkedin && (
          <a
            href={FOUNDER.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-semibold"
            style={linkStyle}
          >
            <ExternalLink
              className="w-[15px] h-[15px]"
              style={{ color: "#B89DFF" }}
              aria-hidden="true"
            />
            LinkedIn
          </a>
        )}
        {FOUNDER.github && (
          <a
            href={FOUNDER.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-semibold"
            style={linkStyle}
          >
            <Code2
              className="w-[15px] h-[15px]"
              style={{ color: "#B89DFF" }}
              aria-hidden="true"
            />
            GitHub
          </a>
        )}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center font-semibold"
          style={linkStyle}
        >
          <Mail
            className="w-[15px] h-[15px]"
            style={{ color: "#B89DFF" }}
            aria-hidden="true"
          />
          {CONTACT_EMAIL}
        </a>
      </div>
    </div>
  </div>
);

export const FounderSection = () => (
  <section
    id="founder"
    aria-labelledby="founder-heading"
    className="pt-32 md:pt-44 lg:pt-52 pb-24 md:pb-32 lg:pb-36 relative overflow-hidden"
    style={{
      background: "transparent",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <div
      className="relative z-10"
      style={{
        width: "100%",
        maxWidth: "1000px",
        paddingLeft: "clamp(20px, 6vw, 48px)",
        paddingRight: "clamp(20px, 6vw, 48px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        {FOUNDER.name ? <PersonCard /> : <StudioCard />}
      </motion.div>
    </div>
  </section>
);
