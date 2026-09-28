"use client";

import { Bell, ChevronRight, Clock3, CreditCard, Gift, History, LogOut, Settings, Sparkles, UserRound } from "lucide-react";
import Link from "next/link";
import type { DemoUser, MembershipTier } from "@/domain/types";
import { formatNaira } from "@/domain/money";
import { cn } from "@/lib/utils";
import { useDemoStore } from "@/stores/demo-store";

const TIER_COPY: Record<MembershipTier, string> = { regular: "Membership explorer", gold: "Gold Member", black: "Black Member" };

export function ProfileDashboard({ users, treatmentCount, notificationCount }: { users: Record<MembershipTier, DemoUser>; treatmentCount: number; notificationCount: number }) {
  const tier = useDemoStore((state) => state.activeTier);
  const signOut = useDemoStore((state) => state.signOut);
  const wallet = useDemoStore((state) => state.walletBalances[tier]);
  const points = useDemoStore((state) => state.cashPointBalances[tier]);
  const readIds = useDemoStore((state) => state.readNotificationIds);
  const user = users[tier];
  const unread = Math.max(0, notificationCount - readIds.length);

  return <div><header className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Your Oasis</p><h1 className="mt-2 text-[2.4rem] font-medium tracking-[-0.05em]">Profile.</h1></div><Link href="/notifications" aria-label={`${unread} unread notifications`} className="relative grid size-11 place-items-center rounded-full border"><Bell className="size-4" />{unread > 0 ? <span className="absolute right-0 top-0 grid size-5 place-items-center rounded-full bg-foreground text-[9px] text-white">{unread}</span> : null}</Link></header>
    <section className={cn("mt-7 overflow-hidden rounded-3xl p-5", tier === "black" ? "bg-oasis-black text-white" : tier === "gold" ? "bg-[#d4b96f] text-[#211c11]" : "bg-oasis-surface")}><div className="flex items-center gap-4"><span className={cn("grid size-14 place-items-center rounded-full", tier === "black" ? "bg-white/10" : "bg-white/60")}><UserRound className="size-6" /></span><div><h2 className="text-xl font-medium">{user.name}</h2><p className={cn("mt-1 text-xs", tier === "black" ? "text-white/55" : "opacity-65")}>{TIER_COPY[tier]} · {user.id.toUpperCase()}</p></div></div><div className={cn("mt-5 grid grid-cols-2 gap-4 border-t pt-4", tier === "black" ? "border-white/15" : "border-black/10")}><div><p className="text-[10px] uppercase tracking-wider opacity-55">Wallet</p><p className="mt-1 font-mono text-sm">{formatNaira(wallet)}</p></div><div><p className="text-[10px] uppercase tracking-wider opacity-55">CashPoints</p><p className="mt-1 font-mono text-sm">{points.toLocaleString("en-NG")}</p></div></div></section>
    <section className="mt-7"><h2 className="text-lg font-medium">Account</h2><div className="mt-3 overflow-hidden rounded-2xl border"><ProfileLink href="/profile/history" icon={History} title="Treatment history" note={`${treatmentCount} completed treatments`} /><ProfileLink href="/notifications" icon={Bell} title="Notifications" note={unread ? `${unread} unread updates` : "You’re all caught up"} /><ProfileLink href="/membership/card" icon={CreditCard} title="Membership details" note={TIER_COPY[tier]} /><ProfileLink href="/rewards" icon={Gift} title="Rewards & privileges" note={`${points.toLocaleString("en-NG")} CashPoints`} /><ProfileLink href="/settings" icon={Settings} title="Settings & demo controls" note="Preferences, tier switcher and reset" /></div></section>
    <section className="mt-6 rounded-2xl bg-oasis-gold-soft p-4"><div className="flex gap-3"><Sparkles className="mt-0.5 size-4" /><div><p className="text-sm font-medium">Your Oasis activity</p><p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 className="size-3" />Member profile updated for this demo</p></div></div></section>
    <button type="button" onClick={signOut} className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full border text-sm font-medium"><LogOut className="size-4" />Sign out</button>
  </div>;
}

function ProfileLink({ href, icon: Icon, title, note }: { href: string; icon: typeof Bell; title: string; note: string }) { return <Link href={href} className="flex min-h-17 items-center gap-3 border-b px-4 py-3 last:border-0"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-oasis-surface"><Icon className="size-4" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-medium">{title}</span><span className="mt-0.5 block truncate text-[11px] text-muted-foreground">{note}</span></span><ChevronRight className="size-4 text-muted-foreground" /></Link>; }
