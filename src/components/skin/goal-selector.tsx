"use client";
import { ArrowLeft, Check, Droplets, Focus, HeartPulse, Sparkles, Sun, Waves } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SKIN_GOALS } from "@/data/mock/skin-goals";
import { cn } from "@/lib/utils";
import { SkinGate } from "@/components/skin/skin-gate";
import { useDemoStore } from "@/stores/demo-store";

const icons = [Sparkles, Focus, Waves, Sun, Sparkles, HeartPulse, Droplets, HeartPulse];
export function GoalSelector() {
  const saved = useDemoStore((state) => state.skinGoalIds); const setGoals = useDemoStore((state) => state.setSkinGoals);
  const [selected, setSelected] = useState<string[]>(saved); const router = useRouter();
  function toggle(id: string) { setSelected((items) => items.includes(id) ? items.filter((item) => item !== id) : items.length < 3 ? [...items, id] : items); }
  return <SkinGate><div><Link href="/skin-journey" aria-label="Back to Skin Journey" className="grid size-11 place-items-center rounded-full border"><ArrowLeft className="size-4" /></Link><p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Start your journey</p><h1 className="mt-2 text-[2.35rem] font-medium leading-tight tracking-[-0.05em]">What would you like to improve?</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Choose up to three goals. Your first choice becomes the primary goal that shapes your journey.</p><div className="mt-4 flex items-center justify-between rounded-2xl bg-oasis-gold-soft px-4 py-3"><span className="text-xs">Goals selected</span><span className="font-mono text-sm font-medium">{selected.length} / 3</span></div><div className="mt-5 grid grid-cols-2 gap-3">{SKIN_GOALS.map((goal, index) => { const Icon = icons[index]; const active = selected.includes(goal.id); const order = selected.indexOf(goal.id); return <button key={goal.id} type="button" onClick={() => toggle(goal.id)} aria-pressed={active} className={cn("relative min-h-32 rounded-2xl border p-4 text-left transition-colors", active && "border-[#9b7d28] bg-oasis-gold-soft")}><span className="grid size-9 place-items-center rounded-full bg-white"><Icon className="size-4" /></span><span className="mt-5 block text-sm font-medium leading-5">{goal.name}</span><span className="mt-1 block font-mono text-[10px] text-muted-foreground">{goal.estimatedDurationDays} days</span>{active ? <span className="absolute right-3 top-3 grid size-6 place-items-center rounded-full bg-foreground text-[10px] text-white">{order === 0 ? "1" : order + 1}</span> : null}</button>; })}</div>{selected.length === 3 ? <p className="mt-3 text-center text-xs text-muted-foreground">Maximum three goals selected.</p> : null}<button type="button" disabled={!selected.length} onClick={() => { setGoals(selected); router.push("/skin-journey/scan"); }} className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-white disabled:opacity-35"><Check className="size-4" />Start baseline scan</button></div></SkinGate>;
}
