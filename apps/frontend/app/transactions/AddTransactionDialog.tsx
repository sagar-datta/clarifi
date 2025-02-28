"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form/Form";
import { Input } from "@/app/components/ui/input/Input";
import { Button } from "@/app/components/ui/button/Button";
import { Calendar } from "@/app/components/ui/calendar/Calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select/Select";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs/Tabs";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover/Popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/app/lib/utils";

// Form validation schema
const formSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.coerce
    .number()
    .min(0.01, "Amount must be greater than 0")
    .transform((val) => Number(val.toFixed(2))),
  category: z.string().min(1, "Category is required"),
  type: z.enum(["expense", "income"]),
  date: z.date(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddTransactionDialogProps {
  children: React.ReactNode;
}

export function AddTransactionDialog({ children }: AddTransactionDialogProps) {
  const [open, setOpen] = React.useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: 0,
      category: "",
      type: "expense",
      date: new Date(),
    },
  });

  // Reset form when dialog closes
  React.useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  function onSubmit(data: FormValues) {
    console.log(data);
    // We'll implement the submission logic later
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] z-50 max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-semibold">
            Add Transaction
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Groceries, Rent, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount and Type in same row */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => {
                  const [displayValue, setDisplayValue] = React.useState("");

                  React.useEffect(() => {
                    if (field.value === 0) {
                      setDisplayValue("");
                    } else {
                      setDisplayValue(field.value.toString());
                    }
                  }, [field.value]);

                  return (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            type="text"
                            inputMode="decimal"
                            placeholder="0.00"
                            className="pl-7"
                            value={displayValue}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow only numbers and at most one decimal point
                              if (!/^\d*\.?\d*$/.test(value)) return;

                              // Prevent more than 2 decimal places
                              if (
                                value.includes(".") &&
                                value.split(".")[1]?.length > 2
                              )
                                return;

                              setDisplayValue(value);
                              const numValue = parseFloat(value);
                              if (!isNaN(numValue)) {
                                field.onChange(numValue);
                              } else {
                                field.onChange(0);
                              }
                            }}
                            onBlur={() => {
                              if (!displayValue || displayValue === "") {
                                setDisplayValue("");
                                field.onChange(0);
                                return;
                              }
                              const numValue = parseFloat(displayValue);
                              if (!isNaN(numValue)) {
                                const formatted = numValue.toFixed(2);
                                setDisplayValue(formatted);
                                field.onChange(parseFloat(formatted));
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Tabs
                        value={field.value}
                        onValueChange={field.onChange}
                        className="w-full"
                      >
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger
                            value="expense"
                            className="flex items-center gap-2"
                          >
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                            Expense
                          </TabsTrigger>
                          <TabsTrigger
                            value="income"
                            className="flex items-center gap-2"
                          >
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            Income
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Field */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="groceries">Groceries</SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="entertainment">
                          Entertainment
                        </SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Field */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => {
                  const [showCalendar, setShowCalendar] = React.useState(false);
                  return (
                    <FormItem className="col-span-2">
                      <FormLabel>Date</FormLabel>
                      <div className="flex flex-col items-center gap-2 relative">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => setShowCalendar(!showCalendar)}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(field.value, "PPP")}
                        </Button>
                        {showCalendar && (
                          <div
                            className={cn(
                              "absolute bottom-[calc(100%+4px)] left-1/2 -translate-x-1/2 z-50",
                              "animate-pop-in",
                              "bg-popover rounded-md border shadow-lg"
                            )}
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setShowCalendar(false);
                              }}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              className="rounded-md"
                              initialFocus
                            />
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Transaction</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
