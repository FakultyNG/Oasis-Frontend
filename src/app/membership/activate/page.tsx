import type { Metadata } from "next";
import { Suspense } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { ActivationFlow } from "@/components/membership/activation-flow";
export const metadata: Metadata = { title: "Activate Membership" };
export default function ActivateMembershipPage() { return <AppShell><Suspense fallback={<div className="h-64 animate-pulse rounded-3xl bg-oasis-surface" />}><ActivationFlow /></Suspense></AppShell>; }
