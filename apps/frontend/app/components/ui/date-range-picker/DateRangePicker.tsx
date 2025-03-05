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
  className?: string;
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
  className,
}: DateRangePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex h-8 w-full items-center justify-center gap-2 px-3 text-xs font-normal sm:justify-between sm:w-[200px]",
            !dateRange && "text-muted-foreground",
            className
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
      <PopoverContent
        className="w-[calc(100vw-2rem)] sm:w-auto p-0"
        align="center"
        sideOffset={5}
      >
        <div className="space-y-4 p-2 sm:p-3">
          <div className="flex flex-col sm:flex-row sm:justify-center gap-2">
            {datePresets.map((preset) => (
              <Button
                key={preset.days}
                variant="outline"
                className="h-8 sm:h-7 text-xs w-full sm:w-auto"
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
          <div className="hidden sm:block">
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-center pt-2 border-t">
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
        </div>
      </PopoverContent>
    </Popover>
  );
}
