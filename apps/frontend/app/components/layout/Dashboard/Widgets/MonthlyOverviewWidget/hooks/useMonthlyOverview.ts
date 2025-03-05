import { useAppSelector } from "@/app/lib/redux/hooks";
import { selectTransactions } from "@/app/lib/redux/slices/transactions/selectors";
import { Transaction } from "@/app/lib/redux/slices/transactions/types";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { useMemo } from "react";

export function useMonthlyOverview() {
  const rawTransactions = useAppSelector(selectTransactions);

  const transactions = useMemo(() => rawTransactions ?? [], [rawTransactions]);

  return useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = subDays(now, 30);
    const sixtyDaysAgo = subDays(now, 60);

    // Current period transactions
    const currentTransactions = (transactions ?? [])
      .filter((t): t is Transaction => t !== null)
      .filter((t) => {
        try {
          if (!t?.date) return false;
          const date = new Date(t.date);
          return date >= startOfDay(thirtyDaysAgo) && date <= endOfDay(now);
        } catch (error) {
          console.error("Error filtering transaction:", error);
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
    const previousTransactions = (transactions ?? [])
      .filter((t): t is Transaction => t !== null)
      .filter((t) => {
        try {
          if (!t?.date) return false;
          const date = new Date(t.date);
          return (
            date >= startOfDay(sixtyDaysAgo) && date < startOfDay(thirtyDaysAgo)
          );
        } catch (error) {
          console.error("Error filtering transaction:", error);
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
        : ((netIncome - previousNetIncome) / Math.abs(previousNetIncome)) * 100;

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
  }, [transactions]);
}
