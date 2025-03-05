import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTransactionActions } from "../redux/hooks";
import { Transaction } from "../redux/slices/transactions/types";

const TRANSACTIONS_QUERY_KEY = ["transactions"] as const;

export function useTransactionsQuery() {
  const { fetchAll } = useTransactionActions();

  return useQuery({
    queryKey: TRANSACTIONS_QUERY_KEY,
    queryFn: fetchAll,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep unused data in cache for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    select: (data) => getTransactionsFromQuery(data),
  });
}

export function usePrefetchTransactions() {
  const queryClient = useQueryClient();
  const { fetchAll } = useTransactionActions();

  return () => {
    return queryClient.prefetchQuery({
      queryKey: TRANSACTIONS_QUERY_KEY,
      queryFn: fetchAll,
    });
  };
}

// Helper to get typed transactions from the query result
export function getTransactionsFromQuery(data: unknown): Transaction[] {
  // Handle Redux thunk response structure
  if (data && typeof data === "object" && "payload" in data) {
    data = (data as { payload: unknown }).payload;
  }

  if (!data || !Array.isArray(data)) {
    return [];
  }

  return (data as Transaction[]).filter((t): t is Transaction => t !== null);
}
