"use client";

import { ArrowUpRight, CalendarDays, Clock3, Plus } from "lucide-react";
import Link from "next/link";
import { getBookingDateLabel, getBookingTimeLabel } from "@/domain/booking";
import { formatNaira } from "@/domain/money";
import type { Booking } from "@/domain/types";
import { cn } from "@/lib/utils";
import { useBookingStore } from "@/stores/booking-store";

export function BookingsScreen() {
  const hasHydrated = useBookingStore((state) => state.hasHydrated);
  const bookings = useBookingStore((state) => state.bookings);
  const upcoming = bookings.filter((booking) => booking.status === "confirmed");
  const previous = bookings.filter((booking) => booking.status !== "confirmed");

  return <div><header className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Your schedule</p><h1 className="mt-2 text-[2.4rem] font-medium tracking-[-0.05em]">Bookings.</h1></div><Link href="/services" aria-label="Book a treatment" className="grid size-11 place-items-center rounded-full bg-foreground text-white"><Plus className="size-4" /></Link></header><p className="mt-3 text-sm text-muted-foreground">Manage upcoming visits and treatment history.</p>{!hasHydrated ? <div className="mt-8 h-40 animate-pulse rounded-3xl bg-oasis-surface" /> : <><BookingSection title="Upcoming" bookings={upcoming} empty="No upcoming appointments." /><BookingSection title="Previous" bookings={previous} empty="Your completed and cancelled visits will appear here." /></>}</div>;
}

function BookingSection({ title, bookings, empty }: { title: string; bookings: Booking[]; empty: string }) {
  return <section className="mt-8"><div className="flex items-center justify-between"><h2 className="text-lg font-medium">{title}</h2><span className="font-mono text-xs text-muted-foreground">{bookings.length}</span></div><div className="mt-3 space-y-3">{bookings.map((booking) => <BookingListCard key={booking.id} booking={booking} />)}{bookings.length === 0 ? <div className="rounded-2xl border border-dashed p-6 text-center text-xs text-muted-foreground">{empty}</div> : null}</div></section>;
}

function BookingListCard({ booking }: { booking: Booking }) {
  return <Link href={`/bookings/${booking.id}`} className="block rounded-2xl border bg-card p-4"><div className="flex items-start justify-between gap-4"><div className="min-w-0"><p className="truncate text-sm font-medium">{booking.serviceNames.join(" + ")}</p><p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays className="size-3.5" />{getBookingDateLabel(booking.date)}</p><p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 className="size-3.5" />{getBookingTimeLabel(booking.time)}</p></div><ArrowUpRight className="size-4 shrink-0" /></div><div className="mt-4 flex items-center justify-between border-t pt-3"><span className={cn("rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize", booking.status === "confirmed" ? "bg-oasis-gold-soft" : booking.status === "cancelled" ? "bg-red-50 text-red-700" : "bg-oasis-surface")}>{booking.status}</span><span className="font-mono text-xs font-medium">{formatNaira(booking.totalPrice)}</span></div></Link>;
}
