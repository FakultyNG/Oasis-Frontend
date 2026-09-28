import type { OasisNotification, TreatmentHistoryItem } from "@/domain/types";

export const TREATMENT_HISTORY: TreatmentHistoryItem[] = [
  { id: "trt_003", serviceName: "HydraFacial", category: "Skin health", date: "2026-09-12T12:00:00+01:00", specialist: "Amara Okafor", location: "Oasis MedSpa, Abuja", amountPaid: 100_000, cashPointsEarned: 5_000, notes: "Focused on hydration and congestion around the T-zone.", results: ["Improved radiance", "Smoother texture", "Reduced congestion"] },
  { id: "trt_002", serviceName: "Brightening Treatment", category: "Facial", date: "2026-08-18T10:30:00+01:00", specialist: "Zainab Bello", location: "Oasis MedSpa, Abuja", amountPaid: 85_000, cashPointsEarned: 4_250, notes: "Gentle brightening protocol with barrier-supporting aftercare.", results: ["More even tone", "Brighter appearance"] },
  { id: "trt_001", serviceName: "IV Therapy", category: "Wellness", date: "2026-07-06T15:00:00+01:00", specialist: "Dr. Ada Nwosu", location: "Oasis MedSpa, Abuja", amountPaid: 120_000, cashPointsEarned: 6_000, notes: "Wellness infusion completed after consultation.", results: ["Hydration support", "Wellness maintenance"] },
];

export const OASIS_NOTIFICATIONS: OasisNotification[] = [
  { id: "notice_1", title: "Your visit is confirmed", message: "HydraFacial is booked for 8 October at 11:30 AM.", category: "booking", createdAt: "2026-09-28T08:40:00+01:00", href: "/bookings/apt_001" },
  { id: "notice_2", title: "Your Skin Journey is ready", message: "Explore your latest Skin Twin and personalised next step.", category: "skin", createdAt: "2026-09-27T17:10:00+01:00", href: "/skin-journey/twin" },
  { id: "notice_3", title: "5,000 CashPoints earned", message: "Your HydraFacial reward has been added to your balance.", category: "rewards", createdAt: "2026-09-12T13:15:00+01:00", href: "/rewards/cashpoints" },
  { id: "notice_4", title: "Gold membership active", message: "Your wallet, partner benefits and Skin Journey are unlocked.", category: "membership", createdAt: "2026-07-01T09:00:00+01:00", href: "/membership/card" },
];
