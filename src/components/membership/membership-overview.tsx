"use client";

import { ArrowLeft, Check, ChevronRight, Crown, Sparkles, WalletCards } from "lucide-react";
import Link from "next/link";
import { MembershipCard } from "@/components/home/membership-card";
import { MembershipProgress } from "@/components/home/membership-progress";
import { MEMBERSHIP_RULES } from "@/domain/constants";
import { formatNaira } from "@/domain/money";
import { DEMO_USERS } from "@/data/mock/users";
import { useDemoStore } from "@/stores/demo-store";

const plans = [
  { tier: "gold" as const, name: "Oasis Gold", amount: MEMBERSHIP_RULES.goldThreshold, icon: Crown, benefits: ["Oasis Wallet", "CashPoints up to 30%", "AI Skin Journey", "Priority service"] },
  { tier: "black" as const, name: "Oasis Black", amount: MEMBERSHIP_RULES.blackThreshold, icon: Sparkles, benefits: ["Highest service priority", "CashPoints up to 50%", "Black VIP experience", "Premium partner benefits"] },
];

export function MembershipOverview() {
  const tier = useDemoStore((state) => state.activeTier);
  const walletBalance = useDemoStore((state) => state.walletBalances[tier]);
  const member = tier !== "regular";
  const user = { ...DEMO_USERS[tier], walletBalance };

  return <div><Link href="/" aria-label="Back home" className="grid size-10 place-items-center rounded-full border"><ArrowLeft className="size-4" /></Link>{member ? <><p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Your membership</p><h1 className="mt-2 text-[2.4rem] font-medium tracking-[-0.05em]">Welcome to {tier === "gold" ? "Gold" : "Black"}.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Your wallet, membership card and premium privileges are active.</p><div className="mt-7"><MembershipCard user={user} /></div><div className="mt-5 grid grid-cols-2 gap-3"><Link href="/wallet" className="rounded-2xl border p-4"><WalletCards className="size-4" /><p className="mt-5 text-xs text-muted-foreground">Wallet balance</p><p className="mt-1 font-mono text-base font-medium">{formatNaira(walletBalance)}</p></Link><Link href="/membership/card" className="rounded-2xl border p-4"><Crown className="size-4" /><p className="mt-5 text-xs text-muted-foreground">Membership card</p><p className="mt-1 text-sm font-medium">View card</p></Link></div></> : <><p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Oasis Membership</p><h1 className="mt-2 text-[2.4rem] font-medium tracking-[-0.05em]">Choose your level.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Qualify naturally through treatment spend, or fast-track membership by funding a wallet. Every naira remains available for Oasis services.</p><section className="mt-7 rounded-2xl border p-5"><div className="flex items-center justify-between"><p className="text-sm font-medium">Your path to Gold</p><span className="font-mono text-xs text-muted-foreground">64%</span></div><div className="mt-4"><MembershipProgress current={320_000} target={MEMBERSHIP_RULES.goldThreshold} percent={64} /></div><p className="mt-3 text-xs text-muted-foreground">{formatNaira(180_000)} remaining through qualifying activity.</p></section><div className="mt-5 space-y-4">{plans.map(({ tier: planTier, name, amount, icon: Icon, benefits }) => <article key={planTier} className={planTier === "black" ? "rounded-3xl bg-oasis-black p-5 text-white" : "rounded-3xl border bg-oasis-gold-soft p-5"}><div className="flex items-start justify-between"><div><p className="text-[10px] uppercase tracking-[0.16em] opacity-55">Fast-track</p><h2 className="mt-1 text-xl font-medium">{name}</h2></div><span className="grid size-10 place-items-center rounded-full bg-white/10"><Icon className="size-4" /></span></div><p className="mt-5 font-mono text-lg">Fund {formatNaira(amount)}</p><ul className="mt-4 space-y-2">{benefits.map((benefit) => <li key={benefit} className="flex items-center gap-2 text-xs opacity-75"><Check className="size-3.5" />{benefit}</li>)}</ul><Link href={`/membership/activate?tier=${planTier}`} className={planTier === "black" ? "mt-5 flex h-11 items-center justify-center gap-2 rounded-full bg-white text-xs font-semibold text-black" : "mt-5 flex h-11 items-center justify-center gap-2 rounded-full bg-foreground text-xs font-semibold text-white"}>Choose {name.replace("Oasis ", "")} <ChevronRight className="size-4" /></Link></article>)}</div></>}</div>;
}
