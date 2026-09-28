import { CalendarDays, Clock3, MapPin } from "lucide-react";
import type { Appointment } from "@/domain/types";

export function BookingCard({ appointment }: { appointment: Appointment }) {
  return (
    <article className="rounded-2xl border bg-card p-5 shadow-[0_8px_28px_rgba(23,23,23,0.035)]">
      <div className="flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-oasis-gold-soft"><CalendarDays className="size-5" /></div>
        <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-medium uppercase tracking-[0.12em] text-[#8a7135]">Upcoming</p><h3 className="mt-1 font-medium tracking-tight">{appointment.serviceName}</h3></div><span className="rounded-full bg-oasis-surface px-2.5 py-1 text-[10px] font-medium">Confirmed</span></div><p className="mt-1 text-xs text-muted-foreground">with {appointment.specialist}</p></div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 border-t pt-4 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><Clock3 className="size-3.5" />{appointment.dateLabel}, {appointment.timeLabel}</span><span className="flex items-center justify-end gap-1.5"><MapPin className="size-3.5" />{appointment.location}</span></div>
    </article>
  );
}
