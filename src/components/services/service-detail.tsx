"use client";

import { ArrowLeft, Check, Clock3, Coins } from "lucide-react";
import Link from "next/link";
import { AddToCartControl } from "@/components/cart/add-to-cart-control";
import { CartButton } from "@/components/cart/cart-button";
import { ServiceVisual } from "@/components/services/service-visual";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/domain/money";
import type { Service } from "@/domain/types";

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <div className="-mx-5 -mt-6 pb-16">
      <div className="relative">
        <ServiceVisual service={service} className="h-[310px]" priority />
        <Link href="/services" aria-label="Back to services" className="absolute left-5 top-6 grid size-10 place-items-center rounded-full border border-white/40 bg-white/85 backdrop-blur"><ArrowLeft className="size-4" /></Link>
        <div className="absolute right-5 top-6"><CartButton inverse /></div>
        <span className="absolute bottom-5 left-5 rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur">{service.category}</span>
      </div>

      <div className="px-5 pt-7">
        <h1 className="text-[2.35rem] font-medium leading-tight tracking-[-0.05em]">{service.name}</h1>
        <div className="mt-4 flex items-center gap-4"><p className="font-mono text-xl font-medium">{formatNaira(service.price)}</p><span className="h-4 w-px bg-border" /><p className="flex items-center gap-1.5 text-sm text-muted-foreground"><Clock3 className="size-4" />{service.durationMinutes} min</p></div>
        <p className="mt-6 text-sm leading-6 text-muted-foreground">{service.description}</p>

        <section className="mt-8">
          <h2 className="text-lg font-medium tracking-tight">Why you’ll love it</h2>
          <ul className="mt-4 space-y-3">{service.benefits.map((benefit) => <li key={benefit} className="flex items-center gap-3 text-sm"><span className="grid size-6 place-items-center rounded-full bg-oasis-gold-soft"><Check className="size-3.5" /></span>{benefit}</li>)}</ul>
        </section>

        <section className="mt-8 flex items-center gap-4 rounded-2xl bg-oasis-black p-5 text-white">
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10"><Coins className="size-4 text-oasis-gold" /></span>
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">CashPoints reward</p><p className="mt-1 font-mono text-lg font-medium">+{service.cashPointsReward.toLocaleString("en-NG")} CP</p></div>
        </section>

      </div>

      <div className="fixed inset-x-0 bottom-[73px] z-40 mx-auto grid max-w-[430px] grid-cols-[0.9fr_1.1fr] gap-2 border-t bg-white/95 px-5 py-3 backdrop-blur-xl">
        <AddToCartControl service={service} />
        <Button asChild size="lg" className="h-12 rounded-full"><Link href={`/bookings/new/${service.id}`}>Book now</Link></Button>
      </div>
    </div>
  );
}
