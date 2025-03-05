"use client";

import { SignIn } from "@clerk/nextjs";

export function SignInClient() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-primary text-primary-foreground hover:bg-primary/90 border-none shadow-none",
            formFieldInput: "rounded-md bg-background border border-input",
            card: "rounded-lg",
            headerTitle: "text-foreground",
            headerSubtitle: "text-muted-foreground",
          },
        }}
      />
    </div>
  );
}
