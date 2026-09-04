"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { FIT_YES, FIT_NO } from "@/lib/offer";

/**
 * Fit / not fit.
 *
 * Disqualifying the wrong buyer out loud is what makes the rest of the page
 * believable, and it keeps unqualified calls off the calendar — the same
 * problem the published price solves from the other side.
 */
export const FitSection = () => {
  const columns = [
    { heading: "This works if", items: FIT_YES, positive: true },
    { heading: "This doesn't work if", items: FIT_NO, positive: false },
  ];

  return (
    <section
      id="fit"
      aria-labelledby="fit-heading"
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
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col text-center"
          style={{ alignItems: "center", marginBottom: "52px" }}
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
            Fit
          </span>
          <h2
            id="fit-heading"
            className="font-display font-bold"
            style={{
              fontSize: "clamp(2rem, 3.6vw, 3.4rem)",
              lineHeight: 1.1,
              color: "#EDE4D7",
              marginBottom: "20px",
            }}
          >
            Is This{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg,#D8C8FF 0%, #B89DFF 45%, #8E5CFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              For You?
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
            A 21-day build only works under real conditions. Here they are, so
            neither of us wastes a call finding out.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "26px" }}
        >
          {columns.map((col) => (
            <motion.div
              key={col.heading}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              style={{
                borderRadius: "22px",
                padding: "32px 28px",
                background:
                  "linear-gradient(160deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
                border: "1px solid rgba(142,92,255,0.22)",
                backdropFilter: "blur(14px)",
              }}
            >
              <h3
                className="font-display font-bold"
                style={{
                  fontSize: "1.25rem",
                  color: col.positive ? "#EDE4D7" : "rgba(237,228,215,0.72)",
                  marginBottom: "22px",
                  lineHeight: 1.2,
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
                  gap: "14px",
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
                        style={{
                          color: "#B89DFF",
                          marginTop: "4px",
                          filter: "drop-shadow(0 0 4px rgba(184,157,255,0.7))",
                        }}
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
                        fontSize: "0.95rem",
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
