import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { ServicesScreen } from "@/components/services/services-screen";
import { repositories } from "@/repositories";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage() {
  const services = await repositories.services.getAll();
  return <AppShell><ServicesScreen services={services} /></AppShell>;
}
