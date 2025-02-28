import { cn } from "@/app/lib/utils";
import { TransactionsFiltersProps } from "./types";
import { TransactionsFiltersActions } from "./TransactionsFiltersActions";

export function TransactionsFilters(props: TransactionsFiltersProps) {
  return (
    <div
      className={cn(
        "sticky top-0 z-10 -mx-6 backdrop-blur-sm transition-all duration-200",
        "border-b bg-background/95 px-6 py-4"
      )}
    >
      <TransactionsFiltersActions {...props} />
    </div>
  );
}
