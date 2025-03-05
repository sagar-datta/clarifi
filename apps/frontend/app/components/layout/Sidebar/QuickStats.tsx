"use client";

import * as React from "react";
import { Card } from "../../ui/card/Card";
import { cn } from "@/app/lib/utils";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  Wallet,
  CreditCard,
  DollarSign,
  PiggyBank,
  BanknoteIcon,
  Calculator,
  CalendarDays,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip/Tooltip";
import { useTransactions } from "@/app/lib/redux/hooks";
import { formatCurrency } from "@/app/lib/utils";
import { Transaction } from "@/app/lib/redux/slices/transactions/types";

interface QuickStat {
  label: string;
  value: string;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  icon?: React.ComponentType<{ className?: string }>;
}

interface QuickStatsProps {
  className?: string;
  isCollapsed?: boolean;
  showTitle?: boolean;
}

export function QuickStats({
  className,
  isCollapsed,
  showTitle = true,
}: QuickStatsProps) {
  const transactions = useTransactions() ?? [];

  // Calculate total balance (all time income - expenses)
  const totalBalance = transactions.reduce((acc, transaction) => {
    if (!transaction) return acc;
    return transaction.type === "income"
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  // Calculate monthly spend (current calendar month)
  const now = new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const monthlySpend = transactions.reduce((acc, transaction) => {
    if (!transaction || transaction.type !== "expense") return acc;
    const transactionDate = new Date(transaction.date);
    return transactionDate >= currentMonthStart &&
      transactionDate <= currentMonthEnd
      ? acc + transaction.amount
      : acc;
  }, 0);

  // Calculate previous month's spend
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  const previousMonthSpend = transactions.reduce((acc, transaction) => {
    if (!transaction || transaction.type !== "expense") return acc;
    const transactionDate = new Date(transaction.date);
    return transactionDate >= previousMonthStart &&
      transactionDate <= previousMonthEnd
      ? acc + transaction.amount
      : acc;
  }, 0);

  const monthlySpendChange =
    previousMonthSpend === 0
      ? 0
      : ((monthlySpend - previousMonthSpend) / previousMonthSpend) * 100;

  // Calculate daily average
  const daysInCurrentMonth = currentMonthEnd.getDate();
  const daysInPreviousMonth = previousMonthEnd.getDate();

  const dailyAverage = monthlySpend / daysInCurrentMonth;
  const previousDailyAverage = previousMonthSpend / daysInPreviousMonth;

  const dailyAverageChange = previousDailyAverage
    ? ((dailyAverage - previousDailyAverage) / previousDailyAverage) * 100
    : 0;

  // Calculate savings rate
  const currentMonthIncome = transactions
    .filter(
      (t) =>
        t?.type === "income" &&
        new Date(t.date) >= currentMonthStart &&
        new Date(t.date) <= currentMonthEnd
    )
    .reduce((sum, t) => sum + (t?.amount || 0), 0);

  const savingsRate = currentMonthIncome
    ? ((currentMonthIncome - monthlySpend) / currentMonthIncome) * 100
    : 0;

  const previousMonthIncome = transactions
    .filter(
      (t) =>
        t?.type === "income" &&
        new Date(t.date) >= previousMonthStart &&
        new Date(t.date) <= previousMonthEnd
    )
    .reduce((sum, t) => sum + (t?.amount || 0), 0);

  const previousSavingsRate = previousMonthIncome
    ? ((previousMonthIncome - previousMonthSpend) / previousMonthIncome) * 100
    : 0;

  const savingsRateChange = previousSavingsRate
    ? savingsRate - previousSavingsRate
    : 0;

  // Calculate monthly income change
  const monthlyIncomeChange =
    previousMonthIncome === 0
      ? 0
      : ((currentMonthIncome - previousMonthIncome) / previousMonthIncome) *
        100;

  // Calculate largest transaction
  const currentLargestTransaction = transactions
    .filter(
      (t): t is Transaction =>
        t !== null &&
        t.type === "expense" &&
        new Date(t.date) >= currentMonthStart &&
        new Date(t.date) <= currentMonthEnd
    )
    .reduce(
      (max, t) => (!max || t.amount > max.amount ? t : max),
      undefined as Transaction | undefined
    );

  const previousLargestTransaction = transactions
    .filter(
      (t): t is Transaction =>
        t !== null &&
        t.type === "expense" &&
        new Date(t.date) >= previousMonthStart &&
        new Date(t.date) <= previousMonthEnd
    )
    .reduce(
      (max, t) => (!max || t.amount > max.amount ? t : max),
      undefined as Transaction | undefined
    );

  const largestTransactionChange =
    previousLargestTransaction?.amount && currentLargestTransaction?.amount
      ? ((currentLargestTransaction.amount -
          previousLargestTransaction.amount) /
          previousLargestTransaction.amount) *
        100
      : 0;

  // Calculate average transaction size
  const currentMonthTransactions = transactions.filter(
    (t) =>
      t?.type === "expense" &&
      new Date(t.date) >= currentMonthStart &&
      new Date(t.date) <= currentMonthEnd
  );

  const previousMonthTransactions = transactions.filter(
    (t) =>
      t?.type === "expense" &&
      new Date(t.date) >= previousMonthStart &&
      new Date(t.date) <= previousMonthEnd
  );

  const currentAverageTransaction = currentMonthTransactions.length
    ? currentMonthTransactions.reduce((sum, t) => sum + (t?.amount || 0), 0) /
      currentMonthTransactions.length
    : 0;

  const previousAverageTransaction = previousMonthTransactions.length
    ? previousMonthTransactions.reduce((sum, t) => sum + (t?.amount || 0), 0) /
      previousMonthTransactions.length
    : 0;

  const averageTransactionChange =
    previousAverageTransaction === 0
      ? 0
      : ((currentAverageTransaction - previousAverageTransaction) /
          previousAverageTransaction) *
        100;

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
      label: "Monthly Income",
      value: formatCurrency(currentMonthIncome),
      change: {
        value: Math.round(Math.abs(monthlyIncomeChange)),
        trend: currentMonthIncome > previousMonthIncome ? "up" : "down",
      },
      icon: DollarSign,
    },
    {
      label: "Largest Expense",
      value: currentLargestTransaction
        ? formatCurrency(currentLargestTransaction.amount)
        : "No expenses",
      change: {
        value: Math.round(Math.abs(largestTransactionChange)),
        trend:
          currentLargestTransaction?.amount &&
          currentLargestTransaction.amount >
            (previousLargestTransaction?.amount ?? 0)
            ? "up"
            : "down",
      },
      icon: BanknoteIcon,
    },
    {
      label: "Average Transaction",
      value: formatCurrency(currentAverageTransaction),
      change: {
        value: Math.round(Math.abs(averageTransactionChange)),
        trend:
          currentAverageTransaction > previousAverageTransaction
            ? "up"
            : "down",
      },
      icon: Calculator,
    },
    {
      label: "Daily Average",
      value: formatCurrency(dailyAverage),
      change: {
        value: Math.round(Math.abs(dailyAverageChange)),
        trend: dailyAverage > previousDailyAverage ? "up" : "down",
      },
      icon: CalendarDays,
    },
    {
      label: "Savings Rate",
      value: `${Math.round(savingsRate)}%`,
      change: {
        value: Math.round(Math.abs(savingsRateChange)),
        trend: savingsRate > previousSavingsRate ? "up" : "down",
      },
      icon: PiggyBank,
    },
  ];

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {!isCollapsed && showTitle && (
        <h3 className="text-sm font-medium text-muted-foreground px-2 flex-none">
          Quick Stats
        </h3>
      )}
      <div
        className={cn(
          "space-y-2 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40 scrollbar-track-transparent",
          isCollapsed && "px-0.5"
        )}
      >
        {stats.map((stat, index) => (
          <TooltipProvider
            key={index}
            delayDuration={0}
            disableHoverableContent
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Card
                  className={cn(
                    "transition-all duration-300",
                    isCollapsed
                      ? "p-1.5 h-[100px] w-[56px] hover:bg-accent/50"
                      : "p-4 hover:bg-accent/50"
                  )}
                >
                  {isCollapsed ? (
                    <div className="h-full flex items-center justify-center group">
                      <div className="-rotate-90 whitespace-nowrap flex flex-col items-center">
                        <span className="text-[10px] font-medium text-muted-foreground">
                          {stat.label === "Monthly Spend"
                            ? "Spend"
                            : stat.label === "Total Balance"
                              ? "Balance"
                              : stat.label === "Monthly Income"
                                ? "Income"
                                : stat.label === "Largest Expense"
                                  ? "Largest"
                                  : stat.label === "Average Transaction"
                                    ? "Average"
                                    : stat.label === "Daily Average"
                                      ? "Daily"
                                      : "Savings"}
                        </span>
                        <span className="text-xs font-bold tracking-tight">
                          {stat.value}
                        </span>
                      </div>
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
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-2xl font-bold">{stat.value}</p>
                        {stat.change && (
                          <div className="flex items-center gap-2">
                            {stat.change.trend === "neutral" ? (
                              <span className="text-xs font-medium text-muted-foreground">
                                {stat.change.value}% of spend
                              </span>
                            ) : (
                              <div
                                className={cn(
                                  "flex items-center gap-1.5 px-2 py-0.5 rounded-full",
                                  stat.label === "Monthly Spend" ||
                                    stat.label === "Daily Average" ||
                                    stat.label === "Largest Expense" ||
                                    stat.label === "Average Transaction"
                                    ? stat.change.trend === "up"
                                      ? "bg-red-100 dark:bg-red-500/20"
                                      : "bg-green-100 dark:bg-green-500/20"
                                    : stat.change.trend === "up"
                                      ? "bg-green-100 dark:bg-green-500/20"
                                      : "bg-red-100 dark:bg-red-500/20"
                                )}
                              >
                                {stat.change.trend === "up" ? (
                                  <ArrowUpIcon
                                    className={cn("h-3 w-3", {
                                      "text-red-500":
                                        stat.label === "Monthly Spend" ||
                                        stat.label === "Daily Average" ||
                                        stat.label === "Largest Expense" ||
                                        stat.label === "Average Transaction",
                                      "text-green-500":
                                        stat.label !== "Monthly Spend" &&
                                        stat.label !== "Daily Average" &&
                                        stat.label !== "Largest Expense" &&
                                        stat.label !== "Average Transaction",
                                    })}
                                  />
                                ) : (
                                  <ArrowDownIcon
                                    className={cn("h-3 w-3", {
                                      "text-green-500":
                                        stat.label === "Monthly Spend" ||
                                        stat.label === "Daily Average" ||
                                        stat.label === "Largest Expense" ||
                                        stat.label === "Average Transaction",
                                      "text-red-500":
                                        stat.label !== "Monthly Spend" &&
                                        stat.label !== "Daily Average" &&
                                        stat.label !== "Largest Expense" &&
                                        stat.label !== "Average Transaction",
                                    })}
                                  />
                                )}
                                <span
                                  className={cn(
                                    "text-xs font-medium",
                                    stat.label === "Monthly Spend" ||
                                      stat.label === "Daily Average" ||
                                      stat.label === "Largest Expense" ||
                                      stat.label === "Average Transaction"
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
                      <div className="mt-1">
                        {stat.change.trend === "neutral" ? (
                          <span className="text-xs font-medium text-muted-foreground">
                            {stat.change.value}% of spend
                          </span>
                        ) : (
                          <div
                            className={cn(
                              "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full",
                              stat.label === "Monthly Spend" ||
                                stat.label === "Daily Average" ||
                                stat.label === "Largest Expense" ||
                                stat.label === "Average Transaction"
                                ? stat.change.trend === "up"
                                  ? "bg-red-100 dark:bg-red-500/20"
                                  : "bg-green-100 dark:bg-green-500/20"
                                : stat.change.trend === "up"
                                  ? "bg-green-100 dark:bg-green-500/20"
                                  : "bg-red-100 dark:bg-red-500/20"
                            )}
                          >
                            {stat.change.trend === "up" ? (
                              <ArrowUpIcon
                                className={cn("h-3 w-3", {
                                  "text-red-500":
                                    stat.label === "Monthly Spend" ||
                                    stat.label === "Daily Average" ||
                                    stat.label === "Largest Expense" ||
                                    stat.label === "Average Transaction",
                                  "text-green-500":
                                    stat.label !== "Monthly Spend" &&
                                    stat.label !== "Daily Average" &&
                                    stat.label !== "Largest Expense" &&
                                    stat.label !== "Average Transaction",
                                })}
                              />
                            ) : (
                              <ArrowDownIcon
                                className={cn("h-3 w-3", {
                                  "text-green-500":
                                    stat.label === "Monthly Spend" ||
                                    stat.label === "Daily Average" ||
                                    stat.label === "Largest Expense" ||
                                    stat.label === "Average Transaction",
                                  "text-red-500":
                                    stat.label !== "Monthly Spend" &&
                                    stat.label !== "Daily Average" &&
                                    stat.label !== "Largest Expense" &&
                                    stat.label !== "Average Transaction",
                                })}
                              />
                            )}
                            <span
                              className={cn(
                                "text-xs font-medium",
                                stat.label === "Monthly Spend" ||
                                  stat.label === "Daily Average" ||
                                  stat.label === "Largest Expense" ||
                                  stat.label === "Average Transaction"
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
