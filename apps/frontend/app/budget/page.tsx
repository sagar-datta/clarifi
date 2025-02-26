import { Metadata } from "next";
import { PageLayout } from "../components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Budget | ClariFi",
  description: "Track your budgets and spending",
};

export default function BudgetPage() {
  return (
    <PageLayout>
      <div>
        <h1 className="text-3xl font-bold">Budget</h1>
        <p className="text-muted-foreground mt-2">
          Track your budgets and spending
        </p>
      </div>
    </PageLayout>
  );
}
