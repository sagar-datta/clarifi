import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form/Form";
import { Input } from "@/app/components/ui/input/Input";
import { FormFieldProps } from "../types";

export function DescriptionField({
  form,
  isSubmitting = false,
}: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">Description</FormLabel>
          <FormControl>
            <Input
              placeholder="Groceries, Rent, etc."
              className="h-12"
              {...field}
              disabled={isSubmitting}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
