import { Card, CardContent } from "@/app/components/ui/card/Card";
import { TransactionsWidgetContent } from "./TransactionsWidgetContent";

export function TransactionsWidget() {
  return (
    <Card className="col-span-3 h-[500px] sm:h-[400px]">
      <CardContent className="flex h-full flex-col p-6">
        <TransactionsWidgetContent />
      </CardContent>
    </Card>
  );
}

export default TransactionsWidget;
