import * as React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form/Form";
import { Button } from "@/app/components/ui/button/Button";
import { Calendar } from "@/app/components/ui/calendar/Calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/app/lib/utils";
import { FormFieldProps } from "../types";
import { ControllerRenderProps } from "react-hook-form";
import { FormValues } from "../schema";

interface DateInputProps {
  field: ControllerRenderProps<FormValues, "date">;
  isSubmitting?: boolean;
}

function DateInput({ field, isSubmitting }: DateInputProps) {
  const [showCalendar, setShowCalendar] = React.useState(false);
  const calendarRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        buttonRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <FormItem>
      <FormLabel className="text-base">Date</FormLabel>
      <div className="flex flex-col items-center gap-2 relative">
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 justify-start font-normal"
          onClick={() => !isSubmitting && setShowCalendar(!showCalendar)}
          ref={buttonRef}
          disabled={isSubmitting}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(field.value, "PPP")}
        </Button>
        {showCalendar && (
          <div
            ref={calendarRef}
            className={cn(
              "absolute bottom-[calc(100%+4px)] left-1/2 -translate-x-1/2 z-50",
              "animate-pop-in",
              "bg-popover rounded-md border shadow-lg"
            )}
          >
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={(date) => {
                if (date) {
                  field.onChange(date);
                  setShowCalendar(false);
                }
              }}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              className="rounded-md"
              initialFocus
            />
          </div>
        )}
      </div>
      <FormMessage />
    </FormItem>
  );
}

export function DateField({ form, isSubmitting = false }: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <DateInput field={field} isSubmitting={isSubmitting} />
      )}
    />
  );
}
