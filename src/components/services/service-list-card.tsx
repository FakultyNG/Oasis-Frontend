"use client";

import { ArrowUpRight, Clock3, Coins } from "lucide-react";
import Link from "next/link";
import { AddToCartControl } from "@/components/cart/add-to-cart-control";
import { ServiceVisual } from "@/components/services/service-visual";
import { formatNaira } from "@/domain/money";
import type { Service } from "@/domain/types";

export function ServiceListCard({ service }: { service: Service }) {
  return (
    <article className="group grid grid-cols-[112px_1fr] gap-4 rounded-2xl border bg-card p-3 transition-colors hover:border-[#d8d3c8]">
      <Link href={`/services/${service.id}`} aria-label={`View ${service.name}`}><ServiceVisual service={service} className="h-full min-h-32 rounded-xl" /></Link>
      <div className="flex min-w-0 flex-col py-1 pr-1">
        <div className="flex items-start justify-between gap-2"><Link href={`/services/${service.id}`} className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">{service.category}</p><h2 className="mt-2 text-base font-medium tracking-[-0.025em]">{service.name}</h2></Link><Link href={`/services/${service.id}`} aria-label={`View ${service.name}`}><ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-[11px] text-muted-foreground"><span className="flex items-center gap-1"><Clock3 className="size-3" />{service.durationMinutes} min</span><span className="flex items-center gap-1"><Coins className="size-3" />{service.cashPointsReward.toLocaleString("en-NG")} CP</span></div>
        <div className="mt-2 flex items-center justify-between gap-2"><p className="font-mono text-sm font-medium">{formatNaira(service.price)}</p><AddToCartControl service={service} compact /></div>
      </div>
    </article>
  );
}
