"use client";

import { ArrowLeft, CalendarDays, Clock3, Coins, ShoppingBag, Trash2, X } from "lucide-react";
import Link from "next/link";
import { ServiceVisual } from "@/components/services/service-visual";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/domain/money";
import { getBookingDateLabel, getBookingTimeLabel } from "@/domain/booking";
import type { Service } from "@/domain/types";
import { useCartStore } from "@/stores/cart-store";

export function CartScreen({ services }: { services: Service[] }) {
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const serviceIds = useCartStore((state) => state.serviceIds);
  const removeService = useCartStore((state) => state.removeService);
  const clearCart = useCartStore((state) => state.clearCart);
  const schedules = useCartStore((state) => state.schedules);
  const selected = services.filter((service) => serviceIds.includes(service.id));
  const totalPrice = selected.reduce((total, service) => total + service.price, 0);
  const totalMinutes = selected.reduce((total, service) => total + service.durationMinutes, 0);
  const totalCashPoints = selected.reduce((total, service) => total + service.cashPointsReward, 0);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link href="/services" aria-label="Back to services" className="grid size-10 place-items-center rounded-full border bg-card"><ArrowLeft className="size-4" /></Link>
        {selected.length > 0 ? <button type="button" onClick={clearCart} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><Trash2 className="size-3.5" />Clear</button> : null}
      </div>
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Your treatment plan</p>
      <h1 className="mt-2 text-[2.4rem] font-medium tracking-[-0.05em]">Treatment cart.</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">Add multiple treatments and schedule each appointment separately. Each treatment can be added once.</p>

      {!hasHydrated ? <div className="mt-8 h-40 animate-pulse rounded-3xl bg-oasis-surface" /> : null}
      {hasHydrated && selected.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed px-6 py-12 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-oasis-gold-soft"><ShoppingBag className="size-5" /></span>
          <h2 className="mt-4 text-lg font-medium">Your session is empty</h2>
          <p className="mx-auto mt-2 max-w-56 text-sm leading-6 text-muted-foreground">Choose one or more treatments to build your visit.</p>
          <Button asChild className="mt-6 rounded-full"><Link href="/services">Explore treatments</Link></Button>
        </div>
      ) : null}

      {selected.length > 0 ? (
        <>
          <div className="mt-8 space-y-3">
            {selected.map((service) => (
              <article key={service.id} className="grid grid-cols-[84px_1fr_auto] gap-3 rounded-2xl border bg-card p-3">
                <ServiceVisual service={service} className="h-20 rounded-xl" />
                <div className="min-w-0 py-1"><h2 className="truncate text-sm font-medium">{service.name}</h2><p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground"><Clock3 className="size-3" />{service.durationMinutes} min</p>{schedules[service.id] ? <p className="mt-1.5 text-[11px] leading-4 text-[#7a642f]"><CalendarDays className="mr-1 inline size-3" />{getBookingDateLabel(schedules[service.id].date)}<br /><span className="pl-4">{getBookingTimeLabel(schedules[service.id].time)}</span></p> : <p className="mt-1.5 text-[11px] text-red-700">Appointment required</p>}<p className="mt-2 font-mono text-xs font-medium">{formatNaira(service.price)}</p></div>
                <button type="button" onClick={() => removeService(service.id)} aria-label={`Remove ${service.name}`} className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-oasis-surface"><X className="size-4" /></button>
              </article>
            ))}
          </div>

          <section className="mt-6 rounded-3xl bg-oasis-black p-5 text-white">
            <div className="flex items-center justify-between"><span className="text-sm text-white/60">{selected.length} {selected.length === 1 ? "treatment" : "treatments"}</span><span className="flex items-center gap-1.5 text-sm text-white/70"><Clock3 className="size-4" />{totalMinutes} min</span></div>
            <div className="mt-5 flex items-end justify-between border-t border-white/15 pt-5"><div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">Cart total</p><p className="mt-1 font-mono text-2xl font-medium">{formatNaira(totalPrice)}</p></div><div className="text-right"><p className="flex items-center justify-end gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45"><Coins className="size-3" />Earn</p><p className="mt-1 font-mono text-sm text-oasis-gold">+{totalCashPoints.toLocaleString("en-NG")} CP</p></div></div>
          </section>

          <Button asChild size="lg" className="mt-6 h-12 w-full rounded-full"><Link href="/bookings/new/session">Review and pay together</Link></Button>
          <Link href="/services" className="mt-4 block text-center text-xs font-medium text-muted-foreground underline underline-offset-4">Add another treatment</Link>
        </>
      ) : null}
    </div>
  );
}
