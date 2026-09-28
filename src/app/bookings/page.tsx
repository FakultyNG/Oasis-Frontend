import type { Metadata } from "next";
import { BookingsScreen } from "@/components/booking/bookings-screen";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = { title: "Bookings" };

export default function BookingsPage() {
  return <AppShell><BookingsScreen /></AppShell>;
}
