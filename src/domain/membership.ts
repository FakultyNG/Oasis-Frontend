import { MEMBERSHIP_RULES } from "@/domain/constants";
import type { MembershipTier } from "@/domain/types";

export function getQualificationProgress(qualifyingSpend: number) {
  const target = MEMBERSHIP_RULES.goldThreshold;
  return {
    amountRemaining: Math.max(0, target - qualifyingSpend),
    percent: Math.min(100, Math.round((qualifyingSpend / target) * 100)),
    target,
  };
}

export function isMember(tier: MembershipTier) {
  return tier === "gold" || tier === "black";
}
