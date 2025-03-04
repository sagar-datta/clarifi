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
      // Get last 12 months of data
      return Array.from({ length: 12 }, (_, i) => {
        const monthStart = startOfDay(subMonths(now, 11 - i));
        const monthEnd = endOfDay(subMonths(now, 10 - i));

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
      // Get last 5 years of data
      return Array.from({ length: 5 }, (_, i) => {
        const yearStart = startOfDay(subYears(now, 4 - i));
        const yearEnd = endOfDay(subYears(now, 3 - i));

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
          name: format(yearStart, "yyyy"),
          ...yearlyData,
        };
      });
    }
  }, [transactions, selectedTab, categories]);

  // Generate colors for each category
  const chartConfig = useMemo<ChartConfigType>(() => {
    const colors = [
      "#22c55e", // green
      "#3b82f6", // blue
      "#f59e0b", // amber
      "#ec4899", // pink
      "#8b5cf6", // purple
      "#6b7280", // gray
      "#ef4444", // red
      "#06b6d4", // cyan
      "#14b8a6", // teal
      "#f97316", // orange
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
              barSize={15}
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
                content={({ active, payload }) => (
                  <ChartTooltipContent
                    active={active}
                    payload={payload}
                    formatter={(value: any) => {
                      if (Array.isArray(value)) {
                        return formatCurrency(value[0]);
                      }
                      const numValue =
                        typeof value === "string" ? parseFloat(value) : value;
                      return formatCurrency(numValue);
                    }}
                  />
                )}
              />
              <ChartLegend
                content={({ payload }) => (
                  <ChartLegendContent payload={payload} />
                )}
              />
              {categories.map((category) => (
                <Bar
                  key={category}
                  name={chartConfig[category].label}
                  dataKey={category}
                  stackId="a"
                />
              ))}
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
