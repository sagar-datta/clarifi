"use client";

import * as React from "react";
import { Card } from "../../ui/card/Card";
import { cn } from "@/app/lib/utils";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  Wallet,
  CreditCard,
  PiggyBank,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip/Tooltip";

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

  return (
    <div className={cn("space-y-4", className)}>
      {!isCollapsed && (
        <h3 className="text-sm font-medium text-muted-foreground px-2">
          Quick Stats
        </h3>
      )}
      <div className={cn("space-y-2", isCollapsed && "px-2")}>
        {stats.map((stat, index) => (
          <TooltipProvider key={index} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card
                  className={cn(
                    "transition-all duration-300",
                    isCollapsed
                      ? "p-2 h-12 hover:bg-accent/50 flex items-center justify-center"
                      : "p-4 hover:bg-accent/50"
                  )}
                >
                  {isCollapsed ? (
                    <div className="relative flex flex-col items-center gap-1.5">
                      {stat.change && (
                        <div>
                          {stat.change.trend === "up" ? (
                            <ArrowUpIcon className="h-3 w-3 text-green-500" />
                          ) : (
                            <ArrowDownIcon className="h-3 w-3 text-red-500" />
                          )}
                        </div>
                      )}
                      {stat.icon && (
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground leading-none">
                          {stat.label}
                        </p>
                        {stat.icon && (
                          <stat.icon className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold">{stat.value}</p>
                        {stat.change && (
                          <div className="flex items-center gap-1">
                            {stat.change.trend === "up" ? (
                              <ArrowUpIcon className="h-3 w-3 text-green-500" />
                            ) : (
                              <ArrowDownIcon className="h-3 w-3 text-red-500" />
                            )}
                            <span
                              className={cn(
                                "text-xs font-medium",
                                stat.change.trend === "up"
                                  ? "text-green-500"
                                  : "text-red-500"
                              )}
                            >
                              {stat.change.value}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  <div className="text-sm">
                    <p className="font-medium">{stat.label}</p>
                    <p className="text-muted-foreground">{stat.value}</p>
                    {stat.change && (
                      <p
                        className={cn(
                          "text-xs mt-1",
                          stat.change.trend === "up"
                            ? "text-green-500"
                            : "text-red-500"
                        )}
                      >
                        {stat.change.trend === "up" ? "↑" : "↓"}{" "}
                        {stat.change.value}%
                      </p>
                    )}
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
