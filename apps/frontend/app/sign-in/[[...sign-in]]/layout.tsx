import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | ClariFi",
  description: "Sign in to your ClariFi account",
};

// This is required for static export with dynamic routes
export function generateStaticParams() {
  return [{ "sign-in": [] }, { "sign-in": ["sso-callback"] }];
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
