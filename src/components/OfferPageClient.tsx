"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X, Calendar } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { ProjectForm } from "@/components/ProjectForm";
import { listenForCalendlyBooking } from "@/lib/analytics";
import { CALENDLY_FOUNDER_URL, CONTACT_EMAIL } from "@/lib/seo";
import {
  OFFER_NAME,
  OFFER_DAYS,
  OFFER_PRICE,
  OFFER_INCLUDES,
  OFFER_EXCLUDES,
  OFFER_GUARANTEE,
  PROCESS_STEPS,
  PAYMENT_TERMS,
  FIT_YES,
  FIT_NO,
} from "@/lib/offer";

/**
 * /offer — the full expansion of the homepage offer card (spec §5.4).
 *
 * Price at the top, not the bottom. Full scope in and out, deliverables by
 * window, payment terms, what happens when scope changes mid-build, and an
 * engagement-specific FAQ. This page should be capable of closing someone who
 * never speaks to us first, so every question that would otherwise need a call
 * is answered here.
 *
 * The engagement FAQ is rendered as plain content, not `FAQPage` schema: spec
 * §2.6 puts FAQPage on the homepage FAQ, and duplicating the markup across two
 * pages dilutes rather than helps.
 */

const ENGAGEMENT_FAQ: { q: string; a: string }[] = [
  {
    q: "What do you need from me before day 1?",
    a: "A clear sense of what the product does and who it's for, and someone on your side who can make a decision inside a day. That's it. You do not need a spec, wireframes, or a technical background — producing the brief is what days 1 to 3 are for.",
  },
  {
    q: "What if I want to change the scope mid-build?",
    a: "Tell us, and before anything is built we come back with what it costs in days and money. Small changes that fit inside the agreed scope we simply absorb — they're normal. Anything that genuinely grows the build gets quoted, and you decide whether it goes in now or after launch. What we will not do is quietly swallow it and hand you a late project, or quietly bill you for it afterwards.",
  },
  {
    q: "Is the price really fixed?",
    a: "Yes. It is fixed to the scope signed off on day 3, not to the calendar. If the build takes 27 days instead of 21 because we misjudged something, that is our cost, not yours.",
  },
  {
    q: "Who owns the code and the accounts?",
    a: "You do. We build in your repository, deploy to your infrastructure, and use your accounts for every third-party service. There is no lock-in of any kind — no proprietary framework, no hosting you can only leave at a price, no license.",
  },
  {
    q: "What happens after the 30 days of support?",
    a: "Nothing you have to act on. Your product keeps running, on your infrastructure, with your code. Most clients either move onto a retainer for ongoing feature work or take it in-house. Both are fine, and neither needs anything from us to unlock.",
  },
];

const sectionStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "1000px",
  marginInline: "auto",
  paddingLeft: "clamp(20px, 6vw, 48px)",
  paddingRight: "clamp(20px, 6vw, 48px)",
};

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.7 },
};

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

const BookCta = () => (
  <a
    href="#book"
    className="inline-flex items-center font-bold"
    style={{
      padding: "16px 28px",
      gap: "10px",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #8E5CFF, #B89DFF)",
      color: "#0a0a0a",
      fontSize: "0.95rem",
      boxShadow: "0 0 22px rgba(142,92,255,0.45)",
    }}
  >
    <Calendar className="w-[17px] h-[17px]" aria-hidden="true" />
    Book a call
  </a>
);

