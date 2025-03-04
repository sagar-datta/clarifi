"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip/Tooltip";

// Icons
import { LayoutDashboard, Receipt } from "lucide-react";

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
];

interface MainNavProps {
  className?: string;
  isCollapsed?: boolean;
}

export function MainNav({ className, isCollapsed }: MainNavProps) {
  const pathname = usePathname();

  const NavLink = ({ item }: { item: NavItem }) => {
    const content = (
      <Link
        href={item.href}
        className={cn(
          "flex items-center rounded-lg py-2 text-sm transition-all duration-300",
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
    );

    if (isCollapsed) {
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>{content}</TooltipTrigger>
            <TooltipContent side="right">
              <p className="font-medium">{item.title}</p>
              {item.description && (
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return content;
  };

  return (
    <nav className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-2">
        {mainNavItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </div>
    </nav>
  );
}
