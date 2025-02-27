import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover/Popover";
import { Button } from "@/app/components/ui/button/Button";
import { Input } from "@/app/components/ui/input/Input";
import { Label } from "@/app/components/ui/label/Label";
import { Separator } from "@/app/components/ui/separator/Separator";
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
import { SlidersHorizontal, Check, Search, X } from "lucide-react";
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

  const handleFiltersChange = (newFilters: Partial<Filters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
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
    const numValue = value === "" ? undefined : Number(value);
    handleFiltersChange({
      amountRange: {
        ...filters.amountRange,
        [type]: numValue,
      },
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 relative transition-[width] duration-300 ease-in-out"
        >
          <div className="flex items-center">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
            {(filters.categories.length > 0 ||
              filters.type !== "all" ||
              filters.amountRange.min !== undefined ||
              filters.amountRange.max !== undefined) && (
              <div className="ml-2 flex items-center">
                <span className="rounded-full bg-primary w-2 h-2 animate-in fade-in zoom-in duration-300" />
              </div>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/30"
        align="end"
      >
        <div className="grid gap-4 p-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filters</h4>
            <p className="text-sm text-muted-foreground">
              Filter your transactions by type, category, and amount
            </p>
          </div>
          <Separator />
          {/* Type filter */}
          <div className="space-y-2">
            <Label>Transaction Type</Label>
            <Tabs
              value={filters.type}
              onValueChange={(value) =>
                handleFiltersChange({ type: value as TransactionType })
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expense">Expense</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <Separator />
          {/* Categories filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Categories</Label>
              {filters.categories.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => handleFiltersChange({ categories: [] })}
                >
                  Clear all
                </Button>
              )}
            </div>
            <Command className="overflow-hidden rounded-md border bg-transparent mb-2">
              <CommandInput
                placeholder="Search categories..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="border-0 px-3 h-9 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-300"
              />
              {filters.categories.length > 0 && (
                <div className="border-t px-3 py-2 bg-muted/50 transition-all duration-200">
                  <div className="flex gap-1.5 flex-wrap">
                    {filters.categories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="bg-background hover:bg-background transition-colors duration-300"
                      >
                        {category}
                        <button
                          onClick={() => toggleCategory(category)}
                          className="ml-1 rounded-full hover:bg-muted transition-colors duration-300"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {category}</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <CommandList className="max-h-[145px] overflow-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/30">
                <CommandEmpty className="py-3 text-sm text-center text-muted-foreground">
                  No categories found.
                </CommandEmpty>
                <CommandGroup className="px-2 py-1">
                  {filteredCategories.map((category) => (
                    <CommandItem
                      key={category}
                      onSelect={() => toggleCategory(category)}
                      className="rounded-sm cursor-pointer transition-colors duration-300"
                    >
                      <div className="flex h-4 w-4 items-center justify-center rounded-sm border border-primary/20 mr-2 transition-colors duration-300">
                        {filters.categories.includes(category) && (
                          <Check className="h-3 w-3 text-primary transition-all duration-300" />
                        )}
                      </div>
                      <span className="flex-1 text-sm">{category}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
          <Separator className="mt-8 transition-opacity duration-300" />
          {/* Amount Range filter */}
          <div className="space-y-2">
            <Label>Amount Range</Label>
            <div className="flex items-center gap-2">
              <div className="grid gap-1.5 flex-1">
                <Label
                  htmlFor="min-amount"
                  className="text-xs text-muted-foreground transition-colors duration-300"
                >
                  Min
                </Label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground transition-colors duration-300">
                    $
                  </span>
                  <Input
                    id="min-amount"
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="0.00"
                    value={filters.amountRange.min ?? ""}
                    onChange={(e) => handleAmountChange("min", e.target.value)}
                    className="pl-6 transition-all duration-200"
                  />
                </div>
              </div>
              <div className="grid gap-1.5 flex-1">
                <Label
                  htmlFor="max-amount"
                  className="text-xs text-muted-foreground transition-colors duration-300"
                >
                  Max
                </Label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground transition-colors duration-300">
                    $
                  </span>
                  <Input
                    id="max-amount"
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="0.00"
                    value={filters.amountRange.max ?? ""}
                    onChange={(e) => handleAmountChange("max", e.target.value)}
                    className="pl-6 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Reset button */}
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFilters({
                  categories: [],
                  type: "all",
                  amountRange: {},
                });
                setSearchQuery("");
              }}
              className="text-xs transition-all duration-300"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
