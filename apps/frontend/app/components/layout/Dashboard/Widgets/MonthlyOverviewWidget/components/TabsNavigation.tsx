import { TabsList, TabsTrigger } from "@/app/components/ui/tabs/Tabs";

type TabsNavigationProps = {
  incomeCount: number;
  expenseCount: number;
};

export function TabsNavigation({
  incomeCount,
  expenseCount,
}: TabsNavigationProps) {
  return (
    <div className="px-3 sm:px-6 pt-3">
      <TabsList className="h-9 w-full grid grid-cols-2 p-1">
        <TabsTrigger
          value="income"
          className="data-[state=active]:bg-background text-sm flex items-center gap-2"
        >
          Income{" "}
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {incomeCount}
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="expenses"
          className="data-[state=active]:bg-background text-sm flex items-center gap-2"
        >
          Expenses{" "}
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {expenseCount}
          </span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
}
