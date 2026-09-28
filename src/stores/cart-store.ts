import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  hasHydrated: boolean;
  serviceIds: string[];
  schedules: Record<string, { date: string; time: string }>;
  setHasHydrated: (hasHydrated: boolean) => void;
  addService: (serviceId: string, date: string, time: string) => void;
  removeService: (serviceId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      serviceIds: [],
      schedules: {},
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      addService: (serviceId, date, time) => set((state) => ({ serviceIds: state.serviceIds.includes(serviceId) ? state.serviceIds : [...state.serviceIds, serviceId], schedules: { ...state.schedules, [serviceId]: { date, time } } })),
      removeService: (serviceId) => set((state) => { const { [serviceId]: removed, ...schedules } = state.schedules; void removed; return { serviceIds: state.serviceIds.filter((id) => id !== serviceId), schedules }; }),
      clearCart: () => set({ serviceIds: [], schedules: {} }),
    }),
    { name: "oasis-session-cart", partialize: ({ serviceIds, schedules }) => ({ serviceIds, schedules }), onRehydrateStorage: () => (state) => state?.setHasHydrated(true) },
  ),
);
