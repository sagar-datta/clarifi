import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Transaction } from "./types";
import {
  fetchTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  seedDummyData,
  deleteAllTransactions,
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
    // Seed transactions
    builder.addCase(seedDummyData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(seedDummyData.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(seedDummyData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to seed transactions";
    });

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
      state.error = action.payload || "Failed to fetch transactions";
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
      state.error = action.payload || "Failed to create transaction";
    });

    // Update transaction
    builder.addCase(updateTransaction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTransaction.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        const index = state.items.findIndex(
          (item: Transaction) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      }
    });
    builder.addCase(updateTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to update transaction";
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
      state.error = action.payload || "Failed to delete transaction";
    });

    // Delete all transactions
    builder.addCase(deleteAllTransactions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteAllTransactions.fulfilled, (state) => {
      state.loading = false;
      state.items = [];
    });
    builder.addCase(deleteAllTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to delete all transactions";
    });
  },
});

export const { setSelectedTransaction, clearError } = transactionsSlice.actions;
export default transactionsSlice.reducer;
