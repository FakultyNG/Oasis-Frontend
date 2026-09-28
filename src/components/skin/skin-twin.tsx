"use client";

import { ArrowLeft, Info, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type PointerEvent, useState } from "react";
import { SkinGate } from "@/components/skin/skin-gate";
import type { SkinJourneyData, SkinScanPeriod } from "@/domain/types";
import { cn } from "@/lib/utils";
import { useDemoStore } from "@/stores/demo-store";

type Marker = { x: number; y: number; scoreOffset: number; label: string };
const PERIOD_LABELS: Record<SkinScanPeriod, string> = { dayOne: "Day One", previous: "Previous", today: "Today" };

function dateDetails(value: string, latest: string) {
  const date = new Date(value);
  const days = Math.max(0, Math.round((new Date(latest).getTime() - date.getTime()) / 86_400_000));
  return { date: new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short", year: "numeric" }).format(date), time: new Intl.DateTimeFormat("en-NG", { hour: "numeric", minute: "2-digit" }).format(date), ago: days === 0 ? "Today" : `${days} day${days === 1 ? "" : "s"} ago` };
}

function locationLabel(x: number, y: number) {
  if (y < 37) return "Forehead";
  if (y > 64) return "Jawline";
  if (x < 39) return "Left cheek";
  if (x > 61) return "Right cheek";
  return "T-zone";
}

export function SkinTwin({ data }: { data: SkinJourneyData }) {
  const [period, setPeriod] = useState<SkinScanPeriod>("today");
  const [marker, setMarker] = useState<Marker>({ x: 27, y: 49, scoreOffset: 0, label: "Left cheek" });
  const capturedImage = useDemoStore((state) => state.skinScanImage);
  const pigmentation = data.metrics.find((item) => item.id === "pigmentation")!;
  const details = dateDetails(data.scanDates[period], data.scanDates.today);
  const score = Math.max(45, Math.min(98, pigmentation[period] + marker.scoreOffset));

  function moveMarker(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.round(((event.clientX - bounds.left) / bounds.width) * 100);
    const y = Math.round(((event.clientY - bounds.top) / bounds.height) * 100);
    const clampedX = Math.max(7, Math.min(93, x));
    const clampedY = Math.max(7, Math.min(93, y));
    setMarker({ x: clampedX, y: clampedY, scoreOffset: ((clampedX * 3 + clampedY * 2) % 15) - 7, label: locationLabel(clampedX, clampedY) });
  }

  return <SkinGate><div>
    <Link href="/skin-journey" aria-label="Back to Skin Journey" className="grid size-10 place-items-center rounded-full border"><ArrowLeft className="size-4" /></Link><p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Interactive analysis</p><h1 className="mt-2 text-[2.35rem] font-medium tracking-[-0.05em]">Your Skin Twin.</h1><p className="mt-3 text-sm text-muted-foreground">Tap anywhere on your face to move the marker and explore a simulated score for that area.</p>
    <div className="mt-6 flex rounded-full border bg-oasis-surface p-1">{(["dayOne", "previous", "today"] as const).map((item) => <button key={item} type="button" onClick={() => setPeriod(item)} className={cn("h-9 flex-1 rounded-full text-[11px] font-medium", period === item && "bg-foreground text-white")}>{PERIOD_LABELS[item]}</button>)}</div>
    <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-muted-foreground"><span>{details.date} · {details.time}</span><span>{details.ago}</span></div>
    <div onPointerDown={moveMarker} role="application" aria-label="Interactive skin image. Tap to inspect an area." className="relative mt-4 aspect-[3/4] cursor-crosshair touch-none overflow-hidden rounded-[32px] bg-oasis-surface"><Image src={capturedImage || "/skin/skin-twin.png"} alt={capturedImage ? "Your captured Skin Twin" : "Interactive Skin Twin portrait of a Nigerian woman"} fill unoptimized={Boolean(capturedImage)} sizes="390px" priority className={cn("pointer-events-none object-cover object-top transition-all duration-500", period === "dayOne" && "saturate-[0.8] contrast-[0.94]", period === "previous" && "saturate-[0.92]")} /><span className="pointer-events-none absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-[#b28d35]/85 shadow-lg backdrop-blur transition-all duration-200" style={{ left: `${marker.x}%`, top: `${marker.y}%` }}><span className="size-2 rounded-full bg-white" /></span><span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1.5 text-[10px] text-white backdrop-blur">Tap another area</span></div>
    <section className="mt-4 rounded-2xl bg-oasis-black p-5 text-white"><div className="flex items-start justify-between"><div><p className="text-[10px] uppercase tracking-wider text-oasis-gold">Selected area</p><h2 className="mt-1 text-lg font-medium">{marker.label}</h2></div><span className="font-mono text-2xl">{score}</span></div><p className="mt-4 flex gap-2 border-t border-white/15 pt-4 text-xs leading-5 text-white/55"><Info className="mt-0.5 size-3.5 shrink-0" />This area score is simulated for the prototype. A production analysis will come from the scan backend.</p></section>
    <Link href="/skin-journey/concierge" className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-white"><Sparkles className="size-4" />View recommendation</Link>
  </div></SkinGate>;
}
