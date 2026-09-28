"use client";

import { ArrowLeft, Check, CheckCircle2, Copy, Landmark, RefreshCw, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatNaira } from "@/domain/money";
import { cn } from "@/lib/utils";
import { useDemoStore } from "@/stores/demo-store";

const amounts = [100_000, 250_000, 500_000] as const;
const ACCOUNT_NUMBER = "0123456789";

export function FundWallet() {
  const tier = useDemoStore((state) => state.activeTier);
  const balance = useDemoStore((state) => state.walletBalances[tier]);
  const fundWallet = useDemoStore((state) => state.fundWallet);
  const [amount, setAmount] = useState<number>(250_000);
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);

  if (tier === "regular") return <div className="text-center"><h1 className="mt-16 text-3xl font-medium">Membership required</h1><Link href="/membership" className="mt-6 inline-flex h-11 items-center rounded-full bg-foreground px-6 text-white">View membership</Link></div>;

  async function copyAccountNumber() {
    await navigator.clipboard.writeText(ACCOUNT_NUMBER);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function simulateIncomingTransfer() {
    if (tier === "regular") return;
    setProcessing(true);
    window.setTimeout(() => {
      fundWallet(tier, amount);
      setProcessing(false);
      setComplete(true);
    }, 1200);
  }

  if (complete) return <div className="flex min-h-[calc(100dvh-9rem)] flex-col justify-center text-center"><span className="mx-auto grid size-16 place-items-center rounded-full bg-oasis-gold-soft"><CheckCircle2 className="size-7" /></span><p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Transfer received</p><h1 className="mt-2 text-3xl font-medium">Wallet credited.</h1><p className="mt-3 text-sm text-muted-foreground">{formatNaira(amount)} was automatically added.</p><div className="mt-6 rounded-2xl bg-oasis-surface p-4"><p className="text-xs text-muted-foreground">New wallet balance</p><p className="mt-1 font-mono text-2xl">{formatNaira(balance)}</p></div><Link href="/wallet" className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm text-white">View wallet</Link></div>;

  return <div>
    <Link href="/wallet" className="grid size-10 place-items-center rounded-full border" aria-label="Back to wallet"><ArrowLeft className="size-4" /></Link>
    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Bank transfer</p>
    <h1 className="mt-2 text-[2.4rem] font-medium tracking-[-0.05em]">Fund wallet.</h1>
    <p className="mt-3 text-sm leading-6 text-muted-foreground">Transfer to your dedicated account below. Every successful transfer is automatically credited to your Oasis Wallet.</p>

    <section className="mt-7 overflow-hidden rounded-3xl bg-oasis-black p-5 text-white">
      <div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-full bg-white/10"><Landmark className="size-4 text-oasis-gold" /></span><span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] uppercase tracking-wider text-white/60">Dedicated account</span></div>
      <div className="mt-6"><p className="text-[10px] uppercase tracking-wider text-white/40">Bank</p><p className="mt-1 text-sm">Providus Bank <span className="text-white/45">· Demo</span></p></div>
      <div className="mt-5 border-t border-white/15 pt-5"><p className="text-[10px] uppercase tracking-wider text-white/40">Account number</p><div className="mt-1 flex items-center justify-between"><p className="font-mono text-2xl tracking-wide">{ACCOUNT_NUMBER}</p><button type="button" onClick={copyAccountNumber} aria-label="Copy account number" className="flex h-9 items-center gap-1.5 rounded-full bg-white/10 px-3 text-[10px]">{copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}{copied ? "Copied" : "Copy"}</button></div></div>
      <div className="mt-5 border-t border-white/15 pt-5"><p className="text-[10px] uppercase tracking-wider text-white/40">Account name</p><p className="mt-1 text-sm">OASIS / BETTE ROBERTS</p></div>
    </section>

    <div className="mt-4 flex items-start gap-3 rounded-2xl bg-oasis-gold-soft p-4"><ShieldCheck className="mt-0.5 size-4 shrink-0" /><p className="text-xs leading-5 text-muted-foreground">No payment reference is required. The dedicated account is linked to this card holder’s wallet, so received funds post automatically.</p></div>

    <section className="mt-7"><div className="flex items-center justify-between"><h2 className="text-base font-medium">Simulate incoming transfer</h2><span className="font-mono text-xs text-muted-foreground">Balance {formatNaira(balance)}</span></div><p className="mt-2 text-xs text-muted-foreground">Choose the amount sent from another bank for this prototype.</p><div className="mt-4 grid grid-cols-3 gap-2">{amounts.map((item) => <button key={item} type="button" onClick={() => setAmount(item)} className={cn("rounded-2xl border px-2 py-4 font-mono text-xs", amount === item && "border-foreground bg-foreground text-white")}>{formatNaira(item)}</button>)}</div></section>

    <button type="button" disabled={processing} onClick={simulateIncomingTransfer} className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-white disabled:opacity-65">{processing ? <RefreshCw className="size-4 animate-spin" /> : <Landmark className="size-4" />}{processing ? "Detecting transfer…" : `Simulate ${formatNaira(amount)} transfer`}</button>
    <p className="mt-4 text-center text-[11px] text-muted-foreground">Prototype only · no real account or money transfer</p>
  </div>;
}
