"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { Quote, Star } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  content: string;
  avatar: string;
  avatarGradient: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Founder, TechFlow",
    content:
      "The team delivered our SaaS product in record time. Their expertise in architecture and scalability is exceptional. We went from MVP to $100K MRR in six months.",
    avatar: "SC",
    avatarGradient: "linear-gradient(135deg, #8E5CFF, #D8C8FF)",
  },
  {
    name: "Marcus Johnson",
    role: "CEO, StartupHub",
    content:
      "Working with Aelvora was transformative. They didn't just build our platform — they became strategic partners genuinely invested in our success.",
    avatar: "MJ",
    avatarGradient: "linear-gradient(135deg, #B89DFF, #8E5CFF)",
  },
  {
    name: "Elena Rodriguez",
    role: "CTO, DataVault",
    content:
      "From security to performance, they handled everything with precision. The codebase is clean, well-structured, and a genuine pleasure to maintain.",
    avatar: "ER",
    avatarGradient: "linear-gradient(135deg, #D8C8FF, #B89DFF)",
  },
  {
    name: "James Miller",
    role: "Founder, NeuralWrite",
    content:
      "Their AI integration work was phenomenal. They made complex LLM implementations feel simple. The final product far exceeded our expectations.",
    avatar: "JM",
    avatarGradient: "linear-gradient(135deg, #8E5CFF, #B89DFF)",
  },
  {
    name: "Lisa Park",
    role: "PM, CloudSync",
    content:
      "Fast execution, excellent communication, total attention to detail. They delivered our MVP weeks ahead of schedule and it's been rock solid since.",
    avatar: "LP",
    avatarGradient: "linear-gradient(135deg, #B89DFF, #D8C8FF)",
  },
  {
    name: "David Chen",
    role: "Founder, LuxeBrand",
    content:
      "The 3D animations on our website blew every client away. This team truly understands what premium digital experience means.",
    avatar: "DC",
    avatarGradient: "linear-gradient(135deg, #D8C8FF, #8E5CFF)",
  },
];

const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <div
    className="flex-shrink-0 relative overflow-hidden"
    style={{
      width: "380px",
      borderRadius: "22px",
      padding: "30px 30px 28px",
      background:
        "linear-gradient(160deg, rgba(142,92,255,0.10) 0%, rgba(18,14,30,0.55) 100%)",
      border: "1px solid rgba(142,92,255,0.22)",
      backdropFilter: "blur(14px)",
    }}
  >
    {/* Large ghosted quote mark */}
    <Quote
      className="absolute pointer-events-none"
      style={{
        top: "18px",
        right: "22px",
        width: "56px",
        height: "56px",
        color: "rgba(142,92,255,0.18)",
        transform: "scaleX(-1)",
      }}
    />

    {/* Star rating */}
    <div className="flex" style={{ gap: "4px", marginBottom: "16px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-[16px] h-[16px]"
          style={{
            color: "#B89DFF",
            fill: "#B89DFF",
            filter: "drop-shadow(0 0 4px rgba(184,157,255,0.7))",
          }}
        />
      ))}
    </div>

    {/* Quote */}
    <p
      style={{
        fontSize: "0.95rem",
        lineHeight: 1.65,
        color: "rgba(237,228,215,0.78)",
        marginBottom: "24px",
        minHeight: "120px",
      }}
    >
      &ldquo;{t.content}&rdquo;
    </p>

    {/* Author */}
    <div
      className="flex items-center"
      style={{
        gap: "14px",
        paddingTop: "18px",
        borderTop: "1px solid rgba(184,157,255,0.18)",
      }}
    >
      <div
        className="flex items-center justify-center flex-shrink-0 relative"
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: t.avatarGradient,
          border: "1.5px solid rgba(184,157,255,0.7)",
          boxShadow:
            "0 0 14px rgba(142,92,255,0.55), 0 0 28px rgba(142,92,255,0.3)",
        }}
      >
        <span
          className="font-display font-bold"
          style={{ fontSize: "0.85rem", color: "#080808" }}
        >
          {t.avatar}
        </span>
      </div>
      <div>
        <p
          className="font-semibold"
          style={{ fontSize: "0.92rem", color: "#EDE4D7", lineHeight: 1.25 }}
        >
          {t.name}
        </p>
        <p
          style={{
            fontSize: "0.78rem",
            color: "#B89DFF",
            marginTop: "2px",
          }}
        >
          {t.role}
        </p>
      </div>
    </div>

    {/* Bottom-left neon line */}
    <div
      className="absolute pointer-events-none"
      style={{
        left: "26px",
        bottom: "10px",
        width: "60px",
        height: "3px",
        borderRadius: "2px",
        background:
          "linear-gradient(90deg, #B89DFF, rgba(184,157,255,0))",
        boxShadow: "0 0 14px rgba(184,157,255,0.85)",
      }}
    />
  </div>
);

const MarqueeRow = ({
  items,
  reverse = false,
}: {
  items: Testimonial[];
  reverse?: boolean;
}) => {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
      <div
        className={`flex w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ gap: "22px" }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section
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
      {/* Soft center glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(142,92,255,0.10) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <Container size="xl" className="relative z-10">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col text-center"
          style={{
            maxWidth: "920px",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "64px",
            alignItems: "center",
          }}
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
            Social Proof
          </span>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(2rem, 3.6vw, 3.4rem)",
              lineHeight: 1.1,
              color: "#EDE4D7",
              marginBottom: "24px",
            }}
          >
            Clients Who
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
              Trust Us
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
            Real results from real founders who took the leap.
          </p>
        </motion.div>
      </Container>

      {/* Marquees (full-bleed) */}
      <div
        className="relative"
        style={{ width: "100%", zIndex: 1, display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {/* Left/right fade masks */}
        <div
          className="absolute left-0 top-0 h-full pointer-events-none"
          style={{
            width: "180px",
            background: "linear-gradient(to right, #07050f, transparent)",
            zIndex: 5,
          }}
        />
        <div
          className="absolute right-0 top-0 h-full pointer-events-none"
          style={{
            width: "180px",
            background: "linear-gradient(to left, #07050f, transparent)",
            zIndex: 5,
          }}
        />

        <MarqueeRow items={testimonials.slice(0, 3)} />
        <MarqueeRow items={testimonials.slice(3)} reverse />
      </div>
    </section>
  );
};
