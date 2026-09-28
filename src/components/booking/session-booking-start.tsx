"use client";

import { ArrowLeft, Check, Clock3 } from "lucide-react";
import Link from "next/link";
import { ServiceVisual } from "@/components/services/service-visual";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/domain/money";
import type { Service } from "@/domain/types";
import { useCartStore } from "@/stores/cart-store";

export function SessionBookingStart({ services }: { services: Service[] }) {
  const serviceIds = useCartStore((state) => state.serviceIds);
  const selected = services.filter((service) => serviceIds.includes(service.id));
  const totalPrice = selected.reduce((total, service) => total + service.price, 0);
  const totalMinutes = selected.reduce((total, service) => total + service.durationMinutes, 0);

  return (
    <div>
      <Link href="/cart" aria-label="Back to cart" className="grid size-10 place-items-center rounded-full border bg-card"><ArrowLeft className="size-4" /></Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Booking · Step 1 of 4</p>
      <h1 className="mt-2 text-[2.4rem] font-medium tracking-[-0.05em]">Session selected.</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">Your treatments are grouped into one visit. Date and time selection follows in Milestone 3.</p>

      {selected.length === 0 ? <div className="mt-8 rounded-3xl border border-dashed p-8 text-center"><p className="text-sm font-medium">No treatments selected</p><Button asChild className="mt-5 rounded-full"><Link href="/services">Explore treatments</Link></Button></div> : (
        <>
          <div className="mt-8 space-y-3">{selected.map((service) => <article key={service.id} className="grid grid-cols-[76px_1fr_auto] items-center gap-3 rounded-2xl border bg-card p-3"><ServiceVisual service={service} className="h-16 rounded-xl" /><div className="min-w-0"><h2 className="truncate text-sm font-medium">{service.name}</h2><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3" />{service.durationMinutes} min · {formatNaira(service.price)}</p></div><span className="grid size-7 place-items-center rounded-full bg-oasis-gold-soft"><Check className="size-3.5" /></span></article>)}</div>
          <div className="mt-5 flex items-center justify-between rounded-2xl bg-oasis-surface p-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">Combined time</p><p className="mt-1 font-mono text-sm font-medium">{totalMinutes} min</p></div><div className="text-right"><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">Session total</p><p className="mt-1 font-mono text-sm font-medium">{formatNaira(totalPrice)}</p></div></div>
          <Button disabled className="mt-6 h-12 w-full rounded-full">Choose date in Milestone 3</Button>
          <Link href="/cart" className="mt-4 block text-center text-xs font-medium text-muted-foreground underline underline-offset-4">Edit session</Link>
        </>
      )}
    </div>
  );
}
