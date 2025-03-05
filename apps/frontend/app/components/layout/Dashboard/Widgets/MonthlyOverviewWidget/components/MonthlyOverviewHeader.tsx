import { CardHeader, CardTitle } from "@/app/components/ui/card/Card";
import { formatCurrency } from "@/app/lib/utils";
import { cn } from "@/app/lib/utils";

type HeaderProps = {
  netIncome: number;
};

export function MonthlyOverviewHeader({ netIncome }: HeaderProps) {
  return (
    <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-0 pb-2">
      <div className="space-y-1 text-left mb-4 sm:mb-0 w-full">
        <CardTitle className="text-base font-medium">
          Monthly Overview
        </CardTitle>
        <p className="text-xs text-muted-foreground">Last 30 days summary</p>
      </div>
      <div className="text-center sm:text-right">
        <div className="flex items-center gap-2 justify-center sm:justify-end">
          <div className="text-2xl font-bold tracking-tight">
            {formatCurrency(Math.abs(netIncome))}
          </div>
          <span
            className={cn(
              "text-sm font-medium",
              netIncome >= 0
                ? "text-green-600 dark:text-green-500"
                : "text-red-500 dark:text-red-500"
            )}
          >
            {netIncome >= 0 ? "saved" : "overspent"}
          </span>
        </div>
      </div>
    </CardHeader>
  );
}
