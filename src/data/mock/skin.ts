import type { SkinJourneyData } from "@/domain/types";
export const SKIN_JOURNEY: SkinJourneyData = {
  glowScore: 82,
  skinAge: 29,
  change: 9,
  keyArea: "Pigmentation",
  scanDates: {
    dayOne: "2026-06-30T10:00:00+01:00",
    previous: "2026-09-04T14:30:00+01:00",
    today: "2026-09-28T09:15:00+01:00",
  },
  metrics: [{ id: "texture", label: "Texture", dayOne: 77, previous: 82, today: 86 }, { id: "pigmentation", label: "Pigmentation", dayOne: 60, previous: 69, today: 74 }, { id: "pores", label: "Pores", dayOne: 72, previous: 76, today: 80 }, { id: "fine-lines", label: "Fine Lines", dayOne: 86, previous: 89, today: 91 }, { id: "radiance", label: "Radiance", dayOne: 70, previous: 79, today: 84 }],
  recommendation: { serviceIds: ["hydrafacial", "brightening-treatment"], title: "HydraFacial + Brightening Treatment", reason: "Your pigmentation has improved, but remains your primary opportunity area.", followUpDays: 21 },
};
