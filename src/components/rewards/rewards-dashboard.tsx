"use client";

import { ArrowLeft, ArrowUpRight, Coins, Gift, LockKeyhole, Store, Users } from "lucide-react";
import Link from "next/link";
import { formatNaira } from "@/domain/money";
import type { Partner } from "@/domain/types";
import { useDemoStore } from "@/stores/demo-store";

export function RewardsDashboard({ partners }: { partners: Partner[] }) {
  const tier = useDemoStore((state) => state.activeTier);
  const points = useDemoStore((state) => state.cashPointBalances[tier]);

  if (tier === "regular") return <div><Link href="/" aria-label="Back home" className="grid size-10 place-items-center rounded-full border"><ArrowLeft className="size-4" /></Link><div className="mt-16 text-center"><span className="mx-auto grid size-14 place-items-center rounded-full bg-oasis-gold-soft"><LockKeyhole className="size-5" /></span><p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#8a7135]">Membership benefit</p><h1 className="mt-2 text-3xl font-medium">Rewards await.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">CashPoints and partner privileges unlock with Oasis Gold or Black.</p><Link href="/membership" className="mt-7 inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-white">View membership</Link></div></div>;

  return <div>
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Membership rewards</p><h1 className="mt-2 text-[2.4rem] font-medium tracking-[-0.05em]">Rewards.</h1>
    <section className="mt-7 rounded-3xl bg-oasis-black p-6 text-white"><div className="flex items-start justify-between"><div><p className="text-xs text-white/45">CashPoints balance</p><p className="mt-2 font-mono text-4xl font-medium">{points.toLocaleString("en-NG")} <span className="text-sm text-white/45">CP</span></p></div><span className="grid size-11 place-items-center rounded-full bg-white/10"><Coins className="size-5 text-oasis-gold" /></span></div><div className="mt-6 flex items-center justify-between border-t border-white/15 pt-5"><span className="text-xs text-white/45">Redemption value</span><span className="font-mono text-sm">{formatNaira(points)}</span></div></section>
    <div className="mt-4 grid grid-cols-2 gap-3"><Link href="/rewards/cashpoints" className="rounded-2xl border p-4"><Gift className="size-4" /><p className="mt-5 text-sm font-medium">CashPoints</p><p className="mt-1 text-xs text-muted-foreground">History & redeem</p></Link><Link href="/rewards/referral" className="rounded-2xl border p-4"><Users className="size-4" /><p className="mt-5 text-sm font-medium">Refer & Earn</p><p className="mt-1 text-xs text-muted-foreground">Earn 5,000 CP</p></Link></div>
    <section className="mt-8"><h2 className="text-lg font-medium">Partner privileges</h2><div className="mt-3 space-y-3">{partners.map((partner) => { const benefit = partner[tier]; return <Link key={partner.id} href={`/rewards/partners/${partner.id}`} className="flex items-center gap-4 rounded-2xl border p-4"><span className="grid size-10 place-items-center rounded-full bg-oasis-surface"><Store className="size-4" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-medium">{partner.name}</span><span className="mt-1 block text-xs text-muted-foreground">{benefit.benefitText}{benefit.discountPercent ? ` · ${benefit.discountPercent}% benefit` : ""}</span></span><ArrowUpRight className="size-4" /></Link>; })}</div></section>
    <p className="mt-6 text-center text-[10px] leading-4 text-muted-foreground">Partner benefits are illustrative prototype examples.</p>
  </div>;
}
