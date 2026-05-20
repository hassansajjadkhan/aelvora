/**
 * Section Component
 * Wrapper for page sections with consistent spacing and animation
 */

"use client";

import React, { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  backgroundColor?: string;
  animate?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      className,
      id,
      backgroundColor = "bg-deep-black",
      animate = true,
    },
    ref
  ) => {
    const scrollRef = useScrollAnimation();

    return (
      <section
        ref={animate ? scrollRef : ref}
        id={id}
        className={cn(
          "w-full py-24 md:py-32 lg:py-40 relative",
          backgroundColor,
          className
        )}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export { Section };
