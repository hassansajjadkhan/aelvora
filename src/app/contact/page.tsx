"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { Container } from "@/components/Container";
import { Send, Mail, MapPin, Clock } from "lucide-react";

const CALENDLY_URL =
  "https://calendly.com/aelvoraio/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=080808&text_color=EDE4D7&primary_color=8E5CFF";

const projectTypes = [
  "Premium Website",
  "SaaS Platform",
  "AI Tool / Integration",
  "MVP Development",
  "Other",
];

const budgets = [
  "< $5K",
  "$5K – $15K",
  "$15K – $30K",
  "$30K – $60K",
  "$60K+",
];

type FormState = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission — wire to your backend/Formspree/Resend here
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-white/[0.04] border border-muted-lavender/20 rounded-xl px-4 py-3.5 text-sm text-warm-beige placeholder:text-muted-lavender/40 focus:outline-none focus:border-rich-purple/70 focus:bg-rich-purple/5 transition-all duration-300";

  const labelClass = "block text-xs font-semibold text-muted-lavender/70 uppercase tracking-widest mb-2";

  return (
    <>
      <NoiseOverlay />
      <Navbar />

      <main className="w-full bg-[#080808] pt-28 pb-0">
        {/* Page hero */}
        <section className="relative overflow-hidden pb-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-rich-purple/10 rounded-full blur-[120px] pointer-events-none" />
          <Container size="lg" className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-sm font-semibold text-rich-purple uppercase tracking-[0.15em] mb-5 block">
                Get In Touch
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-warm-beige leading-[1.1] mb-6">
                Let&apos;s Build<br />
                <span className="bg-gradient-to-r from-rich-purple to-soft-lilac bg-clip-text text-transparent">
                  Something Great
                </span>
              </h1>
              <p className="text-lg text-warm-beige/60 max-w-xl mx-auto leading-relaxed">
                Tell us about your project. We read every message and respond within 24 hours.
              </p>
            </motion.div>
          </Container>
        </section>

        {/* Contact info strip */}
        <section className="border-y border-muted-lavender/10 py-8">
          <Container size="lg">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-8">
              {[
                { icon: Mail, label: "Email", value: "hello@aelvora.com", href: "mailto:hello@aelvora.com" },
                { icon: Clock, label: "Response Time", value: "Within 24 hours", href: null },
                { icon: MapPin, label: "We Work With", value: "Clients worldwide", href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rich-purple/10 border border-rich-purple/25 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-rich-purple" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-lavender/60 uppercase tracking-widest">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-semibold text-warm-beige hover:text-rich-purple transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-warm-beige">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Form + Calendly */}
        <section className="py-24 md:py-32">
          <Container size="lg">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl font-display font-bold text-warm-beige mb-2">
                  Send a Brief
                </h2>
                <p className="text-warm-beige/55 mb-10 text-sm leading-relaxed">
                  Prefer to write it out? Fill in the form and we&apos;ll get back to you with next steps.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-10 rounded-2xl border border-rich-purple/40 bg-rich-purple/5 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-rich-purple/20 border border-rich-purple/40 flex items-center justify-center mx-auto mb-5">
                      <Send className="w-6 h-6 text-rich-purple" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-warm-beige mb-2">Message Received!</h3>
                    <p className="text-warm-beige/60 text-sm">
                      We&apos;ll review your brief and reach out within 24 hours. In the meantime, feel free to book a call below.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Name *</label>
                        <input
                          name="name"
                          type="text"
                          required
                          placeholder="Alex Johnson"
                          value={form.name}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Email *</label>
                        <input
                          name="email"
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={form.email}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Company / Project Name</label>
                      <input
                        name="company"
                        type="text"
                        placeholder="Acme Inc."
                        value={form.company}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Project Type *</label>
                        <select
                          name="projectType"
                          required
                          value={form.projectType}
                          onChange={handleChange}
                          className={`${inputClass} appearance-none`}
                        >
                          <option value="" disabled>Select type…</option>
                          {projectTypes.map((t) => (
                            <option key={t} value={t} className="bg-[#0a0a0a]">{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Budget Range</label>
                        <select
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          className={`${inputClass} appearance-none`}
                        >
                          <option value="" disabled>Select range…</option>
                          {budgets.map((b) => (
                            <option key={b} value={b} className="bg-[#0a0a0a]">{b}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Tell us about your project *</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Describe your idea, goals, timeline, or any challenges you're facing…"
                        value={form.message}
                        onChange={handleChange}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      data-cursor-magnetic
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-rich-purple to-muted-lavender text-deep-black font-bold hover:shadow-glow-purple transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending…
                        </span>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>

              {/* Calendly embed */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <h2 className="text-3xl font-display font-bold text-warm-beige mb-2">
                  Book a Call
                </h2>
                <p className="text-warm-beige/55 mb-10 text-sm leading-relaxed">
                  Prefer to talk? Grab a free 30-minute strategy session at a time that works for you.
                </p>
                <div className="rounded-2xl overflow-hidden border border-muted-lavender/15 bg-[#0a0a0a]">
                  <iframe
                    src={CALENDLY_URL}
                    width="100%"
                    height="620"
                    frameBorder="0"
                    title="Book a call with Aelvora"
                    style={{ display: "block" }}
                  />
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        <Footer />
      </main>
    </>
  );
}
