"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";

// Icons
import {
  LayoutDashboard,
  Receipt,
  PiggyBank,
  Target,
  Settings,
  HelpCircle,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview of your financial status",
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: Receipt,
    description: "View and manage your transactions",
  },
  {
    title: "Budget",
    href: "/budget",
    icon: PiggyBank,
    description: "Track your budgets and spending",
  },
  {
    title: "Goals",
    href: "/goals",
    icon: Target,
    description: "Set and monitor financial goals",
  },
];

const secondaryNavItems: NavItem[] = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/help",
    icon: HelpCircle,
  },
];

interface MainNavProps {
  className?: string;
  isCollapsed?: boolean;
}

export function MainNav({ className, isCollapsed }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-2">
        {mainNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-lg py-2 text-sm transition-all",
              "hover:bg-accent hover:text-accent-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isCollapsed ? "justify-center px-2" : "px-3 gap-3",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "transparent"
            )}
          >
            <item.icon className="h-4 w-4" />
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </div>

      <div className="mt-auto">
        <div className="flex flex-col gap-2">
          {secondaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg py-2 text-sm transition-all",
                "text-muted-foreground",
                "hover:bg-accent hover:text-accent-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isCollapsed ? "justify-center px-2" : "px-3 gap-3",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "transparent"
              )}
            >
              <item.icon className="h-4 w-4" />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
