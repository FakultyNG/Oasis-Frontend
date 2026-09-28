"use client";

import { ArrowLeft, CheckCircle2, Copy, Gift, LockKeyhole, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDemoStore } from "@/stores/demo-store";

export function ReferralScreen() {
  const tier = useDemoStore((state) => state.activeTier);
  const earn = useDemoStore((state) => state.earnCashPoints);
  const [complete, setComplete] = useState(false);
  const [copied, setCopied] = useState(false);
  if (tier === "regular") return <div className="text-center"><LockKeyhole className="mx-auto mt-16 size-6" /><h1 className="mt-5 text-3xl font-medium">Referrals are a member benefit.</h1><Link href="/membership" className="mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-white">View membership</Link></div>;
  return <div><Link href="/rewards" aria-label="Back to rewards" className="grid size-10 place-items-center rounded-full border"><ArrowLeft className="size-4" /></Link><span className="mt-10 grid size-14 place-items-center rounded-2xl bg-oasis-gold-soft"><Users className="size-5" /></span><p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Refer & Earn</p><h1 className="mt-2 text-[2.4rem] font-medium tracking-[-0.05em]">Share your Oasis.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Earn 5,000 CashPoints after your referred guest completes an eligible paid service.</p><section className="mt-8 rounded-3xl border p-5"><p className="text-xs text-muted-foreground">Your referral code</p><div className="mt-2 flex items-center justify-between"><p className="font-mono text-xl tracking-[0.12em]">BETTE5K</p><button type="button" onClick={() => setCopied(true)} className="grid size-10 place-items-center rounded-full bg-oasis-surface" aria-label="Copy referral code"><Copy className="size-4" /></button></div>{copied ? <p className="mt-3 text-xs text-emerald-700">Referral code copied</p> : null}</section><div className="mt-5 rounded-2xl bg-oasis-surface p-4"><p className="flex items-center gap-2 text-xs font-medium"><Gift className="size-4" />Prototype completion</p><p className="mt-2 text-xs leading-5 text-muted-foreground">Simulate an eligible referred customer completing a paid treatment.</p><button type="button" disabled={complete} onClick={() => { earn(tier, 5_000, "Referral reward"); setComplete(true); }} className="mt-4 h-11 w-full rounded-full bg-foreground text-xs font-medium text-white disabled:opacity-50">{complete ? "Reward added" : "Simulate completed referral"}</button>{complete ? <p role="status" className="mt-3 flex items-center justify-center gap-2 text-xs text-emerald-700"><CheckCircle2 className="size-4" />5,000 CP added</p> : null}</div></div>;
}
