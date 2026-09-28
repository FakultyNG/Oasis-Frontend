"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookingCard } from "@/components/home/booking-card";
import { LockedFeature } from "@/components/home/locked-feature";
import { MembershipProgress } from "@/components/home/membership-progress";
import { PageHeader } from "@/components/home/page-header";
import { QualificationBanner } from "@/components/home/qualification-banner";
import { SectionHeader } from "@/components/home/section-header";
import { ServiceCard } from "@/components/home/service-card";
import { Button } from "@/components/ui/button";
import { getQualificationProgress } from "@/domain/membership";
import type { Appointment, DemoUser, Service } from "@/domain/types";

type RegularHomeProps = { user: DemoUser; appointment: Appointment; services: Service[] };

export function RegularHome({ user, appointment, services }: RegularHomeProps) {
  const router = useRouter();
  const progress = getQualificationProgress(user.qualifyingSpend);

  return (
    <div className="space-y-8">
      <PageHeader name={user.name} tier={user.tier} />

      <section className="rounded-3xl bg-oasis-black p-6 text-white">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#e7d6a4]">Your next ritual</p>
        <h2 className="balance mt-3 text-[1.75rem] font-medium leading-tight tracking-[-0.04em]">Make time for how you want to feel.</h2>
        <p className="mt-3 text-sm leading-6 text-white/60">Explore curated treatments designed around your goals.</p>
        <Button asChild className="mt-6 h-11 rounded-full bg-oasis-gold px-5 text-oasis-black hover:bg-[#dbc68d]"><Link href="/services">Book a treatment <ArrowRight className="size-4" /></Link></Button>
      </section>

      <section>
        <SectionHeader title="Your path to Gold" />
        <div className="rounded-2xl border bg-card p-5">
          <MembershipProgress current={user.qualifyingSpend} target={progress.target} percent={progress.percent} />
          <p className="mt-4 text-xs leading-5 text-muted-foreground">Every qualifying treatment brings you closer to wallet benefits, CashPoints and your personal Skin Journey.</p>
        </div>
        <div className="mt-3"><QualificationBanner amountRemaining={progress.amountRemaining} /></div>
      </section>

      <section>
        <SectionHeader title="Next appointment" actionHref="/bookings" actionLabel="Manage" />
        <BookingCard appointment={appointment} />
      </section>

      <section>
        <SectionHeader title="Member features" />
        <div className="grid grid-cols-2 gap-3">
          <LockedFeature title="Oasis Wallet" description="Fund once, enjoy seamless member bookings." onUnlock={() => router.push("/membership")} />
          <LockedFeature title="Skin Journey" description="Track your Glow Score and skin progress." onUnlock={() => router.push("/membership")} />
        </div>
      </section>

      <section>
        <SectionHeader title="Popular treatments" actionHref="/services" />
        <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none]">{services.map((service, index) => <ServiceCard key={service.id} service={service} index={index} />)}</div>
      </section>
    </div>
  );
}
