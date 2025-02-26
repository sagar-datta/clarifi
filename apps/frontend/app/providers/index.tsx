"use client";

import { type ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { ReduxProvider } from "./ReduxProvider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </ThemeProvider>
  );
}

export { ThemeProvider } from "./ThemeProvider";
export { ReduxProvider } from "./ReduxProvider";
