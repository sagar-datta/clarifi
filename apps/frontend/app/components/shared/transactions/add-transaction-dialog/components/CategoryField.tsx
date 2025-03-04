import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form/Form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select/Select";
import { FormFieldProps } from "../types";
import { useFormContext } from "react-hook-form";

export function CategoryField({ isSubmitting = false }: FormFieldProps) {
  const form = useFormContext();
  const transactionType = form.watch("type");

  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">Category</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={isSubmitting}
          >
            <FormControl>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {transactionType === "expense" ? (
                <>
                  <SelectGroup>
                    <SelectLabel className="font-semibold text-sm text-primary border-b pb-1 mb-2 mt-1 first:mt-0">
                      Essential Living
                    </SelectLabel>
                    <SelectItem value="rent">Rent/Mortgage</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="groceries">Groceries</SelectItem>
                    <SelectItem value="household">Household Items</SelectItem>
                  </SelectGroup>
                  <SelectGroup className="pt-3">
                    <SelectLabel className="font-semibold text-sm text-primary border-b pb-1 mb-2">
                      Transportation
                    </SelectLabel>
                    <SelectItem value="fuel">Fuel</SelectItem>
                    <SelectItem value="public_transport">
                      Public Transport
                    </SelectItem>
                    <SelectItem value="car_maintenance">
                      Car Maintenance
                    </SelectItem>
                    <SelectItem value="parking">Parking</SelectItem>
                  </SelectGroup>
                  <SelectGroup className="pt-3">
                    <SelectLabel className="font-semibold text-sm text-primary border-b pb-1 mb-2">
                      Health & Wellbeing
                    </SelectLabel>
                    <SelectItem value="medical">Medical/Healthcare</SelectItem>
                    <SelectItem value="fitness">Fitness/Sports</SelectItem>
                    <SelectItem value="personal_care">Personal Care</SelectItem>
                  </SelectGroup>
                  <SelectGroup className="pt-3">
                    <SelectLabel className="font-semibold text-sm text-primary border-b pb-1 mb-2">
                      Lifestyle
                    </SelectLabel>
                    <SelectItem value="dining">Dining Out</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="hobbies">Hobbies</SelectItem>
                    <SelectItem value="gifts">Gifts</SelectItem>
                  </SelectGroup>
                  <SelectGroup className="pt-3">
                    <SelectLabel className="font-semibold text-sm text-primary border-b pb-1 mb-2">
                      Financial
                    </SelectLabel>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="debt">Debt Payments</SelectItem>
                    <SelectItem value="investments">Investments</SelectItem>
                    <SelectItem value="fees">Bank Fees/Charges</SelectItem>
                  </SelectGroup>
                  <SelectGroup className="pt-3">
                    <SelectLabel className="font-semibold text-sm text-primary border-b pb-1 mb-2">
                      Other
                    </SelectLabel>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="business">Business Expenses</SelectItem>
                    <SelectItem value="charity">Charity/Donations</SelectItem>
                    <SelectItem value="misc_expense">Miscellaneous</SelectItem>
                  </SelectGroup>
                </>
              ) : (
                <>
                  <SelectGroup>
                    <SelectLabel className="font-semibold text-sm text-primary border-b pb-1 mb-2 mt-1 first:mt-0">
                      Employment
                    </SelectLabel>
                    <SelectItem value="salary">Salary/Wages</SelectItem>
                    <SelectItem value="bonus">Bonus</SelectItem>
                    <SelectItem value="commission">Commission</SelectItem>
                    <SelectItem value="overtime">Overtime</SelectItem>
                  </SelectGroup>
                  <SelectGroup className="pt-3">
                    <SelectLabel className="font-semibold text-sm text-primary border-b pb-1 mb-2">
                      Business
                    </SelectLabel>
                    <SelectItem value="business_income">
                      Business Income
                    </SelectItem>
                    <SelectItem value="freelance">
                      Freelance/Contract Work
                    </SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                  </SelectGroup>
                  <SelectGroup className="pt-3">
                    <SelectLabel className="font-semibold text-sm text-primary border-b pb-1 mb-2">
                      Investments
                    </SelectLabel>
                    <SelectItem value="dividends">Dividends</SelectItem>
                    <SelectItem value="interest">Interest</SelectItem>
                    <SelectItem value="capital_gains">Capital Gains</SelectItem>
                    <SelectItem value="rental">Rental Income</SelectItem>
                  </SelectGroup>
                  <SelectGroup className="pt-3">
                    <SelectLabel className="font-semibold text-sm text-primary border-b pb-1 mb-2">
                      Government
                    </SelectLabel>
                    <SelectItem value="tax_refund">Tax Refund</SelectItem>
                    <SelectItem value="benefits">
                      Government Benefits
                    </SelectItem>
                    <SelectItem value="pension">
                      Pension/Superannuation
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup className="pt-3">
                    <SelectLabel className="font-semibold text-sm text-primary border-b pb-1 mb-2">
                      Other
                    </SelectLabel>
                    <SelectItem value="gifts_received">
                      Gifts Received
                    </SelectItem>
                    <SelectItem value="sale">Sale of Items</SelectItem>
                    <SelectItem value="misc_income">Miscellaneous</SelectItem>
                  </SelectGroup>
                </>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
