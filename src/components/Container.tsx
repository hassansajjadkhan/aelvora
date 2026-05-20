/**
 * Container Component
 * Consistent max-width container with padding
 */

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, size = "lg" }, ref) => {
    const sizeClasses = {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "w-full",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto px-4 md:px-8 w-full",
          sizeClasses[size],
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export { Container };
