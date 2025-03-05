import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f1915" },
  ],
};

export const baseMetadata: Metadata = {
  title: "ClariFi - Personal Finance Management",
  description: "Track your finances and reach financial clarity.",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "48x48" },
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
        rel: "mask-icon",
        url: "/favicon/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ClariFi",
  },
  applicationName: "ClariFi",
};

export const dashboardMetadata: Metadata = {
  ...baseMetadata,
  title: "Dashboard | ClariFi",
  description: "Your financial overview",
};

export const transactionsMetadata: Metadata = {
  ...baseMetadata,
  title: "Transactions | ClariFi",
  description: "Manage and track your financial activity",
};

export const signInMetadata: Metadata = {
  ...baseMetadata,
  title: "Sign In | ClariFi",
  description: "Sign in to your ClariFi account",
};

export const signUpMetadata: Metadata = {
  ...baseMetadata,
  title: "Sign Up | ClariFi",
  description: "Create your ClariFi account",
};
