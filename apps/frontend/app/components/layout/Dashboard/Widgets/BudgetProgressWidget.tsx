import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card/Card";
import { Progress } from "@/app/components/ui/progress/Progress";

export function BudgetProgressWidget() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-medium">Budget Progress</CardTitle>
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
  );
}
