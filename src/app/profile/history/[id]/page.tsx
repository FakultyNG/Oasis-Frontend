import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { TreatmentDetail } from "@/components/profile/treatment-detail";
import { repositories } from "@/repositories";
export const metadata: Metadata = { title: "Treatment Detail" };
export default async function TreatmentDetailPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const treatment = await repositories.account.getTreatment(id); if (!treatment) notFound(); return <AppShell><TreatmentDetail treatment={treatment} /></AppShell>; }
