"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export function ClerkThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ClerkProvider
      appearance={{
        baseTheme: isDark ? dark : undefined,
        variables: {
          colorBackground: isDark ? "#1f1915" : "#e9e3d8",
          colorText: isDark ? "#f7f4f1" : "#29241D",
          colorPrimary: isDark ? "#f7f4f1" : "#29241D",
          colorInputBackground: isDark ? "#252019" : "#e2dcd1",
          colorInputText: isDark ? "#f7f4f1" : "#29241D",
          colorTextSecondary: isDark ? "#bfb4a9" : "#6B635A",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
