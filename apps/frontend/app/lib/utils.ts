import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and merges Tailwind classes properly
 * Uses clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(amount);
};

export const categoryDisplayNames: Record<string, string> = {
  // Essential Living
  rent: "Rent/Mortgage",
  utilities: "Utilities",
  groceries: "Groceries",
  household: "Household Items",

  // Transportation
  fuel: "Fuel",
  public_transport: "Public Transport",
  car_maintenance: "Car Maintenance",
  parking: "Parking",

  // Health & Wellbeing
  medical: "Medical/Healthcare",
  fitness: "Fitness/Sports",
  personal_care: "Personal Care",

  // Lifestyle
  dining: "Dining Out",
  entertainment: "Entertainment",
  shopping: "Shopping",
  hobbies: "Hobbies",
  gifts: "Gifts",

  // Financial
  insurance: "Insurance",
  debt: "Debt Payments",
  investments: "Investments",
  fees: "Bank Fees/Charges",

  // Other Expenses
  education: "Education",
  business: "Business Expenses",
  charity: "Charity/Donations",
  misc_expense: "Miscellaneous",

  // Employment
  salary: "Salary/Wages",
  bonus: "Bonus",
  commission: "Commission",
  overtime: "Overtime",

  // Business Income
  business_income: "Business Income",
  freelance: "Freelance/Contract Work",
  consulting: "Consulting",

  // Investment Income
  dividends: "Dividends",
  interest: "Interest",
  capital_gains: "Capital Gains",
  rental: "Rental Income",

  // Government
  tax_refund: "Tax Refund",
  benefits: "Government Benefits",
  pension: "Pension/Superannuation",

  // Other Income
  gifts_received: "Gifts Received",
  sale: "Sale of Items",
  misc_income: "Miscellaneous",
};

export const getCategoryDisplayName = (category: string): string => {
  return categoryDisplayNames[category] || category;
};
