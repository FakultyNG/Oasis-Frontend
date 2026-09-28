import { MEMBERSHIP_RULES } from "@/domain/constants";

export const BOOKING_DATES = [
  { iso: "2026-09-28", day: "Mon", date: "28", label: "Monday, 28 September" },
  { iso: "2026-09-29", day: "Tue", date: "29", label: "Tuesday, 29 September" },
  { iso: "2026-09-30", day: "Wed", date: "30", label: "Wednesday, 30 September" },
  { iso: "2026-10-01", day: "Thu", date: "01", label: "Thursday, 1 October" },
  { iso: "2026-10-02", day: "Fri", date: "02", label: "Friday, 2 October" },
] as const;

export const BOOKING_TIMES = [
  { value: "10:00", label: "10:00 AM", unavailableOn: [] },
  { value: "11:30", label: "11:30 AM", unavailableOn: ["2026-09-28"] },
  { value: "13:00", label: "1:00 PM", unavailableOn: ["2026-09-29", "2026-10-01"] },
  { value: "14:30", label: "2:30 PM", unavailableOn: [] },
  { value: "16:00", label: "4:00 PM", unavailableOn: ["2026-09-30"] },
] as const;

export function calculateDeposit(totalPrice: number) {
  return Math.round(totalPrice * MEMBERSHIP_RULES.bookingDepositRate);
}

export function getBookingDateLabel(iso: string) {
  return BOOKING_DATES.find((date) => date.iso === iso)?.label ?? new Intl.DateTimeFormat("en-NG", { weekday: "long", day: "numeric", month: "long" }).format(new Date(`${iso}T12:00:00`));
}

export function getBookingTimeLabel(value: string) {
  return BOOKING_TIMES.find((time) => time.value === value)?.label ?? value;
}
