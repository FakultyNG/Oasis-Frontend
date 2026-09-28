import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { PartnerDetail } from "@/components/rewards/partner-detail";
import { repositories } from "@/repositories";
export const metadata: Metadata = { title: "Partner Benefit" };
export default async function PartnerPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const partner = await repositories.partners.getById(id); if (!partner) notFound(); return <AppShell><PartnerDetail partner={partner} /></AppShell>; }
