import { FormValues } from "./schema";
import { UseFormReturn } from "react-hook-form";

export interface AddTransactionDialogProps {
  children: React.ReactNode;
}

export interface TransactionFormProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export interface FormFieldProps {
  form: UseFormReturn<FormValues>;
  isSubmitting?: boolean;
}
