"use client";

import { AddTransactionDialog } from "@/app/components/shared/transactions/add-transaction-dialog";
import { Button } from "@/app/components/ui/button/Button";
import { Download, Plus } from "lucide-react";
import { format } from "date-fns";
import { Transaction } from "@/app/lib/redux/slices/transactions/types";
import { useToast } from "@/app/components/ui/toast/use-toast";

interface TransactionsHeaderProps {
  filteredTransactions: Transaction[];
}

export function TransactionsHeader({
  filteredTransactions,
}: TransactionsHeaderProps) {
  const { toast } = useToast();

  const handleExport = () => {
    try {
      // Create CSV content
      const csvContent = [
        // Headers
        ["Date", "Description", "Category", "Type", "Amount"].join(","),
        // Data rows
        ...filteredTransactions.map((t) =>
          [
            format(new Date(t.date), "yyyy-MM-dd"),
            `"${t.description.replace(/"/g, '""')}"`, // Escape quotes and handle commas
            `"${t.category}"`,
            t.type,
            t.amount.toFixed(2),
          ].join(",")
        ),
      ].join("\n");

      // Create and trigger download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `transactions_export_${format(new Date(), "yyyy-MM-dd")}.csv`;
      link.click();

      toast({
        title: "Export successful",
        description: `${filteredTransactions.length} transactions exported to CSV`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your transactions",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg bg-card p-6 shadow-sm border">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track your financial activity
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex"
          onClick={handleExport}
          disabled={filteredTransactions.length === 0}
        >
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
