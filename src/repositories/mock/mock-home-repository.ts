import { UPCOMING_APPOINTMENT } from "@/data/mock/home";
import type { HomeRepository } from "@/repositories/home-repository";

export class MockHomeRepository implements HomeRepository {
  async getUpcomingAppointment() {
    return structuredClone(UPCOMING_APPOINTMENT);
  }
}
