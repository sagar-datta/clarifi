import * as z from "zod";
import { FormValues } from "./types";

export const formSchema = z.object({
  description: z
    .string()
    .min(1, "Description is required")
    .max(100, "Description must be less than 100 characters"),
  amount: z
    .number()
    .min(0.01, "Amount must be greater than 0")
    .max(1000000, "Amount must be less than 1,000,000"),
  category: z.string().min(1, "Category is required"),
  type: z.enum(["income", "expense"]),
  date: z.date(),
});

export type { FormValues };
