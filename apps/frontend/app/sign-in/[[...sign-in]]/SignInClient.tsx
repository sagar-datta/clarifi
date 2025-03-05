"use client";

import { SignIn, useSignIn } from "@clerk/nextjs";
import { Button } from "@/app/components/ui/button/Button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function SignInClient() {
  const router = useRouter();
  const { signIn, isLoaded } = useSignIn();

  const signInWithDemo = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: "demo@clarifi.app",
        password: "demo-password-123",
      });

      if (result.status === "complete") {
        await result.createdSessionId;
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("Error signing in with demo account:", err);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-3">
      <Button
        variant="ghost"
        onClick={() => router.push("/")}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to home</span>
      </Button>
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <Button variant="outline" onClick={signInWithDemo} className="w-full">
          Try Demo Account
        </Button>
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
