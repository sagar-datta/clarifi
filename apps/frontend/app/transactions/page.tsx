import { Metadata } from "next";
import { PageLayout } from "../components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Transactions | ClariFi",
  description: "View and manage your transactions",
};

export default function TransactionsPage() {
  return (
    <PageLayout>
      <div>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-muted-foreground mt-2">
          View and manage your transactions
        </p>
      </div>
    </PageLayout>
  );
}