export const OfferPageClient = () => {
  useEffect(() => listenForCalendlyBooking("founder"), []);

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
        {/* ── Hero: price at the top ─────────────────────────────────────── */}
        <section
          style={{
            ...sectionStyle,
            paddingTop: "clamp(64px, 10vw, 120px)",
            paddingBottom: "clamp(40px, 6vw, 64px)",
          }}
        >
          <motion.div {...reveal}>
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
              The offer
            </span>

            <h1
              className="font-display font-bold tracking-tight"
              style={{
                fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)",
                lineHeight: 1.12,
                color: "#EDE4D7",
                marginBottom: "24px",
                maxWidth: "20ch",
              }}
            >
              {OFFER_NAME} in{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg,#D8C8FF 0%, #B89DFF 45%, #8E5CFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {OFFER_DAYS} days.
              </span>
            </h1>

            {/* No price set → omit it rather than render a placeholder. */}
            {OFFER_PRICE && (
              <div style={{ marginBottom: "26px" }}>
                <p
                  className="font-display font-bold"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    lineHeight: 1.05,
                    color: "#EDE4D7",
                  }}
                >
                  {OFFER_PRICE}
                </p>
              </div>
            )}

            {/*
              The lede changes with the price. Claiming the page tells you "what
              it costs" while the number is missing is a promise the page breaks
              in its own first paragraph.
            */}
            <Body>
              {OFFER_PRICE ? (
                <>
                  One fixed price, one fixed timeline, and a working product
                  deployed on your domain at the end of it. Everything below is
                  what you get, what you don&apos;t, and what it costs — so you
                  can decide without speaking to anyone first.
                </>
              ) : (
                <>
                  One fixed price, one fixed timeline, and a working product
                  deployed on your domain at the end of it. Everything below is
                  what you get, what you don&apos;t, and how the engagement runs.
                  Send a line about what you&apos;re building and you&apos;ll
                  have a number back within 48 hours.
                </>
              )}
            </Body>

            <div style={{ marginTop: "32px" }}>
              <BookCta />
            </div>
          </motion.div>
        </section>

        {/* ── Scope in / out ─────────────────────────────────────────────── */}
        <section
          aria-labelledby="scope-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(48px, 7vw, 88px)" }}
        >
          <motion.div {...reveal}>
            <H2 id="scope-heading">What&apos;s in, what&apos;s out</H2>
          </motion.div>

          <motion.div
            {...reveal}
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "26px", marginTop: "10px" }}
          >
            {[
              { heading: "You get", items: OFFER_INCLUDES, positive: true },
              { heading: "Not included", items: OFFER_EXCLUDES, positive: false },
            ].map((col) => (
              <div
                key={col.heading}
                style={{
                  borderRadius: "22px",
                  padding: "30px 26px",
                  background:
                    "linear-gradient(160deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
                  border: "1px solid rgba(142,92,255,0.22)",
                }}
              >
                <h3
                  className="font-bold uppercase"
                  style={{
                    fontSize: "0.74rem",
                    letterSpacing: "0.22em",
                    color: "#B89DFF",
                    marginBottom: "18px",
                  }}
                >
                  {col.heading}
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="flex"
                      style={{ gap: "12px", alignItems: "flex-start" }}
                    >
                      {col.positive ? (
                        <Check
                          className="w-[17px] h-[17px] flex-shrink-0"
                          style={{ color: "#B89DFF", marginTop: "4px" }}
                          aria-hidden="true"
                        />
                      ) : (
                        <X
                          className="w-[17px] h-[17px] flex-shrink-0"
                          style={{
                            color: "rgba(237,228,215,0.45)",
                            marginTop: "4px",
                          }}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        style={{
                          fontSize: "0.98rem",
                          lineHeight: 1.55,
                          color: col.positive
                            ? "rgba(237,228,215,0.82)"
                            : "rgba(237,228,215,0.55)",
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          <motion.p
            {...reveal}
            className="font-semibold"
            style={{
              marginTop: "26px",
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "#EDE4D7",
            }}
          >
            {OFFER_GUARANTEE}
          </motion.p>
        </section>

        {/* ── Deliverables by window ─────────────────────────────────────── */}
        <section
          aria-labelledby="timeline-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(48px, 7vw, 88px)" }}
        >
          <motion.div {...reveal}>
            <H2 id="timeline-heading">What lands, and when</H2>
            <Body>
              Every window is a real date counted from day one, not an estimate
              that slides.
            </Body>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                marginTop: "28px",
              }}
            >
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.number}
                  style={{
                    borderRadius: "18px",
                    padding: "22px 24px",
                    background: "rgba(142,92,255,0.08)",
                    border: "1px solid rgba(142,92,255,0.22)",
                  }}
                >
                  <div
                    className="flex flex-wrap items-baseline"
                    style={{ gap: "12px", marginBottom: "10px" }}
                  >
                    <h3
                      className="font-display font-bold"
                      style={{ fontSize: "1.15rem", color: "#EDE4D7" }}
                    >
                      {step.number} · {step.title}
                    </h3>
                    <span
                      className="font-bold uppercase"
                      style={{
                        fontSize: "0.72rem",
                        letterSpacing: "0.22em",
                        color: "#B89DFF",
                      }}
                    >
                      {step.window}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.98rem",
                      lineHeight: 1.65,
                      color: "rgba(237,228,215,0.7)",
                      marginBottom: "12px",
                    }}
                  >
                    {step.description}
                  </p>
                  <div className="flex flex-wrap" style={{ gap: "8px" }}>
                    {step.deliverables.map((d) => (
                      <span
                        key={d}
                        className="font-medium"
                        style={{
                          fontSize: "0.78rem",
                          padding: "6px 13px",
                          borderRadius: "999px",
                          background: "rgba(142,92,255,0.12)",
                          border: "1px solid rgba(142,92,255,0.32)",
                          color: "#D8C8FF",
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Payment terms ──────────────────────────────────────────────── */}
        <section
          aria-labelledby="terms-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(48px, 7vw, 88px)" }}
        >
          <motion.div {...reveal}>
            <H2 id="terms-heading">Payment terms</H2>
            <Body>
              Split across the three points where something real changes hands.
              Invoiced from a UK-registered business; NDA available on request.
            </Body>

            <div
              className="grid grid-cols-1 sm:grid-cols-3"
              style={{ gap: "16px", marginTop: "28px" }}
            >
              {PAYMENT_TERMS.map((term) => (
                <div
                  key={term.share}
                  style={{
                    borderRadius: "18px",
                    padding: "24px 22px",
                    background: "rgba(142,92,255,0.08)",
                    border: "1px solid rgba(142,92,255,0.22)",
                  }}
                >
                  <p
                    className="font-display font-bold"
                    style={{
                      fontSize: "2rem",
                      lineHeight: 1,
                      background:
                        "linear-gradient(160deg, #EDE4D7 0%, #B89DFF 55%, #8E5CFF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      marginBottom: "12px",
                    }}
                  >
                    {term.share}
                  </p>
                  <p
                    style={{
                      fontSize: "0.92rem",
                      lineHeight: 1.6,
                      color: "rgba(237,228,215,0.65)",
                    }}
                  >
                    {term.when}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Fit ────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="offer-fit-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(48px, 7vw, 88px)" }}
        >
          <motion.div {...reveal}>
            <H2 id="offer-fit-heading">Who this is for</H2>
          </motion.div>

          <motion.div
            {...reveal}
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "26px", marginTop: "10px" }}
          >
            {[
              { heading: "This works if", items: FIT_YES, positive: true },
              { heading: "This doesn't work if", items: FIT_NO, positive: false },
            ].map((col) => (
              <div
                key={col.heading}
                style={{
                  borderRadius: "22px",
                  padding: "30px 26px",
                  background:
                    "linear-gradient(160deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
                  border: "1px solid rgba(142,92,255,0.22)",
                }}
              >
                <h3
                  className="font-display font-bold"
                  style={{
                    fontSize: "1.15rem",
                    color: col.positive ? "#EDE4D7" : "rgba(237,228,215,0.72)",
                    marginBottom: "20px",
                  }}
                >
                  {col.heading}
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="flex"
                      style={{ gap: "12px", alignItems: "flex-start" }}
                    >
                      {col.positive ? (
                        <Check
                          className="w-[17px] h-[17px] flex-shrink-0"
                          style={{ color: "#B89DFF", marginTop: "4px" }}
                          aria-hidden="true"
                        />
                      ) : (
                        <X
                          className="w-[17px] h-[17px] flex-shrink-0"
                          style={{
                            color: "rgba(237,228,215,0.45)",
                            marginTop: "4px",
                          }}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        style={{
                          fontSize: "0.98rem",
                          lineHeight: 1.55,
                          color: col.positive
                            ? "rgba(237,228,215,0.82)"
                            : "rgba(237,228,215,0.55)",
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── Engagement FAQ ─────────────────────────────────────────────── */}
        <section
          aria-labelledby="offer-faq-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(48px, 7vw, 88px)" }}
        >
          <motion.div {...reveal}>
            <H2 id="offer-faq-heading">Before you book</H2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                marginTop: "10px",
              }}
            >
              {ENGAGEMENT_FAQ.map(({ q, a }) => (
                <div
                  key={q}
                  style={{
                    borderRadius: "18px",
                    padding: "24px 26px",
                    background: "rgba(142,92,255,0.08)",
                    border: "1px solid rgba(142,92,255,0.22)",
                  }}
                >
                  <h3
                    className="font-display font-bold"
                    style={{
                      fontSize: "1.08rem",
                      color: "#EDE4D7",
                      marginBottom: "10px",
                      lineHeight: 1.3,
                    }}
                  >
                    {q}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.98rem",
                      lineHeight: 1.7,
                      color: "rgba(237,228,215,0.68)",
                    }}
                  >
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Close ──────────────────────────────────────────────────────── */}
        <section
          id="book"
          aria-labelledby="offer-cta-heading"
          style={{ ...sectionStyle, paddingBottom: "clamp(64px, 9vw, 120px)" }}
        >
          <motion.div {...reveal}>
            <H2 id="offer-cta-heading">Start the 21 days</H2>
            <Body>
              Book a call, or send a couple of lines and we&apos;ll come back
              with a scope and a straight answer on whether this is the right
              shape for what you&apos;re building.
            </Body>
          </motion.div>

          <motion.div
            {...reveal}
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{ gap: "26px", marginTop: "36px", alignItems: "start" }}
          >
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
                src={CALENDLY_FOUNDER_URL}
                width="100%"
                height="600"
                title="Book a call with Aelvora about the 21-day AI product MVP"
                style={{
                  display: "block",
                  background: "transparent",
                  border: "none",
                  colorScheme: "dark",
                  maxWidth: "100%",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <ProjectForm funnelTrack="founder" />
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
        </section>

        <Footer />
      </main>
    </>
  );
};
