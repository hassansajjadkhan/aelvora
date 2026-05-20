/**
 * Lenis Provider Component
 * Wraps the app with Lenis smooth scrolling
 */

"use client";

import { useLenis } from "@/lib/lenis";

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  useLenis();
  return <>{children}</>;
};
