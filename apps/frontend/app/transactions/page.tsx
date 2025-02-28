"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card/Card";
import { Input } from "@/app/components/ui/input/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table/Table";
import { Button } from "@/app/components/ui/button/Button";
import { Badge } from "@/app/components/ui/badge/Badge";
import {
  CalendarIcon,
  Download,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { addDays, format } from "date-fns";
import { useState, useEffect, useMemo } from "react";
import { PageLayout } from "@/app/components/layout/PageLayout";
import { useTransactionActions } from "@/app/lib/redux/hooks/transactions";
import { useAppSelector } from "@/app/lib/redux/hooks";
import {
  selectTransactions,
  selectTransactionsLoading,
} from "@/app/lib/redux/slices/transactions/selectors";
import { useAuth } from "@clerk/nextjs";
import { Transaction } from "@/app/lib/redux/slices/transactions/types";
import { DateRangePicker } from "@/app/components/ui/date-range-picker/DateRangePicker";
import { FiltersPopover } from "@/app/components/ui/filters/FiltersPopover";
import type { Filters } from "@/app/components/ui/filters/FiltersPopover";

export default function TransactionsPage() {
  const { getToken } = useAuth();
  const { fetchAll } = useTransactionActions();
  const transactions = (useAppSelector(selectTransactions) ??
    []) as Transaction[];
  const isLoading = useAppSelector(selectTransactionsLoading);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    type: "all",
    amountRange: {},
  });

  // Get unique categories from transactions
  const availableCategories = useMemo(() => {
    const uniqueCategories = new Set(transactions.map((t) => t.category));
    return Array.from(uniqueCategories).sort();
  }, [transactions]);

  // Filter transactions based on all filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(transaction.category)
      ) {
        return false;
      }

      // Type filter
      if (filters.type !== "all" && transaction.type !== filters.type) {
        return false;
      }

      // Amount range filter
      if (
        filters.amountRange.min !== undefined &&
        transaction.amount < filters.amountRange.min
      ) {
        return false;
      }
      if (
        filters.amountRange.max !== undefined &&
        transaction.amount > filters.amountRange.max
      ) {
        return false;
      }

      // Search term filter
      if (searchTerm.trim()) {
        const search = searchTerm.toLowerCase().trim();
        return (
          transaction.description.toLowerCase().includes(search) ||
          transaction.category.toLowerCase().includes(search)
        );
      }

      return true;
    });
  }, [transactions, filters, searchTerm]);

  useEffect(() => {
    const loadTransactions = async () => {
      await fetchAll();
    };
    loadTransactions();
  }, [fetchAll]);

  // Handler for search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <PageLayout>
      <div className="container mx-auto space-y-8 py-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-sm text-muted-foreground">
              View and manage your financial activity
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Card className="border-none shadow-sm">
          {/* Filter Section */}
          <CardHeader className="border-b px-6 pb-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex items-center transition-all duration-300 ease-in-out">
                <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="w-full pl-8 md:w-[300px] transition-all duration-300 ease-in-out"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center transition-all duration-300 ease-in-out">
                <div className="transition-transform duration-300 ease-in-out">
                  <DateRangePicker
                    dateRange={dateRange}
                    onDateRangeChange={setDateRange}
                  />
                </div>
                <div className="transition-transform duration-300 ease-in-out">
                  <FiltersPopover
                    categories={availableCategories}
                    onFiltersChange={setFilters}
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          {/* Table Section */}
          <CardContent className="px-6">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[300px] pl-0">Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="pr-0">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Loading state
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow
                      key={`loading-${index}`}
                      className="group animate-pulse"
                    >
                      <TableCell className="pl-0">
                        <div className="h-4 w-48 rounded bg-muted"></div>
                      </TableCell>
                      <TableCell>
                        <div className="h-5 w-20 rounded bg-muted"></div>
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-24 rounded bg-muted"></div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="ml-auto h-4 w-16 rounded bg-muted"></div>
                      </TableCell>
                      <TableCell className="pr-0">
                        <div className="h-5 w-16 rounded bg-muted"></div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredTransactions.length === 0 ? (
                  // Empty state
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <p className="text-sm text-muted-foreground">
                          {searchTerm.trim()
                            ? "No transactions match your search"
                            : "No transactions found"}
                        </p>
                        <Button variant="outline" size="sm">
                          Add Transaction
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  // Actual transactions
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="group">
                      <TableCell className="pl-0 font-medium">
                        {transaction.description}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {transaction.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(transaction.date), "d MMM, yyyy")}
                      </TableCell>
                      <TableCell className="text-right tabular-nums font-medium">
                        {new Intl.NumberFormat("en-AU", {
                          style: "currency",
                          currency: "AUD",
                        }).format(transaction.amount)}
                      </TableCell>
                      <TableCell className="pr-0">
                        <Badge
                          variant={
                            transaction.type === "expense"
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {transaction.type}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
