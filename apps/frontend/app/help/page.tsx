import { Metadata } from "next";
import { PageLayout } from "../components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Help | ClariFi",
  description: "Get help and support with ClariFi",
};

export default function HelpPage() {
  return (
    <PageLayout>
      <div>
        <h1 className="text-3xl font-bold">Help</h1>
        <p className="text-muted-foreground mt-2">
          Get help and support with ClariFi
        </p>
      </div>
    </PageLayout>
  );
}
