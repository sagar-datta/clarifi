import { Metadata } from "next";
import { PageLayout } from "../components/layout/PageLayout";
import { WidgetGrid, Widget } from "../components/layout/Dashboard/WidgetGrid";
import { TransactionsWidget } from "../components/layout/Dashboard/Widgets/TransactionsWidget";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card/Card";
import { Progress } from "../components/ui/progress/Progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs/Tabs";

export const metadata: Metadata = {
  title: "Dashboard | ClariFi",
  description: "Your financial overview",
};

export default function DashboardPage() {
  return (
    <PageLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <WidgetGrid>
          <Widget>
            <TransactionsWidget />
          </Widget>
          <Widget>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-base font-medium">
                  Monthly Overview
                </CardTitle>
                <Tabs defaultValue="income" className="w-[200px]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="income">Income</TabsTrigger>
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          </Widget>
          <Widget>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-base font-medium">
                  Budget Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>Entertainment</div>
                    <div className="text-muted-foreground">$450/$600</div>
                  </div>
                  <Progress value={75} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>Groceries</div>
                    <div className="text-muted-foreground">$280/$400</div>
                  </div>
                  <Progress value={70} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>Transport</div>
                    <div className="text-muted-foreground">$120/$200</div>
                  </div>
                  <Progress value={60} />
                </div>
              </CardContent>
            </Card>
          </Widget>
          <Widget>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-base font-medium">
                  Savings Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>New Car</div>
                    <div className="text-muted-foreground">$15,000/$30,000</div>
                  </div>
                  <Progress value={50} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>Holiday</div>
                    <div className="text-muted-foreground">$2,000/$5,000</div>
                  </div>
                  <Progress value={40} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>Emergency Fund</div>
                    <div className="text-muted-foreground">$8,000/$10,000</div>
                  </div>
                  <Progress value={80} />
                </div>
              </CardContent>
            </Card>
          </Widget>
          <Widget fullWidth>
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
          </Widget>
        </WidgetGrid>
      </div>
    </PageLayout>
  );
}
