import { Transaction } from "@/app/lib/redux/slices/transactions/types";
import { format } from "date-fns";

export type TransactionGroups = {
  [key: string]: Transaction[];
};

export const groupTransactions = (
  transactions: Transaction[]
): TransactionGroups => {
  return transactions.reduce((groups, transaction) => {
    const date = new Date(transaction.date);
    const monthKey = format(date, "yyyy-MM");

    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }

    groups[monthKey].push(transaction);
    return groups;
  }, {} as TransactionGroups);
};

export const getGroupDisplayName = (
  group: string,
  transactions: Transaction[]
): string => {
  if (!transactions.length) return group;
  return format(new Date(transactions[0].date), "MMMM yyyy");
};
