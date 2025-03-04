import { Metadata } from "next";
import { PageLayout } from "../components/layout/PageLayout";
import { WidgetGrid, Widget } from "../components/layout/Dashboard/WidgetGrid";
import { TransactionsWidget } from "../components/layout/Dashboard/Widgets/TransactionsWidget";
import { MonthlyOverviewWidget } from "../components/layout/Dashboard/Widgets/MonthlyOverviewWidget";
import { SpendingByCategoryWidget } from "../components/layout/Dashboard/Widgets/SpendingByCategoryWidget";

export const metadata: Metadata = {
  title: "Dashboard | ClariFi",
  description: "Your financial overview",
};

export default function DashboardPage() {
  return (
    <PageLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
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
