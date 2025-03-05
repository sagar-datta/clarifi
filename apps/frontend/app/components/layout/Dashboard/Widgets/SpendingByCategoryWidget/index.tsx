"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs/Tabs";
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

export function SpendingByCategoryWidget() {
  const [selectedTab, setSelectedTab] = useState<"month" | "year">("month");
  const { data, isLoading } = useSpendingChartQuery(selectedTab);

  if (isLoading) {
    return (
      <Card className="h-[400px] flex flex-col">
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
    <Card className="h-[400px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">
          Spending by Category
        </CardTitle>
        <Tabs
          value={selectedTab}
          onValueChange={(v) => setSelectedTab(v as "month" | "year")}
          className="w-[200px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 pt-0 h-[300px]">
        <div className="w-full h-full">
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
                tickFormatter={(value: any) => {
                  const numValue =
                    typeof value === "string" ? parseFloat(value) : value;
                  return formatCurrency(numValue);
                }}
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
      </CardContent>
    </Card>
  );
}

export default SpendingByCategoryWidget;
