import type { DemoUser, MembershipTier } from "@/domain/types";

export interface UserRepository {
  getByTier(tier: MembershipTier): Promise<DemoUser>;
}
