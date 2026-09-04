"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import {
  LEGAL_ENTITY,
  LEGAL_LAST_UPDATED,
  type LegalBlock,
  type LegalDoc,
} from "@/lib/legal";
import { CONTACT_EMAIL } from "@/lib/seo";

/**
 * Shared renderer for /privacy, /terms and /cookies.
 *
 * No new design tokens — this reuses the existing surface, border and type
 * treatments. Tables scroll inside their own container so a wide row never
 * makes the page itself scroll sideways at 360px.
 */

const Block = ({ block }: { block: LegalBlock }) => {
  switch (block.kind) {
    case "p":
      return (
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "rgba(237,228,215,0.72)",
          }}
        >
          {block.text}
        </p>
      );

    case "list":
      return (
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
          {block.items.map((item) => (
            <li
              key={item.slice(0, 40)}
              className="flex"
              style={{ gap: "12px", alignItems: "flex-start" }}
            >
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  marginTop: "10px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#B89DFF",
                  boxShadow: "0 0 8px rgba(184,157,255,0.8)",
                }}
              />
              <span
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "rgba(237,228,215,0.72)",
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        // Wide content scrolls inside its own container, never the page body.
        <div style={{ overflowX: "auto", width: "100%" }}>
          <table
            style={{
              width: "100%",
              minWidth: "520px",
              borderCollapse: "collapse",
              fontSize: "0.9rem",
            }}
          >
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th
                    key={h}
                    scope="col"
                    style={{
                      textAlign: "left",
                      padding: "12px 14px",
                      borderBottom: "1px solid rgba(184,157,255,0.35)",
                      color: "#B89DFF",
                      fontSize: "0.72rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|").slice(0, 60)}>
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      style={{
                        padding: "14px",
                        borderBottom: "1px solid rgba(142,92,255,0.15)",
                        color: "rgba(237,228,215,0.7)",
                        lineHeight: 1.6,
                        verticalAlign: "top",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "entity": {
      // Real registered details once known; an honest "ask us" until then.
      if (!LEGAL_ENTITY.name) {
        return (
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "rgba(237,228,215,0.72)",
            }}
          >
            {block.fallback}
          </p>
        );
      }
      return (
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "rgba(237,228,215,0.85)",
          }}
        >
          <strong>{LEGAL_ENTITY.name}</strong>
          {LEGAL_ENTITY.companyNumber && (
            <>
              <br />
              Company number {LEGAL_ENTITY.companyNumber}
            </>
          )}
          {LEGAL_ENTITY.address?.map((line) => (
            <span key={line}>
              <br />
              {line}
            </span>
          ))}
        </p>
      );
    }

    case "jurisdiction":
      return (
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "rgba(237,228,215,0.72)",
          }}
        >
          {LEGAL_ENTITY.jurisdiction ?? block.fallback}
        </p>
      );

    case "registration":
      // Nothing to say if there is no registration — say nothing.
      if (!LEGAL_ENTITY.dataProtectionRegistration) return null;
      return (
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "rgba(237,228,215,0.72)",
          }}
        >
          Our data protection registration number is{" "}
          {LEGAL_ENTITY.dataProtectionRegistration}.
        </p>
      );
  }
};

export const LegalPageClient = ({ doc }: { doc: LegalDoc }) => {
  const entityKnown = LEGAL_ENTITY.name !== null;

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
        <article
          style={{
            width: "100%",
            maxWidth: "820px",
            marginInline: "auto",
            paddingLeft: "clamp(20px, 6vw, 48px)",
            paddingRight: "clamp(20px, 6vw, 48px)",
            paddingTop: "clamp(48px, 8vw, 88px)",
            paddingBottom: "clamp(64px, 9vw, 110px)",
          }}
        >
          <h1
            className="font-display font-bold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.12,
              color: "#EDE4D7",
              marginBottom: "16px",
            }}
          >
            {doc.title}
          </h1>

          <p
            style={{
              fontSize: "0.85rem",
              color: "rgba(237,228,215,0.45)",
              marginBottom: "26px",
            }}
          >
            Last updated {LEGAL_LAST_UPDATED}
          </p>

          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.75,
              color: "rgba(237,228,215,0.8)",
              marginBottom: "44px",
            }}
          >
            {doc.intro}
          </p>

          {doc.sections.map((section) => (
            <section
              key={section.heading}
              style={{ marginBottom: "44px" }}
              aria-labelledby={section.heading.replace(/\W+/g, "-").toLowerCase()}
            >
              <h2
                id={section.heading.replace(/\W+/g, "-").toLowerCase()}
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)",
                  lineHeight: 1.2,
                  color: "#EDE4D7",
                  marginBottom: "20px",
                }}
              >
                {section.heading}
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}

          {/* Registered details, once supplied */}
          {entityKnown && (
            <section
              style={{
                borderRadius: "18px",
                padding: "24px 26px",
                background: "rgba(142,92,255,0.08)",
                border: "1px solid rgba(142,92,255,0.22)",
                marginBottom: "36px",
              }}
            >
              <h2
                className="font-bold uppercase"
                style={{
                  fontSize: "0.74rem",
                  letterSpacing: "0.22em",
                  color: "#B89DFF",
                  marginBottom: "14px",
                }}
              >
                Registered details
              </h2>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  color: "rgba(237,228,215,0.7)",
                }}
              >
                {LEGAL_ENTITY.name}
                {LEGAL_ENTITY.companyNumber && (
                  <>
                    <br />
                    Company number {LEGAL_ENTITY.companyNumber}
                  </>
                )}
                {LEGAL_ENTITY.address?.map((line) => (
                  <span key={line}>
                    <br />
                    {line}
                  </span>
                ))}
              </p>
            </section>
          )}

          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.75,
              color: "rgba(237,228,215,0.6)",
            }}
          >
            Questions about this page?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              style={{ color: "#D8C8FF", textDecoration: "underline" }}
            >
              {CONTACT_EMAIL}
            </a>
            . See also our{" "}
            {doc.slug !== "privacy" && (
              <>
                <Link
                  href="/privacy"
                  style={{ color: "#D8C8FF", textDecoration: "underline" }}
                >
                  Privacy Policy
                </Link>
                {doc.slug === "terms" ? " and " : ", "}
              </>
            )}
            {doc.slug !== "cookies" && (
              <>
                <Link
                  href="/cookies"
                  style={{ color: "#D8C8FF", textDecoration: "underline" }}
                >
                  Cookie Policy
                </Link>
                {doc.slug === "privacy" ? " and " : ""}
              </>
            )}
            {doc.slug !== "terms" && (
              <Link
                href="/terms"
                style={{ color: "#D8C8FF", textDecoration: "underline" }}
              >
                Terms of Service
              </Link>
            )}
            .
          </p>
        </article>

        <Footer />
      </main>
    </>
  );
};
