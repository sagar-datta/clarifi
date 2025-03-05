import { Transaction } from "@/app/lib/redux/slices/transactions/types";

export type TransactionGroups = {
  today: Transaction[];
  yesterday: Transaction[];
  thisWeek: Transaction[];
  thisMonth: Transaction[];
  older: Transaction[];
};
