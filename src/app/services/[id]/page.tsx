import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { ServiceDetail } from "@/components/services/service-detail";
import { repositories } from "@/repositories";

type ServicePageProps = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const services = await repositories.services.getAll();
  return services.map((service) => ({ id: service.id }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { id } = await params;
  const service = await repositories.services.getById(id);
  return { title: service?.name ?? "Service" };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;
  const service = await repositories.services.getById(id);
  if (!service) notFound();
  return <AppShell><ServiceDetail service={service} /></AppShell>;
}
