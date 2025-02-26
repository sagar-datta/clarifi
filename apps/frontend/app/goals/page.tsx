import { Metadata } from "next";
import { PageLayout } from "../components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Goals | ClariFi",
  description: "Set and monitor financial goals",
};

export default function GoalsPage() {
  return (
    <PageLayout>
      <div>
        <h1 className="text-3xl font-bold">Goals</h1>
        <p className="text-muted-foreground mt-2">
          Set and monitor financial goals
        </p>
      </div>
    </PageLayout>
  );
}
