import Link from "next/link";
import { CalendarPlus, CreditCard, Plus } from "lucide-react";

const actions = [
  { label: "Fund", href: "/wallet/fund", icon: Plus },
  { label: "Book", href: "/services", icon: CalendarPlus },
  { label: "Card", href: "/membership/card", icon: CreditCard },
] as const;

export function QuickActions() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {actions.map(({ label, href, icon: Icon }) => <Link key={label} href={href} className="flex flex-col items-center gap-2 rounded-2xl border bg-card px-2 py-4 text-xs font-medium"><span className="grid size-9 place-items-center rounded-full bg-oasis-surface"><Icon className="size-4" /></span>{label}</Link>)}
    </div>
  );
}
