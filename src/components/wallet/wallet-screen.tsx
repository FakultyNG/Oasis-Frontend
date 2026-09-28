"use client";

import { ArrowDownLeft, ArrowLeft, ArrowUpRight, Copy, Landmark, LockKeyhole, Plus } from "lucide-react";
import Link from "next/link";
import { formatNaira } from "@/domain/money";
import { useDemoStore } from "@/stores/demo-store";

export function WalletScreen() {
  const tier = useDemoStore((state) => state.activeTier);
  const balance = useDemoStore((state) => state.walletBalances[tier]);
  const allTransactions = useDemoStore((state) => state.walletTransactions);
  const transactions = allTransactions.filter((item) => item.tier === tier);

  if (tier === "regular") return <div><Link href="/" className="grid size-10 place-items-center rounded-full border" aria-label="Back home"><ArrowLeft className="size-4" /></Link><div className="mt-16 text-center"><span className="mx-auto grid size-14 place-items-center rounded-full bg-oasis-gold-soft"><LockKeyhole className="size-5" /></span><h1 className="mt-6 text-3xl font-medium">Unlock Oasis Wallet.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Wallet is available with Gold and Black membership.</p><Link href="/membership" className="mt-7 inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-white">View membership</Link></div></div>;

  return <div>
    <div className="flex items-center justify-between"><Link href="/" className="grid size-10 place-items-center rounded-full border" aria-label="Back home"><ArrowLeft className="size-4" /></Link><Link href="/wallet/fund" className="flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-xs font-medium text-white"><Plus className="size-3.5" />Fund</Link></div>
    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Oasis Wallet</p><h1 className="mt-2 text-[2.4rem] font-medium tracking-[-0.05em]">{formatNaira(balance)}</h1><p className="mt-2 text-xs text-muted-foreground">Available for Oasis treatments and booking deposits.</p>
    <section className="mt-7 rounded-3xl bg-oasis-black p-5 text-white"><div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-full bg-white/10"><Landmark className="size-4 text-oasis-gold" /></span><span className="text-[10px] uppercase tracking-wider text-white/45">Dedicated account</span></div><p className="mt-6 text-xs text-white/45">Providus Bank</p><div className="mt-1 flex items-center justify-between"><p className="font-mono text-xl">0123456789</p><button type="button" aria-label="Copy account number" className="grid size-9 place-items-center rounded-full bg-white/10"><Copy className="size-4" /></button></div><p className="mt-2 text-xs text-white/55">OASIS / BETTE ROBERTS</p></section>
    <section className="mt-8"><div className="flex items-center justify-between"><h2 className="text-lg font-medium">Transactions</h2><span className="text-xs text-muted-foreground">Prototype ledger</span></div><div className="mt-3 space-y-2">{transactions.map((transaction) => { const credit = transaction.amount >= 0; const Icon = credit ? ArrowDownLeft : ArrowUpRight; return <div key={transaction.id} className="flex items-center gap-3 rounded-2xl border p-4"><span className="grid size-9 place-items-center rounded-full bg-oasis-gold-soft"><Icon className="size-4" /></span><div className="flex-1"><p className="text-sm font-medium">{transaction.label}</p><p className="mt-0.5 text-[11px] text-muted-foreground">{credit ? "Wallet value added" : "Wallet payment"}</p></div><p className={credit ? "font-mono text-xs font-medium text-emerald-700" : "font-mono text-xs font-medium"}>{credit ? "+" : "−"}{formatNaira(Math.abs(transaction.amount))}</p></div>; })}{transactions.length === 0 ? <div className="rounded-2xl border border-dashed p-6 text-center text-xs text-muted-foreground">No new transactions in this demo session.</div> : null}</div></section>
  </div>;
}
