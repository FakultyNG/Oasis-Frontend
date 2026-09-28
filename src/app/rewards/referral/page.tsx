import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { ReferralScreen } from "@/components/rewards/referral-screen";
export const metadata: Metadata = { title: "Refer & Earn" };
export default function ReferralPage() { return <AppShell><ReferralScreen /></AppShell>; }
