"use client";

import * as React from "react";
import { Card } from "../../ui/card/Card";
import { cn } from "@/app/lib/utils";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  DollarSign,
  Wallet,
  CreditCard,
  PiggyBank,
} from "lucide-react";

interface QuickStat {
  label: string;
  value: string;
  change?: {
    value: number;
    trend: "up" | "down";
  };
  icon?: React.ComponentType<{ className?: string }>;
}

interface QuickStatsProps {
  className?: string;
  isCollapsed?: boolean;
}

export function QuickStats({ className, isCollapsed }: QuickStatsProps) {
  // This would come from your Redux store or API in a real app
  const stats: QuickStat[] = [
    {
      label: "Total Balance",
      value: "$12,450",
      change: { value: 12.5, trend: "up" },
      icon: Wallet,
    },
    {
      label: "Monthly Spend",
      value: "$2,840",
      change: { value: 4.2, trend: "down" },
      icon: CreditCard,
    },
    {
      label: "Savings Goal",
      value: "$5,000",
      change: { value: 28, trend: "up" },
      icon: PiggyBank,
    },
  ];

  if (isCollapsed) {
    return null; // Hide stats when collapsed
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-sm font-medium text-muted-foreground px-2">
        Quick Stats
      </h3>
      <div className="space-y-2">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, change, icon: Icon }: QuickStat) {
  return (
    <Card className="p-4 hover:bg-accent/50 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground leading-none">
            {label}
          </p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </div>
      {change && (
        <div className="mt-2 flex items-center gap-1">
          {change.trend === "up" ? (
            <ArrowUpIcon className="h-3 w-3 text-green-500" />
          ) : (
            <ArrowDownIcon className="h-3 w-3 text-red-500" />
          )}
          <span
            className={cn(
              "text-xs font-medium",
              change.trend === "up" ? "text-green-500" : "text-red-500"
            )}
          >
            {change.value}%
          </span>
        </div>
      )}
    </Card>
  );
}
