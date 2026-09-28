import type { OasisNotification, TreatmentHistoryItem } from "@/domain/types";

export interface AccountRepository {
  getTreatmentHistory(): Promise<TreatmentHistoryItem[]>;
  getTreatment(id: string): Promise<TreatmentHistoryItem | null>;
  getNotifications(): Promise<OasisNotification[]>;
}
