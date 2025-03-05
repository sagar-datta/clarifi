import { CardHeader, CardTitle } from "@/app/components/ui/card/Card";
import { formatCurrency } from "@/app/lib/utils";
import { cn } from "@/app/lib/utils";

type HeaderProps = {
  netIncome: number;
};

export function MonthlyOverviewHeader({ netIncome }: HeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="space-y-1">
        <CardTitle className="text-base font-medium">
          Monthly Overview
        </CardTitle>
        <p className="text-xs text-muted-foreground">Last 30 days summary</p>
      </div>
      <div className="text-right">
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
    </CardHeader>
  );
}
