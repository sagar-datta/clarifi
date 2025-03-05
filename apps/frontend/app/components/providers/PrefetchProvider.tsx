"use client";

import { useEffect } from "react";
import { usePrefetchTransactions } from "@/app/lib/hooks/useTransactionsQuery";
import { useAuth } from "@clerk/nextjs";

export function PrefetchProvider({ children }: { children: React.ReactNode }) {
  const prefetchTransactions = usePrefetchTransactions();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      prefetchTransactions();
    }
  }, [prefetchTransactions, isSignedIn]);

  return <>{children}</>;
}
