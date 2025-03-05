import { useTransactions } from "@/app/lib/redux/hooks";
import { Transaction } from "@/app/lib/redux/slices/transactions/types";
import { endOfDay, startOfDay, subMonths, format } from "date-fns";
import { useMemo } from "react";
import { useTheme } from "next-themes";
import {
  CATEGORY_GROUPS,
  CategoryGroup,
  CategoryValues,
  ChartDataType,
  ChartConfigType,
} from "../types";

export function useSpendingChart(selectedTab: "month" | "year") {
  const rawTransactions = useTransactions();
  const { theme } = useTheme();

  const transactions = useMemo(() => rawTransactions ?? [], [rawTransactions]);

  // Get category groups that have transactions
  const categoryGroups = useMemo(() => {
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
  }, [transactions]);

  const chartData = useMemo<ChartDataType[]>(() => {
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
                return groupCategories.includes(t.category as CategoryValues);
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
    } else {
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
    }
  }, [transactions, selectedTab, categoryGroups]);

  // Generate colors for each category group
  const chartConfig = useMemo(() => {
    const isDark = theme === "dark";

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
  }, [categoryGroups, theme]);

  return {
    categoryGroups,
    chartData,
    chartConfig,
  };
}
