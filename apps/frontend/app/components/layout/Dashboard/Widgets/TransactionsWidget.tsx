"use client";

import { useEffect, useState, useMemo } from "react";
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
import { Calendar } from "@/app/components/ui/calendar/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover/Popover";
import { ChevronDown, CalendarIcon } from "lucide-react";
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

const datePresets = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
] as const;

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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Filter and sort transactions by date
  const filteredAndSortedTransactions = useMemo(() => {
    const start = startOfDay(dateRange.from);
    const end = startOfDay(dateRange.to);

    return [...transactions]
      .filter((transaction) => {
        const date = startOfDay(new Date(transaction.date));
        return isWithinInterval(date, { start, end });
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, dateRange]);

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
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">
            Recent Transactions
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Your financial activity at a glance
          </p>
        </div>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-8 w-[240px] justify-center text-center text-xs font-normal",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-3 w-3" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "d MMM")} -{" "}
                    {format(dateRange.to, "d MMM, yyyy")}
                  </>
                ) : (
                  format(dateRange.from, "d MMM, yyyy")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <div className="space-y-4 p-3">
              <div className="flex justify-center gap-2">
                {datePresets.map((preset) => (
                  <Button
                    key={preset.days}
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => {
                      const to = new Date();
                      const from = addDays(to, -preset.days);
                      setDateRange({ from, to });
                      setIsCalendarOpen(false);
                    }}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={{ from: dateRange?.from, to: dateRange?.to }}
                  onSelect={(range) => {
                    setDateRange({
                      from: range?.from || dateRange.from,
                      to: range?.to || range?.from || dateRange.to,
                    });
                  }}
                  numberOfMonths={2}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <Separator className="mb-2" />
      <CardContent className="p-0">
        <ScrollArea className="h-[350px] px-4">
          <div className="space-y-1 py-2">
            {isLoadingState ? (
              // Loading skeletons with better visual hierarchy
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="mb-6 last:mb-0">
                  <div className="mb-2 flex items-center justify-between">
                    <Skeleton className="h-5 w-[100px]" />
                    <Skeleton className="h-4 w-[60px]" />
                  </div>
                  <div className="space-y-3">
                    {[1, 2].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-lg bg-muted/30 p-3"
                      >
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-[120px]" />
                          <Skeleton className="h-3 w-[80px]" />
                        </div>
                        <Skeleton className="h-4 w-[60px]" />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : filteredAndSortedTransactions.length === 0 ? (
              <div className="flex h-[300px] flex-col items-center justify-center gap-4 text-center">
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
              <>
                {Object.entries(groupedTransactions).map(
                  ([group, transactions]) =>
                    transactions.length > 0 ? (
                      <Collapsible
                        key={group}
                        defaultOpen
                        className="mb-4 last:mb-0"
                      >
                        <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg p-2 text-sm font-medium hover:bg-accent">
                          <div className="flex items-center gap-3">
                            <h4 className="capitalize">{group}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>•</span>
                              <span>{transactions.length} items</span>
                            </div>
                          </div>
                          <ChevronDown className="h-4 w-4 text-muted-foreground transition-all duration-200 ease-in-out group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-2 pt-2">
                          {transactions.map((transaction) => (
                            <div
                              key={transaction.id}
                              className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-accent"
                            >
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                  {transaction.description}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{transaction.category}</span>
                                  <span>•</span>
                                  <span className="text-muted-foreground/60">
                                    {formatDate(transaction.date)}
                                  </span>
                                </div>
                              </div>
                              <div
                                className={cn(
                                  "text-sm font-medium tabular-nums",
                                  transaction.type === "expense"
                                    ? "text-red-500"
                                    : "text-green-500"
                                )}
                              >
                                {transaction.type === "expense" ? "-" : "+"}$
                                {transaction.amount.toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ) : null
                )}
              </>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
