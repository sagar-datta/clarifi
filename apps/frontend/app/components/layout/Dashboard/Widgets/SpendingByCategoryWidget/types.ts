export const CATEGORY_GROUPS = {
  "Essential Living": ["rent", "utilities", "groceries", "household"],
  Transportation: ["fuel", "public_transport", "car_maintenance", "parking"],
  "Health & Wellbeing": ["medical", "fitness", "personal_care"],
  Lifestyle: ["dining", "entertainment", "shopping", "hobbies", "gifts"],
  Financial: ["insurance", "debt", "investments", "fees"],
  Other: ["education", "business", "charity", "misc_expense"],
} as const;

export type CategoryValues =
  (typeof CATEGORY_GROUPS)[keyof typeof CATEGORY_GROUPS][number];
export type CategoryGroup = keyof typeof CATEGORY_GROUPS;

export type ChartDataType = {
  name: string;
} & {
  [K in CategoryGroup]?: number;
};

export type ChartConfigType = {
  [key in CategoryGroup]: { color: string; label: string };
};
