"use client";

import { CalendarDays, Check, Clock3, Plus, X } from "lucide-react";
import { useState } from "react";
import { BOOKING_DATES, BOOKING_TIMES, getBookingDateLabel, getBookingTimeLabel } from "@/domain/booking";
import type { Service } from "@/domain/types";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

export function AddToCartControl({ service, compact = false }: { service: Service; compact?: boolean }) {
  const serviceIds = useCartStore((state) => state.serviceIds);
  const savedSchedule = useCartStore((state) => state.schedules[service.id]);
  const addService = useCartStore((state) => state.addService);
  const removeService = useCartStore((state) => state.removeService);
  const added = serviceIds.includes(service.id);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(savedSchedule?.date ?? BOOKING_DATES[1].iso as string);
  const [time, setTime] = useState(savedSchedule?.time ?? "");

  function openPicker() {
    setDate(savedSchedule?.date ?? BOOKING_DATES[1].iso);
    setTime(savedSchedule?.time ?? "");
    setOpen(true);
  }

  return <>{compact ? <button type="button" onClick={() => added ? removeService(service.id) : openPicker()} aria-label={added ? `Remove ${service.name} from cart` : `Add ${service.name} to cart`} className={cn("grid size-8 place-items-center rounded-full border transition-colors", added ? "border-foreground bg-foreground text-white" : "bg-white")}>{added ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}</button> : <button type="button" onClick={() => added ? removeService(service.id) : openPicker()} className={cn("flex h-12 items-center justify-center gap-2 rounded-full border text-sm font-medium", added && "border-foreground bg-oasis-surface")}>{added ? <><Check className="size-4" />Added to cart</> : <><Plus className="size-4" />Add to cart</>}</button>}

    {open ? <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/35 px-0" role="dialog" aria-modal="true" aria-labelledby="cart-schedule-title"><div className="safe-bottom w-full max-w-[430px] rounded-t-[28px] bg-white px-5 pb-6 pt-5 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a7135]">Schedule treatment</p><h2 id="cart-schedule-title" className="mt-1 text-xl font-medium">Add {service.name}</h2></div><button type="button" onClick={() => setOpen(false)} aria-label="Close" className="grid size-9 place-items-center rounded-full bg-oasis-surface"><X className="size-4" /></button></div><p className="mt-3 text-xs leading-5 text-muted-foreground">Choose this treatment’s appointment date and time before adding it to your cart.</p><div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">{BOOKING_DATES.map((item) => <button key={item.iso} type="button" onClick={() => { setDate(item.iso); setTime(""); }} aria-pressed={date === item.iso} className={cn("w-16 shrink-0 rounded-2xl border py-3 text-center", date === item.iso && "border-foreground bg-foreground text-white")}><span className="block text-[9px] uppercase tracking-wider">{item.day}</span><span className="mt-1 block font-mono">{item.date}</span></button>)}</div><div className="mt-4 grid grid-cols-3 gap-2">{BOOKING_TIMES.map((slot) => { const unavailable = (slot.unavailableOn as readonly string[]).includes(date); return <button key={slot.value} type="button" disabled={unavailable} onClick={() => setTime(slot.value)} aria-pressed={time === slot.value} className={cn("h-11 rounded-xl border text-xs", unavailable ? "cursor-not-allowed opacity-30 line-through" : time === slot.value && "border-foreground bg-foreground text-white")}>{slot.label}</button>; })}</div>{time ? <div className="mt-4 flex items-center gap-3 rounded-2xl bg-oasis-surface p-3 text-xs"><CalendarDays className="size-4" /><span>{getBookingDateLabel(date)}</span><Clock3 className="ml-auto size-4" /><span>{getBookingTimeLabel(time)}</span></div> : null}<button type="button" disabled={!time} onClick={() => { addService(service.id, date, time); setOpen(false); }} className="mt-5 h-12 w-full rounded-full bg-foreground text-sm font-medium text-white disabled:opacity-35">Confirm and add to cart</button></div></div> : null}
  </>;
}
