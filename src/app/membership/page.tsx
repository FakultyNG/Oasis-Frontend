import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { MembershipOverview } from "@/components/membership/membership-overview";
export const metadata: Metadata = { title: "Membership" };
export default function MembershipPage() { return <AppShell><MembershipOverview /></AppShell>; }
