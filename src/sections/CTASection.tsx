"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { ArrowRight, Mail } from "lucide-react";

export const CTASection = () => {
  return (
    <section
      id="contact"
      className="w-full py-24 md:py-32 relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Glow orbs */}
      <div
        className="absolute -top-32 right-1/4 rounded-full blur-[100px] pointer-events-none"
        style={{ width: 400, height: 400, background: "rgba(142,92,255,0.18)" }}
      />
      <div
        className="absolute -bottom-32 left-1/4 rounded-full blur-[100px] pointer-events-none"
        style={{ width: 400, height: 400, background: "rgba(216,200,255,0.10)" }}
      />

      <Container size="md" className="relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          >
            <span
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-8"
              style={{
                background: "rgba(142,92,255,0.15)",
                border: "1px solid rgba(142,92,255,0.4)",
                color: "#B89DFF",
              }}
            >
              Ready to Build?
            </span>
          </motion.div>

          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] mb-6"
          >
            <span className="text-[#EDE4D7]">Your Next Big Thing</span>
            <br />
            <span style={{ background: "linear-gradient(135deg,#D8C8FF,#8E5CFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Starts Here
            </span>
          </motion.h2>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="text-lg text-[#EDE4D7]/60 mb-12 leading-relaxed max-w-lg mx-auto"
          >
            Whether you have a full brief or just an idea on a napkin — let&apos;s talk and figure out the path forward together.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#book"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });
              }}
              data-cursor-magnetic
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[#080808] group transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #8E5CFF, #B89DFF)",
                boxShadow: "0 0 0 rgba(142,92,255,0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(142,92,255,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 rgba(142,92,255,0)";
              }}
            >
              Book a Strategy Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="mailto:aelvoraio@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-[#EDE4D7] transition-all duration-300 group"
              style={{
                border: "1px solid rgba(184,157,255,0.35)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(142,92,255,0.7)";
                (e.currentTarget as HTMLElement).style.color = "#D8C8FF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(184,157,255,0.35)";
                (e.currentTarget as HTMLElement).style.color = "#EDE4D7";
              }}
            >
              <Mail className="w-5 h-5" style={{ color: "#B89DFF" }} />
              aelvoraio@gmail.com
            </a>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, delay: 0.3 } } }}
            className="mt-16 flex flex-wrap justify-center items-center gap-8"
          >
            {["48h response guarantee", "NDA available on request", "Fixed-price engagements"].map((item, i) => (
              <div key={item} className="flex items-center gap-4">
                {i > 0 && (
                  <span className="w-1 h-1 rounded-full" style={{ background: "rgba(184,157,255,0.3)" }} />
                )}
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "rgba(184,157,255,0.45)" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
