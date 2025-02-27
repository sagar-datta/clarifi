import { Metadata } from "next";
import { SignInClient } from "./SignInClient";

export const metadata: Metadata = {
  title: "Sign In | ClariFi",
  description: "Sign in to your ClariFi account",
};

export default function SignInPage() {
  return <SignInClient />;
}
