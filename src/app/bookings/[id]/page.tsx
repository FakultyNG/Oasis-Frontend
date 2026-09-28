import type { Metadata } from "next";
import { BookingDetail } from "@/components/booking/booking-detail";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = { title: "Booking Detail" };

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AppShell><BookingDetail id={id} /></AppShell>;
}
