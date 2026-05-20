"use client";

import { motion } from "framer-motion";
import { Share2, ExternalLink, Code2, Mail, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  Services: [
    { name: "SaaS Development", href: "#services" },
    { name: "MVP Development", href: "#services" },
    { name: "AI Tools", href: "#services" },
    { name: "Web Design", href: "#services" },
  ],
  Company: [
    { name: "Portfolio", href: "#portfolio" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#book" },
    { name: "Book a Call", href: "#book" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Share2, href: "https://twitter.com/aelvora", label: "Twitter" },
  { icon: ExternalLink, href: "https://linkedin.com/company/aelvora", label: "LinkedIn" },
  { icon: Code2, href: "https://github.com/aelvora", label: "GitHub" },
  { icon: Mail, href: "mailto:hello@aelvora.com", label: "Email" },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        background:
          "linear-gradient(180deg, #07050f 0%, #050309 100%)",
        overflow: "hidden",
      }}
    >
      {/* Top neon glow line */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(184,157,255,0.4) 30%, rgba(216,200,255,0.7) 50%, rgba(184,157,255,0.4) 70%, transparent 100%)",
          boxShadow: "0 0 14px rgba(142,92,255,0.5)",
        }}
      />

      {/* Soft background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1100px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(142,92,255,0.10) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div
        className="relative"
        style={{
          width: "100%",
          paddingLeft: "clamp(28px, 6vw, 96px)",
          paddingRight: "clamp(28px, 6vw, 96px)",
          paddingTop: "84px",
          paddingBottom: "40px",
          zIndex: 1,
        }}
      >
        {/* Top grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:[grid-template-columns:minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]"
          style={{
            gap: "48px",
            marginBottom: "56px",
          }}
        >
          {/* Brand block — logo top-left */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "22px",
              }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background:
                    "linear-gradient(160deg, rgba(184,157,255,0.28) 0%, rgba(142,92,255,0.15) 60%, rgba(18,14,30,0.4) 100%)",
                  border: "1.5px solid rgba(184,157,255,0.6)",
                  boxShadow:
                    "0 0 18px rgba(142,92,255,0.5), inset 0 0 12px rgba(184,157,255,0.25)",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Aelvora"
                  width={32}
                  height={32}
                  style={{
                    objectFit: "contain",
                    filter:
                      "drop-shadow(0 0 4px rgba(216,200,255,0.85))",
                  }}
                />
              </div>
              <span
                className="font-display font-bold"
                style={{
                  fontSize: "26px",
                  color: "#EDE4D7",
                  letterSpacing: "-0.01em",
                }}
              >
                Aelvora
              </span>
            </div>

            <p
              style={{
                fontSize: "0.95rem",
                color: "rgba(237,228,215,0.62)",
                lineHeight: 1.7,
                maxWidth: "340px",
                marginBottom: "28px",
              }}
            >
              Premium websites, AI products, and SaaS platforms for ambitious
              founders worldwide. Cinematic builds that ship.
            </p>

            {/* Get in touch CTA */}
            <a
              href="mailto:hello@aelvora.com"
              className="inline-flex items-center font-semibold"
              style={{
                gap: "10px",
                padding: "12px 20px",
                borderRadius: "12px",
                background:
                  "linear-gradient(160deg, rgba(142,92,255,0.12) 0%, rgba(18,14,30,0.55) 100%)",
                border: "1.5px solid rgba(184,157,255,0.55)",
                color: "#EDE4D7",
                fontSize: "0.88rem",
                boxShadow:
                  "0 0 12px rgba(142,92,255,0.4), inset 0 0 8px rgba(184,157,255,0.15)",
                marginBottom: "26px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#D8C8FF";
                el.style.boxShadow =
                  "0 0 22px rgba(142,92,255,0.7), inset 0 0 12px rgba(184,157,255,0.25)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(184,157,255,0.55)";
                el.style.boxShadow =
                  "0 0 12px rgba(142,92,255,0.4), inset 0 0 8px rgba(184,157,255,0.15)";
              }}
            >
              <Mail
                className="w-[16px] h-[16px]"
                style={{ color: "#B89DFF" }}
              />
              hello@aelvora.com
              <ArrowUpRight className="w-[14px] h-[14px]" />
            </a>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background:
                        "linear-gradient(160deg, rgba(142,92,255,0.12) 0%, rgba(18,14,30,0.55) 100%)",
                      border: "1px solid rgba(184,157,255,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#D8C8FF",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(184,157,255,0.85)";
                      el.style.boxShadow =
                        "0 0 14px rgba(142,92,255,0.6), inset 0 0 8px rgba(184,157,255,0.25)";
                      el.style.color = "#FFFFFF";
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(184,157,255,0.35)";
                      el.style.boxShadow = "none";
                      el.style.color = "#D8C8FF";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <Icon style={{ width: "16px", height: "16px" }} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i + 1) * 0.08 }}
            >
              <p
                className="font-bold uppercase"
                style={{
                  fontSize: "0.74rem",
                  letterSpacing: "0.22em",
                  color: "#B89DFF",
                  marginBottom: "24px",
                }}
              >
                {category}
              </p>
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
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      style={{
                        fontSize: "0.92rem",
                        color: "rgba(237,228,215,0.62)",
                        textDecoration: "none",
                        transition: "color 0.2s, text-shadow 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.color = "#FFFFFF";
                        el.style.textShadow =
                          "0 0 8px rgba(184,157,255,0.7)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.color = "rgba(237,228,215,0.62)";
                        el.style.textShadow = "none";
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Big brand wordmark */}
        <div
          style={{
            marginBottom: "32px",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <span
            aria-hidden="true"
            className="font-display font-bold select-none"
            style={{
              fontSize: "clamp(4rem, 14vw, 16rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              background:
                "linear-gradient(180deg, rgba(184,157,255,0.18) 0%, rgba(142,92,255,0.04) 70%, transparent 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AELVORA
          </span>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row"
          style={{
            paddingTop: "28px",
            borderTop: "1px solid rgba(184,157,255,0.15)",
            gap: "16px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontSize: "0.82rem",
              color: "rgba(237,228,215,0.45)",
            }}
          >
            © {year} Aelvora. All rights reserved. Crafted with care.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 16px",
              borderRadius: "999px",
              background: "rgba(142,92,255,0.10)",
              border: "1px solid rgba(184,157,255,0.30)",
            }}
          >
            <span
              style={{
                position: "relative",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#B89DFF",
                boxShadow:
                  "0 0 8px rgba(184,157,255,0.9), 0 0 16px rgba(142,92,255,0.6)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "0.82rem",
                color: "#D8C8FF",
                fontWeight: 500,
              }}
            >
              Available for new projects
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
