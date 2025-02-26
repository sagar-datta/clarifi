"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import { buttonVariants } from "./variants";

/**
 * Props for the Button component
 * Combines:
 * - HTML button attributes (like onClick, disabled, etc.)
 * - Variant props from our button styles (variant and size)
 * - asChild prop for composition
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Button component with theme support and variants
 *
 * Features:
 * - Multiple style variants (default, destructive, outline, etc.)
 * - Size variations (sm, default, lg, icon)
 * - Can be rendered as any element using asChild
 * - Fully typed props with TypeScript
 * - Automatic theme handling (light/dark mode)
 *
 * @example
 * // Default button
 * <Button>Click me</Button>
 *
 * // Destructive large button
 * <Button variant="destructive" size="lg">Delete</Button>
 *
 * // As a link
 * <Button asChild variant="link">
 *   <a href="/somewhere">Navigate</a>
 * </Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Use Radix Slot for composition, otherwise render as button
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        // Combine variant styles with any additional classes
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

// For React DevTools
Button.displayName = "Button";

export { Button, buttonVariants };
