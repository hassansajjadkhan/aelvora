/**
 * Heading Component
 * Premium typography heading with animation
 */

"use client";

import React, { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva(
  "font-display font-bold tracking-tight leading-tight",
  {
    variants: {
      size: {
        h1: "text-display-xl md:text-display-lg",
        h2: "text-display-lg md:text-display-md",
        h3: "text-display-md md:text-display-sm",
        h4: "text-heading-lg md:text-heading-md",
        h5: "text-heading-md md:text-heading-sm",
        h6: "text-heading-sm",
      },
      gradient: {
        true: "bg-gradient-to-r from-rich-purple via-muted-lavender to-soft-lilac bg-clip-text text-transparent",
        false: "text-warm-beige",
      },
    },
    defaultVariants: {
      size: "h2",
      gradient: false,
    },
  }
);

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, gradient, as: Component = "h2", ...props }, ref) => {
    return (
      <Component
        className={cn(headingVariants({ size, gradient, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Heading.displayName = "Heading";

export { Heading, headingVariants };
