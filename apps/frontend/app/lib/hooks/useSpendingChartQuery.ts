import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTransactionActions } from "../redux/hooks";
import { Transaction } from "../redux/slices/transactions/types";
import { endOfDay, startOfDay, subMonths, format } from "date-fns";
import { useTheme } from "next-themes";
import { getTransactionsFromQuery } from "./useTransactionsQuery";
import {
  CATEGORY_GROUPS,
  CategoryGroup,
  CategoryValues,
  ChartDataType,
  ChartConfigType,
} from "@/app/components/layout/Dashboard/Widgets/SpendingByCategoryWidget/types";

const SPENDING_CHART_QUERY_KEY = ["spending-chart"] as const;

export function useSpendingChartQuery(selectedTab: "month" | "year") {
  const { fetchAll } = useTransactionActions();
  const { theme } = useTheme();

  return useQuery({
    queryKey: [...SPENDING_CHART_QUERY_KEY, selectedTab],
    queryFn: fetchAll,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep unused data in cache for 30 minutes
    refetchOnWindowFocus: false,
    select: (data) => {
      const transactions = getTransactionsFromQuery(data);
      const isDark = theme === "dark";

      // Get category groups that have transactions
      const categoryGroups = (() => {
        const expenseTransactions = transactions.filter(
          (t): t is Transaction => t !== null && t.type === "expense"
        );
        const usedGroups = new Set<CategoryGroup>();

        expenseTransactions.forEach((t) => {
          const entries = Object.entries(CATEGORY_GROUPS) as [
            CategoryGroup,
            readonly string[],
          ][];
          for (const [group, categories] of entries) {
            if (categories.includes(t.category)) {
              usedGroups.add(group);
              break;
            }
          }
        });

        return Array.from(usedGroups) as CategoryGroup[];
      })();

      const chartData = (() => {
        const now = new Date();

        if (selectedTab === "month") {
          return Array.from({ length: 6 }, (_, i) => {
            const monthStart = startOfDay(subMonths(now, 5 - i));
            const monthEnd = endOfDay(subMonths(now, 4 - i));

            const monthlyData = categoryGroups.reduce<Partial<ChartDataType>>(
              (acc, group) => {
                const groupCategories = CATEGORY_GROUPS[
                  group
                ] as readonly CategoryValues[];
                const total = transactions
                  .filter((t): t is Transaction => {
                    if (!t || t.type !== "expense" || !t.category) return false;
                    return groupCategories.includes(
                      t.category as CategoryValues
                    );
                  })
                  .filter((t) => {
                    const date = new Date(t.date);
                    return date >= monthStart && date <= monthEnd;
                  })
                  .reduce((sum, t) => sum + t.amount, 0);

                return { ...acc, [group]: total };
              },
              {}
            );

            return {
              name: format(monthStart, "MMM"),
              ...monthlyData,
            } as ChartDataType;
          });
        }

        const currentYear = new Date().getFullYear();
        return Array.from({ length: 6 }, (_, i) => {
          const year = currentYear - 5 + i;
          const yearStart = new Date(year, 0, 1);
          const yearEnd = new Date(year, 11, 31, 23, 59, 59);

          const yearlyData = categoryGroups.reduce<Partial<ChartDataType>>(
            (acc, group) => {
              const groupCategories = CATEGORY_GROUPS[
                group
              ] as readonly CategoryValues[];
              const total = transactions
                .filter((t): t is Transaction => {
                  if (!t || t.type !== "expense" || !t.category) return false;
                  return groupCategories.includes(t.category as CategoryValues);
                })
                .filter((t) => {
                  const date = new Date(t.date);
                  return date >= yearStart && date <= yearEnd;
                })
                .reduce((sum, t) => sum + t.amount, 0);

              return { ...acc, [group]: total };
            },
            {}
          );

          return {
            name: year.toString(),
            ...yearlyData,
          } as ChartDataType;
        });
      })();

      // Generate colors for each category group
      const chartConfig = (() => {
        const colors = [
          isDark ? "hsl(0 70% 45%)" : "hsl(0 70% 55%)", // Pure Red
          isDark ? "hsl(22 75% 45%)" : "hsl(22 75% 55%)", // Red-Orange
          isDark ? "hsl(45 75% 45%)" : "hsl(45 75% 55%)", // Orange-Yellow
          isDark ? "hsl(68 70% 40%)" : "hsl(68 70% 50%)", // Yellow-Green
          isDark ? "hsl(180 50% 45%)" : "hsl(180 50% 55%)", // Solarized Cyan
          isDark ? "hsl(240 50% 45%)" : "hsl(240 50% 55%)", // Solarized Blue
        ];

        const config = {} as ChartConfigType;
        categoryGroups.forEach((group, index) => {
          config[group] = {
            color: colors[index % colors.length],
            label: group,
          };
        });
        return config;
      })();

      return {
        categoryGroups,
        chartData,
        chartConfig,
      };
    },
  });
}

export function usePrefetchSpendingChart() {
  const queryClient = useQueryClient();
  const { fetchAll } = useTransactionActions();

  return (selectedTab: "month" | "year") => {
    return queryClient.prefetchQuery({
      queryKey: [...SPENDING_CHART_QUERY_KEY, selectedTab],
      queryFn: fetchAll,
    });
  };
}
