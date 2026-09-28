import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { SkinTwin } from "@/components/skin/skin-twin";
import { repositories } from "@/repositories";
export const metadata: Metadata = { title: "Skin Twin" };
export default async function SkinTwinPage() { const data = await repositories.skin.getJourney(); return <AppShell><SkinTwin data={data} /></AppShell>; }
