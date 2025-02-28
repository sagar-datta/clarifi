"use client";

import { AddTransactionDialog } from "@/app/components/shared/transactions/add-transaction-dialog";
import { Button } from "@/app/components/ui/button/Button";
import { Download, Plus } from "lucide-react";

export function TransactionsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg bg-card p-6 shadow-sm border">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track your financial activity
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="hidden sm:flex">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <AddTransactionDialog>
          <Button size="sm" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </AddTransactionDialog>
      </div>
    </div>
  );
}
