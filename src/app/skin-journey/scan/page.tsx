import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { ScanExperience } from "@/components/skin/scan-experience";
import { repositories } from "@/repositories";
export const metadata: Metadata = { title: "Skin Scan" };
export default async function SkinScanPage() { const data = await repositories.skin.getJourney(); return <AppShell><ScanExperience data={data} /></AppShell>; }
