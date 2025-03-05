import { Metadata } from "next";
import { PageLayout } from "../components/layout/PageLayout";
import { TransactionsContent } from "./components/TransactionsContent";

export const metadata: Metadata = {
  title: "Transactions | ClariFi",
  description: "Manage and track your financial activity",
};

export default function TransactionsPage() {
  return (
    <PageLayout>
      <TransactionsContent />
    </PageLayout>
  );
}
