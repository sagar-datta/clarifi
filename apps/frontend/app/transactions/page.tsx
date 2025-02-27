"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card/Card";
import { Input } from "@/app/components/ui/input/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table/Table";
import { Button } from "@/app/components/ui/button/Button";
import { Calendar } from "@/app/components/ui/calendar/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover/Popover";
import { Badge } from "@/app/components/ui/badge/Badge";
import {
  CalendarIcon,
  Download,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { PageLayout } from "@/app/components/layout/PageLayout";

export default function TransactionsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <PageLayout>
      <div className="container mx-auto space-y-8 py-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-sm text-muted-foreground">
              View and manage your financial activity
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Card className="border-none shadow-sm">
          {/* Filter Section */}
          <CardHeader className="border-b px-6 pb-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex items-center">
                <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="w-full pl-8 md:w-[300px]"
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "justify-start text-left font-normal",
                        !dateRange && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "d MMM")} -{" "}
                            {format(dateRange.to, "d MMM, yyyy")}
                          </>
                        ) : (
                          format(dateRange.from, "d MMM, yyyy")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={(range: any) => {
                        setDateRange(range);
                        setIsCalendarOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Table Section */}
          <CardContent className="px-6">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[300px] pl-0">Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="pr-0">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* We'll add transaction data here */}
                <TableRow className="group">
                  <TableCell className="pl-0 font-medium">Loading...</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      Loading...
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    Loading...
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    Loading...
                  </TableCell>
                  <TableCell className="pr-0">
                    <Badge variant="outline" className="text-xs">
                      Loading...
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
