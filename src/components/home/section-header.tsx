import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type SectionHeaderProps = {
  title: string;
  actionHref?: string;
  actionLabel?: string;
};

export function SectionHeader({ title, actionHref, actionLabel = "See all" }: SectionHeaderProps) {
  return (
    <div className="mb-3 flex items-center justify-between gap-4">
      <h2 className="text-lg font-medium tracking-[-0.025em]">{title}</h2>
      {actionHref ? <Link href={actionHref} className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">{actionLabel}<ArrowUpRight className="size-3.5" /></Link> : null}
    </div>
  );
}
