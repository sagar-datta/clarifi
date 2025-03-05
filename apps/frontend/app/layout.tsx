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
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
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
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
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
