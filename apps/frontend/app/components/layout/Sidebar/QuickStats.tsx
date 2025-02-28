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
import { useTransactions } from "@/app/lib/redux/hooks";
import { formatCurrency } from "@/app/lib/utils";

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
  const transactions = useTransactions() ?? [];

  // Calculate total balance (all time income - expenses)
  const totalBalance = transactions.reduce((acc, transaction) => {
    if (!transaction) return acc;
    return transaction.type === "income"
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  // Calculate monthly spend (last 30 days expenses)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const monthlySpend = transactions.reduce((acc, transaction) => {
    if (!transaction || transaction.type !== "expense") return acc;
    const transactionDate = new Date(transaction.date);
    return transactionDate >= thirtyDaysAgo ? acc + transaction.amount : acc;
  }, 0);

  // Calculate month-over-month change for monthly spend
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  const previousMonthSpend = transactions.reduce((acc, transaction) => {
    if (!transaction || transaction.type !== "expense") return acc;
    const transactionDate = new Date(transaction.date);
    return transactionDate >= sixtyDaysAgo && transactionDate < thirtyDaysAgo
      ? acc + transaction.amount
      : acc;
  }, 0);

  const monthlySpendChange =
    previousMonthSpend === 0
      ? 0
      : ((monthlySpend - previousMonthSpend) / previousMonthSpend) * 100;

  // Calculate savings goal progress
  const savingsGoal = 5000; // This could come from user settings in the future
  const currentSavings =
    transactions
      .filter((t) => t?.type === "income" && new Date(t.date) >= thirtyDaysAgo)
      .reduce((acc, t) => acc + (t?.amount || 0), 0) - monthlySpend;

  const savingsProgress = (currentSavings / savingsGoal) * 100;

  const stats: QuickStat[] = [
    {
      label: "Total Balance",
      value: formatCurrency(totalBalance),
      icon: Wallet,
    },
    {
      label: "Monthly Spend",
      value: formatCurrency(monthlySpend),
      change: {
        value: Math.round(Math.abs(monthlySpendChange)),
        trend: monthlySpend > previousMonthSpend ? "up" : "down",
      },
      icon: CreditCard,
    },
    {
      label: "Savings Goal",
      value: formatCurrency(currentSavings),
      change: {
        value: Math.min(100, Math.max(0, Math.round(savingsProgress))),
        trend: "up",
      },
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
                            <ArrowUpIcon
                              className={cn("h-3 w-3", {
                                "text-red-500": stat.label === "Monthly Spend",
                                "text-green-500":
                                  stat.label !== "Monthly Spend",
                              })}
                            />
                          ) : (
                            <ArrowDownIcon
                              className={cn("h-3 w-3", {
                                "text-green-500":
                                  stat.label === "Monthly Spend",
                                "text-red-500": stat.label !== "Monthly Spend",
                              })}
                            />
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
                              <ArrowUpIcon
                                className={cn("h-3 w-3", {
                                  "text-red-500":
                                    stat.label === "Monthly Spend",
                                  "text-green-500":
                                    stat.label !== "Monthly Spend",
                                })}
                              />
                            ) : (
                              <ArrowDownIcon
                                className={cn("h-3 w-3", {
                                  "text-green-500":
                                    stat.label === "Monthly Spend",
                                  "text-red-500":
                                    stat.label !== "Monthly Spend",
                                })}
                              />
                            )}
                            <span
                              className={cn(
                                "text-xs font-medium",
                                stat.label === "Monthly Spend"
                                  ? stat.change.trend === "up"
                                    ? "text-red-500"
                                    : "text-green-500"
                                  : stat.change.trend === "up"
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
                          stat.label === "Monthly Spend"
                            ? stat.change.trend === "up"
                              ? "text-red-500"
                              : "text-green-500"
                            : stat.change.trend === "up"
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
