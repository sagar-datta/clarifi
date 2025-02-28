"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { useAppSelector } from "@/app/lib/redux/hooks";
import {
  selectTransactions,
  selectTransactionsLoading,
} from "@/app/lib/redux/slices/transactions/selectors";
import { useTransactionActions } from "@/app/lib/redux/hooks/transactions";
import { DateRange } from "./components/types";
import { TransactionsHeader } from "./components/TransactionsHeader";
import { TransactionsFilters } from "./components/TransactionsFilters";
import { TransactionsTable } from "./components/TransactionsTable";
import { Filters } from "@/app/components/ui/filters/FiltersPopover";
import { endOfDay, startOfDay, isWithinInterval, addDays } from "date-fns";
import { TransactionsErrorBoundary } from "./components/ErrorBoundary";
import { EditTransactionDialog } from "@/app/components/shared/transactions/edit-transaction-dialog";
import { Transaction } from "@/app/lib/redux/slices/transactions/types";

export default function TransactionsPage() {
  const transactions = useAppSelector(selectTransactions);
  const isLoading = useAppSelector(selectTransactionsLoading);
  const { fetchAll } = useTransactionActions();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date(), -30), // Last 30 days
    to: new Date(),
  });
  const [activeFilters, setActiveFilters] = useState<Filters>({
    categories: [],
    type: "all",
    amountRange: {},
  });
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Get unique categories from transactions
  const availableCategories = useMemo(
    () => Array.from(new Set(transactions.map((t) => t.category))),
    [transactions]
  );

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((transaction) => {
        const matchesSearch = transaction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const withinDateRange = isWithinInterval(new Date(transaction.date), {
          start: startOfDay(dateRange.from),
          end: endOfDay(dateRange.to),
        });

        const matchesCategories =
          activeFilters.categories.length === 0 ||
          activeFilters.categories.includes(transaction.category);

        const matchesType =
          activeFilters.type === "all" ||
          activeFilters.type === transaction.type;

        const matchesAmountRange =
          (activeFilters.amountRange.min === undefined ||
            transaction.amount >= activeFilters.amountRange.min) &&
          (activeFilters.amountRange.max === undefined ||
            transaction.amount <= activeFilters.amountRange.max);

        return (
          matchesSearch &&
          withinDateRange &&
          matchesCategories &&
          matchesType &&
          matchesAmountRange
        );
      }),
    [transactions, searchTerm, dateRange, activeFilters]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const handleDateRangeChange = useCallback((range: DateRange) => {
    setDateRange(range);
  }, []);

  const handleFiltersChange = useCallback((filters: Filters) => {
    setActiveFilters(filters);
  }, []);

  const handleTransactionClick = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditDialogOpen(true);
  }, []);

  const handleEditDialogClose = useCallback(() => {
    setIsEditDialogOpen(false);
    setSelectedTransaction(null);
  }, []);

  return (
    <TransactionsErrorBoundary>
      <div className="relative bg-background">
        <div className="mx-auto w-full max-w-7xl px-6 pb-6">
          <div className="flex flex-col gap-6">
            <TransactionsHeader filteredTransactions={filteredTransactions} />
            <div className="relative rounded-lg border bg-card">
              <TransactionsFilters
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                dateRange={dateRange}
                onDateRangeChange={handleDateRangeChange}
                availableCategories={availableCategories}
                onFiltersChange={handleFiltersChange}
              />
              <div className="p-6">
                <TransactionsTable
                  transactions={filteredTransactions}
                  isLoading={isLoading}
                  searchTerm={searchTerm}
                  onTransactionClick={handleTransactionClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedTransaction && (
        <EditTransactionDialog
          transaction={selectedTransaction}
          open={isEditDialogOpen}
          onOpenChange={handleEditDialogClose}
        />
      )}
    </TransactionsErrorBoundary>
  );
}
