/**
 * Button Component
 * Premium interactive button with hover effects
 */

"use client";

import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out relative overflow-hidden group",
  {
    variants: {
      variant: {
        primary:
          "bg-rich-purple text-warm-beige hover:bg-muted-lavender shadow-glow-purple",
        secondary:
          "bg-soft-lilac text-deep-black hover:bg-rich-purple hover:text-warm-beige",
        outline:
          "border-2 border-rich-purple text-rich-purple hover:bg-rich-purple hover:text-warm-beige",
        ghost: "text-rich-purple hover:bg-rich-purple hover:text-warm-beige",
        minimal:
          "text-warm-beige hover:text-rich-purple border-b-2 border-transparent hover:border-rich-purple",
      },
      size: {
        sm: "px-3 py-1.5 text-sm rounded-lg",
        md: "px-6 py-3 text-base rounded-xl",
        lg: "px-8 py-4 text-lg rounded-2xl",
        xl: "px-10 py-5 text-xl rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
