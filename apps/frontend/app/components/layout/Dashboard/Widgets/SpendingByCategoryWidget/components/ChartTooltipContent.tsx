import { formatCurrency } from "@/app/lib/utils";
import { CategoryGroup } from "../types";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type ChartTooltipContentProps = TooltipProps<ValueType, NameType> & {
  chartConfig: Record<CategoryGroup, { color: string; label: string }>;
};

export function ChartTooltipContent({
  active,
  payload,
  chartConfig,
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        <div className="text-sm font-medium">{payload[0]?.payload?.name}</div>
        {[...payload].reverse().map((entry, index) => (
          <div
            key={`${entry.dataKey}-${index}`}
            className="flex items-center gap-2"
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{
                background: chartConfig[entry.dataKey as CategoryGroup]?.color,
              }}
            />
            <span className="text-sm font-medium">
              {chartConfig[entry.dataKey as CategoryGroup]?.label}
            </span>
            <span className="text-sm text-muted-foreground ml-auto">
              {formatCurrency(entry.value as number)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
