"use client";

import { ArrowLeft, Bell, RotateCcw, ShieldCheck, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { MembershipTier } from "@/domain/types";
import { cn } from "@/lib/utils";
import { useBookingStore } from "@/stores/booking-store";
import { useCartStore } from "@/stores/cart-store";
import { useDemoStore } from "@/stores/demo-store";

const TIERS: MembershipTier[] = ["regular", "gold", "black"];

export function SettingsScreen() {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const tier = useDemoStore((state) => state.activeTier);
  const setTier = useDemoStore((state) => state.setActiveTier);
  const preferences = useDemoStore((state) => state.notificationPreferences);
  const setPreference = useDemoStore((state) => state.setNotificationPreference);
  const resetDemo = useDemoStore((state) => state.reset);
  const resetBookings = useBookingStore((state) => state.resetBookings);
  const clearCart = useCartStore((state) => state.clearCart);

  function clearLocalAccount() {
    resetBookings();
    clearCart();
    resetDemo();
  }

  return <div>
    <Link href="/profile" aria-label="Back to profile" className="grid size-10 place-items-center rounded-full border"><ArrowLeft className="size-4" /></Link>
    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Preferences & prototype</p>
    <h1 className="mt-2 text-[2.35rem] font-medium tracking-[-0.05em]">Settings.</h1>

    <section className="mt-8">
      <div className="flex items-center gap-2"><ShieldCheck className="size-4" /><h2 className="text-base font-medium">Demo profile</h2></div>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">Switch profiles instantly during a presentation. Each tier updates the entire app.</p>
      <div className="mt-4 grid grid-cols-3 rounded-full border bg-oasis-surface p-1">{TIERS.map((item) => <button key={item} type="button" onClick={() => setTier(item)} aria-pressed={tier === item} className={cn("h-10 rounded-full text-xs font-medium capitalize", tier === item && "bg-foreground text-white")}>{item}</button>)}</div>
    </section>

    <section className="mt-8">
      <div className="flex items-center gap-2"><Bell className="size-4" /><h2 className="text-base font-medium">Notification preferences</h2></div>
      <div className="mt-4 overflow-hidden rounded-2xl border"><Preference label="Appointment reminders" checked={preferences.appointments} onChange={(value) => setPreference("appointments", value)} /><Preference label="CashPoints & rewards" checked={preferences.rewards} onChange={(value) => setPreference("rewards", value)} /><Preference label="Skin Journey updates" checked={preferences.skinJourney} onChange={(value) => setPreference("skinJourney", value)} /></div>
    </section>

    <section className="mt-8 rounded-2xl border p-4">
      <h2 className="text-sm font-medium">Reset prototype</h2>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">Restore the seeded demo data and return to the demo login.</p>
      <button type="button" onClick={clearLocalAccount} className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full border text-xs font-medium"><RotateCcw className="size-4" />Reset all demo data</button>
    </section>

    <section className="mt-4 rounded-2xl border border-red-200 bg-red-50/60 p-4">
      <h2 className="text-sm font-medium text-red-950">Delete account</h2>
      <p className="mt-2 text-xs leading-5 text-red-900/70">Permanently remove this prototype account and all locally stored demo activity from this device.</p>
      <button type="button" onClick={() => setConfirmingDelete(true)} className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-red-900 text-xs font-medium text-white"><Trash2 className="size-4" />Delete account</button>
    </section>

    {confirmingDelete ? <div role="dialog" aria-modal="true" aria-labelledby="delete-account-title" className="fixed inset-0 z-[60] mx-auto flex max-w-[430px] items-end bg-black/45 p-4 backdrop-blur-sm"><div className="w-full rounded-[28px] bg-white p-5 shadow-2xl"><div className="flex items-start justify-between gap-4"><span className="grid size-12 place-items-center rounded-full bg-red-50 text-red-800"><Trash2 className="size-5" /></span><button type="button" onClick={() => setConfirmingDelete(false)} aria-label="Close delete account confirmation" className="grid size-10 place-items-center rounded-full border"><X className="size-4" /></button></div><h2 id="delete-account-title" className="mt-5 text-2xl font-medium tracking-[-0.04em]">Delete your account?</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">This clears all locally stored bookings, wallet activity, rewards, scan photos and preferences, then signs you out. This prototype has no production backend account.</p><button type="button" onClick={clearLocalAccount} className="mt-6 h-12 w-full rounded-full bg-red-900 text-sm font-medium text-white">Yes, delete my account</button><button type="button" onClick={() => setConfirmingDelete(false)} className="mt-2 h-11 w-full text-sm font-medium">Keep my account</button></div></div> : null}
  </div>;
}

function Preference({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex min-h-15 cursor-pointer items-center justify-between border-b px-4 last:border-0"><span className="text-sm">{label}</span><span className={cn("relative h-7 w-12 rounded-full transition-colors", checked ? "bg-foreground" : "bg-neutral-200")}><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="sr-only" /><span className={cn("absolute top-1 size-5 rounded-full bg-white shadow transition-transform", checked ? "translate-x-6" : "translate-x-1")} /></span></label>;
}
