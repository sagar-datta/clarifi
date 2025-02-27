export type Transaction = {
  id: string;
  user_id: string;
  amount: number;
  description: string;
  category: string;
  type: "income" | "expense";
  date: string;
  created_at: string;
  updated_at: string;
};

export type CreateTransactionDTO = {
  amount: number;
  description: string;
  category: string;
  type: "income" | "expense";
  date: string;
};

export type UpdateTransactionDTO = Partial<CreateTransactionDTO>;

export type TransactionResponse = {
  status: "success";
  data: Transaction;
};

export type TransactionsResponse = {
  status: "success";
  data: Transaction[];
};

export type TransactionError = {
  status: "error";
  message: string;
};
