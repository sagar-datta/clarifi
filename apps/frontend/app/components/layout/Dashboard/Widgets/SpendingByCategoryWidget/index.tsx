"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card/Card";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs/Tabs";
import { formatCurrency } from "@/app/lib/utils";
import { useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
} from "@/app/components/ui/chart/Chart";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import { useSpendingChartQuery } from "@/app/lib/hooks/useSpendingChartQuery";
import { ChartTooltipContent } from "./components/ChartTooltipContent";
import { ChartLegendContent } from "./components/ChartLegendContent";
import { Skeleton } from "@/app/components/ui/skeleton/Skeleton";
import { CategoryGroup, ChartConfigType, ChartDataType } from "./types";

interface MobileSpendingListProps {
  chartData: ChartDataType[];
  chartConfig: ChartConfigType;
  categoryGroups: CategoryGroup[];
}

function MobileSpendingList({
  chartData,
  chartConfig,
  categoryGroups,
}: MobileSpendingListProps) {
  const latestData = chartData[chartData.length - 1];
  const totalSpending = Object.values(latestData)
    .filter((value): value is number => typeof value === "number")
    .reduce((sum, value) => sum + value, 0);

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Total spending for {latestData.name}
        <div className="text-xl font-bold text-foreground mt-1">
          {formatCurrency(totalSpending)}
        </div>
      </div>
      <div className="space-y-3">
        {[...categoryGroups].map((group) => {
          const amount = latestData[group] || 0;
          const percentage = totalSpending ? (amount / totalSpending) * 100 : 0;
          return (
            <div key={group} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ background: chartConfig[group].color }}
                  />
                  <span className="text-sm font-medium">
                    {chartConfig[group].label}
                  </span>
                </div>
                <span className="text-sm font-medium">
                  {formatCurrency(amount)}
                </span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${percentage}%`,
                    background: chartConfig[group].color,
                  }}
                />
              </div>
              <div className="text-xs text-muted-foreground text-right">
                {percentage.toFixed(1)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SpendingByCategoryWidget() {
  const [selectedTab, setSelectedTab] = useState<"month" | "year">("month");
  const { data, isLoading } = useSpendingChartQuery(selectedTab);

  if (isLoading) {
    return (
      <Card className="h-[575px] sm:h-[400px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-8 w-[200px]" />
        </CardHeader>
        <CardContent className="flex-1 min-h-0 pt-0 h-[300px]">
          <div className="w-full h-full flex items-center justify-center">
            <Skeleton className="w-full h-[250px]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  const { categoryGroups, chartData, chartConfig } = data;

  return (
    <Card className="h-[575px] sm:h-[400px] flex flex-col">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 pb-2">
        <CardTitle className="text-base font-medium">
          Spending by Category
        </CardTitle>
        <Tabs
          value={selectedTab}
          onValueChange={(v) => setSelectedTab(v as "month" | "year")}
          className="w-full sm:w-[200px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 pt-0 h-[500px] sm:h-[400px]">
        <div className="w-full h-full">
          {/* Mobile/Touch view */}
          <div className="block sm:hidden [@media(hover:none)_and_(pointer:coarse)]:block [@media(hover:hover)]:sm:hidden h-full overflow-auto">
            <MobileSpendingList
              chartData={chartData}
              chartConfig={chartConfig}
              categoryGroups={categoryGroups}
            />
          </div>
          {/* Desktop/Mouse view */}
          <div className="hidden sm:block [@media(hover:none)_and_(pointer:coarse)]:hidden [@media(hover:hover)]:sm:block h-full">
            <ChartContainer
              config={chartConfig}
              className="!aspect-none h-full w-full"
            >
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 45, bottom: 5 }}
                barSize={100}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={11} tickMargin={5} />
                <YAxis
                  tickFormatter={(value: number) => formatCurrency(value)}
                  fontSize={11}
                  width={40}
                  tickMargin={5}
                />
                <ChartTooltip
                  content={(props) => (
                    <ChartTooltipContent {...props} chartConfig={chartConfig} />
                  )}
                />
                <ChartLegend
                  content={() => (
                    <ChartLegendContent
                      categoryGroups={categoryGroups}
                      chartConfig={chartConfig}
                    />
                  )}
                />
                {[...categoryGroups].reverse().map((group, index) => (
                  <Bar
                    key={`${group}-${index}`}
                    name={chartConfig[group].label}
                    dataKey={group}
                    stackId="a"
                    fill={chartConfig[group].color}
                    animationDuration={300}
                    animationBegin={0}
                    animationEasing="ease-out"
                  />
                ))}
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SpendingByCategoryWidget;
