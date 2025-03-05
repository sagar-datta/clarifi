import { Transaction } from "@/app/lib/redux/slices/transactions/types";
import { TransactionGroups } from "./types";

// Helper function to format dates
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // If it's today
  if (date.toDateString() === today.toDateString()) {
    return `Today, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }
  // If it's yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }
  // If it's this year
  if (date.getFullYear() === today.getFullYear()) {
    return date.toLocaleDateString([], {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  // If it's a different year
  return date.toLocaleDateString([], {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const groupTransactions = (
  transactions: Transaction[]
): TransactionGroups => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(today.getDate() - today.getDay());
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  return transactions.reduce(
    (groups, transaction) => {
      const date = new Date(transaction.date);
      date.setHours(0, 0, 0, 0);

      if (date.getTime() === today.getTime()) {
        groups.today.push(transaction);
      } else if (date.getTime() === yesterday.getTime()) {
        groups.yesterday.push(transaction);
      } else if (date >= thisWeekStart && date < yesterday) {
        groups.thisWeek.push(transaction);
      } else if (date >= thisMonthStart && date < thisWeekStart) {
        groups.thisMonth.push(transaction);
      } else {
        groups.older.push(transaction);
      }

      return groups;
    },
    {
      today: [] as Transaction[],
      yesterday: [] as Transaction[],
      thisWeek: [] as Transaction[],
      thisMonth: [] as Transaction[],
      older: [] as Transaction[],
    }
  );
};
