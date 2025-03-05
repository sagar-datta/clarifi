import { ScrollArea } from "@/app/components/ui/scroll-area/ScrollArea";
import { formatCurrency } from "@/app/lib/utils";
import { Transaction } from "@/app/lib/redux/slices/transactions/types";
import { format } from "date-fns";
import { cn } from "@/app/lib/utils";

type TransactionListProps = {
  transactions: Transaction[];
  type: "income" | "expenses";
};

export function TransactionList({ transactions, type }: TransactionListProps) {
  return (
    <ScrollArea className="h-full px-6">
      <div className="space-y-2 py-2 divide-y divide-border/30">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between pt-2 first:pt-0"
          >
            <div>
              <div className="font-medium text-sm">
                {transaction.description}
              </div>
              <div className="text-xs text-muted-foreground/70">
                {format(new Date(transaction.date), "dd MMM yyyy")}
              </div>
            </div>
            <div
              className={cn(
                "font-medium text-sm",
                type === "income"
                  ? "text-green-600 dark:text-green-500"
                  : "text-red-500 dark:text-red-500"
              )}
            >
              {type === "income" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
