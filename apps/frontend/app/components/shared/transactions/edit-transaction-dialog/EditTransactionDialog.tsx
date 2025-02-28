"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog/Dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditTransactionDialogProps } from "./types";
import { formSchema, FormValues } from "./schema";
import { TransactionForm } from "../add-transaction-dialog/components/TransactionForm";
import { useTransactionActions } from "@/app/lib/redux/hooks";
import { useToast } from "@/app/components/ui/toast/use-toast";

export function EditTransactionDialog({
  transaction,
  open,
  onOpenChange,
}: EditTransactionDialogProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { update, fetchAll } = useTransactionActions();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
      date: new Date(transaction.date),
    },
  });

  React.useEffect(() => {
    if (!open) {
      form.reset();
      setIsSubmitting(false);
    }
  }, [open, form]);

  React.useEffect(() => {
    // Update form values when transaction changes
    form.reset({
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
      date: new Date(transaction.date),
    });
  }, [transaction, form]);

  async function onSubmit(data: FormValues) {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const result = await update(transaction.id, {
        description: data.description,
        amount: data.amount,
        category: data.category,
        type: data.type,
        date: data.date.toISOString(),
      });

      // Redux toolkit unwraps the promise and throws if rejected
      // If we get here, the update was successful
      await fetchAll(); // Refresh transactions list

      toast({
        title: "Success",
        description: "Transaction updated successfully",
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update transaction",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            Edit Transaction
          </DialogTitle>
        </DialogHeader>
        <TransactionForm
          form={form}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
}
