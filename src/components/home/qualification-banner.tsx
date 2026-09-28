import { ArrowUpRight, Crown } from "lucide-react";
import { formatNaira } from "@/domain/money";
import Link from "next/link";

export function QualificationBanner({ amountRemaining }: { amountRemaining: number }) {
  return (
    <Link href="/membership" className="flex items-center gap-3 rounded-2xl bg-oasis-gold-soft p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white"><Crown className="size-4" /></span>
      <div className="min-w-0 flex-1"><p className="text-sm font-medium">{formatNaira(amountRemaining)} to unlock Gold</p><p className="mt-0.5 text-xs text-muted-foreground">Spend on treatments or fund your wallet.</p></div>
      <ArrowUpRight className="size-4 shrink-0" />
    </Link>
  );
}
