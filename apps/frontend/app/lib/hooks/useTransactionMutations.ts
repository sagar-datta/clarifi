import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTransactionActions } from "../redux/hooks";
import {
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from "../redux/slices/transactions/types";

// Query keys that need to be invalidated when transactions change
const TRANSACTION_RELATED_QUERY_KEYS = [
  ["transactions"],
  ["monthly-overview"],
  ["spending-chart"],
] as const;

export function useTransactionMutations() {
  const queryClient = useQueryClient();
  const { create, update, remove, deleteAll, seedDummyData } =
    useTransactionActions();

  // Helper to invalidate all transaction-related queries
  const invalidateTransactionQueries = () => {
    return Promise.all(
      TRANSACTION_RELATED_QUERY_KEYS.map((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      )
    );
  };

  const createMutation = useMutation({
    mutationFn: (data: CreateTransactionDTO) => create(data),
    onSuccess: () => invalidateTransactionQueries(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTransactionDTO }) =>
      update(id, data),
    onSuccess: () => invalidateTransactionQueries(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove(id),
    onSuccess: () => invalidateTransactionQueries(),
  });

  const deleteAllMutation = useMutation({
    mutationFn: () => deleteAll(),
    onSuccess: () => invalidateTransactionQueries(),
  });

  const seedMutation = useMutation({
    mutationFn: () => seedDummyData(),
    onSuccess: () => invalidateTransactionQueries(),
  });

  return {
    createTransaction: async (data: CreateTransactionDTO) => {
      await createMutation.mutateAsync(data);
      await invalidateTransactionQueries();
    },
    updateTransaction: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateTransactionDTO;
    }) => {
      await updateMutation.mutateAsync({ id, data });
      await invalidateTransactionQueries();
    },
    deleteTransaction: async (id: string) => {
      await deleteMutation.mutateAsync(id);
      await invalidateTransactionQueries();
    },
    deleteAllTransactions: async () => {
      await deleteAllMutation.mutateAsync();
      await invalidateTransactionQueries();
    },
    seedTransactions: async () => {
      await seedMutation.mutateAsync();
      await invalidateTransactionQueries();
    },
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending ||
      deleteAllMutation.isPending ||
      seedMutation.isPending,
  };
}
