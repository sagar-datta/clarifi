import { RootState } from "../../store";

export const selectTransactions = (state: RootState) =>
  state.transactions.items || [];
export const selectTransactionsLoading = (state: RootState) =>
  state.transactions.loading;
export const selectTransactionsError = (state: RootState) =>
  state.transactions.error;
export const selectSelectedTransaction = (state: RootState) =>
  state.transactions.selectedTransaction;
