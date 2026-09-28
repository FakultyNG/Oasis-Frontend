import { DEMO_USERS } from "@/data/mock/users";
import type { MembershipTier } from "@/domain/types";
import type { UserRepository } from "@/repositories/user-repository";

export class MockUserRepository implements UserRepository {
  async getByTier(tier: MembershipTier) {
    return structuredClone(DEMO_USERS[tier]);
  }
}
