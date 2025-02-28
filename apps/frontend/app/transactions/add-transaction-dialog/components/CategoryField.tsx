import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select/Select";
import { FormFieldProps } from "../types";

export function CategoryField({ form }: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">Category</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="groceries">Groceries</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="transport">Transport</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
