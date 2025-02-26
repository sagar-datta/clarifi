"use client";

import { useState, useEffect } from "react";
import { useTheme as useNextTheme } from "next-themes";

export function useTheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useNextTheme();

  // Only show theme after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return {
    theme: mounted ? theme : undefined,
    toggleTheme,
    mounted,
  };
}
