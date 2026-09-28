import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { SkinPassport } from "@/components/skin/skin-passport";
import { repositories } from "@/repositories";

export const metadata: Metadata = { title: "Skin Journey" };

export default async function SkinJourneyPage() {
  const data = await repositories.skin.getJourney();
  return <AppShell><SkinPassport data={data} /></AppShell>;
}
