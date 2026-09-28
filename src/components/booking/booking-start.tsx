import { ArrowLeft, Check, Clock3 } from "lucide-react";
import Link from "next/link";
import { ServiceVisual } from "@/components/services/service-visual";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/domain/money";
import type { Service } from "@/domain/types";

export function BookingStart({ service }: { service: Service }) {
  return (
    <div>
      <Link href={`/services/${service.id}`} aria-label="Back to service" className="grid size-10 place-items-center rounded-full border bg-card"><ArrowLeft className="size-4" /></Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Booking · Step 1 of 4</p>
      <h1 className="mt-2 text-[2.4rem] font-medium tracking-[-0.05em]">Treatment selected.</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">Your booking journey has started. Date and time selection follows in Milestone 3.</p>

      <article className="mt-8 overflow-hidden rounded-3xl border bg-card">
        <ServiceVisual service={service} className="h-44" />
        <div className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">{service.category}</p><h2 className="mt-1 text-xl font-medium tracking-tight">{service.name}</h2></div><span className="grid size-8 place-items-center rounded-full bg-oasis-gold-soft"><Check className="size-4" /></span></div><div className="mt-5 flex items-center justify-between border-t pt-4"><span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 className="size-3.5" />{service.durationMinutes} min</span><span className="font-mono text-sm font-medium">{formatNaira(service.price)}</span></div></div>
      </article>

      <Button disabled className="mt-6 h-12 w-full rounded-full">Choose date in Milestone 3</Button>
      <Link href="/services" className="mt-4 block text-center text-xs font-medium text-muted-foreground underline underline-offset-4">Choose another treatment</Link>
    </div>
  );
}
