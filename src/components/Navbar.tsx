"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * Nav links are real root-relative hrefs, not scroll-only buttons.
 *
 * They used to be `<button onClick={scrollIntoView}>` with bare hash targets,
 * which meant they carried no crawlable href and did nothing at all on any page
 * that wasn't the homepage. "Start a Project" pointed at `#contact` — an id that
 * exists nowhere in the document — so the primary navbar CTA was dead on every
 * page. Both are fixed here.
 */
const navLinks = [
  { label: "Offer", href: "/offer" },
  { label: "Work", href: "/#portfolio" },
  { label: "Process", href: "/#process" },
  { label: "For studios", href: "/partners" },
  { label: "FAQ", href: "/#faq" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080808]/80 backdrop-blur-xl border-b border-[#B89DFF]/10"
            : "bg-transparent"
        }`}
      >
        <div
          className="relative flex items-center"
          style={{
            width: "100%",
            height: "72px",
            paddingLeft: "clamp(20px, 4vw, 56px)",
            paddingRight: "clamp(20px, 4vw, 56px)",
          }}
        >
          {/* Logo — left */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Aelvora home">
            <div className="relative flex-shrink-0 w-9 h-9 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="Aelvora logo"
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <span className="text-xl font-display font-bold text-[#EDE4D7] tracking-tight">
              Aelvora
            </span>
          </Link>

          {/* Desktop nav links — absolutely centered */}
          <nav
            className="hidden md:flex items-center"
            aria-label="Main navigation"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              gap: "40px",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  className="relative block text-sm font-medium text-[#EDE4D7]/75 hover:text-[#EDE4D7] transition-colors duration-200 group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-[#8E5CFF] group-hover:w-full transition-all duration-300 ease-out" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA + hamburger — right */}
          <div
            className="flex items-center"
            style={{ marginLeft: "auto", gap: "16px" }}
          >
            <motion.a
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              href="/#book"
              data-cursor-magnetic
              className="hidden md:inline-flex items-center justify-center font-semibold uppercase"
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.18em",
                padding: "11px 22px",
                borderRadius: "10px",
                color: "#EDE4D7",
                background:
                  "linear-gradient(160deg, rgba(142,92,255,0.16) 0%, rgba(18,14,30,0.55) 100%)",
                border: "1.5px solid rgba(184,157,255,0.75)",
                boxShadow:
                  "0 0 14px rgba(142,92,255,0.55), 0 0 30px rgba(142,92,255,0.30), inset 0 0 10px rgba(184,157,255,0.25)",
                transition: "box-shadow 0.3s, transform 0.3s, border-color 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow =
                  "0 0 22px rgba(142,92,255,0.85), 0 0 48px rgba(142,92,255,0.45), inset 0 0 14px rgba(184,157,255,0.4)";
                el.style.borderColor = "#D8C8FF";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow =
                  "0 0 14px rgba(142,92,255,0.55), 0 0 30px rgba(142,92,255,0.30), inset 0 0 10px rgba(184,157,255,0.25)";
                el.style.borderColor = "rgba(184,157,255,0.75)";
                el.style.transform = "translateY(0)";
              }}
            >
              Start a Project
            </motion.a>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-[#EDE4D7] hover:text-[#8E5CFF] transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 52px) 36px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 52px) 36px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 52px) 36px)" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 bg-[#080808]/97 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-display font-bold text-[#EDE4D7]/80 hover:text-[#8E5CFF] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.4 }}
              className="mt-6"
            >
              <Link
                href="/#book"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center font-semibold uppercase"
                style={{
                  fontSize: "0.85rem",
                  letterSpacing: "0.18em",
                  padding: "14px 28px",
                  borderRadius: "10px",
                  color: "#0a0a0a",
                  background: "linear-gradient(135deg, #8E5CFF, #B89DFF)",
                }}
              >
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
