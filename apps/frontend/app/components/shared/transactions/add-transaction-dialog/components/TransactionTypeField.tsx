import { FormField, FormItem } from "@/app/components/ui/form/Form";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs/Tabs";
import { cn } from "@/app/lib/utils";
import { useFormContext } from "react-hook-form";

interface TransactionTypeFieldProps {
  isSubmitting: boolean;
}

export function TransactionTypeField({
  isSubmitting,
}: TransactionTypeFieldProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <Tabs
            defaultValue={field.value}
            value={field.value}
            onValueChange={field.onChange}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-2 gap-1">
              <TabsTrigger
                value="expense"
                disabled={isSubmitting}
                className={cn(
                  "w-full data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
                )}
              >
                Expense
              </TabsTrigger>
              <TabsTrigger
                value="income"
                disabled={isSubmitting}
                className={cn(
                  "w-full data-[state=active]:bg-green-600 data-[state=active]:text-white"
                )}
              >
                Income
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </FormItem>
      )}
    />
  );
}
