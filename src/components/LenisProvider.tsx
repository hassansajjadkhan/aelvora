/**
 * Lenis Provider Component
 * Wraps the app with Lenis smooth scrolling, and with Framer Motion's
 * reduced-motion handling.
 */

"use client";

import { useSyncExternalStore } from "react";
import { MotionConfig } from "framer-motion";
import { useLenis } from "@/lib/lenis";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeToMotionPreference = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const getMotionPreference = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;

/** The server cannot know the preference, so it renders the motion-on tree. */
const getServerMotionPreference = () => false;

/**
 * `prefers-reduced-motion` is honoured in two places, because CSS alone cannot
 * cover this stack:
 *
 *  - The media query in `globals.css` neutralises CSS keyframe animations
 *    (marquee, trust waves, grain) and transitions.
 *  - `MotionConfig reducedMotion="user"` covers Framer Motion, which writes
 *    inline transforms from JavaScript and so ignores that media query
 *    entirely. Every `whileInView` reveal on the site is a Framer animation,
 *    so without this the bulk of the page's motion still played.
 *
 * Lenis is the third: hijacking the scroll wheel is itself motion the user
 * asked not to have, so it is not initialised at all when they have opted out.
 */
const useReducedMotion = (): boolean =>
  // `useSyncExternalStore` rather than useState + useEffect: matchMedia is an
  // external store, and this is the API for reading one. It also avoids the
  // cascading render a setState-in-effect would cause, and gives the server a
  // defined snapshot instead of a hydration mismatch.
  useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference
  );

const LenisRuntime = () => {
  useLenis();
  return null;
};

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const reduced = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {!reduced && <LenisRuntime />}
      {children}
    </MotionConfig>
  );
};
