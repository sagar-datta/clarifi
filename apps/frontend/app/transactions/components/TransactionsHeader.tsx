import { Transaction } from "@/app/lib/redux/slices/transactions/types";
import { TransactionsHeaderActions } from "./TransactionsHeaderActions";

interface TransactionsHeaderProps {
  filteredTransactions: Transaction[];
}

export function TransactionsHeader({
  filteredTransactions,
}: TransactionsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg bg-card p-6 shadow-sm border">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track your financial activity
        </p>
      </div>
      <TransactionsHeaderActions filteredTransactions={filteredTransactions} />
    </div>
  );
}
