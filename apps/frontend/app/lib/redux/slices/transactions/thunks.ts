import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWithAuth } from "@/app/lib/api";
import type {
  Transaction,
  CreateTransactionDTO,
  UpdateTransactionDTO,
  TransactionResponse,
  TransactionsResponse,
} from "./types";

interface ThunkConfig {
  state: unknown;
  rejectValue: string;
}

interface ApiError {
  message?: string;
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const seedDummyData = createAsyncThunk<
  Transaction[],
  string | null,
  ThunkConfig
>("transactions/seedDummyData", async (token, { rejectWithValue }) => {
  try {
    const data = await fetchWithAuth("/transactions/seed", token, {
      method: "POST",
    });
    return data.data;
  } catch (error) {
    const err = error as ApiError;
    return rejectWithValue(err.message || "Failed to seed dummy data");
  }
});

export const fetchTransactions = createAsyncThunk<
  Transaction[],
  string | null,
  ThunkConfig
>("transactions/fetchTransactions", async (token, { rejectWithValue }) => {
  try {
    const data: TransactionsResponse = await fetchWithAuth(
      "/transactions",
      token
    );
    return data.data;
  } catch (error) {
    const err = error as ApiError;
    return rejectWithValue(err.message || "Failed to fetch transactions");
  }
});

export const createTransaction = createAsyncThunk<
  Transaction,
  { token: string | null; data: CreateTransactionDTO },
  ThunkConfig
>(
  "transactions/createTransaction",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response: TransactionResponse = await fetchWithAuth(
        "/transactions",
        token,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      return response.data;
    } catch (error) {
      const err = error as ApiError;
      return rejectWithValue(err.message || "Failed to create transaction");
    }
  }
);

export const updateTransaction = createAsyncThunk<
  Transaction,
  { token: string | null; id: string; data: UpdateTransactionDTO },
  ThunkConfig
>(
  "transactions/updateTransaction",
  async ({ token, id, data }, { rejectWithValue }) => {
    try {
      const responseData: TransactionResponse = await fetchWithAuth(
        `/transactions/${id}`,
        token,
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );
      return responseData.data;
    } catch (error) {
      const err = error as ApiError;
      return rejectWithValue(err.message || "Failed to update transaction");
    }
  }
);

export const deleteTransaction = createAsyncThunk<
  string,
  { token: string | null; id: string },
  ThunkConfig
>(
  "transactions/deleteTransaction",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      await fetchWithAuth(`/transactions/${id}`, token, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      const err = error as ApiError;
      return rejectWithValue(err.message || "Failed to delete transaction");
    }
  }
);

export const deleteAllTransactions = createAsyncThunk<
  void,
  string | null,
  ThunkConfig
>("transactions/deleteAllTransactions", async (token, { rejectWithValue }) => {
  try {
    await fetchWithAuth("/transactions/all", token, {
      method: "DELETE",
    });
  } catch (error) {
    const err = error as ApiError;
    return rejectWithValue(err.message || "Failed to delete all transactions");
  }
});

export const fetchAll = createAsyncThunk<Transaction[], void, ThunkConfig>(
  "transactions/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data: TransactionsResponse = await fetchWithAuth(
        "/transactions",
        null
      );
      return data.data;
    } catch (error) {
      const err = error as ApiError;
      return rejectWithValue(err.message || "Failed to fetch transactions");
    }
  }
);
