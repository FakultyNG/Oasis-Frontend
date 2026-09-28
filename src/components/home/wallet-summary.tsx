import { CircleDollarSign, WalletCards } from "lucide-react";
import { formatNaira } from "@/domain/money";

export function WalletSummary({ walletBalance, cashPoints }: { walletBalance: number; cashPoints: number }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <article className="rounded-2xl border bg-card p-4">
        <span className="grid size-9 place-items-center rounded-full bg-oasis-gold-soft"><WalletCards className="size-4" /></span>
        <p className="mt-6 text-xs text-muted-foreground">Wallet</p>
        <p className="mt-1 font-mono text-lg font-medium tracking-tight tabular-nums">{formatNaira(walletBalance)}</p>
      </article>
      <article className="rounded-2xl border bg-card p-4">
        <span className="grid size-9 place-items-center rounded-full bg-oasis-surface"><CircleDollarSign className="size-4" /></span>
        <p className="mt-6 text-xs text-muted-foreground">CashPoints</p>
        <p className="mt-1 font-mono text-lg font-medium tracking-tight tabular-nums">{cashPoints.toLocaleString("en-NG")} <span className="text-xs text-muted-foreground">CP</span></p>
      </article>
    </div>
  );
}
