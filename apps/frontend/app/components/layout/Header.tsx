"use client";

import * as React from "react";
import { Button } from "../ui/button/Button";
import { Plus, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/app/lib/utils";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { AddTransactionDialog } from "@/app/components/shared/transactions/add-transaction-dialog";
import { DatabaseActionsDialog } from "@/app/components/shared/database/DatabaseActionsDialog";
import { usePathname } from "next/navigation";

export function Header({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const isAuthPage =
    pathname.includes("sign-in") || pathname.includes("sign-up");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className={cn("bg-background px-6 py-3 w-full", className)}>
      <div className="flex items-center justify-between">
        <div /> {/* Spacer for layout balance */}
        {/* Add padding-right to leave space for GitHub corner */}
        <div className="flex items-center gap-2 pr-16">
          {/* Quick Add Transaction - Only show when signed in */}
          {isSignedIn && (
            <AddTransactionDialog>
              <Button variant="ghost" size="icon">
                <Plus className="h-5 w-5" />
                <span className="sr-only">Add transaction</span>
              </Button>
            </AddTransactionDialog>
          )}

          {isSignedIn && <DatabaseActionsDialog />}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative"
          >
            <Moon className="absolute h-5 w-5 scale-100 dark:scale-0" />
            <Sun className="h-5 w-5 scale-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isSignedIn ? (
            <>
              {/* User Button */}
              <UserButton />
            </>
          ) : (
            !isAuthPage && (
              <SignInButton>
                <Button variant="default" size="sm">
                  Sign in
                </Button>
              </SignInButton>
            )
          )}
        </div>
      </div>
    </header>
  );
}
