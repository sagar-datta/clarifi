"use client";

import { useState, useMemo, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { addDays, format, isWithinInterval, startOfDay } from "date-fns";
import { formatCurrency } from "@/app/lib/utils";
import { groupTransactions } from "./utils";
import { ScrollArea } from "@/app/components/ui/scroll-area/ScrollArea";
import { Skeleton } from "@/app/components/ui/skeleton/Skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible/Collapsible";
import { DateRangePicker } from "@/app/components/ui/date-range-picker/DateRangePicker";
import {
  useTransactionsQuery,
  getTransactionsFromQuery,
} from "@/app/lib/hooks/useTransactionsQuery";

export function TransactionsWidgetContent() {
  const { data, isLoading, error } = useTransactionsQuery();
  const transactions = getTransactionsFromQuery(data);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const getFilteredTransactions = useCallback(
    (start: Date, end: Date) => {
      return transactions
        .filter((transaction) => {
          try {
            const date = startOfDay(new Date(transaction.date));
            return isWithinInterval(date, { start, end });
          } catch (error) {
            console.error("Error filtering transaction:", error);
            return false;
          }
        })
        .sort((a, b) => {
          try {
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

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0 pb-4 sm:pb-2">
        <div className="space-y-1.5">
          <h3 className="text-lg sm:text-base font-semibold">
            Recent Transactions
          </h3>
          <p className="text-sm sm:text-xs text-muted-foreground">
            Your financial activity at a glance
          </p>
        </div>
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          className="w-full touch:min-h-[48px] sm:w-auto"
        />
      </div>
      <ScrollArea className="h-full">
        {isLoading ? (
          // Loading skeletons with better visual hierarchy
          <div className="space-y-4 py-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="mb-6 last:mb-0">
                <div className="mb-2 flex items-center justify-between">
                  <Skeleton className="h-6 sm:h-5 w-[120px] sm:w-[100px]" />
                  <Skeleton className="h-5 sm:h-4 w-[70px] sm:w-[60px]" />
                </div>
                <div className="space-y-4 sm:space-y-3">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-lg bg-muted/30 dark:bg-muted/10 p-4 sm:p-3"
                    >
                      <div className="space-y-2 sm:space-y-1">
                        <Skeleton className="h-5 sm:h-4 w-[140px] sm:w-[120px] dark:bg-muted/20" />
                        <Skeleton className="h-4 sm:h-3 w-[100px] sm:w-[80px] dark:bg-muted/20" />
                      </div>
                      <Skeleton className="h-5 sm:h-4 w-[70px] sm:w-[60px] dark:bg-muted/20" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : filteredAndSortedTransactions.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center p-6 sm:p-4">
            <div className="space-y-2">
              <p className="text-base sm:text-sm text-muted-foreground">
                {transactions.length === 0
                  ? "No transactions found"
                  : `No transactions in the last ${dateRange.to.toLocaleDateString().split("T")[0] === dateRange.from.toLocaleDateString().split("T")[0] ? dateRange.to.toLocaleDateString().split("T")[1].split(":")[0] + " hours" : dateRange.to.toLocaleDateString().split("T")[0] + " days"}`}
              </p>
              {error && (
                <p className="text-base sm:text-sm text-red-500">
                  Error: {error.message}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-5 sm:space-y-4 py-2">
            {Object.entries(groupedTransactions).map(([group, transactions]) =>
              transactions.length > 0 ? (
                <Collapsible
                  key={group}
                  defaultOpen
                  className="mb-5 sm:mb-4 last:mb-0"
                >
                  <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg p-3 @supports (hover: none) and (pointer: coarse):p-3 sm:p-2 text-base @supports (hover: none) and (pointer: coarse):text-base sm:text-sm font-medium @supports (hover: none) and (pointer: coarse):bg-primary/10 sm:hover:bg-accent/50 bg-primary/10 sm:bg-inherit transition-colors sm:dark:hover:bg-accent/40 min-h-[48px] @supports (hover: none) and (pointer: coarse):min-h-[48px] sm:min-h-[40px]">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <h4 className="capitalize text-primary">
                        {group === "older"
                          ? transactions.every(
                              (t, i, arr) =>
                                i === 0 ||
                                new Date(t.date).getMonth() ===
                                  new Date(arr[0].date).getMonth()
                            )
                            ? format(new Date(transactions[0].date), "MMMM")
                            : "Previous Months"
                          : group === "thisWeek"
                            ? "This Week"
                            : group === "thisMonth"
                              ? format(new Date(), "MMMM")
                              : group}
                      </h4>
                      <div className="flex items-center gap-2 text-sm sm:text-xs text-primary/60">
                        <span className="hidden sm:inline">•</span>
                        <span>{transactions.length} items</span>
                      </div>
                    </div>
                    <ChevronDown className="h-5 w-5 sm:h-4 sm:w-4 text-primary transition-all duration-200 ease-in-out group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 sm:space-y-2 pt-3 sm:pt-2 px-3 sm:px-2">
                    <div className="space-y-3 sm:space-y-2 divide-y divide-border">
                      {transactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 sm:pt-2 first:pt-0 gap-2 sm:gap-0 min-h-[64px] sm:min-h-[48px]"
                        >
                          <div className="space-y-1 sm:space-y-0.5">
                            <div className="font-medium text-base sm:text-sm text-foreground">
                              {transaction.description}
                            </div>
                            <div className="text-sm sm:text-xs text-muted-foreground">
                              {format(
                                new Date(transaction.date),
                                "dd MMM yyyy"
                              )}
                            </div>
                          </div>
                          <div
                            className={cn(
                              "font-medium text-base sm:text-sm",
                              transaction.type === "expense"
                                ? "text-red-500 dark:text-red-500"
                                : "text-green-600 dark:text-green-500"
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
    </>
  );
}
