"use client";

import { ArrowDownLeft, ArrowLeft, ArrowUpRight, Coins } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MEMBERSHIP_RULES } from "@/domain/constants";
import { formatNaira } from "@/domain/money";
import { useDemoStore } from "@/stores/demo-store";

const demoBill = 100_000;

export function CashPointsScreen() {
  const tier = useDemoStore((state) => state.activeTier);
  const points = useDemoStore((state) => state.cashPointBalances[tier]);
  const allTransactions = useDemoStore((state) => state.cashPointTransactions);
  const transactions = allTransactions.filter((item) => item.tier === tier);
  const redeem = useDemoStore((state) => state.redeemCashPoints);
  const [lastRedeemed, setLastRedeemed] = useState(0);
  if (tier === "regular") return <div className="text-center"><h1 className="mt-16 text-3xl font-medium">CashPoints are locked.</h1><Link href="/membership" className="mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-sm text-white">View membership</Link></div>;
  const rate = MEMBERSHIP_RULES.maxCashPointRedemption[tier];
  const ceiling = demoBill * rate;
  const availableRedemption = Math.min(points, ceiling);
  return <div><Link href="/rewards" aria-label="Back to rewards" className="grid size-10 place-items-center rounded-full border"><ArrowLeft className="size-4" /></Link><p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">CashPoints</p><h1 className="mt-2 font-mono text-[2.4rem] font-medium tracking-[-0.05em]">{points.toLocaleString("en-NG")} CP</h1><p className="mt-2 text-sm text-muted-foreground">Worth {formatNaira(points)} in Oasis redemption value.</p><section className="mt-7 rounded-3xl bg-oasis-gold-soft p-5"><div className="flex items-center justify-between"><div><p className="text-xs text-muted-foreground">{tier === "gold" ? "Gold · 30%" : "Black · 50%"} maximum</p><h2 className="mt-1 text-lg font-medium">Redeem on a {formatNaira(demoBill)} bill</h2></div><Coins className="size-5" /></div><div className="mt-5 flex items-center justify-between border-t border-[#e3d6b2] pt-5"><span className="text-xs text-muted-foreground">Maximum available now</span><span className="font-mono text-sm font-medium">{formatNaira(availableRedemption)}</span></div><button type="button" disabled={availableRedemption === 0} onClick={() => setLastRedeemed(redeem(tier, demoBill, ceiling))} className="mt-5 h-11 w-full rounded-full bg-foreground text-xs font-medium text-white disabled:opacity-35">Redeem maximum</button>{lastRedeemed > 0 ? <p role="status" className="mt-3 text-center text-xs">Redeemed {lastRedeemed.toLocaleString("en-NG")} CP · Pay {formatNaira(demoBill - lastRedeemed)} normally.</p> : null}</section><section className="mt-8"><h2 className="text-lg font-medium">History</h2><div className="mt-3 space-y-2">{transactions.map((item) => { const earned = item.amount > 0; const Icon = earned ? ArrowDownLeft : ArrowUpRight; return <div key={item.id} className="flex items-center gap-3 rounded-2xl border p-4"><span className="grid size-9 place-items-center rounded-full bg-oasis-surface"><Icon className="size-4" /></span><div className="flex-1"><p className="text-sm font-medium">{item.label}</p><p className="mt-0.5 text-[11px] text-muted-foreground">{earned ? "Earned" : "Redeemed"}</p></div><p className={earned ? "font-mono text-xs font-medium text-emerald-700" : "font-mono text-xs font-medium"}>{earned ? "+" : "−"}{Math.abs(item.amount).toLocaleString("en-NG")} CP</p></div>; })}</div></section><p className="mt-6 text-center text-[10px] leading-4 text-muted-foreground">CashPoints cannot be withdrawn, transferred, converted to cash or used for booking deposits.</p></div>;
}
