"use client";

import { AddTransactionDialog } from "@/app/components/shared/transactions/add-transaction-dialog";
import { Button } from "@/app/components/ui/button/Button";
import { Plus } from "lucide-react";

export function TransactionsHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <AddTransactionDialog>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </AddTransactionDialog>
    </div>
  );
}
