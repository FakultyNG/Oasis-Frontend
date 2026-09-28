import { Droplets, HeartPulse, ScanLine, Sparkles, WandSparkles } from "lucide-react";
import Image from "next/image";
import type { Service } from "@/domain/types";
import { cn } from "@/lib/utils";

const visualStyles = {
  water: "bg-[#dfe9e6] text-[#49645d]",
  wellness: "bg-[#e9e5dc] text-[#61594b]",
  bright: "bg-[#f1e7c9] text-[#806d37]",
  laser: "bg-[#e7dfdc] text-[#72554d]",
  premium: "bg-oasis-black text-oasis-gold",
} as const;

const visualIcons = {
  water: Droplets,
  wellness: HeartPulse,
  bright: Sparkles,
  laser: ScanLine,
  premium: WandSparkles,
} as const;

export function ServiceVisual({ service, className, priority = false }: { service: Service; className?: string; priority?: boolean }) {
  const Icon = visualIcons[service.visual];
  return (
    <div className={cn("relative isolate overflow-hidden", visualStyles[service.visual], className)}>
      <Image src={`/services/${service.id}.png`} alt={`${service.name} treatment at Oasis MedSpa`} fill priority={priority} sizes="(max-width: 430px) 100vw, 430px" className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      <span aria-hidden="true" className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full border border-white/40 bg-white/80 text-foreground backdrop-blur-sm"><Icon className="size-4" strokeWidth={1.5} /></span>
    </div>
  );
}
