import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | ClariFi",
  description: "Your financial overview",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
