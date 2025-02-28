import { FormField, FormItem } from "@/app/components/ui/form/Form";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs/Tabs";
import { FormFieldProps } from "../types";

export function TransactionTypeField({
  form,
  isSubmitting = false,
}: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <Tabs
            value={field.value}
            onValueChange={(value) => !isSubmitting && field.onChange(value)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 p-1 h-[46px]">
              <TabsTrigger
                value="expense"
                className="flex items-center gap-2 data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-900"
                disabled={isSubmitting}
              >
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Expense
              </TabsTrigger>
              <TabsTrigger
                value="income"
                className="flex items-center gap-2 data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-800"
                disabled={isSubmitting}
              >
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Income
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </FormItem>
      )}
    />
  );
}
