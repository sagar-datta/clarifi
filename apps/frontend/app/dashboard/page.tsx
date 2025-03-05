"use client";

import { PageLayout } from "../components/layout/PageLayout";
import { DashboardDataPrefetch } from "./DashboardDataPrefetch";
import { DashboardWidgets } from "../components/layout/Dashboard/DashboardWidgets";

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
        <DashboardWidgets />
      </div>
    </PageLayout>
  );
}
