"use client";

import { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

interface WidgetGridProps {
  children: ReactNode;
  className?: string;
}

export function WidgetGrid({ children, className }: WidgetGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        // Base layout (mobile) - single column
        "grid-cols-1",
        // Medium screens - 2 columns
        "md:grid-cols-2",
        // Large screens - maintain 2 columns but wider
        "lg:grid-cols-2",
        className
      )}
    >
      {children}
    </div>
  );
}

// Widget container component for consistent sizing
interface WidgetProps {
  children: ReactNode;
  className?: string;
  /** Set to true to make widget span full width */
  fullWidth?: boolean;
}

export function Widget({ children, className, fullWidth }: WidgetProps) {
  return (
    <div
      className={cn("min-h-[350px]", fullWidth && "md:col-span-2", className)}
    >
      {children}
    </div>
  );
}
