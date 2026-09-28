"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useDeferredValue, useState } from "react";
import { ServiceListCard } from "@/components/services/service-list-card";
import { CartButton } from "@/components/cart/cart-button";
import { Input } from "@/components/ui/input";
import type { Service } from "@/domain/types";
import { cn } from "@/lib/utils";

const filters = ["All", "Skin", "Wellness", "Advanced", "Signature"] as const;

function matchesFilter(service: Service, filter: (typeof filters)[number]) {
  if (filter === "All") return true;
  if (filter === "Skin") return service.category === "Skin health" || service.category === "Complexion";
  return service.category.toLowerCase().includes(filter.toLowerCase());
}

export function ServicesScreen({ services }: { services: Service[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const visibleServices = services.filter((service) => matchesFilter(service, filter) && `${service.name} ${service.category}`.toLowerCase().includes(deferredQuery));

  return (
    <div>
      <header className="pt-1">
        <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Oasis treatments</p><h1 className="mt-2 text-[2.4rem] font-medium tracking-[-0.05em]">Find your ritual.</h1></div><CartButton /></div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">Explore restorative treatments selected for skin, body and wellbeing.</p>
      </header>

      <div className="relative mt-7"><Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search treatments" aria-label="Search treatments" className="h-12 rounded-full bg-oasis-surface pl-11 pr-4" /></div>

      <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none]" aria-label="Filter services">
        {filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} className={cn("h-9 shrink-0 rounded-full border px-4 text-xs font-medium transition-colors", filter === item ? "border-foreground bg-foreground text-white" : "bg-card text-muted-foreground")}>{item}</button>)}
      </div>

      <div className="mt-7 flex items-center justify-between"><h2 className="text-sm font-medium">{filter === "All" ? "All treatments" : filter}</h2><span className="flex items-center gap-1 text-xs text-muted-foreground"><SlidersHorizontal className="size-3.5" />{visibleServices.length} services</span></div>
      <div className="mt-3 space-y-3">{visibleServices.map((service) => <ServiceListCard key={service.id} service={service} />)}</div>
      {visibleServices.length === 0 ? <div className="mt-3 rounded-2xl border border-dashed p-8 text-center"><p className="text-sm font-medium">No treatments found</p><p className="mt-1 text-xs text-muted-foreground">Try another search or category.</p></div> : null}
    </div>
  );
}
