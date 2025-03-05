"use client";

import { useEffect } from "react";
import { usePrefetchTransactions } from "../lib/hooks/useTransactionsQuery";

export function DashboardDataPrefetch() {
  const prefetchTransactions = usePrefetchTransactions();

  useEffect(() => {
    prefetchTransactions();
  }, [prefetchTransactions]);

  return null;
}
