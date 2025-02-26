import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help | ClariFi",
  description: "Get help and support with ClariFi",
};

export default function HelpPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Help</h1>
      <p className="text-muted-foreground mt-2">
        Get help and support with ClariFi
      </p>
    </div>
  );
}
