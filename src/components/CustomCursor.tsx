"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const magneticTargetRef = useRef<{ el: Element; rect: DOMRect } | null>(null);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Dot follows cursor exactly (tight spring feels instantaneous)
  const dotX = useSpring(rawX, { stiffness: 1000, damping: 60, mass: 0.1 });
  const dotY = useSpring(rawY, { stiffness: 1000, damping: 60, mass: 0.1 });

  // Ring follows with noticeable lag for the trailing effect
  const ringX = useSpring(rawX, { stiffness: 180, damping: 22, mass: 0.6 });
  const ringY = useSpring(rawY, { stiffness: 180, damping: 22, mass: 0.6 });

  useEffect(() => {
    // Don't activate on touch devices
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;

    const MAGNETIC_RADIUS = 80;

    const onMouseMove = (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;

      // Magnetic pull: if near a [data-cursor-magnetic] element, warp toward its center
      const magnetics = document.querySelectorAll("[data-cursor-magnetic]");
      let pulled = false;

      magnetics.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

        if (dist < MAGNETIC_RADIUS) {
          const strength = 1 - dist / MAGNETIC_RADIUS;
          x = x + (cx - x) * strength * 0.35;
          y = y + (cy - y) * strength * 0.35;
          magneticTargetRef.current = { el, rect };
          pulled = true;
        }
      });

      if (!pulled) magneticTargetRef.current = null;

      rawX.set(x);
      rawY.set(y);
      setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const handleHoverOn = () => setHovering(true);
    const handleHoverOff = () => setHovering(false);

    const INTERACTIVE = "a, button, [data-cursor-hover], input, textarea, select, label";

    const attachHoverListeners = () => {
      document.querySelectorAll(INTERACTIVE).forEach((el) => {
        el.addEventListener("mouseenter", handleHoverOn);
        el.addEventListener("mouseleave", handleHoverOff);
      });
    };

    attachHoverListeners();
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Re-attach when DOM updates (e.g. after Framer Motion animations mount new elements)
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      observer.disconnect();
    };
  }, [rawX, rawY]);

  return (
    <>
      {/* Outer ring — trails behind */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderStyle: "solid",
        }}
        animate={{
          width: hovering ? 52 : 36,
          height: hovering ? 52 : 36,
          opacity: visible ? 1 : 0,
          borderWidth: hovering ? 1.5 : 1,
          borderColor: hovering ? "#8E5CFF" : "#B89DFF",
          backgroundColor: hovering ? "rgba(142,92,255,0.08)" : "transparent",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />

      {/* Inner dot — snaps to cursor */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 6 : 7,
          height: hovering ? 6 : 7,
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.6 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};
