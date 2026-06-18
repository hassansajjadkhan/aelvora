"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/seo";

/** FAQPage structured data — answers stay eligible for AI/rich-result citations. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
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
      {/* JSON-LD for FAQ rich results / AI answer engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Soft glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "18%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "440px",
          background:
            "radial-gradient(ellipse at center, rgba(142,92,255,0.09) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10"
        style={{
          width: "100%",
          maxWidth: "880px",
          paddingLeft: "clamp(24px, 6vw, 48px)",
          paddingRight: "clamp(24px, 6vw, 48px)",
        }}
      >
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col text-center"
          style={{ alignItems: "center", marginBottom: "56px" }}
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
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="font-display font-bold"
            style={{
              fontSize: "clamp(2rem, 3.6vw, 3.4rem)",
              lineHeight: 1.1,
              color: "#EDE4D7",
              marginBottom: "20px",
            }}
          >
            AI SaaS Development,
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
              Questions Answered
            </span>
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "rgba(237,228,215,0.55)",
              maxWidth: "560px",
            }}
          >
            Everything founders ask before building an AI product or SaaS with us.
          </p>
        </motion.div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                style={{
                  borderRadius: "18px",
                  border: isOpen
                    ? "1px solid rgba(142,92,255,0.55)"
                    : "1px solid rgba(142,92,255,0.22)",
                  background:
                    "linear-gradient(160deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
                  backdropFilter: "blur(14px)",
                  overflow: "hidden",
                  transition: "border-color 0.3s",
                }}
              >
                <h3 style={{ margin: 0 }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex items-center justify-between w-full text-left"
                    style={{
                      gap: "18px",
                      padding: "22px 26px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#EDE4D7",
                      fontSize: "1.08rem",
                      fontWeight: 600,
                      fontFamily:
                        "var(--font-display, 'Clash Display', sans-serif)",
                    }}
                  >
                    <span>{faq.question}</span>
                    <span
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "rgba(142,92,255,0.14)",
                        border: "1px solid rgba(184,157,255,0.5)",
                        boxShadow: isOpen
                          ? "0 0 14px rgba(142,92,255,0.6)"
                          : "none",
                        transition: "box-shadow 0.3s, transform 0.3s",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      <Plus
                        className="w-4 h-4"
                        style={{ color: "#D8C8FF" }}
                      />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          padding: "0 26px 24px",
                          fontSize: "0.95rem",
                          lineHeight: 1.65,
                          color: "rgba(237,228,215,0.62)",
                        }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
