"use client";

import { ArrowLeft, BadgePercent, Check, LockKeyhole, ShieldCheck, Store } from "lucide-react";
import Link from "next/link";
import type { Partner } from "@/domain/types";
import { useDemoStore } from "@/stores/demo-store";

export function PartnerDetail({ partner }: { partner: Partner }) {
  const tier = useDemoStore((state) => state.activeTier);
  if (tier === "regular") return <div className="text-center"><LockKeyhole className="mx-auto mt-16 size-6" /><h1 className="mt-5 text-3xl font-medium">Membership required.</h1><Link href="/membership" className="mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-white">View membership</Link></div>;
  const benefit = partner[tier];
  return <div><Link href="/rewards/partners" aria-label="Back to partners" className="grid size-10 place-items-center rounded-full border"><ArrowLeft className="size-4" /></Link><span className="mt-10 grid size-14 place-items-center rounded-2xl bg-oasis-gold-soft"><Store className="size-5" /></span><p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">{partner.category}</p><h1 className="mt-2 text-[2.4rem] font-medium tracking-[-0.05em]">{partner.name}</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">{partner.description}</p><section className="mt-8 rounded-3xl bg-oasis-black p-6 text-white"><p className="text-[10px] uppercase tracking-[0.16em] text-oasis-gold">Your {tier} privilege</p><div className="mt-5 flex items-start gap-3"><span className="grid size-9 place-items-center rounded-full bg-white/10"><Check className="size-4" /></span><div><p className="text-sm font-medium">{benefit.benefitText}</p><p className="mt-1 text-xs text-white/50">Priority status included</p></div></div>{benefit.discountPercent ? <div className="mt-5 flex items-start gap-3 border-t border-white/15 pt-5"><span className="grid size-9 place-items-center rounded-full bg-white/10"><BadgePercent className="size-4" /></span><div><p className="text-sm font-medium">{benefit.discountPercent}% member benefit</p><p className="mt-1 text-xs text-white/50">On qualifying prototype purchases</p></div></div> : null}</section><div className="mt-5 flex gap-3 rounded-2xl bg-oasis-surface p-4"><ShieldCheck className="mt-0.5 size-4 shrink-0" /><p className="text-xs leading-5 text-muted-foreground">Illustrative partnership only. Final benefits, eligibility and verification would be confirmed by the partner.</p></div></div>;
}
