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
        "flex h-16 w-6 items-center justify-center rounded-r-md border border-l-0 bg-background shadow-sm transition-all duration-300 hover:bg-accent",
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
