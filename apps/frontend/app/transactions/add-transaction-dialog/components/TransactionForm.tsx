import { Form } from "@/app/components/ui/form/Form";
import { Button } from "@/app/components/ui/button/Button";
import { TransactionFormProps } from "../types";
import { TransactionTypeField } from "./TransactionTypeField";
import { AmountField } from "./AmountField";
import { DescriptionField } from "./DescriptionField";
import { CategoryField } from "./CategoryField";
import { DateField } from "./DateField";

export function TransactionForm({
  form,
  onSubmit,
  onCancel,
}: TransactionFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Type Selection at the top for immediate context */}
        <div className="px-6">
          <TransactionTypeField form={form} />
        </div>

        <div className="px-6 space-y-6">
          <AmountField form={form} />
          <DescriptionField form={form} />
          <CategoryField form={form} />
          <DateField form={form} />
        </div>

        {/* Actions Section */}
        <div className="flex items-center justify-end gap-4 p-6 pt-4 border-t bg-muted/10">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="h-11"
          >
            Cancel
          </Button>
          <Button type="submit" className="h-11 px-8">
            Add Transaction
          </Button>
        </div>
      </form>
    </Form>
  );
}
