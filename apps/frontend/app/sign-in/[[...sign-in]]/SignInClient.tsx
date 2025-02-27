"use client";

import { SignIn } from "@clerk/nextjs";

export function SignInClient() {
  return (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-sm dark:bg-[#1F1F23]/70">
      <div className="flex h-full w-full items-center justify-center">
        <SignIn
          appearance={{
            elements: {
              formFieldInput: "dark:bg-[#1F1F23] dark:text-white",
              formFieldLabel: "dark:text-gray-300",
              footerActionText: "dark:text-gray-400",
              footerActionLink: "dark:text-white dark:hover:text-white/90",
              dividerText: "dark:text-gray-400",
              formButtonPrimary:
                "dark:bg-[#1F1F23] dark:text-white dark:hover:bg-[#2D2D32] dark:border-zinc-800",
            },
            variables: {
              colorBackground: "#1F1F23",
              colorInputBackground: "#1F1F23",
              colorInputText: "white",
              colorTextSecondary: "#A1A1AA",
              colorPrimary: "#27272A",
            },
          }}
        />
      </div>
    </div>
  );
}
