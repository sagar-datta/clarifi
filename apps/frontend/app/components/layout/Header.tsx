"use client";

import * as React from "react";
import { Button } from "../ui/button/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu/DropdownMenu";
import { Bell, Plus, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/app/lib/utils";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { AddTransactionDialog } from "@/app/components/shared/transactions/add-transaction-dialog";

export function Header({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { isSignedIn } = useUser();

  return (
    <header className={cn("bg-background px-6 py-3", className)}>
      <div className="flex items-center justify-between">
        <div /> {/* Spacer for layout balance */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Moon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Sun className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isSignedIn ? (
            <>
              {/* Quick Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-5 w-5" />
                    <span className="sr-only">Quick actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <AddTransactionDialog>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      Add Transaction
                    </DropdownMenuItem>
                  </AddTransactionDialog>
                  <DropdownMenuItem>Create Budget</DropdownMenuItem>
                  <DropdownMenuItem>Set New Goal</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>No new notifications</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Button */}
              <UserButton />
            </>
          ) : (
            <SignInButton>
              <Button variant="default" size="sm">
                Sign in
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}
