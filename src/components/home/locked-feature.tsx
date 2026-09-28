"use client";

import { LockKeyhole } from "lucide-react";

export function LockedFeature({ title, description, onUnlock }: { title: string; description: string; onUnlock: () => void }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border bg-oasis-surface p-4">
      <div className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-white"><LockKeyhole className="size-3.5" /></div>
      <div className="h-16 w-full rounded-xl bg-[radial-gradient(circle_at_20%_20%,#e7d6a4_0,transparent_35%),#efede8] opacity-75" />
      <h3 className="mt-4 text-sm font-medium">{title}</h3>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
      <button type="button" onClick={onUnlock} className="mt-3 text-xs font-semibold underline decoration-[#c6ab6c] underline-offset-4">Unlock with Gold</button>
    </article>
  );
}
