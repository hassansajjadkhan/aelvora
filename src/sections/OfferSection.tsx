"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { OwnerSupply } from "@/components/OwnerSupply";
import {
  OFFER_NAME,
  OFFER_DAYS,
  OFFER_PRICE,
  OFFER_INCLUDES,
  OFFER_EXCLUDES,
  OFFER_GUARANTEE,
} from "@/lib/offer";

/**
 * The offer card — fixes audit C3 (no price anywhere).
 *
 * Per spec §6 this is the one place on the homepage to spend visual emphasis:
 * it is the page's signature element and the only section that should read as
 * heavier than its neighbours. It uses the existing tokens — no new colour,
 * font, radius, or animation — and earns its weight through a stronger border,
 * a deeper surface, and scale.
 *
 * The exclusions are the strongest credibility signal on the page. They are
 * stated flatly and must not be softened.
 */
export const OfferSection = () => {
  return (
    <section
      id="offer"
      aria-labelledby="offer-heading"
      className="pt-32 md:pt-44 lg:pt-52 pb-24 md:pb-32 lg:pb-36 relative overflow-hidden"
      style={{
        background: "transparent",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Soft glow — same treatment the FAQ and close sections already use */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "22%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "520px",
          background:
            "radial-gradient(ellipse at center, rgba(142,92,255,0.12) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

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
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden"
          style={{
            borderRadius: "22px",
            border: "1.5px solid rgba(184,157,255,0.55)",
            background:
              "linear-gradient(160deg, rgba(142,92,255,0.16) 0%, rgba(18,14,30,0.75) 100%)",
            backdropFilter: "blur(14px)",
            boxShadow:
              "0 0 28px rgba(142,92,255,0.35), 0 0 70px rgba(142,92,255,0.18), inset 0 0 18px rgba(184,157,255,0.12)",
            padding: "clamp(28px, 5vw, 56px)",
          }}
        >
          {/* Headline row — name · days · price */}
          <div
            className="flex flex-wrap items-baseline"
            style={{ gap: "12px 20px", marginBottom: "10px" }}
          >
            <h2
              id="offer-heading"
              className="font-display font-bold"
              style={{
                fontSize: "clamp(1.9rem, 3.4vw, 3rem)",
                lineHeight: 1.1,
                color: "#EDE4D7",
              }}
            >
              {OFFER_NAME}
            </h2>
            <span
              className="font-display font-bold"
              style={{
                fontSize: "clamp(1.9rem, 3.4vw, 3rem)",
                lineHeight: 1.1,
                color: "rgba(237,228,215,0.35)",
              }}
              aria-hidden="true"
            >
              ·
            </span>
            <span
              className="font-display font-bold"
              style={{
                fontSize: "clamp(1.9rem, 3.4vw, 3rem)",
                lineHeight: 1.1,
                background:
                  "linear-gradient(135deg,#D8C8FF 0%, #B89DFF 45%, #8E5CFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {OFFER_DAYS} days
            </span>
          </div>

          <div style={{ marginBottom: "36px" }}>
            {OFFER_PRICE ? (
              <p
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(1.9rem, 3.4vw, 3rem)",
                  lineHeight: 1.1,
                  color: "#EDE4D7",
                }}
              >
                {OFFER_PRICE}
              </p>
            ) : (
              <OwnerSupply what="fixed price for the 21-day MVP" block />
            )}
          </div>

          {/* Two columns: included / not included */}
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "36px", marginBottom: "36px" }}
          >
            <div>
              <h3
                className="font-bold uppercase"
                style={{
                  fontSize: "0.74rem",
                  letterSpacing: "0.22em",
                  color: "#B89DFF",
                  marginBottom: "18px",
                }}
              >
                You get
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
                {OFFER_INCLUDES.map((item) => (
                  <li
                    key={item}
                    className="flex"
                    style={{ gap: "12px", alignItems: "flex-start" }}
                  >
                    <Check
                      className="w-[17px] h-[17px] flex-shrink-0"
                      style={{
                        color: "#B89DFF",
                        marginTop: "4px",
                        filter: "drop-shadow(0 0 4px rgba(184,157,255,0.7))",
                      }}
                      aria-hidden="true"
                    />
                    <span
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: 1.55,
                        color: "rgba(237,228,215,0.82)",
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className="font-bold uppercase"
                style={{
                  fontSize: "0.74rem",
                  letterSpacing: "0.22em",
                  color: "#B89DFF",
                  marginBottom: "18px",
                }}
              >
                Not included
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
                {OFFER_EXCLUDES.map((item) => (
                  <li
                    key={item}
                    className="flex"
                    style={{ gap: "12px", alignItems: "flex-start" }}
                  >
                    <X
                      className="w-[17px] h-[17px] flex-shrink-0"
                      style={{
                        color: "rgba(237,228,215,0.45)",
                        marginTop: "4px",
                      }}
                      aria-hidden="true"
                    />
                    <span
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: 1.55,
                        color: "rgba(237,228,215,0.55)",
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Guarantee + CTA */}
          <div
            className="flex flex-wrap items-center justify-between"
            style={{
              gap: "20px",
              paddingTop: "28px",
              borderTop: "1px solid rgba(184,157,255,0.25)",
            }}
          >
            <p
              className="font-semibold"
              style={{
                fontSize: "1rem",
                lineHeight: 1.5,
                color: "#EDE4D7",
                maxWidth: "26rem",
              }}
            >
              {OFFER_GUARANTEE}
            </p>

            <Link
              href="/offer"
              className="group inline-flex items-center font-bold"
              style={{
                padding: "16px 28px",
                gap: "10px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #8E5CFF, #B89DFF)",
                color: "#0a0a0a",
                fontSize: "0.95rem",
                boxShadow: "0 0 22px rgba(142,92,255,0.45)",
                transition: "box-shadow 0.3s, transform 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 0 32px rgba(142,92,255,0.75)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 0 22px rgba(142,92,255,0.45)";
                el.style.transform = "translateY(0)";
              }}
            >
              See the full scope
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
