import { Metadata } from "next";
import { PageLayout } from "../components/layout/PageLayout";
import { WidgetGrid, Widget } from "../components/layout/Dashboard/WidgetGrid";
import { TransactionsWidget } from "@/app/components/layout/Dashboard/Widgets/TransactionsWidget/index";
import { MonthlyOverviewWidget } from "@/app/components/layout/Dashboard/Widgets/MonthlyOverviewWidget/index";
import { SpendingByCategoryWidget } from "@/app/components/layout/Dashboard/Widgets/SpendingByCategoryWidget/index";
import { DashboardDataPrefetch } from "./DashboardDataPrefetch";

export const metadata: Metadata = {
  title: "Dashboard | ClariFi",
  description: "Your financial overview",
};

export default function DashboardPage() {
  return (
    <PageLayout>
      <DashboardDataPrefetch />
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Your financial overview at a glance
          </p>
        </div>
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
      </div>
    </PageLayout>
  );
}
