import { Transaction } from "@/app/lib/redux/slices/transactions/types";
import { Filters } from "@/app/components/ui/filters/FiltersPopover";

export interface DateRange {
  from: Date;
  to: Date;
}

export interface TransactionsTableProps {
  transactions: Transaction[];
  isLoading: boolean;
  searchTerm: string;
  onTransactionClick?: (transaction: Transaction) => void;
}

export interface TransactionsFiltersProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  availableCategories: string[];
  onFiltersChange: (filters: Filters) => void;
}
