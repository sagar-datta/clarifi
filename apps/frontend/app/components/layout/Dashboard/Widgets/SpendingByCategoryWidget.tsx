import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs/Tabs";

export function SpendingByCategoryWidget() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-medium">
          Spending by Category
        </CardTitle>
        <Tabs defaultValue="month" className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {/* We'll add charts here later */}
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          Chart placeholder
        </div>
      </CardContent>
    </Card>
  );
}
