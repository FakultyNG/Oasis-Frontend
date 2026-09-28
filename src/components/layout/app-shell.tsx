"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LoginScreen } from "@/components/auth/login-screen";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { PwaRegistration } from "@/components/pwa/pwa-registration";
import { useDemoStore } from "@/stores/demo-store";

export function AppShell({ children }: { children: ReactNode }) {
  const hasHydrated = useDemoStore((state) => state.hasHydrated);
  const isAuthenticated = useDemoStore((state) => state.isAuthenticated);
  const pathname = usePathname();

  if (!hasHydrated) return <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-background p-5" aria-label="Loading Oasis"><div className="mt-2 h-10 w-32 animate-pulse rounded-xl bg-oasis-surface" /><div className="mt-10 h-9 w-52 animate-pulse rounded-xl bg-oasis-surface" /><div className="mt-6 h-40 animate-pulse rounded-3xl bg-oasis-surface" /></div>;
  if (!isAuthenticated) return <LoginScreen />;

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[430px] overflow-x-clip bg-background shadow-[0_0_60px_rgba(23,23,23,0.10)] md:my-6 md:min-h-[calc(100dvh-3rem)] md:rounded-[32px] md:ring-1 md:ring-black/5">
      <main key={pathname} className="page-enter safe-top min-h-dvh px-5 pb-32 md:min-h-[calc(100dvh-3rem)]">{children}</main>
      <BottomNavigation />
      <PwaRegistration />
    </div>
  );
}
