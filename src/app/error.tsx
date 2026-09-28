"use client";
import { AlertCircle, RotateCcw } from "lucide-react";
export default function ErrorScreen({ reset }: { reset: () => void }) {
  return <main className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col items-center justify-center bg-white px-6 text-center"><span className="grid size-16 place-items-center rounded-full bg-red-50 text-red-800"><AlertCircle className="size-6" /></span><p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">A brief pause</p><h1 className="mt-2 text-3xl font-medium tracking-[-0.04em]">Your Oasis didn’t load.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Nothing has been lost. Please try this screen again.</p><button type="button" onClick={reset} className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-white"><RotateCcw className="size-4" />Try again</button></main>;
}
