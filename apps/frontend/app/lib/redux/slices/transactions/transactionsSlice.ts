import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Transaction } from "./types";
import {
  fetchTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "./thunks";

interface TransactionsState {
  items: Transaction[];
  loading: boolean;
  error: string | null;
  selectedTransaction: Transaction | null;
}

const initialState: TransactionsState = {
  items: [],
  loading: false,
  error: null,
  selectedTransaction: null,
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setSelectedTransaction: (
      state,
      action: PayloadAction<Transaction | null>
    ) => {
      state.selectedTransaction = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch transactions
    builder.addCase(fetchTransactions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch transactions";
    });

    // Create transaction
    builder.addCase(createTransaction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.items.push(action.payload);
    });
    builder.addCase(createTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to create transaction";
    });

    // Update transaction
    builder.addCase(updateTransaction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTransaction.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.items.findIndex(
        (item: Transaction) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    });
    builder.addCase(updateTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update transaction";
    });

    // Delete transaction
    builder.addCase(deleteTransaction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.items = state.items.filter(
        (item: Transaction) => item.id !== action.payload
      );
    });
    builder.addCase(deleteTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete transaction";
    });
  },
});

export const { setSelectedTransaction, clearError } = transactionsSlice.actions;
export default transactionsSlice.reducer;
