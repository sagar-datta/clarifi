/**
 * Database Schema Types
 *
 * Type definitions that match our Supabase database schema.
 * These types ensure type safety when querying the database.
 */

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  description: string;
  category: string;
  type: TransactionType;
  date: string; // ISO 8601 format
  created_at: string;
  updated_at: string;
}

// Database schema type for Supabase
export interface Database {
  public: {
    Tables: {
      transactions: {
        Row: Transaction; // return type when querying
        Insert: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>; // type for inserting
        Update: Partial<Omit<Transaction, 'id' | 'created_at' | 'updated_at'>>; // type for updating
      };
    };
  };
}
