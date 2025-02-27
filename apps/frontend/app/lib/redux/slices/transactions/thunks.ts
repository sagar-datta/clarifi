import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  Transaction,
  CreateTransactionDTO,
  UpdateTransactionDTO,
  TransactionResponse,
  TransactionsResponse,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Helper function to handle API errors
const handleApiError = (error: any): never => {
  if (error.response?.data?.message) {
    throw new Error(error.response.data.message);
  }
  throw new Error("An unexpected error occurred");
};

export const fetchTransactions = createAsyncThunk<Transaction[]>(
  "transactions/fetchTransactions",
  async () => {
    try {
      const response = await fetch(`${API_URL}/transactions`);
      const data: TransactionsResponse = await response.json();
      return data.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
);

export const createTransaction = createAsyncThunk<
  Transaction,
  CreateTransactionDTO
>("transactions/createTransaction", async (transaction) => {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    const data: TransactionResponse = await response.json();
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
});

export const updateTransaction = createAsyncThunk<
  Transaction,
  { id: string; data: UpdateTransactionDTO }
>("transactions/updateTransaction", async ({ id, data }) => {
  try {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData: TransactionResponse = await response.json();
    return responseData.data;
  } catch (error) {
    return handleApiError(error);
  }
});

export const deleteTransaction = createAsyncThunk<string, string>(
  "transactions/deleteTransaction",
  async (id) => {
    try {
      await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return handleApiError(error);
    }
  }
);
