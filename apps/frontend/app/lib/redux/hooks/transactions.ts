import { useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { useAppDispatch, useAppSelector } from "./";
import {
  Transaction,
  CreateTransactionDTO,
  UpdateTransactionDTO,
  fetchTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  setSelectedTransaction,
  seedDummyData,
  deleteAllTransactions,
} from "../slices/transactions";

// Selectors
export const useTransactions = () =>
  useAppSelector((state) => state.transactions.items) ?? [];
export const useTransactionsLoading = () =>
  useAppSelector((state) => state.transactions.loading);
export const useTransactionsError = () =>
  useAppSelector((state) => state.transactions.error);
export const useSelectedTransaction = () =>
  useAppSelector((state) => state.transactions.selectedTransaction);

// Action hooks
export const useTransactionActions = () => {
  const dispatch = useAppDispatch();
  const { getToken } = useAuth();

  const fetchAll = useCallback(async () => {
    const token = await getToken();
    return dispatch(fetchTransactions(token));
  }, [dispatch, getToken]);

  const create = useCallback(
    async (data: CreateTransactionDTO) => {
      const token = await getToken();
      return dispatch(createTransaction({ token, data }));
    },
    [dispatch, getToken]
  );

  const update = useCallback(
    async (id: string, data: UpdateTransactionDTO) => {
      const token = await getToken();
      return dispatch(updateTransaction({ token, id, data }));
    },
    [dispatch, getToken]
  );

  const remove = useCallback(
    async (id: string) => {
      const token = await getToken();
      return dispatch(deleteTransaction({ token, id }));
    },
    [dispatch, getToken]
  );

  const select = useCallback(
    (transaction: Transaction | null) => {
      dispatch(setSelectedTransaction(transaction));
    },
    [dispatch]
  );

  const seed = useCallback(async () => {
    const token = await getToken();
    return dispatch(seedDummyData(token));
  }, [dispatch, getToken]);

  const deleteAll = useCallback(async () => {
    const token = await getToken();
    return dispatch(deleteAllTransactions(token));
  }, [dispatch, getToken]);

  return {
    fetchAll,
    create,
    update,
    remove,
    select,
    seedDummyData: seed,
    deleteAll,
  };
};
