import { ArrowRight, Award, ChevronRight, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { BookingCard } from "@/components/home/booking-card";
import { MembershipCard } from "@/components/home/membership-card";
import { PageHeader } from "@/components/home/page-header";
import { QuickActions } from "@/components/home/quick-actions";
import { SectionHeader } from "@/components/home/section-header";
import { WalletSummary } from "@/components/home/wallet-summary";
import type { Appointment, DemoUser, Service } from "@/domain/types";
import { formatNaira } from "@/domain/money";

type MemberHomeProps = { user: DemoUser; appointment: Appointment; services: Service[] };

export function MemberHome({ user, appointment, services }: MemberHomeProps) {
  const isBlack = user.tier === "black";
  const recommendation = services[0];

  return (
    <div className="space-y-8">
      <PageHeader name={user.name} tier={user.tier} />
      <MembershipCard user={user} />
      <WalletSummary walletBalance={user.walletBalance} cashPoints={user.cashPoints} />
      <QuickActions />

      {isBlack ? (
        <Link href="/membership/vip" className="flex items-center gap-4 rounded-2xl bg-oasis-black p-5 text-white">
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10"><Star className="size-4 text-[#e7d6a4]" /></span>
          <span className="min-w-0 flex-1"><span className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#e7d6a4]">Black concierge</span><span className="mt-1 block text-sm text-white/65">Tap to view your Black Card VIP Experience.</span></span><ChevronRight className="size-4" />
        </Link>
      ) : null}

      <section>
        <SectionHeader title="Your Skin Journey" actionHref="/skin-journey" actionLabel="Open" />
        <Link href="/skin-journey" className="block rounded-2xl border bg-oasis-gold-soft p-5">
          <div className="flex items-start justify-between"><div><p className="text-xs text-muted-foreground">Glow Score</p><p className="mt-1 font-mono text-4xl font-medium tracking-[-0.06em]">82</p></div><span className="grid size-11 place-items-center rounded-full bg-white"><Sparkles className="size-4" /></span></div>
          <div className="mt-5 flex items-center justify-between border-t border-[#e5d8b6] pt-4"><span className="text-xs text-muted-foreground">Skin progress this month</span><span className="rounded-full bg-white px-2.5 py-1 font-mono text-xs font-medium">+9%</span></div>
        </Link>
      </section>

      <section><SectionHeader title="Next appointment" actionHref="/bookings" actionLabel="Manage" /><BookingCard appointment={appointment} /></section>

      <section>
        <SectionHeader title="Your rewards" actionHref="/rewards" />
        <Link href="/rewards" className="flex items-center gap-4 rounded-2xl border bg-card p-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-oasis-surface"><Award className="size-4" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-medium">Complimentary LED Boost</span><span className="mt-0.5 block text-xs text-muted-foreground">Available with your next facial</span></span><ArrowRight className="size-4" /></Link>
      </section>

      <section>
        <SectionHeader title="Recommended for you" actionHref="/services" />
        <article className="rounded-2xl bg-oasis-surface p-5"><div className="flex items-start justify-between"><span className="grid size-11 place-items-center rounded-full bg-white"><Sparkles className="size-4" /></span><span className="rounded-full border bg-white px-2.5 py-1 text-[10px] font-medium">Based on your goals</span></div><h3 className="mt-8 text-xl font-medium tracking-[-0.03em]">{recommendation.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">A hydration-forward reset selected to support brightness and texture.</p><div className="mt-4 flex items-center justify-between"><span className="font-mono text-sm font-medium">{formatNaira(recommendation.price)}</span><Link href={`/services/${recommendation.id}`} className="text-xs font-semibold underline underline-offset-4">View treatment</Link></div></article>
      </section>
    </div>
  );
}
