import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card/Card";
import { Progress } from "@/app/components/ui/progress/Progress";

export function SavingsGoalsWidget() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-medium">Savings Goals</CardTitle>
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
  );
}
