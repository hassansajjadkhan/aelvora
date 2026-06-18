/**
 * Loading Screen Component
 * Elegant animated loading with logo
 */

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading - in production, replace with actual data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "#080808" }}
        >
          <div className="text-center flex flex-col items-center">
            {/* Logo image with pulse glow */}
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative mb-8"
              style={{ width: 120, height: 120 }}
            >
              {/* Glow ring */}
              <motion.div
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  inset: "-20px",
                  borderRadius: "50%",
                  background: "radial-gradient(ellipse at center, rgba(142,92,255,0.35) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <Image
                src="/logo.png"
                alt="Aelvora"
                width={120}
                height={120}
                style={{ objectFit: "contain" }}
                priority
              />
            </motion.div>

            {/* Brand name — intentionally NOT an <h1>; the hero owns the page H1 */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              aria-hidden="true"
              style={{
                fontSize: "24px",
                fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
                fontWeight: 700,
                color: "#EDE4D7",
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              Aelvora
            </motion.p>

            {/* Animated dots */}
            <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.12 }}
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#8E5CFF",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
