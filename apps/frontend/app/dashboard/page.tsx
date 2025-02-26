import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | ClariFi",
  description: "Overview of your financial status",
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">
        Overview of your financial status
      </p>
    </div>
  );
}
