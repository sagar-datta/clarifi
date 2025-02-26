"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface CollapseProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export function Collapse({ isCollapsed, onToggle, className }: CollapseProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "absolute right-[-12px] top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-sm transition-all duration-300 hover:bg-accent",
        className
      )}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {isCollapsed ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
    </button>
  );
}
