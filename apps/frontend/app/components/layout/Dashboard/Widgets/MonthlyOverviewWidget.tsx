"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs/Tabs";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { selectTransactions } from "@/app/lib/redux/slices/transactions/selectors";
import { formatCurrency } from "@/app/lib/utils";
import { endOfDay, startOfDay, subDays, format } from "date-fns";
import { useMemo, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { ScrollArea } from "@/app/components/ui/scroll-area/ScrollArea";
import { Transaction } from "@/app/lib/redux/slices/transactions/types";

export function MonthlyOverviewWidget() {
  const transactions = useAppSelector(selectTransactions) ?? [];
  const [selectedTab, setSelectedTab] = useState<"income" | "expenses">(
    "income"
  );

  const {
    netIncome,
    previousNetIncome,
    percentageChange,
    currentIncomeTransactions,
    currentExpenseTransactions,
  } = useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = subDays(now, 30);
    const sixtyDaysAgo = subDays(now, 60);

    // Current period transactions
    const currentTransactions = (transactions ?? [])
      .filter((t): t is Transaction => t !== null)
      .filter((t) => {
        try {
          if (!t?.date) return false;
          const date = new Date(t.date);
          return date >= startOfDay(thirtyDaysAgo) && date <= endOfDay(now);
        } catch (error) {
          console.error("Error filtering transaction:", error);
          return false;
        }
      });

    const currentIncome = currentTransactions
      .filter((t) => t?.type === "income")
      .reduce((sum, t) => sum + (t?.amount ?? 0), 0);

    const currentExpenses = currentTransactions
      .filter((t) => t?.type === "expense")
      .reduce((sum, t) => sum + (t?.amount ?? 0), 0);

    // Previous period transactions
    const previousTransactions = (transactions ?? [])
      .filter((t): t is Transaction => t !== null)
      .filter((t) => {
        try {
          if (!t?.date) return false;
          const date = new Date(t.date);
          return (
            date >= startOfDay(sixtyDaysAgo) && date < startOfDay(thirtyDaysAgo)
          );
        } catch (error) {
          console.error("Error filtering transaction:", error);
          return false;
        }
      });

    const previousIncome = previousTransactions
      .filter((t) => t?.type === "income")
      .reduce((sum, t) => sum + (t?.amount ?? 0), 0);

    const previousExpenses = previousTransactions
      .filter((t) => t?.type === "expense")
      .reduce((sum, t) => sum + (t?.amount ?? 0), 0);

    const netIncome = currentIncome - currentExpenses;
    const previousNetIncome = previousIncome - previousExpenses;

    const percentageChange =
      previousNetIncome === 0
        ? 100
        : ((netIncome - previousNetIncome) / Math.abs(previousNetIncome)) * 100;

    return {
      netIncome,
      previousNetIncome,
      percentageChange,
      currentIncomeTransactions: currentTransactions.filter(
        (t) => t?.type === "income"
      ),
      currentExpenseTransactions: currentTransactions.filter(
        (t) => t?.type === "expense"
      ),
    };
  }, [transactions]);

  return (
    <Card className="flex h-[400px] flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Monthly Overview
          </CardTitle>
          <p className="text-xs text-muted-foreground">Last 30 days summary</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold tracking-tight">
            {formatCurrency(Math.abs(netIncome))}
          </div>
          <span
            className={cn(
              "text-sm font-medium",
              netIncome >= 0
                ? "text-green-600 dark:text-green-500"
                : "text-red-500 dark:text-red-500"
            )}
          >
            {netIncome >= 0 ? "saved" : "overspent"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
        <div className="px-6 pb-4 flex items-center gap-2 border-b">
          {percentageChange > 0 ? (
            <ArrowUpIcon className="h-4 w-4 text-green-600 dark:text-green-500" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-500 dark:text-red-500" />
          )}
          <p
            className={cn(
              "text-sm font-medium",
              percentageChange > 0
                ? "text-green-600 dark:text-green-500"
                : "text-red-500 dark:text-red-500"
            )}
          >
            {Math.abs(percentageChange).toFixed(1)}%{" "}
            <span className="text-muted-foreground font-normal">
              {netIncome >= 0
                ? percentageChange > 0
                  ? "more savings than last month"
                  : "less savings than last month"
                : percentageChange > 0
                  ? "more overspent than last month"
                  : "less overspent than last month"}
            </span>
          </p>
        </div>

        <Tabs
          value={selectedTab}
          onValueChange={(value) =>
            setSelectedTab(value as "income" | "expenses")
          }
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="px-6 pt-3">
            <TabsList className="h-9 w-full grid grid-cols-2 p-1">
              <TabsTrigger
                value="income"
                className="data-[state=active]:bg-background text-sm "
              >
                Income ({currentIncomeTransactions.length})
              </TabsTrigger>
              <TabsTrigger
                value="expenses"
                className="data-[state=active]:bg-background text-sm "
              >
                Expenses ({currentExpenseTransactions.length})
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="income" className="overflow-hidden flex-1">
            <ScrollArea className="h-full px-6">
              <div className="space-y-2 py-2 divide-y divide-border/30">
                {currentIncomeTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between pt-2 first:pt-0"
                  >
                    <div>
                      <div className="font-medium text-sm">
                        {transaction.description}
                      </div>
                      <div className="text-xs text-muted-foreground/70">
                        {format(new Date(transaction.date), "dd MMM yyyy")}
                      </div>
                    </div>
                    <div className="font-medium text-sm text-green-600 dark:text-green-500">
                      +{formatCurrency(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="expenses" className="overflow-hidden flex-1">
            <ScrollArea className="h-full px-6">
              <div className="space-y-2 py-2 divide-y divide-border/30">
                {currentExpenseTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between pt-2 first:pt-0"
                  >
                    <div>
                      <div className="font-medium text-sm">
                        {transaction.description}
                      </div>
                      <div className="text-xs text-muted-foreground/70">
                        {format(new Date(transaction.date), "dd MMM yyyy")}
                      </div>
                    </div>
                    <div className="font-medium text-sm text-red-500 dark:text-red-500">
                      -{formatCurrency(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
