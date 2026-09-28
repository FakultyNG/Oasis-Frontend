import { Activity, ArrowUpRight, Droplets, Sparkles, Waves } from "lucide-react";
import Link from "next/link";
import type { Service } from "@/domain/types";
import { formatNaira } from "@/domain/money";

const serviceIcons = [Droplets, Waves, Sparkles, Activity] as const;

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = serviceIcons[index % serviceIcons.length];
  return (
    <Link href={`/services/${service.id}`} className="min-w-[180px] rounded-2xl border bg-card p-4">
      <div className="flex h-24 items-start justify-between rounded-xl bg-oasis-surface p-3"><span className="grid size-9 place-items-center rounded-full bg-white"><Icon className="size-4" /></span><span className="rounded-full bg-white px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{service.category}</span></div>
      <div className="mt-4 flex items-start justify-between gap-2"><h3 className="text-sm font-medium tracking-tight">{service.name}</h3><ArrowUpRight className="size-3.5 shrink-0" /></div>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground"><span>{service.durationMinutes} min</span><span className="font-mono font-medium text-foreground">{formatNaira(service.price)}</span></div>
    </Link>
  );
}
