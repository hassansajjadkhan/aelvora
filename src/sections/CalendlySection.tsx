"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  Mail,
  ArrowRight,
  ShieldCheck,
  Lock,
  Send,
} from "lucide-react";

const CALENDLY_URL =
  "https://calendly.com/aelvoraio/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=1a1426&text_color=EDE4D7&primary_color=8E5CFF";

const stats = [
  { icon: Clock, big: "48H", label: "Response Guarantee" },
  { icon: ShieldCheck, big: "NDA", label: "Available on Request" },
  { icon: Lock, big: "Fixed-Price", label: "Engagements" },
];

const perks = [
  { icon: Clock, text: "30-minute focused session" },
  { icon: Video, text: "Video call via Google Meet" },
  { icon: Calendar, text: "Flexible scheduling, any timezone" },
  { icon: CheckCircle2, text: "Free — no obligation whatsoever" },
];

export const CalendlySection = () => {
  return (
    <section
      id="book"
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
      {/* Soft purple background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(142,92,255,0.08) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10"
        style={{
          width: "100%",
          paddingLeft: "clamp(24px, 10vw, 180px)",
          paddingRight: "clamp(24px, 5vw, 80px)",
        }}
      >
        <div
          className="grid grid-cols-1 lg:[grid-template-columns:minmax(0,1fr)_minmax(0,1.15fr)]"
          style={{
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* LEFT column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            {/* Pill */}
            <span
              className="inline-block font-bold uppercase"
              style={{
                alignSelf: "flex-start",
                fontSize: "0.8rem",
                letterSpacing: "0.22em",
                padding: "10px 22px",
                borderRadius: "999px",
                background: "rgba(142,92,255,0.08)",
                border: "1.5px solid rgba(184,157,255,0.7)",
                color: "#EDE4D7",
                boxShadow:
                  "0 0 14px rgba(142,92,255,0.45), inset 0 0 10px rgba(184,157,255,0.18)",
                marginBottom: "36px",
              }}
            >
              Ready to Build?
            </span>

            {/* Heading */}
            <h2
              className="font-display font-bold"
              style={{
                fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
                lineHeight: 1.05,
                color: "#EDE4D7",
                marginBottom: "26px",
              }}
            >
              Your Next Big Thing
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
                Starts Here
              </span>
            </h2>

            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.65,
                color: "rgba(237,228,215,0.6)",
                maxWidth: "480px",
                marginBottom: "32px",
              }}
            >
              Whether you have a full brief or just an idea on a napkin —
              let&apos;s talk and figure out the path forward together.
            </p>

            {/* Two CTAs */}
            <div
              className="flex flex-wrap"
              style={{ gap: "14px", marginBottom: "30px" }}
            >
              <button
                onClick={() =>
                  document
                    .querySelector("#book")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center font-semibold"
                style={{
                  padding: "14px 22px",
                  gap: "12px",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #8E5CFF 0%, #B89DFF 100%)",
                  color: "#0a0716",
                  fontSize: "0.95rem",
                  boxShadow:
                    "0 0 22px rgba(142,92,255,0.55), 0 0 44px rgba(142,92,255,0.3)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow =
                    "0 0 28px rgba(142,92,255,0.8), 0 0 56px rgba(142,92,255,0.45)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow =
                    "0 0 22px rgba(142,92,255,0.55), 0 0 44px rgba(142,92,255,0.3)";
                }}
              >
                <Calendar className="w-[18px] h-[18px]" />
                Book a Strategy Call
                <ArrowRight className="w-[16px] h-[16px] group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="mailto:hello@aelvora.com"
                className="inline-flex items-center font-semibold"
                style={{
                  padding: "14px 22px",
                  gap: "12px",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(160deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
                  border: "1.5px solid rgba(184,157,255,0.5)",
                  color: "#EDE4D7",
                  fontSize: "0.95rem",
                  boxShadow:
                    "0 0 10px rgba(142,92,255,0.3), inset 0 0 8px rgba(184,157,255,0.15)",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#D8C8FF";
                  el.style.boxShadow =
                    "0 0 18px rgba(142,92,255,0.55), inset 0 0 12px rgba(184,157,255,0.25)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(184,157,255,0.5)";
                  el.style.boxShadow =
                    "0 0 10px rgba(142,92,255,0.3), inset 0 0 8px rgba(184,157,255,0.15)";
                }}
              >
                <Mail className="w-[18px] h-[18px]" style={{ color: "#B89DFF" }} />
                hello@aelvora.com
              </a>
            </div>

            {/* Stat row */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3"
              style={{
                gap: "10px",
                padding: "14px",
                borderRadius: "16px",
                background:
                  "linear-gradient(160deg, rgba(142,92,255,0.08) 0%, rgba(18,14,30,0.55) 100%)",
                border: "1px solid rgba(142,92,255,0.22)",
                marginBottom: "48px",
              }}
            >
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.big}
                    className="flex items-center"
                    style={{ gap: "12px", padding: "8px 10px" }}
                  >
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background:
                          "linear-gradient(160deg, rgba(184,157,255,0.3) 0%, rgba(142,92,255,0.18) 60%, rgba(18,14,30,0.4) 100%)",
                        border: "1px solid rgba(184,157,255,0.55)",
                        boxShadow:
                          "0 0 10px rgba(142,92,255,0.5), inset 0 0 8px rgba(184,157,255,0.25)",
                      }}
                    >
                      <Icon
                        className="w-[18px] h-[18px]"
                        style={{
                          color: "#FFFFFF",
                          filter:
                            "drop-shadow(0 0 4px rgba(216,200,255,0.9))",
                        }}
                      />
                    </div>
                    <div>
                      <p
                        className="font-display font-bold"
                        style={{
                          fontSize: "0.95rem",
                          color: "#EDE4D7",
                          lineHeight: 1.1,
                        }}
                      >
                        {s.big}
                      </p>
                      <p
                        className="uppercase"
                        style={{
                          fontSize: "0.66rem",
                          letterSpacing: "0.14em",
                          color: "rgba(237,228,215,0.55)",
                          marginTop: "3px",
                        }}
                      >
                        {s.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* "Book a call" sub-section */}
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "40px", marginBottom: "32px" }}>
              <div>
                <span
                  className="font-bold uppercase"
                  style={{
                    fontSize: "0.74rem",
                    letterSpacing: "0.22em",
                    color: "#B89DFF",
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  Book a Call
                </span>
                <h3
                  className="font-display font-bold"
                  style={{
                    fontSize: "1.6rem",
                    lineHeight: 1.15,
                    color: "#EDE4D7",
                    marginBottom: "16px",
                  }}
                >
                  Let&apos;s Talk About
                  <br />
                  Your Project
                </h3>
                <p
                  style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                    color: "rgba(237,228,215,0.55)",
                  }}
                >
                  No sales pitch. Just an honest conversation about your goals,
                  your timeline, and whether we&apos;re the right team to help
                  you get there.
                </p>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {perks.map((p) => {
                  const Icon = p.icon;
                  return (
                    <li
                      key={p.text}
                      className="flex items-center"
                      style={{ gap: "14px" }}
                    >
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "50%",
                          background:
                            "radial-gradient(circle at 50% 50%, rgba(184,157,255,0.3) 0%, rgba(142,92,255,0.18) 55%, rgba(18,14,30,0.4) 100%)",
                          border: "1px solid rgba(184,157,255,0.55)",
                          boxShadow:
                            "0 0 10px rgba(142,92,255,0.45), inset 0 0 6px rgba(184,157,255,0.2)",
                        }}
                      >
                        <Icon
                          className="w-[16px] h-[16px]"
                          style={{
                            color: "#FFFFFF",
                            filter:
                              "drop-shadow(0 0 3px rgba(216,200,255,0.85))",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "0.92rem",
                          color: "rgba(237,228,215,0.78)",
                        }}
                      >
                        {p.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

          </motion.div>

          {/* RIGHT column — calendar + prefer-email stacked */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:[margin-top:180px]"
            style={{
              alignSelf: "start",
              justifySelf: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "26px",
              width: "fit-content",
              maxWidth: "100%",
            }}
          >
            {/* Glass-framed iframe */}
            <div
              style={{
                lineHeight: 0,
                borderRadius: "22px",
                overflow: "hidden",
                background:
                  "linear-gradient(160deg, rgba(40,32,60,0.55) 0%, rgba(26,20,38,0.65) 100%)",
                backdropFilter: "blur(22px) saturate(140%)",
                WebkitBackdropFilter: "blur(22px) saturate(140%)",
                border: "1px solid rgba(184,157,255,0.45)",
                boxShadow:
                  "0 0 28px rgba(142,92,255,0.35), 0 0 70px rgba(142,92,255,0.18), inset 0 0 18px rgba(184,157,255,0.12)",
              }}
            >
              <iframe
                src={CALENDLY_URL}
                width="420"
                height="600"
                frameBorder="0"
                title="Book a strategy call with Aelvora"
                style={{
                  display: "block",
                  background: "transparent",
                  border: "none",
                  colorScheme: "dark",
                  maxWidth: "100%",
                }}
              />
            </div>

            {/* Prefer email card — under the calendar */}
            <div
              className="flex items-center"
              style={{
                gap: "16px",
                padding: "18px 22px",
                borderRadius: "18px",
                background:
                  "linear-gradient(160deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
                border: "1px solid rgba(142,92,255,0.28)",
                width: "100%",
                maxWidth: "420px",
              }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background:
                    "linear-gradient(160deg, rgba(184,157,255,0.32) 0%, rgba(142,92,255,0.18) 60%, rgba(18,14,30,0.4) 100%)",
                  border: "1.5px solid rgba(184,157,255,0.65)",
                  boxShadow:
                    "0 0 14px rgba(142,92,255,0.5), inset 0 0 10px rgba(184,157,255,0.25)",
                }}
              >
                <Send
                  className="w-5 h-5"
                  style={{
                    color: "#FFFFFF",
                    filter:
                      "drop-shadow(0 0 4px rgba(216,200,255,0.9))",
                  }}
                />
              </div>
              <div>
                <p
                  className="font-bold uppercase"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.22em",
                    color: "#B89DFF",
                    marginBottom: "6px",
                  }}
                >
                  Prefer Email?
                </p>
                <a
                  href="mailto:hello@aelvora.com"
                  className="font-display font-semibold"
                  style={{
                    fontSize: "1rem",
                    color: "#EDE4D7",
                    display: "block",
                    lineHeight: 1.15,
                  }}
                >
                  hello@aelvora.com
                </a>
                <p
                  style={{
                    fontSize: "0.76rem",
                    color: "rgba(237,228,215,0.5)",
                    marginTop: "4px",
                  }}
                >
                  We typically reply within 24 hours
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
