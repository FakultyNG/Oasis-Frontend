import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { BlackVipExperience } from "@/components/membership/black-vip-experience";
export const metadata: Metadata = { title: "Black VIP Experience" };
export default function BlackVipPage() { return <AppShell><BlackVipExperience /></AppShell>; }
