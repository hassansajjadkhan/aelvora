/**
 * useScrollAnimation Hook
 * Triggers animations on scroll
 */

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = () => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, []);

  return elementRef;
};

/**
 * useParallax Hook
 * Creates parallax scroll effect
 */
export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      y: () => (document.documentElement.scrollHeight - window.innerHeight) * speed,
      scrollTrigger: {
        trigger: document.documentElement,
        onUpdate: (self) => {
          gsap.to(element, {
            y: window.innerHeight * speed * self.getVelocity() * 0.01,
            overwrite: "auto",
          });
        },
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return elementRef;
};

/**
 * useHover Hook
 * Applies hover animations
 */
export const useHover = (
  onHoverStart?: () => void,
  onHoverEnd?: () => void
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => onHoverStart?.();
    const handleMouseLeave = () => onHoverEnd?.();

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [onHoverStart, onHoverEnd]);

  return elementRef;
};

/**
 * useInView Hook
 * Detects when element is in viewport
 */
export const useInView = (
  options: IntersectionObserverInit = { threshold: 0.2 }
) => {
  const elementRef = useRef<HTMLElement>(null);
  const isInViewRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isInViewRef.current = true;
        observer.unobserve(element);
      }
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return { elementRef, isInView: isInViewRef.current };
};
