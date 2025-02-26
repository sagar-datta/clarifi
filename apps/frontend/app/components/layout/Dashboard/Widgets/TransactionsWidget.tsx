"use client";

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

export function TransactionsWidget() {
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
          {/* Placeholder for transaction list */}
          <div className="space-y-4 py-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Transaction {i + 1}</p>
                    <p className="text-xs text-muted-foreground">Category</p>
                  </div>
                </div>
                <div className="text-sm font-medium">-$XX.XX</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
