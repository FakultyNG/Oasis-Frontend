"use client";

import { ArrowLeft, CheckCircle2, Copy, Landmark, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MEMBERSHIP_RULES } from "@/domain/constants";
import { formatNaira } from "@/domain/money";
import { cn } from "@/lib/utils";
import { useDemoStore } from "@/stores/demo-store";

type MemberTier = "gold" | "black";

export function ActivationFlow() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("tier") === "black" ? "black" : "gold";
  const [tier, setTier] = useState<MemberTier>(initial);
  const [step, setStep] = useState<"choose" | "account" | "success">("choose");
  const [copied, setCopied] = useState(false);
  const activateMembership = useDemoStore((state) => state.activateMembership);
  const amount = tier === "gold" ? MEMBERSHIP_RULES.goldThreshold : MEMBERSHIP_RULES.blackThreshold;

  if (step === "success") return <div className="flex min-h-[calc(100dvh-9rem)] flex-col justify-center text-center"><span className="mx-auto grid size-20 place-items-center rounded-full bg-oasis-gold-soft"><CheckCircle2 className="size-9" /></span><p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Membership active</p><h1 className="mt-2 text-[2.4rem] font-medium tracking-[-0.05em]">Welcome to Oasis {tier === "gold" ? "Gold" : "Black"}.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Your full {formatNaira(amount)} remains in your Oasis Wallet for future treatments.</p><Link href="/membership/card" className="mt-7 flex h-12 items-center justify-center rounded-full bg-foreground text-sm font-medium text-white">Get my membership card</Link><Link href="/" className="mt-4 text-xs underline underline-offset-4">View member home</Link></div>;

  return <div><button type="button" onClick={() => step === "account" ? setStep("choose") : history.back()} className="grid size-10 place-items-center rounded-full border" aria-label="Back"><ArrowLeft className="size-4" /></button><p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Fast-track membership</p>{step === "choose" ? <><h1 className="mt-2 text-[2.4rem] font-medium tracking-[-0.05em]">Choose membership.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">The amount you fund is stored value—not a fee—and stays available for treatments.</p><div className="mt-8 grid grid-cols-2 gap-3">{(["gold", "black"] as const).map((item) => <button key={item} type="button" onClick={() => setTier(item)} aria-pressed={tier === item} className={cn("rounded-3xl border p-5 text-left capitalize", tier === item && (item === "black" ? "border-black bg-oasis-black text-white" : "border-[#c5aa65] bg-oasis-gold-soft"))}><span className="text-xs opacity-55">Oasis</span><span className="mt-1 block text-xl font-medium">{item}</span><span className="mt-8 block font-mono text-sm">{formatNaira(item === "gold" ? MEMBERSHIP_RULES.goldThreshold : MEMBERSHIP_RULES.blackThreshold)}</span></button>)}</div><button type="button" onClick={() => setStep("account")} className="mt-7 h-12 w-full rounded-full bg-foreground text-sm font-medium text-white">Create {tier} wallet</button></> : <><h1 className="mt-2 text-[2.4rem] font-medium tracking-[-0.05em]">Fund your wallet.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Use your dedicated prototype account, then simulate the transfer.</p><section className="mt-8 rounded-3xl bg-oasis-black p-6 text-white"><span className="grid size-11 place-items-center rounded-full bg-white/10"><Landmark className="size-5 text-oasis-gold" /></span><p className="mt-7 text-[10px] uppercase tracking-[0.16em] text-white/45">Your Oasis account</p><dl className="mt-5 space-y-4 text-sm"><div><dt className="text-xs text-white/45">Bank</dt><dd className="mt-1">Providus Bank</dd></div><div><dt className="text-xs text-white/45">Account number</dt><dd className="mt-1 flex items-center justify-between font-mono text-lg">0123456789 <button type="button" onClick={() => setCopied(true)} aria-label="Copy account number" className="grid size-9 place-items-center rounded-full bg-white/10"><Copy className="size-4" /></button></dd></div><div><dt className="text-xs text-white/45">Account name</dt><dd className="mt-1">OASIS / BETTE ROBERTS</dd></div></dl>{copied ? <p className="mt-4 text-xs text-oasis-gold">Account number copied</p> : null}</section><div className="mt-4 flex items-start gap-3 rounded-2xl bg-oasis-gold-soft p-4"><ShieldCheck className="mt-0.5 size-4" /><p className="text-xs leading-5">Prototype only. No real transfer occurs. Funding {formatNaira(amount)} activates {tier} membership.</p></div><button type="button" onClick={() => { activateMembership(tier, amount); setStep("success"); }} className="mt-6 h-12 w-full rounded-full bg-foreground text-sm font-medium text-white">Simulate {formatNaira(amount)} funding</button></>}</div>;
}
