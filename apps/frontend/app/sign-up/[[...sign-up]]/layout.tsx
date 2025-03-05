import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | ClariFi",
  description: "Create your ClariFi account",
};

// This is required for static export with dynamic routes
export function generateStaticParams() {
  return [{ "sign-up": [] }, { "sign-up": ["sso-callback"] }];
}

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
