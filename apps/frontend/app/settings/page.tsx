import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | ClariFi",
  description: "Manage your account settings and preferences",
};

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground mt-2">
        Manage your account settings and preferences
      </p>
    </div>
  );
}
