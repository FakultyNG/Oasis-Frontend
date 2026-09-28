import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { CashPointsScreen } from "@/components/rewards/cashpoints-screen";
export const metadata: Metadata = { title: "CashPoints" };
export default function CashPointsPage() { return <AppShell><CashPointsScreen /></AppShell>; }
