"use client";

import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover/Popover";
import { Button } from "@/app/components/ui/button/Button";
import { Input } from "@/app/components/ui/input/Input";
import { Label } from "@/app/components/ui/label/Label";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs/Tabs";
import { Badge } from "@/app/components/ui/badge/Badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command/Command";
import { SlidersHorizontal, Check, X } from "lucide-react";
import { cn } from "@/app/lib/utils";

type TransactionType = "all" | "income" | "expense";

export interface Filters {
  categories: string[];
  type: TransactionType;
  amountRange: {
    min?: number;
    max?: number;
  };
}

interface FiltersPopoverProps {
  categories: string[];
  onFiltersChange: (filters: Filters) => void;
}

export function FiltersPopover({
  categories,
  onFiltersChange,
}: FiltersPopoverProps) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    type: "all",
    amountRange: {},
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [minDisplayValue, setMinDisplayValue] = useState("");
  const [maxDisplayValue, setMaxDisplayValue] = useState("");

  // Initialize display values when filters change externally
  useEffect(() => {
    setMinDisplayValue(filters.amountRange.min?.toString() ?? "");
    setMaxDisplayValue(filters.amountRange.max?.toString() ?? "");
  }, [filters.amountRange.min, filters.amountRange.max]);

  const handleFiltersChange = (newFilters: Partial<Filters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: Filters = {
      categories: [],
      type: "all",
      amountRange: {},
    };
    setFilters(clearedFilters);
    setSearchQuery("");
    onFiltersChange(clearedFilters);
  };

  const toggleCategory = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    handleFiltersChange({ categories: updatedCategories });
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAmountChange = (type: "min" | "max", value: string) => {
    // Allow only numbers and at most one decimal point
    if (!/^\d*\.?\d*$/.test(value)) return;

    // Prevent more than 2 decimal places
    if (value.includes(".") && value.split(".")[1]?.length > 2) return;

    if (type === "min") {
      setMinDisplayValue(value);
    } else {
      setMaxDisplayValue(value);
    }

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      // Validate min/max relationship
      if (
        type === "min" &&
        filters.amountRange.max !== undefined &&
        numValue > filters.amountRange.max
      )
        return;
      if (
        type === "max" &&
        filters.amountRange.min !== undefined &&
        numValue < filters.amountRange.min
      )
        return;

      handleFiltersChange({
        amountRange: {
          ...filters.amountRange,
          [type]: numValue,
        },
      });
    } else {
      handleFiltersChange({
        amountRange: {
          ...filters.amountRange,
          [type]: undefined,
        },
      });
    }
  };

  const handleAmountBlur = (type: "min" | "max", value: string) => {
    if (!value || value === "") {
      if (type === "min") {
        setMinDisplayValue("");
      } else {
        setMaxDisplayValue("");
      }
      handleFiltersChange({
        amountRange: {
          ...filters.amountRange,
          [type]: undefined,
        },
      });
      return;
    }

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const formatted = numValue.toFixed(2);
      if (type === "min") {
        setMinDisplayValue(formatted);
      } else {
        setMaxDisplayValue(formatted);
      }
      handleFiltersChange({
        amountRange: {
          ...filters.amountRange,
          [type]: parseFloat(formatted),
        },
      });
    }
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.type !== "all" ||
    filters.amountRange.min !== undefined ||
    filters.amountRange.max !== undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-9 px-3 lg:px-4 transition-all duration-200",
            hasActiveFilters && "bg-primary/5 text-primary hover:bg-primary/10"
          )}
        >
          <SlidersHorizontal className="h-4 w-4 lg:mr-2" />
          <span className="hidden lg:inline-flex">Filters</span>
          {hasActiveFilters && (
            <Badge
              variant="secondary"
              className="ml-2 bg-primary/10 text-primary hover:bg-primary/15"
            >
              {filters.categories.length +
                (filters.type !== "all" ? 1 : 0) +
                (filters.amountRange.min !== undefined ? 1 : 0) +
                (filters.amountRange.max !== undefined ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[320px] p-0 shadow-lg"
        align="end"
        sideOffset={8}
      >
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Filters</h4>
              <p className="text-xs text-muted-foreground">
                Refine your transaction list
              </p>
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-8 px-2 text-xs"
              >
                Clear all
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-4 p-4">
            {/* Type filter */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Transaction Type</Label>
              <Tabs
                value={filters.type}
                onValueChange={(value) =>
                  handleFiltersChange({ type: value as TransactionType })
                }
                className="w-full"
              >
                <TabsList className="grid h-9 w-full grid-cols-3 gap-1 p-1">
                  <TabsTrigger value="all" className="text-xs">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="income" className="text-xs">
                    Income
                  </TabsTrigger>
                  <TabsTrigger value="expense" className="text-xs">
                    Expense
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Categories filter */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Categories</Label>
              <Command className="rounded-md border">
                <CommandInput
                  placeholder="Search categories..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  className="h-9 text-sm border-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0 active:border-none"
                />
                {filters.categories.length > 0 && (
                  <div className="border-t px-2 py-2">
                    <div className="flex flex-wrap gap-1">
                      {filters.categories.map((category) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="text-xs"
                        >
                          {category}
                          <button
                            onClick={() => toggleCategory(category)}
                            className="ml-1 rounded-full hover:bg-muted"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {category}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <CommandList className="max-h-[145px]">
                  <CommandEmpty className="py-2 text-xs text-center">
                    No categories found
                  </CommandEmpty>
                  <CommandGroup>
                    {filteredCategories.map((category) => (
                      <CommandItem
                        key={category}
                        onSelect={() => toggleCategory(category)}
                        className="aria-selected:bg-primary/5 text-sm"
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary/20",
                            filters.categories.includes(category) &&
                              "bg-primary text-primary-foreground"
                          )}
                        >
                          <Check
                            className={cn(
                              "h-3 w-3",
                              filters.categories.includes(category)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </div>
                        {category}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>

            {/* Amount Range filter */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Amount Range</Label>
              <div className="flex items-center gap-2">
                <div className="grid gap-1.5 flex-1">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      value={minDisplayValue}
                      onChange={(e) =>
                        handleAmountChange("min", e.target.value)
                      }
                      onBlur={(e) => handleAmountBlur("min", e.target.value)}
                      className="pl-6 h-9 text-sm tabular-nums"
                    />
                  </div>
                </div>
                <div className="grid gap-1.5 flex-1">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      value={maxDisplayValue}
                      onChange={(e) =>
                        handleAmountChange("max", e.target.value)
                      }
                      onBlur={(e) => handleAmountBlur("max", e.target.value)}
                      className="pl-6 h-9 text-sm tabular-nums"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
