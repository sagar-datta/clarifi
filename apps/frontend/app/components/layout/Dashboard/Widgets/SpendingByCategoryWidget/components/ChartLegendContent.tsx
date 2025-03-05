import { CategoryGroup, ChartConfigType } from "../types";

type ChartLegendContentProps = {
  categoryGroups: CategoryGroup[];
  chartConfig: ChartConfigType;
};

export function ChartLegendContent({
  categoryGroups,
  chartConfig,
}: ChartLegendContentProps) {
  return (
    <div className="flex flex-wrap gap-4 mt-2 justify-center">
      {categoryGroups.map((group) => (
        <div key={group} className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ background: chartConfig[group].color }}
          />
          <span className="text-sm font-medium">
            {chartConfig[group].label}
          </span>
        </div>
      ))}
    </div>
  );
}
