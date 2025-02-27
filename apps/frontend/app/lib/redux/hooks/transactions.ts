import { useCallback } from "react";
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
} from "../slices/transactions";

// Selectors
export const useTransactions = () =>
  useAppSelector((state) => state.transactions.items);
export const useTransactionsLoading = () =>
  useAppSelector((state) => state.transactions.loading);
export const useTransactionsError = () =>
  useAppSelector((state) => state.transactions.error);
export const useSelectedTransaction = () =>
  useAppSelector((state) => state.transactions.selectedTransaction);

// Action hooks
export const useTransactionActions = () => {
  const dispatch = useAppDispatch();

  const fetchAll = useCallback(() => {
    return dispatch(fetchTransactions());
  }, [dispatch]);

  const create = useCallback(
    (data: CreateTransactionDTO) => {
      return dispatch(createTransaction(data));
    },
    [dispatch]
  );

  const update = useCallback(
    (id: string, data: UpdateTransactionDTO) => {
      return dispatch(updateTransaction({ id, data }));
    },
    [dispatch]
  );

  const remove = useCallback(
    (id: string) => {
      return dispatch(deleteTransaction(id));
    },
    [dispatch]
  );

  const select = useCallback(
    (transaction: Transaction | null) => {
      dispatch(setSelectedTransaction(transaction));
    },
    [dispatch]
  );

  return {
    fetchAll,
    create,
    update,
    remove,
    select,
  };
};
