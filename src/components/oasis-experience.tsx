"use client";

import { LoginScreen } from "@/components/auth/login-screen";
import { HomeExperience } from "@/components/home/home-experience";
import { AppShell } from "@/components/layout/app-shell";
import { useDemoStore } from "@/stores/demo-store";

export function OasisExperience() {
  const hasHydrated = useDemoStore((state) => state.hasHydrated);
  const isAuthenticated = useDemoStore((state) => state.isAuthenticated);

  if (!hasHydrated) {
    return <div className="mx-auto min-h-dvh w-full max-w-[430px] animate-pulse bg-background" aria-label="Loading Oasis" />;
  }

  if (!isAuthenticated) return <LoginScreen />;

  return (
    <AppShell>
      <HomeExperience />
    </AppShell>
  );
}
