import { OASIS_NOTIFICATIONS, TREATMENT_HISTORY } from "@/data/mock/account";
import type { AccountRepository } from "@/repositories/account-repository";

export class MockAccountRepository implements AccountRepository {
  async getTreatmentHistory() { return structuredClone(TREATMENT_HISTORY); }
  async getTreatment(id: string) { return structuredClone(TREATMENT_HISTORY.find((item) => item.id === id) ?? null); }
  async getNotifications() { return structuredClone(OASIS_NOTIFICATIONS); }
}
