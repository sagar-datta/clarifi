"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/app/components/ui/card/Card";

interface ColdStartNotificationProps {
  isLoading: boolean;
  loadingStartTime: number | null;
}

export function ColdStartNotification({
  isLoading,
  loadingStartTime,
}: ColdStartNotificationProps) {
  const [showNotification, setShowNotification] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);

  // Only show the notification if loading takes more than 2 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    if (isLoading && loadingStartTime) {
      // Show notification after 2 seconds of loading
      timer = setTimeout(() => {
        setShowNotification(true);

        // Update loading time every second
        interval = setInterval(() => {
          const currentTime = Date.now();
          const elapsedSeconds = Math.floor(
            (currentTime - loadingStartTime) / 1000
          );
          setLoadingTime(elapsedSeconds);
        }, 1000);
      }, 2000);
    } else {
      setShowNotification(false);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isLoading, loadingStartTime]);

  if (!showNotification) return null;

  return (
    <Card className="mb-6 bg-muted/50 border-muted">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <h3 className="text-base font-medium flex items-center gap-2">
            Portfolio Project Notice
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </h3>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This app is hosted on Render&apos;s free tier which uses cold starts.
          Data is loading from the server which may take up to a minute to wake
          up.
          {loadingTime > 0 && (
            <span className="font-medium text-foreground">
              {" "}
              Loading for {loadingTime} seconds...
            </span>
          )}
        </p>
      </CardContent>
    </Card>
  );
}
