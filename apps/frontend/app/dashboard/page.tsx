import { Metadata } from "next";
import { PageLayout } from "../components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Dashboard | ClariFi",
  description: "Overview of your financial status",
};

export default function DashboardPage() {
  return (
    <PageLayout>
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your financial status
        </p>
      </div>
    </PageLayout>
  );
}
