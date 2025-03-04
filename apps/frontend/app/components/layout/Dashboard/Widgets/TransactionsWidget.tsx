"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card/Card";
import { ScrollArea } from "@/app/components/ui/scroll-area/ScrollArea";
import { Separator } from "@/app/components/ui/separator/Separator";
import {
  useTransactions,
  useTransactionsLoading,
  useTransactionActions,
  useTransactionsError,
} from "@/app/lib/redux/hooks";
import { Transaction } from "@/app/lib/redux/slices/transactions/types";
import { Skeleton } from "@/app/components/ui/skeleton/Skeleton";
import { Button } from "@/app/components/ui/button/Button";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible/Collapsible";
import { cn } from "@/app/lib/utils";

import {
  addDays,
  format,
  isSameDay,
  isWithinInterval,
  startOfDay,
} from "date-fns";
import { DateRangePicker } from "@/app/components/ui/date-range-picker/DateRangePicker";
import { formatCurrency } from "@/app/lib/utils";

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // If it's today
  if (date.toDateString() === today.toDateString()) {
    return `Today, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }
  // If it's yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }
  // If it's this year
  if (date.getFullYear() === today.getFullYear()) {
    return date.toLocaleDateString([], {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  // If it's a different year
  return date.toLocaleDateString([], {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

type TransactionGroups = {
  today: Transaction[];
  yesterday: Transaction[];
  thisWeek: Transaction[];
  thisMonth: Transaction[];
  older: Transaction[];
};

const groupTransactions = (transactions: Transaction[]): TransactionGroups => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(today.getDate() - today.getDay());
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  return transactions.reduce(
    (groups, transaction) => {
      const date = new Date(transaction.date);
      date.setHours(0, 0, 0, 0);

      if (date.getTime() === today.getTime()) {
        groups.today.push(transaction);
      } else if (date.getTime() === yesterday.getTime()) {
        groups.yesterday.push(transaction);
      } else if (date >= thisWeekStart && date < yesterday) {
        groups.thisWeek.push(transaction);
      } else if (date >= thisMonthStart && date < thisWeekStart) {
        groups.thisMonth.push(transaction);
      } else {
        groups.older.push(transaction);
      }

      return groups;
    },
    {
      today: [] as Transaction[],
      yesterday: [] as Transaction[],
      thisWeek: [] as Transaction[],
      thisMonth: [] as Transaction[],
      older: [] as Transaction[],
    }
  );
};

export function TransactionsWidget() {
  const transactions = useTransactions() || [];
  const isLoading = useTransactionsLoading();
  const error = useTransactionsError();
  const { fetchAll, seedDummyData } = useTransactionActions();
  const [isSeedingData, setIsSeedingData] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const getFilteredTransactions = useCallback(
    (start: Date, end: Date) => {
      if (!transactions) return [];

      return [...transactions]
        .filter(
          (transaction): transaction is Transaction => transaction !== null
        )
        .filter((transaction) => {
          try {
            if (!transaction?.date) return false;
            const date = startOfDay(new Date(transaction.date));
            return isWithinInterval(date, { start, end });
          } catch (error) {
            console.error("Error filtering transaction:", error);
            return false;
          }
        })
        .sort((a, b) => {
          try {
            if (!a?.date || !b?.date) return 0;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          } catch (error) {
            console.error("Error sorting transactions:", error);
            return 0;
          }
        });
    },
    [transactions]
  );

  // Filter and sort transactions by date
  const filteredAndSortedTransactions = useMemo(() => {
    const start = startOfDay(dateRange.from);
    const end = startOfDay(dateRange.to);

    return getFilteredTransactions(start, end);
  }, [getFilteredTransactions, dateRange]);

  // Group filtered transactions
  const groupedTransactions = useMemo(
    () => groupTransactions(filteredAndSortedTransactions),
    [filteredAndSortedTransactions]
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleSeedData = async () => {
    try {
      setIsSeedingData(true);
      console.log("Starting to seed data...");
      const seedResult = await seedDummyData();
      console.log("Seed complete, fetching updated transactions...");
      // Small delay to ensure state updates
      await new Promise((resolve) => setTimeout(resolve, 500));
      await fetchAll();
      console.log("Fetch complete");
    } catch (error) {
      console.error("Failed to seed data:", error);
    } finally {
      setIsSeedingData(false);
    }
  };

  const isLoadingState = isLoading || isSeedingData;

  return (
    <Card className="flex h-[400px] flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">
            Recent Transactions
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Your financial activity at a glance
          </p>
        </div>
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </CardHeader>
      <Separator className="mb-2" />
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-4">
          {isLoadingState ? (
            // Loading skeletons with better visual hierarchy
            <div className="space-y-4 py-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="mb-6 last:mb-0">
                  <div className="mb-2 flex items-center justify-between">
                    <Skeleton className="h-5 w-[100px]" />
                    <Skeleton className="h-4 w-[60px]" />
                  </div>
                  <div className="space-y-3">
                    {[1, 2].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-lg bg-muted/30 dark:bg-muted/10 p-3"
                      >
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-[120px] dark:bg-muted/20" />
                          <Skeleton className="h-3 w-[80px] dark:bg-muted/20" />
                        </div>
                        <Skeleton className="h-4 w-[60px] dark:bg-muted/20" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAndSortedTransactions.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {transactions.length === 0
                    ? "No transactions found"
                    : `No transactions in the last ${dateRange.to.toLocaleDateString().split("T")[0] === dateRange.from.toLocaleDateString().split("T")[0] ? dateRange.to.toLocaleDateString().split("T")[1].split(":")[0] + " hours" : dateRange.to.toLocaleDateString().split("T")[0] + " days"}`}
                </p>
                {error && (
                  <p className="text-sm text-red-500">Error: {error}</p>
                )}
              </div>
              {transactions.length === 0 && (
                <Button
                  onClick={handleSeedData}
                  variant="outline"
                  size="sm"
                  disabled={isLoadingState}
                  className="h-8 text-xs"
                >
                  Add Sample Transactions
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4 py-2">
              {Object.entries(groupedTransactions).map(
                ([group, transactions]) =>
                  transactions.length > 0 ? (
                    <Collapsible
                      key={group}
                      defaultOpen
                      className="mb-4 last:mb-0"
                    >
                      <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg p-2 text-sm font-medium hover:bg-accent/50 transition-colors dark:hover:bg-accent/40">
                        <div className="flex items-center gap-3">
                          <h4 className="capitalize text-foreground">
                            {group}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>•</span>
                            <span>{transactions.length} items</span>
                          </div>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground transition-all duration-200 ease-in-out group-data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 pt-2 pl-2 pr-2">
                        <div className="space-y-2 divide-y divide-border">
                          {transactions.map((transaction) => (
                            <div
                              key={transaction.id}
                              className="flex items-center justify-between pt-2 first:pt-0"
                            >
                              <div>
                                <div className="font-medium text-sm text-foreground">
                                  {transaction.description}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {format(
                                    new Date(transaction.date),
                                    "dd MMM yyyy"
                                  )}
                                </div>
                              </div>
                              <div
                                className={cn(
                                  "font-medium text-sm",
                                  transaction.type === "expense"
                                    ? "text-red-500 dark:text-red-400"
                                    : "text-green-500 dark:text-green-400"
                                )}
                              >
                                {transaction.type === "expense" ? "-" : "+"}
                                {formatCurrency(transaction.amount)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : null
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
