import { Form } from "@/app/components/ui/form/Form";
import { Button } from "@/app/components/ui/button/Button";
import { TransactionFormProps } from "../types";
import { TransactionTypeField } from "./TransactionTypeField";
import { AmountField } from "./AmountField";
import { DescriptionField } from "./DescriptionField";
import { CategoryField } from "./CategoryField";
import { DateField } from "./DateField";
import { Loader2 } from "lucide-react";

export function TransactionForm({
  form,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = "Add Transaction",
}: TransactionFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Type Selection at the top for immediate context */}
        <div className="px-6">
          <TransactionTypeField isSubmitting={isSubmitting} />
        </div>

        <div className="px-6 space-y-6">
          <AmountField form={form} isSubmitting={isSubmitting} />
          <DescriptionField form={form} isSubmitting={isSubmitting} />
          <CategoryField form={form} isSubmitting={isSubmitting} />
          <DateField form={form} isSubmitting={isSubmitting} />
        </div>

        {/* Actions Section */}
        <div className="flex items-center justify-end gap-4 p-6 pt-4 border-t bg-muted/10">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isSubmitting}
            className="h-11"
          >
            Cancel
          </Button>
          <Button type="submit" className="h-11 px-8" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {submitLabel === "Add Transaction" ? "Adding..." : "Saving..."}
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
