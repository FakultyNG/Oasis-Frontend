import type { MembershipTier } from "@/domain/types";

export const MEMBERSHIP_RULES = {
  goldThreshold: 500_000,
  blackThreshold: 1_500_000,
  bookingDepositRate: 0.05,
  cashPointNairaValue: 1,
  maxCashPointRedemption: {
    regular: 0,
    gold: 0.3,
    black: 0.5,
  } satisfies Record<MembershipTier, number>,
  inactivityMonths: 3,
} as const;
