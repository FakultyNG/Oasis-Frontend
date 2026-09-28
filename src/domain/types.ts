export type MembershipTier = "regular" | "gold" | "black";

export type DemoUser = {
  id: string;
  name: string;
  tier: MembershipTier;
  qualifyingSpend: number;
  walletBalance: number;
  cashPoints: number;
};

export type Appointment = {
  id: string;
  serviceName: string;
  specialist: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
};

export type Service = {
  id: string;
  name: string;
  category: string;
  durationMinutes: number;
  price: number;
  description: string;
  benefits: string[];
  cashPointsReward: number;
  visual: "water" | "wellness" | "bright" | "laser" | "premium";
};

export type BookingStatus = "confirmed" | "cancelled" | "completed";

export type BookingAppointment = { serviceId: string; serviceName: string; date: string; time: string };

export type Booking = {
  id: string;
  serviceIds: string[];
  serviceNames: string[];
  appointments: BookingAppointment[];
  totalPrice: number;
  depositPaid: number;
  balanceDue: number;
  date: string;
  time: string;
  status: BookingStatus;
  paymentSource: "direct" | "wallet";
  createdAt: string;
};

export type PartnerBenefit = { priority: boolean; discountPercent?: number; benefitText?: string };
export type Partner = { id: string; name: string; category: string; description: string; gold: PartnerBenefit; black: PartnerBenefit };
export type CashPointTransaction = { id: string; tier: "gold" | "black"; amount: number; label: string; createdAt: string };
export type TreatmentHistoryItem = { id: string; serviceName: string; category: string; date: string; specialist: string; location: string; amountPaid: number; cashPointsEarned: number; notes: string; results: string[] };
export type OasisNotification = { id: string; title: string; message: string; category: "booking" | "rewards" | "skin" | "membership"; createdAt: string; href: string };
export type SkinMetric = { id: string; label: string; dayOne: number; previous: number; today: number };
export type SkinGoal = { id: string; name: string; estimatedDurationDays: number };
export type JourneyMilestone = { id: string; type: "scan" | "treatment" | "review" | "progress" | "complete"; title: string; description?: string; targetDay: number; status: "completed" | "current" | "upcoming" | "adjusted"; serviceId?: string };
export type SkinScanPeriod = "dayOne" | "previous" | "today";
export type SkinJourneyData = {
  glowScore: number;
  skinAge: number;
  change: number;
  metrics: SkinMetric[];
  keyArea: string;
  scanDates: Record<SkinScanPeriod, string>;
  recommendation: { serviceIds: string[]; title: string; reason: string; followUpDays: number };
};
