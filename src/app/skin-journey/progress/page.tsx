import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { ProgressReveal } from "@/components/skin/progress-reveal";
import { repositories } from "@/repositories";
export const metadata: Metadata = { title: "Skin Progress" };
export default async function SkinProgressPage() { const data = await repositories.skin.getJourney(); return <AppShell><ProgressReveal data={data} /></AppShell>; }
