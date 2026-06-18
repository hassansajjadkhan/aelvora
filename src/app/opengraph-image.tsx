import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const alt =
  "Aelvora — AI SaaS Development Agency building custom AI products, SaaS platforms, and MVPs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#080808",
          backgroundImage:
            "radial-gradient(900px 600px at 78% 18%, rgba(142,92,255,0.45), rgba(8,8,8,0) 60%), radial-gradient(700px 500px at 10% 95%, rgba(184,157,255,0.22), rgba(8,8,8,0) 55%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              background: "linear-gradient(135deg, #8E5CFF, #D8C8FF)",
              marginRight: 18,
            }}
          />
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: "#EDE4D7",
              letterSpacing: "-0.01em",
            }}
          >
            {SITE_NAME}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "#EDE4D7",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            AI SaaS Development
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#B89DFF",
            }}
          >
            for ambitious founders
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "rgba(237,228,215,0.66)",
              maxWidth: 880,
              lineHeight: 1.4,
            }}
          >
            Custom AI products, LLM-powered tools, SaaS platforms & MVPs —
            shipped fast.
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 26, color: "rgba(184,157,255,0.85)" }}>
            aelvora.com
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(237,228,215,0.5)",
              border: "1px solid rgba(184,157,255,0.4)",
              borderRadius: 999,
              padding: "10px 22px",
            }}
          >
            SaaS · AI · MVP · Web
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
