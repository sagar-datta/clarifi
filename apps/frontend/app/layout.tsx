import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Shell } from "./components/layout/Shell";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ReduxProvider } from "./providers/ReduxProvider";
import { ClerkThemeProvider } from "./providers/ClerkThemeProvider";
import { Toaster } from "@/app/components/ui/toast/toaster";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  title: "ClariFi - Personal Finance Management",
  description:
    "Track your finances, set budgets, and achieve your financial goals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ReactQueryProvider>
          <ThemeProvider>
            <ClerkThemeProvider>
              <ReduxProvider>
                <Shell>{children}</Shell>
              </ReduxProvider>
            </ClerkThemeProvider>
          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
