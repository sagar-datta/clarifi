"use client";

import { useTransactionsQuery } from "@/app/lib/hooks/useTransactionsQuery";
import { useTransactionsLoading } from "@/app/lib/redux/hooks/transactions";
import { WidgetGrid, Widget } from "./WidgetGrid";
import { TransactionsWidget } from "@/app/components/layout/Dashboard/Widgets/TransactionsWidget/index";
import { MonthlyOverviewWidget } from "@/app/components/layout/Dashboard/Widgets/MonthlyOverviewWidget/index";
import { SpendingByCategoryWidget } from "@/app/components/layout/Dashboard/Widgets/SpendingByCategoryWidget/index";
import { Card } from "@/app/components/ui/card/Card";
import { Plus, Database } from "lucide-react";

export function DashboardWidgets() {
  const { data: transactions = [], isLoading: queryLoading } =
    useTransactionsQuery();
  const reduxLoading = useTransactionsLoading();

  // Consider the dashboard loading if either Redux or React Query is loading
  const isLoading = reduxLoading || queryLoading;

  // Don't show the welcome screen while data is still loading
  // This ensures we only show it when we've confirmed there are no transactions
  if (!isLoading && transactions.length === 0) {
    return (
      <Card className="flex min-h-[400px] flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center max-w-[420px] mx-auto space-y-8">
          <h3 className="text-2xl font-semibold">Welcome to ClariFi</h3>
          <div className="w-full space-y-8">
            <p className="text-base text-muted-foreground text-center">
              Start tracking your finances in two ways:
            </p>
            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-background">
                  <Plus className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-medium">
                    Add transactions manually
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Use the plus button in the top bar to add your transactions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-background">
                  <Database className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-medium">Use sample data</p>
                  <p className="text-sm text-muted-foreground">
                    Click the database icon to populate test transactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // If loading or has transactions, show the regular dashboard
  return (
    <WidgetGrid>
      <Widget>
        <TransactionsWidget />
      </Widget>
      <Widget>
        <MonthlyOverviewWidget />
      </Widget>
      <Widget fullWidth>
        <SpendingByCategoryWidget />
      </Widget>
    </WidgetGrid>
  );
}
