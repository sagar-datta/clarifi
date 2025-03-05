import { cn } from "@/app/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

type PercentageChangeIndicatorProps = {
  percentageChange: number;
  netIncome: number;
};

export function PercentageChangeIndicator({
  percentageChange,
  netIncome,
}: PercentageChangeIndicatorProps) {
  return (
    <div className="px-6 pb-4 flex items-center justify-center sm:justify-start gap-2 border-b">
      {percentageChange > 0 ? (
        <ArrowUpIcon className="h-4 w-4 text-green-600 dark:text-green-500" />
      ) : (
        <ArrowDownIcon className="h-4 w-4 text-red-500 dark:text-red-500" />
      )}
      <p
        className={cn(
          "text-sm font-medium text-center sm:text-left",
          percentageChange > 0
            ? "text-green-600 dark:text-green-500"
            : "text-red-500 dark:text-red-500"
        )}
      >
        {Math.abs(percentageChange).toFixed(1)}%{" "}
        <span className="text-muted-foreground font-normal">
          {netIncome >= 0
            ? percentageChange > 0
              ? "more savings than last month"
              : "less savings than last month"
            : percentageChange > 0
              ? "more overspent than last month"
              : "less overspent than last month"}
        </span>
      </p>
    </div>
  );
}
