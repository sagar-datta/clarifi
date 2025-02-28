"use client";

import { Input } from "@/app/components/ui/input/Input";
import { DateRangePicker } from "@/app/components/ui/date-range-picker/DateRangePicker";
import { FiltersPopover } from "@/app/components/ui/filters/FiltersPopover";
import { TransactionsFiltersProps } from "./types";
import { Search } from "lucide-react";
import { cn } from "@/app/lib/utils";

export function TransactionsFilters({
  searchTerm,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  availableCategories,
  onFiltersChange,
}: TransactionsFiltersProps) {
  return (
    <div
      className={cn(
        "sticky top-0 z-10 -mx-6 backdrop-blur-sm transition-all duration-200",
        "border-b bg-background/95 px-6 py-4"
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={onSearchChange}
              className="pl-9 w-full"
            />
          </div>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={onDateRangeChange}
          />
        </div>
        <FiltersPopover
          categories={availableCategories}
          onFiltersChange={onFiltersChange}
        />
      </div>
    </div>
  );
}
