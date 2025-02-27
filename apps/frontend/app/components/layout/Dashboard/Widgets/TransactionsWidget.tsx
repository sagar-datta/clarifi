"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select/Select";
import { ScrollArea } from "@/app/components/ui/scroll-area/ScrollArea";
import { Separator } from "@/app/components/ui/separator/Separator";
import {
  useTransactions,
  useTransactionsLoading,
  useTransactionActions,
  useTransactionsError,
} from "@/app/lib/redux/hooks";
import { Skeleton } from "@/app/components/ui/skeleton/Skeleton";
import { Button } from "@/app/components/ui/button/Button";

export function TransactionsWidget() {
  const transactions = useTransactions() || [];
  const isLoading = useTransactionsLoading();
  const error = useTransactionsError();
  const { fetchAll, seedDummyData } = useTransactionActions();
  const [isSeedingData, setIsSeedingData] = useState(false);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleSeedData = async () => {
    try {
      setIsSeedingData(true);
      console.log("Starting to seed data...");
      const seedResult = await seedDummyData();
      console.log("Seed complete, fetching updated transactions...");
      // Small delay to ensure state updates
      await new Promise((resolve) => setTimeout(resolve, 500));
      await fetchAll();
      console.log("Fetch complete");
    } catch (error) {
      console.error("Failed to seed data:", error);
    } finally {
      setIsSeedingData(false);
    }
  };

  const isLoadingState = isLoading || isSeedingData;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-medium">
          Recent Transactions
        </CardTitle>
        <Select defaultValue="7d">
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <ScrollArea className="h-[270px] px-4">
          <div className="space-y-4 py-4">
            {isLoadingState ? (
              // Loading skeletons
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-3 w-[100px]" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-[60px]" />
                </div>
              ))
            ) : transactions.length === 0 ? (
              <div className="flex h-[200px] flex-col items-center justify-center gap-4 text-sm text-muted-foreground">
                <p>No transactions found</p>
                {error && <p className="text-red-500">Error: {error}</p>}
                <Button
                  onClick={handleSeedData}
                  variant="outline"
                  size="sm"
                  disabled={isLoadingState}
                >
                  Add Sample Transactions
                </Button>
              </div>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      transaction.type === "expense"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {transaction.type === "expense" ? "-" : "+"}$
                    {transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
