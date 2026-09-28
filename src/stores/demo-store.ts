import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CashPointTransaction, MembershipTier } from "@/domain/types";
import { MEMBERSHIP_RULES } from "@/domain/constants";

type DemoState = {
  activeTier: MembershipTier;
  hasHydrated: boolean;
  isAuthenticated: boolean;
  walletBalances: Record<MembershipTier, number>;
  walletCreated: Record<MembershipTier, boolean>;
  cardDeliveryRequested: Record<MembershipTier, boolean>;
  walletTransactions: { id: string; tier: "gold" | "black"; amount: number; label: string; createdAt: string }[];
  cashPointBalances: Record<MembershipTier, number>;
  cashPointTransactions: CashPointTransaction[];
  skinScanCompleted: boolean;
  skinScanImage: string | null;
  readNotificationIds: string[];
  notificationPreferences: { appointments: boolean; rewards: boolean; skinJourney: boolean };
  skinGoalIds: string[];
  setHasHydrated: (hasHydrated: boolean) => void;
  setActiveTier: (tier: MembershipTier) => void;
  signIn: (tier: MembershipTier) => void;
  signOut: () => void;
  deductWallet: (tier: "gold" | "black", amount: number) => boolean;
  activateMembership: (tier: "gold" | "black", amount: number) => void;
  fundWallet: (tier: "gold" | "black", amount: number) => void;
  requestCardDelivery: (tier: "gold" | "black") => void;
  requestReplacementCard: (tier: "gold" | "black", fee: number) => boolean;
  earnCashPoints: (tier: "gold" | "black", amount: number, label: string) => void;
  redeemCashPoints: (tier: "gold" | "black", bill: number, requested: number) => number;
  completeSkinScan: (image?: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (ids: string[]) => void;
  setNotificationPreference: (key: "appointments" | "rewards" | "skinJourney", value: boolean) => void;
  setSkinGoals: (ids: string[]) => void;
  reset: () => void;
};

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      activeTier: "regular",
      hasHydrated: false,
      isAuthenticated: false,
      walletBalances: { regular: 0, gold: 425_000, black: 640_500 },
      walletCreated: { regular: false, gold: true, black: true },
      cardDeliveryRequested: { regular: false, gold: false, black: false },
      walletTransactions: [],
      cashPointBalances: { regular: 0, gold: 18_500, black: 32_500 },
      cashPointTransactions: [
        { id: "cp_gold_1", tier: "gold", amount: 3_000, label: "HydraFacial completed", createdAt: "2026-09-12T12:00:00.000Z" },
        { id: "cp_black_1", tier: "black", amount: 7_500, label: "Laser treatment completed", createdAt: "2026-09-18T12:00:00.000Z" },
      ],
      skinScanCompleted: false,
      skinScanImage: null,
      readNotificationIds: [],
      notificationPreferences: { appointments: true, rewards: true, skinJourney: true },
      skinGoalIds: [],
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      setActiveTier: (activeTier) => set({ activeTier }),
      signIn: (activeTier) => set({ activeTier, isAuthenticated: true }),
      signOut: () => set({ isAuthenticated: false }),
      deductWallet: (tier, amount) => {
        let paid = false;
        set((state) => {
          if (state.walletBalances[tier] < amount) return state;
          paid = true;
          return { walletBalances: { ...state.walletBalances, [tier]: state.walletBalances[tier] - amount }, walletTransactions: [{ id: `txn_${Date.now()}`, tier, amount: -amount, label: "Booking deposit", createdAt: new Date().toISOString() }, ...state.walletTransactions] };
        });
        return paid;
      },
      activateMembership: (tier, amount) => set((state) => ({ activeTier: tier, walletBalances: { ...state.walletBalances, [tier]: amount }, walletCreated: { ...state.walletCreated, [tier]: true }, walletTransactions: [{ id: `txn_${Date.now()}`, tier, amount, label: "Membership wallet funding", createdAt: new Date().toISOString() }, ...state.walletTransactions] })),
      fundWallet: (tier, amount) => set((state) => ({ walletBalances: { ...state.walletBalances, [tier]: state.walletBalances[tier] + amount }, walletTransactions: [{ id: `txn_${Date.now()}`, tier, amount, label: "Wallet funding", createdAt: new Date().toISOString() }, ...state.walletTransactions] })),
      requestCardDelivery: (tier) => set((state) => ({ cardDeliveryRequested: { ...state.cardDeliveryRequested, [tier]: true } })),
      requestReplacementCard: (tier, fee) => {
        let requested = false;
        set((state) => {
          if (state.walletBalances[tier] < fee) return state;
          requested = true;
          return { walletBalances: { ...state.walletBalances, [tier]: state.walletBalances[tier] - fee }, cardDeliveryRequested: { ...state.cardDeliveryRequested, [tier]: true }, walletTransactions: [{ id: `txn_${Date.now()}`, tier, amount: -fee, label: "Replacement card fee", createdAt: new Date().toISOString() }, ...state.walletTransactions] };
        });
        return requested;
      },
      earnCashPoints: (tier, amount, label) => set((state) => ({ cashPointBalances: { ...state.cashPointBalances, [tier]: state.cashPointBalances[tier] + amount }, cashPointTransactions: [{ id: `cp_${Date.now()}`, tier, amount, label, createdAt: new Date().toISOString() }, ...state.cashPointTransactions] })),
      redeemCashPoints: (tier, bill, requested) => {
        let redeemed = 0;
        set((state) => {
          const ceiling = Math.floor(bill * MEMBERSHIP_RULES.maxCashPointRedemption[tier]);
          redeemed = Math.min(requested, ceiling, state.cashPointBalances[tier]);
          if (redeemed <= 0) return state;
          return { cashPointBalances: { ...state.cashPointBalances, [tier]: state.cashPointBalances[tier] - redeemed }, cashPointTransactions: [{ id: `cp_${Date.now()}`, tier, amount: -redeemed, label: "CashPoint redemption", createdAt: new Date().toISOString() }, ...state.cashPointTransactions] };
        });
        return redeemed;
      },
      completeSkinScan: (image) => set({ skinScanCompleted: true, skinScanImage: image ?? null }),
      markNotificationRead: (id) => set((state) => ({ readNotificationIds: state.readNotificationIds.includes(id) ? state.readNotificationIds : [...state.readNotificationIds, id] })),
      markAllNotificationsRead: (ids) => set({ readNotificationIds: ids }),
      setNotificationPreference: (key, value) => set((state) => ({ notificationPreferences: { ...state.notificationPreferences, [key]: value } })),
      setSkinGoals: (skinGoalIds) => set({ skinGoalIds: skinGoalIds.slice(0, 3), skinScanCompleted: false }),
      reset: () => set({ activeTier: "regular", isAuthenticated: false, walletBalances: { regular: 0, gold: 425_000, black: 640_500 }, walletCreated: { regular: false, gold: true, black: true }, cardDeliveryRequested: { regular: false, gold: false, black: false }, walletTransactions: [], cashPointBalances: { regular: 0, gold: 18_500, black: 32_500 }, cashPointTransactions: [{ id: "cp_gold_1", tier: "gold", amount: 3_000, label: "HydraFacial completed", createdAt: "2026-09-12T12:00:00.000Z" }, { id: "cp_black_1", tier: "black", amount: 7_500, label: "Laser treatment completed", createdAt: "2026-09-18T12:00:00.000Z" }], skinScanCompleted: false, skinScanImage: null, readNotificationIds: [], notificationPreferences: { appointments: true, rewards: true, skinJourney: true } }),
    }),
    {
      name: "oasis-demo-state",
      partialize: ({ activeTier, isAuthenticated, walletBalances, walletCreated, cardDeliveryRequested, walletTransactions, cashPointBalances, cashPointTransactions, skinScanCompleted, skinScanImage, readNotificationIds, notificationPreferences, skinGoalIds }) => ({ activeTier, isAuthenticated, walletBalances, walletCreated, cardDeliveryRequested, walletTransactions, cashPointBalances, cashPointTransactions, skinScanCompleted, skinScanImage, readNotificationIds, notificationPreferences, skinGoalIds }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);
