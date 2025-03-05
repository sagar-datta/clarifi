"use client";

import { useEffect } from "react";
import { usePrefetchTransactions } from "@/app/lib/hooks/useTransactionsQuery";

export function PrefetchProvider({ children }: { children: React.ReactNode }) {
  const prefetchTransactions = usePrefetchTransactions();

  useEffect(() => {
    prefetchTransactions();
  }, [prefetchTransactions]);

  return <>{children}</>;
}
