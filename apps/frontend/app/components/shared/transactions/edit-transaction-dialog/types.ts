import { Transaction } from "@/app/lib/redux/slices/transactions/types";

export interface EditTransactionDialogProps {
  transaction: Transaction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface FormValues {
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: Date;
}
