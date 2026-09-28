import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { TreatmentHistory } from "@/components/profile/treatment-history";
import { repositories } from "@/repositories";
export const metadata: Metadata = { title: "Treatment History" };
export default async function TreatmentHistoryPage() { const treatments = await repositories.account.getTreatmentHistory(); return <AppShell><TreatmentHistory treatments={treatments} /></AppShell>; }
