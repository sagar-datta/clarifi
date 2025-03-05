"use client";

import { Input } from "@/app/components/ui/input/Input";
import { DateRangePicker } from "@/app/components/ui/date-range-picker/DateRangePicker";
import { FiltersPopover } from "@/app/components/ui/filters/FiltersPopover";
import { Search } from "lucide-react";
import { DateRange } from "./types";
import { Filters } from "@/app/components/ui/filters/FiltersPopover";

interface TransactionsFiltersActionsProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  availableCategories: string[];
  onFiltersChange: (filters: Filters) => void;
}

export function TransactionsFiltersActions({
  searchTerm,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  availableCategories,
  onFiltersChange,
}: TransactionsFiltersActionsProps) {
  return (
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
  );
}
