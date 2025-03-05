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
          colorBackground: isDark ? "#29241D" : "#FBFAF8",
          colorText: isDark ? "#E8E6E3" : "#29241D",
          colorPrimary: isDark ? "#E8E6E3" : "#29241D",
          colorInputBackground: isDark ? "#332D24" : "#F5F4F1",
          colorInputText: isDark ? "#E8E6E3" : "#29241D",
          colorTextSecondary: isDark ? "#A39E99" : "#6B635A",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
