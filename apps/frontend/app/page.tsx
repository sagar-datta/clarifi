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
    return null; // Prevent flash of landing page while redirecting
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 text-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Take Control of Your{" "}
          <span className="text-primary">Financial Future</span>
        </h1>

        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Track expenses, set budgets, and achieve your financial goals with
          ClariFi&apos;s powerful personal finance management tools.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <SignUpButton
            mode="modal"
            appearance={{
              elements: {
                formFieldInput: "bg-[#1F1F23] text-white",
                formFieldLabel: "text-gray-300",
              },
            }}
          >
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </SignUpButton>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Expense Tracking</h3>
            <p className="text-muted-foreground">
              Easily track and categorise your spending habits
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Smart Budgeting</h3>
            <p className="text-muted-foreground">
              Create and manage budgets that work for you
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Financial Goals</h3>
            <p className="text-muted-foreground">
              Set and track progress towards your savings goals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
