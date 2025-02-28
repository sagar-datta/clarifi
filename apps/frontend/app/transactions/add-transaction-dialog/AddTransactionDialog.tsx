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

export function AddTransactionDialog({ children }: AddTransactionDialogProps) {
  const [open, setOpen] = React.useState(false);
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

  function onSubmit(data: FormValues) {
    console.log(data);
    setOpen(false);
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
