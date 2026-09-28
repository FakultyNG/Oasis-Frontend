import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingFlow } from "@/components/booking/booking-flow";
import { AppShell } from "@/components/layout/app-shell";
import { repositories } from "@/repositories";

export const metadata: Metadata = { title: "New Booking" };

export default async function NewBookingPage({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params;
  if (serviceId === "session") {
    const services = await repositories.services.getAll();
    return <AppShell><BookingFlow services={services} fromCart /></AppShell>;
  }
  const service = await repositories.services.getById(serviceId);
  if (!service) notFound();
  return <AppShell><BookingFlow services={[service]} /></AppShell>;
}
