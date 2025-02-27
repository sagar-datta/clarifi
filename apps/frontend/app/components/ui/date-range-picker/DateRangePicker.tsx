import { useState } from "react";
import { Button } from "@/app/components/ui/button/Button";
import { Calendar } from "@/app/components/ui/calendar/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover/Popover";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { addDays, format } from "date-fns";
import { cn } from "@/app/lib/utils";

interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  align?: "start" | "center" | "end";
}

const datePresets = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
] as const;

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  align = "end",
}: DateRangePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex h-8 w-full items-center justify-center gap-2 px-3 text-xs font-normal sm:justify-between sm:w-[200px]",
            !dateRange && "text-muted-foreground"
          )}
        >
          <span className="flex items-center gap-2">
            <CalendarIcon className="h-3 w-3" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "d MMM")} -{" "}
                  {format(dateRange.to, "d MMM, yyyy")}
                </>
              ) : (
                format(dateRange.from, "d MMM, yyyy")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </span>
          <ChevronDown className="h-3 w-3 opacity-50 hidden sm:block" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align}>
        <div className="space-y-4 p-3">
          <div className="flex justify-center gap-2">
            {datePresets.map((preset) => (
              <Button
                key={preset.days}
                variant="outline"
                className="h-7 text-xs"
                onClick={() => {
                  const to = new Date();
                  const from = addDays(to, -preset.days);
                  onDateRangeChange({ from, to });
                  setIsCalendarOpen(false);
                }}
              >
                {preset.label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={{ from: dateRange?.from, to: dateRange?.to }}
              onSelect={(range: any) => {
                onDateRangeChange({
                  from: range?.from || dateRange.from,
                  to: range?.to || range?.from || dateRange.to,
                });
              }}
              numberOfMonths={2}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
