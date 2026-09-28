import { Crown, Sparkles } from "lucide-react";
import type { DemoUser } from "@/domain/types";
import { cn } from "@/lib/utils";

export function MembershipCard({ user }: { user: DemoUser }) {
  const black = user.tier === "black";
  return (
    <section className={cn("relative overflow-hidden rounded-3xl p-6 text-white shadow-[0_18px_45px_rgba(21,21,21,0.14)]", black ? "bg-oasis-black" : "bg-[#8c7335]")}>
      <div className="absolute -right-8 -top-12 size-40 rounded-full border border-white/10" />
      <div className="absolute right-2 top-0 size-24 rounded-full border border-white/10" />
      <div className="relative flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">Oasis membership</p><h2 className="mt-2 text-2xl font-medium tracking-[-0.035em] capitalize">{user.tier} Member</h2></div><span className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/10">{black ? <Sparkles className="size-4" /> : <Crown className="size-4" />}</span></div>
      <div className="relative mt-12 flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-[0.16em] text-white/50">Member since</p><p className="mt-1 font-mono text-xs">2024</p></div><p className="font-mono text-xs tracking-[0.2em] text-white/70">•••• {user.id.slice(-3)}</p></div>
    </section>
  );
}
