import type { DemoUser, MembershipTier } from "@/domain/types";

export const DEMO_USERS: Record<MembershipTier, DemoUser> = {
  regular: { id: "usr_001", name: "Bette Roberts", tier: "regular", qualifyingSpend: 320_000, walletBalance: 0, cashPoints: 0 },
  gold: { id: "usr_002", name: "Bette Roberts", tier: "gold", qualifyingSpend: 720_000, walletBalance: 425_000, cashPoints: 18_500 },
  black: { id: "usr_003", name: "Bette Roberts", tier: "black", qualifyingSpend: 1_850_000, walletBalance: 640_500, cashPoints: 32_500 },
};
