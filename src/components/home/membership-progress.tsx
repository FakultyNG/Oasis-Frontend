import { Progress } from "@/components/ui/progress";
import { formatNaira } from "@/domain/money";

type MembershipProgressProps = {
  current: number;
  target: number;
  percent: number;
};

export function MembershipProgress({ current, target, percent }: MembershipProgressProps) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="font-mono text-sm font-medium tabular-nums">{formatNaira(current)} <span className="font-sans text-xs font-normal text-muted-foreground">of {formatNaira(target)}</span></p>
        <span className="font-mono text-xs text-muted-foreground">{percent}%</span>
      </div>
      <Progress value={percent} aria-label={`${percent}% toward Gold membership`} className="h-2 bg-[#ece9e0] [&_[data-slot=progress-indicator]]:bg-foreground" />
    </div>
  );
}
