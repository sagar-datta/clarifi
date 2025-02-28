import * as z from "zod";

export const formSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.coerce
    .number()
    .min(0.01, "Amount must be greater than 0")
    .transform((val) => Number(val.toFixed(2))),
  category: z.string().min(1, "Category is required"),
  type: z.enum(["expense", "income"]),
  date: z.date(),
});

export type FormValues = z.infer<typeof formSchema>;
