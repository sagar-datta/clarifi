import { cva } from "class-variance-authority";

/**
 * Button variants using CSS variables for theme support
 * These classes use HSL values defined in globals.css which automatically switch between light/dark mode
 *
 * Example:
 * - Light mode: --primary: 221.2 83.2% 53.3%
 * - Dark mode:  --primary: 217.2 91.2% 59.8%
 *
 * When theme changes:
 * 1. ThemeProvider toggles 'dark' class on <html>
 * 2. CSS variables switch between light/dark values
 * 3. These button styles automatically update
 */
export const buttonVariants = cva(
  // Base styles applied to all variants
  // Uses neutral colors that adapt to theme
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary action buttons
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90", // /90 means 90% opacity

        // Dangerous action buttons
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",

        // Secondary action buttons
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",

        // Subtle interaction buttons
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      // Size variations
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9", // Square aspect ratio for icon buttons
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
