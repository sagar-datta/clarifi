"use client";

import { TableCell, TableRow } from "@/app/components/ui/table/Table";
import { formatCurrency } from "@/app/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/app/components/ui/badge/Badge";
import { cn } from "@/app/lib/utils";
import { DeleteTransactionDialog } from "@/app/components/shared/transactions/delete-transaction-dialog";
import { Transaction } from "@/app/lib/redux/slices/transactions/types";

interface TransactionRowProps {
  transaction: Transaction;
  onClick?: (transaction: Transaction) => void;
}

export function TransactionRow({ transaction, onClick }: TransactionRowProps) {
  return (
    <TableRow
      className="group cursor-pointer transition-colors hover:bg-muted/50"
      onClick={() => onClick?.(transaction)}
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
              ? "text-red-500 dark:text-red-500"
              : "text-green-600 dark:text-green-500"
          )}
        >
          {transaction.type === "expense" ? "-" : "+"}
          {formatCurrency(transaction.amount)}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex justify-end">
          <div onClick={(e) => e.stopPropagation()}>
            <DeleteTransactionDialog transaction={transaction} />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
