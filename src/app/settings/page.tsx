import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { SettingsScreen } from "@/components/profile/settings-screen";
export const metadata: Metadata = { title: "Settings" };
export default function SettingsPage() { return <AppShell><SettingsScreen /></AppShell>; }
