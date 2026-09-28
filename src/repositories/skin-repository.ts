import type { SkinJourneyData } from "@/domain/types";
export interface SkinRepository { getJourney(): Promise<SkinJourneyData>; }
