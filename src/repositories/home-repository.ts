import type { Appointment } from "@/domain/types";

export interface HomeRepository {
  getUpcomingAppointment(): Promise<Appointment>;
}
