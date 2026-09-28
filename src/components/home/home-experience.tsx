"use client";

import { MemberHome } from "@/components/home/member-home";
import { RegularHome } from "@/components/home/regular-home";
import { useHomeData } from "@/hooks/use-home-data";
import { useDemoStore } from "@/stores/demo-store";

export function HomeExperience() {
  const activeTier = useDemoStore((state) => state.activeTier);
  const data = useHomeData(activeTier);

  if (!data || data.user.tier !== activeTier) {
    return <div className="space-y-4 pt-2" aria-label="Loading home"><div className="h-12 w-36 animate-pulse rounded-xl bg-oasis-surface" /><div className="h-36 animate-pulse rounded-3xl bg-oasis-surface" /><div className="h-28 animate-pulse rounded-2xl bg-oasis-surface" /></div>;
  }

  if (data.user.tier === "regular") return <RegularHome {...data} />;
  return <MemberHome {...data} />;
}
