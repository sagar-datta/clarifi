"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table/Table";
import { formatCurrency } from "@/app/lib/utils";
import { TransactionsTableProps } from "./types";
import { format } from "date-fns";
import { Skeleton } from "@/app/components/ui/skeleton/Skeleton";
import { Badge } from "@/app/components/ui/badge/Badge";
import { cn } from "@/app/lib/utils";

export function TransactionsTable({
  transactions,
  isLoading,
  searchTerm,
}: TransactionsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card">
        <div className="p-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 rounded-lg border bg-card/50 p-8">
        <p className="text-lg font-medium">No transactions found</p>
        <p className="text-sm text-muted-foreground">
          {searchTerm
            ? "Try adjusting your search or filters"
            : "Add your first transaction to get started"}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-1">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right w-[120px]">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="group cursor-pointer transition-colors hover:bg-muted/50"
              >
                <TableCell className="font-medium">
                  {format(new Date(transaction.date), "dd MMM yyyy")}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {transaction.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  <span
                    className={cn(
                      "font-medium",
                      transaction.type === "expense"
                        ? "text-red-500 dark:text-red-400"
                        : "text-green-500 dark:text-green-400"
                    )}
                  >
                    {transaction.type === "expense" ? "-" : "+"}
                    {formatCurrency(transaction.amount)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
