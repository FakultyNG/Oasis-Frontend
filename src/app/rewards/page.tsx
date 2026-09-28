import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { RewardsDashboard } from "@/components/rewards/rewards-dashboard";
import { repositories } from "@/repositories";

export const metadata: Metadata = { title: "Rewards" };

export default async function RewardsPage() {
  const partners = await repositories.partners.getAll();
  return <AppShell><RewardsDashboard partners={partners} /></AppShell>;
}
