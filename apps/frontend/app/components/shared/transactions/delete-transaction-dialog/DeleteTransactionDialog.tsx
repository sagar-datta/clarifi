"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button/Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog/AlertDialog";
import { Transaction } from "@/app/lib/redux/slices/transactions/types";
import { useTransactionActions } from "@/app/lib/redux/hooks";
import { useToast } from "@/app/components/ui/toast/use-toast";
import { formatCurrency } from "@/app/lib/utils";

interface DeleteTransactionDialogProps {
  transaction: Transaction;
}

export function DeleteTransactionDialog({
  transaction,
}: DeleteTransactionDialogProps) {
  const { remove } = useTransactionActions();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await remove(transaction.id);
      toast({
        title: "Transaction deleted",
        description: "The transaction has been successfully deleted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the transaction",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
          <span className="sr-only">Delete transaction</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this transaction?
            <div className="mt-4 rounded-lg border bg-muted/50 p-4">
              <div className="grid gap-2 text-sm">
                <div className="grid grid-cols-2">
                  <span className="font-medium">Amount:</span>
                  <span
                    className={
                      transaction.type === "expense"
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {transaction.type === "expense" ? "-" : "+"}
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-medium">Description:</span>
                  <span>{transaction.description}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-medium">Category:</span>
                  <span>{transaction.category}</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-destructive">
              This action cannot be undone.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
