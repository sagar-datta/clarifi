"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme as useNextTheme } from "next-themes";

export function useTheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useNextTheme();

  // Only show theme after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize the toggle function to prevent unnecessary re-renders
  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return {
    theme: mounted ? theme : undefined,
    toggleTheme,
    mounted,
  };
}
