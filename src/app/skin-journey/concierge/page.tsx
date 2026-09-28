import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { Concierge } from "@/components/skin/concierge";
import { repositories } from "@/repositories";
export const metadata: Metadata = { title: "Treatment Concierge" };
export default async function ConciergePage() { const [data, allServices] = await Promise.all([repositories.skin.getJourney(), repositories.services.getAll()]); const services = allServices.filter((service) => data.recommendation.serviceIds.includes(service.id)); return <AppShell><Concierge data={data} services={services} /></AppShell>; }
