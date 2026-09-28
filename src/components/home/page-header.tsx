"use client";

import { Bell, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { MembershipTier } from "@/domain/types";
import { cn } from "@/lib/utils";
import { useDemoStore } from "@/stores/demo-store";

const tiers: MembershipTier[] = ["regular", "gold", "black"];

export function PageHeader({ name, tier }: { name: string; tier: MembershipTier }) {
  const setActiveTier = useDemoStore((state) => state.setActiveTier);
  const signOut = useDemoStore((state) => state.signOut);
  const firstName = name.split(" ")[0];

  return (
    <header>
      <div className="flex items-center justify-between gap-4">
        <Image src="/brand/oasis-logo.webp" alt="Oasis MedSpa" width={300} height={120} priority className="h-auto w-[130px]" />
        <div className="flex items-center gap-2">
          <Link href="/notifications" aria-label="Notifications" className="grid size-10 place-items-center rounded-full border bg-card"><Bell className="size-4" /></Link>
          <button type="button" onClick={signOut} aria-label="Sign out" className="grid size-10 place-items-center rounded-full border bg-card"><LogOut className="size-4" /></button>
        </div>
      </div>
      <div className="mt-7 flex items-end justify-between gap-4">
        <div><p className="text-sm text-muted-foreground">Good afternoon,</p><h1 className="mt-0.5 text-[2rem] font-medium tracking-[-0.045em]">{firstName}</h1></div>
        <div className="flex rounded-full border bg-oasis-surface p-1" role="group" aria-label="Switch demo profile">
          {tiers.map((item) => <button key={item} type="button" onClick={() => setActiveTier(item)} aria-label={`Switch to ${item} profile`} aria-pressed={tier === item} className={cn("size-6 rounded-full text-[9px] font-semibold uppercase transition-colors", tier === item ? "bg-foreground text-white" : "text-muted-foreground")}>{item[0]}</button>)}
        </div>
      </div>
    </header>
  );
}
