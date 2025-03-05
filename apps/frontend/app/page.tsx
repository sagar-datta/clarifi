"use client";

import { SignUpButton, useAuth } from "@clerk/nextjs";
import { Button } from "./components/ui/button/Button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isSignedIn, router]);

  if (isSignedIn) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 text-center">
      <div className="max-w-3xl space-y-6">
        <div className="space-y-2">
          <p className="text-lg font-medium text-primary">Welcome to ClariFi</p>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Bringing <span className="text-primary">Clarity</span> to Your
            Finances
          </h1>
        </div>

        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          ClariFi makes expense tracking crystal clear. Our modern, intuitive
          interface helps you understand your spending with perfect clarity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <SignUpButton mode="modal">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </SignUpButton>
        </div>

        <div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Clear Transaction Entry</h3>
            <p className="text-muted-foreground">
              Add transactions instantly with our streamlined input system
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Transparent Management</h3>
            <p className="text-muted-foreground">
              View, edit, and delete your transactions with perfect clarity
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Visual Comfort</h3>
            <p className="text-muted-foreground">
              Light and dark themes for crystal-clear viewing any time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
