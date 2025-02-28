"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog/Dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddTransactionDialogProps } from "./types";
import { formSchema, FormValues } from "./schema";
import { TransactionForm } from "./components/TransactionForm";
import { useTransactionActions } from "@/app/lib/redux/hooks";
import { useToast } from "@/app/components/ui/toast/use-toast";

export function AddTransactionDialog({ children }: AddTransactionDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { create } = useTransactionActions();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: 0,
      category: "",
      type: "expense",
      date: new Date(),
    },
  });

  React.useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  async function onSubmit(data: FormValues) {
    try {
      await create({
        ...data,
        date: data.date.toISOString(),
      });

      toast({
        title: "Success",
        description: "Transaction added successfully",
      });

      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to add transaction",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            Add Transaction
          </DialogTitle>
        </DialogHeader>
        <TransactionForm
          form={form}
          onSubmit={onSubmit}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
