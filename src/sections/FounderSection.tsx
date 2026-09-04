"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Code2, User } from "lucide-react";
import { OwnerSupply } from "@/components/OwnerSupply";
import { FOUNDER } from "@/lib/seo";

/**
 * The founder section.
 *
 * With the fabricated testimonials deleted, the founder *is* the proof — which
 * is why spec §5.2 §7 marks this section "NEW, not optional". Every field is
 * intentionally unfilled: a bio and a photo are claims about a real person and
 * can only come from that person, so they render as `[OWNER: supply]` markers
 * rather than anything invented.
 *
 * Fill `FOUNDER` in `lib/seo.ts` and the markers disappear.
 */
export const FounderSection = () => {
  const hasPhoto = FOUNDER.photo !== null;

  return (
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
          className="grid grid-cols-1 md:[grid-template-columns:minmax(0,240px)_minmax(0,1fr)]"
          style={{
            gap: "clamp(24px, 4vw, 48px)",
            alignItems: "start",
            borderRadius: "22px",
            padding: "clamp(26px, 4vw, 44px)",
            background:
              "linear-gradient(160deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
            border: "1px solid rgba(142,92,255,0.22)",
            backdropFilter: "blur(14px)",
          }}
        >
          {/* Photo */}
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {hasPhoto ? (
              <Image
                src={FOUNDER.photo!}
                alt={FOUNDER.photoAlt ?? FOUNDER.name ?? "Founder of Aelvora"}
                fill
                sizes="240px"
                className="object-cover"
              />
            ) : (
              <User
                className="w-12 h-12"
                style={{ color: "rgba(184,157,255,0.6)" }}
                aria-hidden="true"
              />
            )}
          </div>

          {/* Bio */}
          <div>
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
              {FOUNDER.name ?? <OwnerSupply what="founder name" />}
            </h2>

            <p
              style={{
                fontSize: "0.92rem",
                color: "rgba(184,157,255,0.85)",
                marginBottom: "20px",
              }}
            >
              {FOUNDER.role ?? <OwnerSupply what="role / title" />}
            </p>

            {FOUNDER.bio ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginBottom: "26px",
                }}
              >
                {FOUNDER.bio.map((para) => (
                  <p
                    key={para.slice(0, 40)}
                    style={{
                      fontSize: "1rem",
                      lineHeight: 1.7,
                      color: "rgba(237,228,215,0.7)",
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            ) : (
              <div style={{ marginBottom: "26px" }}>
                <OwnerSupply
                  what="3–4 sentence bio: what you've shipped, how long you've been building, why the 21-day model"
                  block
                />
              </div>
            )}

            {/* Real profile links only — never a placeholder URL */}
            <div className="flex flex-wrap" style={{ gap: "12px" }}>
              {FOUNDER.linkedin ? (
                <a
                  href={FOUNDER.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-semibold"
                  style={{
                    gap: "10px",
                    padding: "11px 18px",
                    borderRadius: "12px",
                    border: "1px solid rgba(184,157,255,0.45)",
                    background: "rgba(142,92,255,0.10)",
                    color: "#EDE4D7",
                    fontSize: "0.88rem",
                  }}
                >
                  <ExternalLink
                    className="w-[15px] h-[15px]"
                    style={{ color: "#B89DFF" }}
                    aria-hidden="true"
                  />
                  LinkedIn
                </a>
              ) : (
                <OwnerSupply what="personal LinkedIn URL" />
              )}

              {FOUNDER.github ? (
                <a
                  href={FOUNDER.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-semibold"
                  style={{
                    gap: "10px",
                    padding: "11px 18px",
                    borderRadius: "12px",
                    border: "1px solid rgba(184,157,255,0.45)",
                    background: "rgba(142,92,255,0.10)",
                    color: "#EDE4D7",
                    fontSize: "0.88rem",
                  }}
                >
                  <Code2
                    className="w-[15px] h-[15px]"
                    style={{ color: "#B89DFF" }}
                    aria-hidden="true"
                  />
                  GitHub
                </a>
              ) : (
                <OwnerSupply what="personal GitHub URL" />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
