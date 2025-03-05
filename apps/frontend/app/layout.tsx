import { Inter } from "next/font/google";
import "./globals.css";
import { Shell } from "./components/layout/Shell";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ReduxProvider } from "./providers/ReduxProvider";
import { ClerkThemeProvider } from "./providers/ClerkThemeProvider";
import { Toaster } from "@/app/components/ui/toast/toaster";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { PrefetchProvider } from "./components/providers/PrefetchProvider";
import { baseMetadata, viewport } from "./metadata.config";
import type { ThemeColorDescriptor } from "next/dist/lib/metadata/types/metadata-types";

const inter = Inter({ subsets: ["latin"] });

// Add metadata to document head
if (typeof document !== "undefined") {
  document.title = String(baseMetadata.title);
  const metaDesc = document.createElement("meta");
  metaDesc.name = "description";
  metaDesc.content = String(baseMetadata.description);
  document.head.appendChild(metaDesc);
}

export const metadata = {
  title: "ClariFi",
  description: "Your personal finance tracker",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content={String(viewport.colorScheme)} />
        {Array.isArray(viewport.themeColor) &&
          viewport.themeColor.map((theme: ThemeColorDescriptor, i: number) => (
            <meta
              key={i}
              name="theme-color"
              media={theme.media}
              content={theme.color}
            />
          ))}
      </head>
      <body className={`${inter.className} antialiased`}>
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
