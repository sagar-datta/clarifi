import { useQuery } from "@tanstack/react-query";
import { useTransactionActions } from "../redux/hooks";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { getTransactionsFromQuery } from "./useTransactionsQuery";

const MONTHLY_OVERVIEW_QUERY_KEY = ["monthly-overview"] as const;

export function useMonthlyOverviewQuery() {
  const { fetchAll } = useTransactionActions();

  return useQuery({
    queryKey: MONTHLY_OVERVIEW_QUERY_KEY,
    queryFn: fetchAll,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep unused data in cache for 30 minutes
    refetchOnWindowFocus: false,
    select: (data) => {
      const transactions = getTransactionsFromQuery(data);
      const now = new Date();
      const thirtyDaysAgo = subDays(now, 30);
      const sixtyDaysAgo = subDays(now, 60);

      // Current period transactions
      const currentTransactions = transactions.filter((t) => {
        try {
          if (!t?.date) return false;
          const date = new Date(t.date);
          return date >= startOfDay(thirtyDaysAgo) && date <= endOfDay(now);
        } catch {
          return false;
        }
      });

      const currentIncome = currentTransactions
        .filter((t) => t?.type === "income")
        .reduce((sum, t) => sum + (t?.amount ?? 0), 0);

      const currentExpenses = currentTransactions
        .filter((t) => t?.type === "expense")
        .reduce((sum, t) => sum + (t?.amount ?? 0), 0);

      // Previous period transactions
      const previousTransactions = transactions.filter((t) => {
        try {
          if (!t?.date) return false;
          const date = new Date(t.date);
          return (
            date >= startOfDay(sixtyDaysAgo) && date < startOfDay(thirtyDaysAgo)
          );
        } catch {
          return false;
        }
      });

      const previousIncome = previousTransactions
        .filter((t) => t?.type === "income")
        .reduce((sum, t) => sum + (t?.amount ?? 0), 0);

      const previousExpenses = previousTransactions
        .filter((t) => t?.type === "expense")
        .reduce((sum, t) => sum + (t?.amount ?? 0), 0);

      const netIncome = currentIncome - currentExpenses;
      const previousNetIncome = previousIncome - previousExpenses;

      const percentageChange =
        previousNetIncome === 0
          ? 100
          : ((netIncome - previousNetIncome) / Math.abs(previousNetIncome)) *
            100;

      return {
        netIncome,
        previousNetIncome,
        percentageChange,
        currentIncomeTransactions: currentTransactions.filter(
          (t) => t?.type === "income"
        ),
        currentExpenseTransactions: currentTransactions.filter(
          (t) => t?.type === "expense"
        ),
      };
    },
  });
}
