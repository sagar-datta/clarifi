import * as React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form/Form";
import { Input } from "@/app/components/ui/input/Input";
import { FormFieldProps } from "../types";
import { ControllerRenderProps } from "react-hook-form";
import { FormValues } from "../schema";

interface AmountInputProps {
  field: ControllerRenderProps<FormValues, "amount">;
  isSubmitting?: boolean;
}

function AmountInput({ field, isSubmitting }: AmountInputProps) {
  const [displayValue, setDisplayValue] = React.useState("");

  React.useEffect(() => {
    if (field.value === 0) {
      setDisplayValue("");
    } else {
      setDisplayValue(field.value.toString());
    }
  }, [field.value]);

  return (
    <FormItem>
      <FormLabel className="text-base">Amount</FormLabel>
      <FormControl>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
            $
          </span>
          <Input
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            className="pl-7 h-12 text-lg"
            value={displayValue}
            disabled={isSubmitting}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only numbers and at most one decimal point
              if (!/^\d*\.?\d*$/.test(value)) return;

              // Prevent more than 2 decimal places
              if (value.includes(".") && value.split(".")[1]?.length > 2)
                return;

              setDisplayValue(value);
              const numValue = parseFloat(value);
              if (!isNaN(numValue)) {
                field.onChange(numValue);
              } else {
                field.onChange(0);
              }
            }}
            onBlur={() => {
              if (!displayValue || displayValue === "") {
                setDisplayValue("");
                field.onChange(0);
                return;
              }
              const numValue = parseFloat(displayValue);
              if (!isNaN(numValue)) {
                const formatted = numValue.toFixed(2);
                setDisplayValue(formatted);
                field.onChange(parseFloat(formatted));
              }
            }}
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export function AmountField({ form, isSubmitting = false }: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="amount"
      render={({ field }) => (
        <AmountInput field={field} isSubmitting={isSubmitting} />
      )}
    />
  );
}
