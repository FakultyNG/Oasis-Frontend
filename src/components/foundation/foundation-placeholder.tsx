import { ArrowLeft, LockKeyhole } from "lucide-react";
import Link from "next/link";

type FoundationPlaceholderProps = { eyebrow: string; title: string; description: string; locked?: boolean };

export function FoundationPlaceholder({ eyebrow, title, description, locked = false }: FoundationPlaceholderProps) {
  return (
    <div className="flex min-h-[calc(100dvh-9rem)] flex-col">
      <Link href="/" aria-label="Back home" className="grid size-10 place-items-center rounded-full border bg-card"><ArrowLeft className="size-4" /></Link>
      <div className="my-auto pb-16">
        <span className="mb-5 grid size-12 place-items-center rounded-2xl bg-oasis-gold-soft">{locked ? <LockKeyhole className="size-5" /> : <span className="size-2 rounded-full bg-foreground" />}</span>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</p>
        <h1 className="mt-2 text-4xl font-medium tracking-[-0.045em]">{title}</h1>
        <p className="balance mt-4 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>
        <p className="mt-6 inline-flex rounded-full border px-3 py-1.5 text-xs font-medium">Preview route active</p>
      </div>
    </div>
  );
}
