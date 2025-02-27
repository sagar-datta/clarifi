import { Metadata } from "next";
import { SignUpClient } from "./SignUpClient";

export const metadata: Metadata = {
  title: "Sign Up | ClariFi",
  description: "Create your ClariFi account",
};

export default function SignUpPage() {
  return <SignUpClient />;
}
