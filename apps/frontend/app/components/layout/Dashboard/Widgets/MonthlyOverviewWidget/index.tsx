"use client";

import { Card, CardContent } from "@/app/components/ui/card/Card";
import { Tabs, TabsContent } from "@/app/components/ui/tabs/Tabs";
import { useState } from "react";
import { MonthlyOverviewHeader } from "./components/MonthlyOverviewHeader";
import { PercentageChangeIndicator } from "./components/PercentageChangeIndicator";
import { TabsNavigation } from "./components/TabsNavigation";
import { TransactionList } from "./components/TransactionList";
import { useMonthlyOverview } from "./hooks/useMonthlyOverview";

export function MonthlyOverviewWidget() {
  const [selectedTab, setSelectedTab] = useState<"income" | "expenses">(
    "income"
  );
  const {
    netIncome,
    percentageChange,
    currentIncomeTransactions,
    currentExpenseTransactions,
  } = useMonthlyOverview();

  return (
    <Card className="flex h-[400px] flex-col">
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
