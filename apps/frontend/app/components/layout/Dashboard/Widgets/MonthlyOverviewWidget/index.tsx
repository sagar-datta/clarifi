"use client";

import { Card, CardContent } from "@/app/components/ui/card/Card";
import { Tabs, TabsContent } from "@/app/components/ui/tabs/Tabs";
import { useState } from "react";
import { MonthlyOverviewHeader } from "./components/MonthlyOverviewHeader";
import { PercentageChangeIndicator } from "./components/PercentageChangeIndicator";
import { TabsNavigation } from "./components/TabsNavigation";
import { TransactionList } from "./components/TransactionList";
import { useMonthlyOverviewQuery } from "@/app/lib/hooks/useMonthlyOverviewQuery";
import { Skeleton } from "@/app/components/ui/skeleton/Skeleton";

export function MonthlyOverviewWidget() {
  const [selectedTab, setSelectedTab] = useState<"income" | "expenses">(
    "income"
  );
  const { data, isLoading } = useMonthlyOverviewQuery();

  if (isLoading) {
    return (
      <Card className="flex h-[600px] sm:h-[400px] flex-col">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="space-y-1 text-right">
              <Skeleton className="h-8 w-24 ml-auto" />
              <Skeleton className="h-4 w-16 ml-auto" />
            </div>
          </div>
          <Skeleton className="h-8 w-full" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  const {
    netIncome,
    percentageChange,
    currentIncomeTransactions,
    currentExpenseTransactions,
  } = data;

  return (
    <Card className="flex h-[600px] sm:h-[400px]  flex-col">
      <MonthlyOverviewHeader netIncome={netIncome} />
      <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
        <PercentageChangeIndicator
          percentageChange={percentageChange}
          netIncome={netIncome}
        />
        <Tabs
          value={selectedTab}
          onValueChange={(value) =>
            setSelectedTab(value as "income" | "expenses")
          }
          className="flex flex-1 flex-col overflow-hidden"
        >
          <TabsNavigation
            incomeCount={currentIncomeTransactions.length}
            expenseCount={currentExpenseTransactions.length}
          />
          <TabsContent value="income" className="overflow-hidden flex-1">
            <TransactionList
              transactions={currentIncomeTransactions}
              type="income"
            />
          </TabsContent>
          <TabsContent value="expenses" className="overflow-hidden flex-1">
            <TransactionList
              transactions={currentExpenseTransactions}
              type="expenses"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default MonthlyOverviewWidget;
