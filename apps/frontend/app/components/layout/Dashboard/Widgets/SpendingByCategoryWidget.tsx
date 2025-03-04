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
import { useTransactions } from "@/app/lib/redux/hooks";
import { formatCurrency } from "@/app/lib/utils";
import { endOfDay, startOfDay, subMonths, subYears, format } from "date-fns";
import { useMemo, useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/app/components/ui/chart/Chart";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import { Transaction } from "@/app/lib/redux/slices/transactions/types";

type ChartConfigType = {
  [key: string]: { color: string; label: string };
};

export function SpendingByCategoryWidget() {
  const transactions = useTransactions() ?? [];
  const [selectedTab, setSelectedTab] = useState<"month" | "year">("month");

  // Get unique categories from transactions
  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          transactions
            .filter((t): t is Transaction => t !== null && t.type === "expense")
            .map((t) => t.category)
        )
      ),
    [transactions]
  );

  const chartData = useMemo(() => {
    const now = new Date();

    if (selectedTab === "month") {
      // Get last 6 months of data
      return Array.from({ length: 6 }, (_, i) => {
        const monthStart = startOfDay(subMonths(now, 5 - i));
        const monthEnd = endOfDay(subMonths(now, 4 - i));

        const monthlyData = categories.reduce((acc, category) => {
          const total = transactions
            .filter((t) => t?.type === "expense" && t?.category === category)
            .filter((t) => {
              const date = new Date(t?.date ?? "");
              return date >= monthStart && date <= monthEnd;
            })
            .reduce((sum, t) => sum + (t?.amount ?? 0), 0);

          return { ...acc, [category]: total };
        }, {});

        return {
          name: format(monthStart, "MMM"),
          ...monthlyData,
        };
      });
    } else {
      // Get last 6 years of data
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 6 }, (_, i) => {
        const year = currentYear - 5 + i;
        const yearStart = new Date(year, 0, 1);
        const yearEnd = new Date(year, 11, 31, 23, 59, 59);

        const yearlyData = categories.reduce((acc, category) => {
          const total = transactions
            .filter((t) => t?.type === "expense" && t?.category === category)
            .filter((t) => {
              const date = new Date(t?.date ?? "");
              return date >= yearStart && date <= yearEnd;
            })
            .reduce((sum, t) => sum + (t?.amount ?? 0), 0);

          return { ...acc, [category]: total };
        }, {});

        return {
          name: year.toString(),
          ...yearlyData,
        };
      });
    }
  }, [transactions, selectedTab, categories]);

  // Generate colors for each category
  const chartConfig = useMemo<ChartConfigType>(() => {
    const colors = [
      "hsl(142 47% 65%)", // sage green
      "hsl(221 70% 67%)", // soft blue
      "hsl(349 70% 70%)", // soft pink
      "hsl(280 65% 70%)", // soft purple
      "hsl(31 85% 70%)", // soft orange
      "hsl(187 65% 65%)", // soft cyan
      "hsl(168 55% 65%)", // soft teal
      "hsl(271 65% 70%)", // soft violet
      "hsl(15 70% 65%)", // soft coral
      "hsl(250 65% 70%)", // soft indigo
    ];

    return categories.reduce<ChartConfigType>((acc, category, index) => {
      return {
        ...acc,
        [category]: {
          color: colors[index % colors.length],
          label: category.charAt(0).toUpperCase() + category.slice(1),
        },
      };
    }, {});
  }, [categories]);

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
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;

                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid gap-2">
                        <div className="text-sm font-medium">
                          {payload[0]?.payload?.name}
                        </div>
                        {payload.map((entry, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{
                                background:
                                  chartConfig[entry.dataKey as string]?.color,
                              }}
                            />
                            <span className="text-sm font-medium">
                              {chartConfig[entry.dataKey as string]?.label}
                            </span>
                            <span className="text-sm text-muted-foreground ml-auto">
                              {formatCurrency(entry.value as number)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }}
              />
              <ChartLegend
                content={({ payload }) => (
                  <div className="flex flex-wrap gap-4 mt-2 justify-center">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ background: chartConfig[category].color }}
                        />
                        <span className="text-sm font-medium">
                          {chartConfig[category].label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              />
              {[...categories].reverse().map((category) => (
                <Bar
                  key={category}
                  name={chartConfig[category].label}
                  dataKey={category}
                  stackId="a"
                  fill={chartConfig[category].color}
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
