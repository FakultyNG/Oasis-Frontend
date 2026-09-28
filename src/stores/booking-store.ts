import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Booking } from "@/domain/types";

type NewBooking = Omit<Booking, "id" | "createdAt" | "status">;

type BookingState = {
  hasHydrated: boolean;
  bookings: Booking[];
  setHasHydrated: (value: boolean) => void;
  createBooking: (input: NewBooking) => Booking;
  cancelBooking: (id: string) => void;
  rescheduleBooking: (id: string, date: string, time: string) => void;
  completeBooking: (id: string) => void;
  resetBookings: () => void;
};

const DEMO_BOOKINGS: Booking[] = [{ id: "apt_001", serviceIds: ["hydrafacial"], serviceNames: ["HydraFacial"], appointments: [{ serviceId: "hydrafacial", serviceName: "HydraFacial", date: "2026-10-08", time: "11:30" }], totalPrice: 100_000, depositPaid: 5_000, balanceDue: 95_000, date: "2026-10-08", time: "11:30", status: "confirmed", paymentSource: "direct", createdAt: "2026-09-20T10:00:00.000Z" }];

export const useBookingStore = create<BookingState>()(persist((set) => ({
  hasHydrated: false,
  bookings: DEMO_BOOKINGS,
  setHasHydrated: (hasHydrated) => set({ hasHydrated }),
  createBooking: (input) => {
    const booking: Booking = { ...input, id: `OAS-${Date.now().toString().slice(-6)}`, status: "confirmed", createdAt: new Date().toISOString() };
    set((state) => ({ bookings: [booking, ...state.bookings] }));
    return booking;
  },
  cancelBooking: (id) => set((state) => ({ bookings: state.bookings.map((booking) => booking.id === id ? { ...booking, status: "cancelled" } : booking) })),
  rescheduleBooking: (id, date, time) => set((state) => ({ bookings: state.bookings.map((booking) => booking.id === id ? { ...booking, date, time, status: "confirmed" } : booking) })),
  completeBooking: (id) => set((state) => ({ bookings: state.bookings.map((booking) => booking.id === id ? { ...booking, status: "completed" } : booking) })),
  resetBookings: () => set({ bookings: DEMO_BOOKINGS }),
}), { name: "oasis-bookings", partialize: ({ bookings }) => ({ bookings }), onRehydrateStorage: () => (state) => state?.setHasHydrated(true) }));
