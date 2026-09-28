import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { CardScreen } from "@/components/membership/card-screen";
export const metadata: Metadata = { title: "Membership Card" };
export default function MembershipCardPage() { return <AppShell><CardScreen /></AppShell>; }
