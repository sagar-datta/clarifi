"use client";

import { Shell } from "./Shell";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { ReduxProvider } from "../../providers/ReduxProvider";
import { ClerkThemeProvider } from "../../providers/ClerkThemeProvider";
import { Toaster } from "@/app/components/ui/toast/toaster";
import { ReactQueryProvider } from "../../providers/ReactQueryProvider";
import { PrefetchProvider } from "../providers/PrefetchProvider";

export function RootLayoutClient({
  children,
  inter,
}: {
  children: React.ReactNode;
  inter: string;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${inter} antialiased`}>
        <ReactQueryProvider>
          <ThemeProvider>
            <ClerkThemeProvider>
              <ReduxProvider>
                <PrefetchProvider>
                  <Shell>{children}</Shell>
                </PrefetchProvider>
              </ReduxProvider>
            </ClerkThemeProvider>
          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
