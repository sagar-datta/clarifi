"use client";

import { Input } from "@/app/components/ui/input/Input";
import { DateRangePicker } from "@/app/components/ui/date-range-picker/DateRangePicker";
import { FiltersPopover } from "@/app/components/ui/filters/FiltersPopover";
import { TransactionsFiltersProps } from "./types";

export function TransactionsFilters({
  searchTerm,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  availableCategories,
  onFiltersChange,
}: TransactionsFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-4">
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={onSearchChange}
          className="max-w-xs"
        />
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
  );
}
