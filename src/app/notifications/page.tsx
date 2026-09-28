import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { NotificationsScreen } from "@/components/profile/notifications-screen";
import { repositories } from "@/repositories";
export const metadata: Metadata = { title: "Notifications" };
export default async function NotificationsPage() { const notifications = await repositories.account.getNotifications(); return <AppShell><NotificationsScreen notifications={notifications} /></AppShell>; }
