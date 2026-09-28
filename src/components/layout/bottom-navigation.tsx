"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Gift, House, Sparkles, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: House },
  { href: "/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/skin-journey", label: "Skin Journey", icon: Sparkles },
  { href: "/rewards", label: "Rewards", icon: Gift },
  { href: "/profile", label: "Profile", icon: UserRound },
] as const;

export function BottomNavigation() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary navigation" className="safe-bottom fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[430px] border-t bg-white/95 px-2 pt-2 backdrop-blur-xl md:bottom-6 md:rounded-b-[32px]">
      <ul className="grid grid-cols-5">
        {items.map(({ href, label, icon: Icon }) => {
          const profileRoute = href === "/profile" && (pathname === "/settings" || pathname === "/notifications");
          const active = href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`) || profileRoute;
          return (
            <li key={href}>
              <Link aria-current={active ? "page" : undefined} href={href} className={cn("flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-medium transition-colors", active ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                <span className={cn("grid h-7 w-9 place-items-center rounded-full transition-colors", active && "bg-oasis-gold-soft")}>
                  <Icon aria-hidden="true" className="size-[18px]" strokeWidth={active ? 2 : 1.7} />
                </span>
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
