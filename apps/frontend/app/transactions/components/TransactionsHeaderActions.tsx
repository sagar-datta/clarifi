"use client";

import { AddTransactionDialog } from "@/app/components/shared/transactions/add-transaction-dialog";
import { Button } from "@/app/components/ui/button/Button";
import { Download, Plus } from "lucide-react";
import { format } from "date-fns";
import { Transaction } from "@/app/lib/redux/slices/transactions/types";
import { useToast } from "@/app/components/ui/toast/use-toast";

interface TransactionsHeaderActionsProps {
  filteredTransactions: Transaction[];
}

export function TransactionsHeaderActions({
  filteredTransactions,
}: TransactionsHeaderActionsProps) {
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
    } catch {
      toast({
        title: "Export failed",
        description: "There was an error exporting your transactions",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        className="hidden sm:flex"
        onClick={handleExport}
        disabled={filteredTransactions.length === 0}
      >
        <Download className="mr-2 h-4 w-4" />
        Download CSV
      </Button>
      <AddTransactionDialog>
        <Button size="sm" className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </AddTransactionDialog>
    </div>
  );
}
