/**
 * GSAP Animation Utilities
 * Helper functions for common animation patterns
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animated text reveal animation
 * Reveals text word by word or character by character
 */
export const textReveal = (
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    stagger?: number;
    type?: "chars" | "words" | "lines";
  } = {}
) => {
  const {
    duration = 0.8,
    delay = 0,
    stagger = 0.02,
    type = "chars",
  } = options;

  return gsap.to(element, {
    opacity: 1,
    duration,
    delay,
    stagger,
  });
};

/**
 * Scroll-triggered reveal animation
 * Elements fade and slide up on scroll
 */
export const scrollReveal = (
  element: gsap.TweenTarget,
  options: {
    direction?: "up" | "down" | "left" | "right";
    distance?: number;
    duration?: number;
    delay?: number;
  } = {}
) => {
  const {
    direction = "up",
    distance = 50,
    duration = 0.8,
    delay = 0,
  } = options;

  const initialState: Record<string, any> = { opacity: 0 };
  const animateState: Record<string, any> = { opacity: 1 };

  // Set initial transform based on direction
  switch (direction) {
    case "up":
      initialState.y = distance;
      animateState.y = 0;
      break;
    case "down":
      initialState.y = -distance;
      animateState.y = 0;
      break;
    case "left":
      initialState.x = distance;
      animateState.x = 0;
      break;
    case "right":
      initialState.x = -distance;
      animateState.x = 0;
      break;
  }

  gsap.set(element, initialState);

  return gsap.to(element, {
    ...animateState,
    duration,
    delay,
    scrollTrigger: {
      trigger: element as Element,
      start: "top 80%",
      once: true,
    },
  });
};

/**
 * Parallax scroll animation
 * Creates depth effect with different scroll speeds
 */
export const parallax = (
  element: gsap.TweenTarget,
  speed: number = 0.5
) => {
  gsap.to(element, {
    y: () => window.innerHeight * speed,
    scrollTrigger: {
      trigger: element as Element,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      markers: false,
    },
  });
};

/**
 * Hover animation for interactive elements
 * Scales and glows on hover
 */
export const hoverScale = (
  element: HTMLElement,
  options: {
    scale?: number;
    duration?: number;
    glowColor?: string;
  } = {}
) => {
  const { scale = 1.05, duration = 0.3, glowColor = "rgba(142, 92, 255, 0.3)" } = options;

  const hoverTimeline = gsap.timeline({ paused: true });

  hoverTimeline.to(element, {
    scale,
    boxShadow: `0 0 30px ${glowColor}`,
    duration,
    ease: "power2.out",
  });

  element.addEventListener("mouseenter", () => hoverTimeline.play());
  element.addEventListener("mouseleave", () => hoverTimeline.reverse());

  return hoverTimeline;
};

/**
 * Section pin animation
 * Pins an element during scroll
 */
export const pinSection = (
  element: gsap.TweenTarget,
  options: {
    duration?: number;
  } = {}
) => {
  const { duration = 2 } = options;

  gsap.to(element, {
    scrollTrigger: {
      trigger: element as Element,
      pin: true,
      scrub: 1,
      start: "top center",
      end: `+=${window.innerHeight * duration}`,
      markers: false,
    },
  });
};

/**
 * Number counter animation
 * Animates numbers from 0 to target
 */
export const countTo = (
  element: HTMLElement,
  targetNumber: number,
  options: {
    duration?: number;
    delay?: number;
  } = {}
) => {
  const { duration = 2, delay = 0 } = options;
  const obj = { value: 0 };

  gsap.to(obj, {
    value: targetNumber,
    duration,
    delay,
    onUpdate: () => {
      element.textContent = Math.ceil(obj.value).toString();
    },
  });
};

/**
 * Stagger animation for lists
 */
export const staggerChildren = (
  container: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    staggerAmount?: number;
    direction?: "up" | "down" | "left" | "right";
  } = {}
) => {
  const {
    duration = 0.6,
    delay = 0,
    staggerAmount = 0.1,
    direction = "up",
  } = options;

  const children = gsap.utils.selector(container)("[data-animate]");

  const initialState: Record<string, any> = { opacity: 0 };
  const animateState: Record<string, any> = { opacity: 1 };

  switch (direction) {
    case "up":
      initialState.y = 40;
      animateState.y = 0;
      break;
    case "down":
      initialState.y = -40;
      animateState.y = 0;
      break;
    case "left":
      initialState.x = 40;
      animateState.x = 0;
      break;
    case "right":
      initialState.x = -40;
      animateState.x = 0;
      break;
  }

  gsap.set(children, initialState);

  return gsap.to(children, {
    ...animateState,
    duration,
    delay,
    stagger: staggerAmount,
  });
};

/**
 * Cleanup ScrollTriggers
 * Essential for preventing memory leaks
 */
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

export { gsap, ScrollTrigger };
