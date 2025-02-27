"use client";

import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export function SignUpClient() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-sm dark:bg-[#1F1F23]/70">
      <div className="flex h-full w-full items-center justify-center">
        <SignUp
          appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
            variables: {
              colorInputBackground: theme === "dark" ? "#1F1F23" : "white",
              colorInputText: theme === "dark" ? "white" : "black",
              colorTextSecondary: theme === "dark" ? "#A1A1AA" : undefined,
              colorPrimary: theme === "dark" ? "#27272A" : undefined,
            },
            elements: {
              formFieldInput: "dark:bg-[#1F1F23] dark:text-white",
              formFieldLabel: "dark:text-gray-300",
              footerActionText: "dark:text-gray-400",
              footerActionLink: "dark:text-white dark:hover:text-white/90",
              dividerText: "dark:text-gray-400",
              formButtonPrimary:
                "dark:bg-[#1F1F23] dark:text-white dark:hover:bg-[#2D2D32] dark:border-zinc-800",
            },
          }}
        />
      </div>
    </div>
  );
}
