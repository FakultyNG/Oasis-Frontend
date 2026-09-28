"use client";

import { ArrowLeft, CalendarDays, CircleDollarSign, CreditCard, Sparkles } from "lucide-react";
import Link from "next/link";
import type { OasisNotification } from "@/domain/types";
import { cn } from "@/lib/utils";
import { useDemoStore } from "@/stores/demo-store";

const ICONS = { booking: CalendarDays, rewards: CircleDollarSign, skin: Sparkles, membership: CreditCard };
const DATE = new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

export function NotificationsScreen({ notifications }: { notifications: OasisNotification[] }) {
  const readIds = useDemoStore((state) => state.readNotificationIds);
  const markRead = useDemoStore((state) => state.markNotificationRead);
  const markAll = useDemoStore((state) => state.markAllNotificationsRead);
  const unread = notifications.filter((item) => !readIds.includes(item.id)).length;
  return <div><div className="flex items-center justify-between"><Link href="/profile" aria-label="Back to profile" className="grid size-10 place-items-center rounded-full border"><ArrowLeft className="size-4" /></Link>{unread ? <button type="button" onClick={() => markAll(notifications.map((item) => item.id))} className="text-xs font-medium underline underline-offset-4">Mark all read</button> : null}</div><p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Stay in the loop</p><h1 className="mt-2 text-[2.35rem] font-medium tracking-[-0.05em]">Notifications.</h1><p className="mt-3 text-sm text-muted-foreground">{unread ? `${unread} new ${unread === 1 ? "update" : "updates"} from Oasis.` : "You’re all caught up."}</p><div className="mt-7 space-y-3">{notifications.map((item) => { const Icon = ICONS[item.category]; const isRead = readIds.includes(item.id); return <Link key={item.id} href={item.href} onClick={() => markRead(item.id)} className={cn("flex gap-3 rounded-2xl border p-4", !isRead && "border-[#d8c27f] bg-oasis-gold-soft/45")}><span className="grid size-10 shrink-0 place-items-center rounded-full bg-white"><Icon className="size-4" /></span><span className="min-w-0 flex-1"><span className="flex items-start justify-between gap-3"><span className="text-sm font-medium">{item.title}</span>{!isRead ? <span className="mt-1 size-2 shrink-0 rounded-full bg-[#9b7d28]" /> : null}</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.message}</span><span className="mt-2 block font-mono text-[10px] text-muted-foreground">{DATE.format(new Date(item.createdAt))}</span></span></Link>; })}</div></div>;
}
