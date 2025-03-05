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
        elements: {
          formButtonPrimary:
            "bg-primary text-primary-foreground hover:bg-primary/90 !border-0",
          formFieldInput: "rounded-md bg-background border border-input",
          card: "rounded-lg",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
