"use client";

import { useEffect, useState } from "react";
import { usePrefetchTransactions } from "../lib/hooks/useTransactionsQuery";
import { useTransactionsLoading } from "../lib/redux/hooks/transactions";
import { ColdStartNotification } from "../components/ui/ColdStartNotification";

export function DashboardDataPrefetch() {
  const prefetchTransactions = usePrefetchTransactions();
  const isLoading = useTransactionsLoading();
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Record the start time when we begin loading
      setLoadingStartTime(Date.now());
      await prefetchTransactions();
    };

    fetchData();
  }, [prefetchTransactions]);

  return (
    <ColdStartNotification
      isLoading={isLoading}
      loadingStartTime={loadingStartTime}
    />
  );
}
