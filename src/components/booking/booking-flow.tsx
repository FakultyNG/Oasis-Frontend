"use client";

import { ArrowLeft, CalendarDays, Check, CheckCircle2, ChevronRight, CreditCard, Info, Landmark, LockKeyhole, WalletCards } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BOOKING_DATES, BOOKING_TIMES, calculateDeposit, getBookingDateLabel, getBookingTimeLabel } from "@/domain/booking";
import { formatNaira } from "@/domain/money";
import type { Booking, BookingAppointment, Service } from "@/domain/types";
import { cn } from "@/lib/utils";
import { useBookingStore } from "@/stores/booking-store";
import { useCartStore } from "@/stores/cart-store";
import { useDemoStore } from "@/stores/demo-store";

type Step = "date" | "time" | "summary" | "payment" | "confirmation";
const stepNumber: Record<Step, number> = { date: 1, time: 2, summary: 3, payment: 4, confirmation: 4 };

export function BookingFlow({ services: availableServices, fromCart = false }: { services: Service[]; fromCart?: boolean }) {
  const [step, setStep] = useState<Step>("date");
  const [date, setDate] = useState(BOOKING_DATES[1].iso as string);
  const [time, setTime] = useState("");
  const [method, setMethod] = useState<"card" | "transfer">("card");
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const tier = useDemoStore((state) => state.activeTier);
  const walletBalance = useDemoStore((state) => state.walletBalances[tier]);
  const deductWallet = useDemoStore((state) => state.deductWallet);
  const createBooking = useBookingStore((state) => state.createBooking);
  const clearCart = useCartStore((state) => state.clearCart);
  const cartServiceIds = useCartStore((state) => state.serviceIds);
  const cartHasHydrated = useCartStore((state) => state.hasHydrated);
  const cartSchedules = useCartStore((state) => state.schedules);
  const services = fromCart ? availableServices.filter((service) => cartServiceIds.includes(service.id)) : availableServices;
  const totalPrice = services.reduce((sum, service) => sum + service.price, 0);
  const deposit = calculateDeposit(totalPrice);
  const balance = totalPrice - deposit;
  const isMember = tier !== "regular";
  const canPay = !isMember || walletBalance >= deposit;
  const usingCartSchedules = fromCart && step === "date" && cartHasHydrated && services.length > 0 && services.every((service) => Boolean(cartSchedules[service.id]));
  const activeStep: Step = usingCartSchedules ? "summary" : step;
  const appointments: BookingAppointment[] = services.map((service) => ({ serviceId: service.id, serviceName: service.name, date: usingCartSchedules ? cartSchedules[service.id].date : date, time: usingCartSchedules ? cartSchedules[service.id].time : time }));
  const selectedDate = appointments[0]?.date ?? date;
  const selectedTime = appointments[0]?.time ?? time;

  function goBack() {
    if (activeStep === "time") setStep("date");
    else if (activeStep === "summary") {
      if (!usingCartSchedules) setStep("time");
    } else if (activeStep === "payment") setStep("summary");
  }

  function confirmBooking() {
    if (isMember && !deductWallet(tier, deposit)) return;
    const booking = createBooking({ serviceIds: services.map((service) => service.id), serviceNames: services.map((service) => service.name), appointments, totalPrice, depositPaid: deposit, balanceDue: balance, date: selectedDate, time: selectedTime, paymentSource: isMember ? "wallet" : "direct" });
    clearCart();
    setConfirmed(booking);
    setStep("confirmation");
  }

  if (step === "confirmation" && confirmed) return <BookingConfirmation booking={confirmed} />;

  return (
    <div className="pb-8">
      {usingCartSchedules ? <Link href="/cart" aria-label="Back to cart" className="grid size-10 place-items-center rounded-full border bg-card"><ArrowLeft className="size-4" /></Link> : <button type="button" onClick={goBack} aria-label="Previous booking step" className={cn("grid size-10 place-items-center rounded-full border bg-card", activeStep === "date" && "invisible")}><ArrowLeft className="size-4" /></button>}
      <div className="mt-8 flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Booking · Step {stepNumber[activeStep]} of 4</p><p className="text-xs text-muted-foreground">{services.length} {services.length === 1 ? "treatment" : "treatments"}</p></div>

      {services.length === 0 ? <div className="mt-8 rounded-3xl border border-dashed p-8 text-center"><p className="text-sm font-medium">No treatments selected</p><Link href="/services" className="mt-5 inline-flex h-10 items-center rounded-full bg-foreground px-5 text-xs font-medium text-white">Explore treatments</Link></div> : null}
      {services.length > 0 && activeStep === "date" ? <DateStep value={date} onChange={setDate} onNext={() => { setTime(""); setStep("time"); }} /> : null}
      {activeStep === "time" ? <TimeStep date={date} value={time} onChange={setTime} onNext={() => setStep("summary")} /> : null}
      {activeStep === "summary" ? <SummaryStep services={services} appointments={appointments} total={totalPrice} deposit={deposit} balance={balance} onNext={() => setStep("payment")} /> : null}
      {activeStep === "payment" ? <PaymentStep tier={tier} walletBalance={walletBalance} method={method} setMethod={setMethod} deposit={deposit} canPay={canPay} onPay={confirmBooking} /> : null}
    </div>
  );
}

function DateStep({ value, onChange, onNext }: { value: string; onChange: (value: string) => void; onNext: () => void }) {
  return <><h1 className="mt-3 text-[2.4rem] font-medium tracking-[-0.05em]">Choose a date.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Select the day that best fits your Oasis visit.</p><div className="-mx-5 mt-8 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none]">{BOOKING_DATES.map((item) => <button key={item.iso} type="button" onClick={() => onChange(item.iso)} aria-pressed={value === item.iso} className={cn("w-[76px] shrink-0 rounded-2xl border px-3 py-4 text-center", value === item.iso ? "border-foreground bg-foreground text-white" : "bg-card")}><span className={cn("block text-[10px] font-semibold uppercase tracking-[0.14em]", value === item.iso ? "text-white/55" : "text-muted-foreground")}>{item.day}</span><span className="mt-2 block font-mono text-xl">{item.date}</span></button>)}</div><div className="mt-8 flex items-center gap-3 rounded-2xl bg-oasis-surface p-4"><CalendarDays className="size-5" /><div><p className="text-xs text-muted-foreground">Selected date</p><p className="mt-1 text-sm font-medium">{getBookingDateLabel(value)}</p></div></div><button type="button" onClick={onNext} className="mt-8 h-12 w-full rounded-full bg-foreground text-sm font-medium text-white">Continue to time</button></>;
}

function TimeStep({ date, value, onChange, onNext }: { date: string; value: string; onChange: (value: string) => void; onNext: () => void }) {
  return <><h1 className="mt-3 text-[2.4rem] font-medium tracking-[-0.05em]">Choose a time.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Available appointments for {getBookingDateLabel(date)}.</p><div className="mt-8 grid grid-cols-2 gap-3">{BOOKING_TIMES.map((slot) => { const disabled = (slot.unavailableOn as readonly string[]).includes(date); return <button key={slot.value} type="button" disabled={disabled} onClick={() => onChange(slot.value)} aria-pressed={value === slot.value} className={cn("h-14 rounded-2xl border text-sm font-medium", disabled ? "cursor-not-allowed bg-oasis-surface text-muted-foreground line-through opacity-50" : value === slot.value ? "border-foreground bg-foreground text-white" : "bg-card")}>{slot.label}</button>; })}</div><p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-[#d8d5cd]" />Unavailable times are already reserved.</p><button type="button" disabled={!value} onClick={onNext} className="mt-8 h-12 w-full rounded-full bg-foreground text-sm font-medium text-white disabled:opacity-35">Review booking</button></>;
}

function SummaryStep({ services, appointments, total, deposit, balance, onNext }: { services: Service[]; appointments: BookingAppointment[]; total: number; deposit: number; balance: number; onNext: () => void }) {
  return <><h1 className="mt-3 text-[2.4rem] font-medium tracking-[-0.05em]">Review appointments.</h1><p className="mt-3 text-sm text-muted-foreground">Each treatment keeps its own appointment. Pay all deposits together.</p><section className="mt-8 space-y-3">{services.map((service) => { const appointment = appointments.find((item) => item.serviceId === service.id); return <article key={service.id} className="rounded-2xl border bg-card p-4"><div className="flex items-center justify-between gap-4"><span className="text-sm font-medium">{service.name}</span><span className="font-mono text-xs">{formatNaira(service.price)}</span></div>{appointment ? <div className="mt-3 flex items-center gap-2 border-t pt-3 text-xs text-muted-foreground"><CalendarDays className="size-3.5" /><span>{getBookingDateLabel(appointment.date)}</span><span>·</span><span>{getBookingTimeLabel(appointment.time)}</span></div> : null}</article>; })}</section><section className="mt-4 rounded-3xl bg-oasis-surface p-5"><MoneyRow label="Treatment total" value={total} /><MoneyRow label="Combined deposit · 5%" value={deposit} strong /><MoneyRow label="Total due after treatments" value={balance} /></section><div className="mt-4 flex gap-3 rounded-2xl border border-[#e7d6a4] bg-oasis-gold-soft p-4"><Info className="mt-0.5 size-4 shrink-0" /><p className="text-xs leading-5">Deposits are non-refundable on cancellation. Rescheduling preserves the deposit for that appointment.</p></div><button type="button" onClick={onNext} className="mt-7 h-12 w-full rounded-full bg-foreground text-sm font-medium text-white">Pay combined deposit</button></>;
}

function MoneyRow({ label, value, strong = false }: { label: string; value: number; strong?: boolean }) { return <div className={cn("flex items-center justify-between py-2 text-sm", strong && "my-2 border-y py-4 font-medium")}><span className="text-muted-foreground">{label}</span><span className="font-mono">{formatNaira(value)}</span></div>; }

function PaymentStep({ tier, walletBalance, method, setMethod, deposit, canPay, onPay }: { tier: "regular" | "gold" | "black"; walletBalance: number; method: "card" | "transfer"; setMethod: (method: "card" | "transfer") => void; deposit: number; canPay: boolean; onPay: () => void }) {
  const isMember = tier !== "regular";
  return <><h1 className="mt-3 text-[2.4rem] font-medium tracking-[-0.05em]">Pay your deposit.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Secure your appointment with a 5% booking deposit.</p>{isMember ? <section className="mt-8 rounded-3xl bg-oasis-black p-6 text-white"><div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-full bg-white/10"><WalletCards className="size-5 text-oasis-gold" /></span><span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-wider text-white/55">{tier} wallet</span></div><p className="mt-8 text-xs text-white/50">Available balance</p><p className="mt-1 font-mono text-2xl">{formatNaira(walletBalance)}</p><div className="mt-5 flex justify-between border-t border-white/15 pt-5 text-sm"><span className="text-white/55">Deposit deduction</span><span className="font-mono">− {formatNaira(deposit)}</span></div></section> : <section className="mt-8"><p className="text-xs font-medium text-muted-foreground">Choose a simulated payment method</p><div className="mt-3 space-y-3"><PaymentOption active={method === "card"} onClick={() => setMethod("card")} icon={CreditCard} title="Debit or credit card" detail="Paystack-style secure checkout" /><PaymentOption active={method === "transfer"} onClick={() => setMethod("transfer")} icon={Landmark} title="Bank transfer" detail="Instant simulated transfer" /></div><div className="mt-5 rounded-2xl bg-oasis-surface p-4"><p className="text-xs text-muted-foreground">Prototype payment</p><p className="mt-1 text-sm">No real card or bank details are requested.</p></div></section>}{!canPay ? <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4"><p className="text-sm font-medium">Insufficient Wallet Balance</p><p className="mt-2 text-xs text-muted-foreground">Required: {formatNaira(deposit)} · Available: {formatNaira(walletBalance)}</p><button type="button" className="mt-4 text-xs font-semibold underline">Fund Wallet</button></div> : null}<button type="button" disabled={!canPay} onClick={onPay} className="mt-7 h-12 w-full rounded-full bg-foreground text-sm font-medium text-white disabled:opacity-35">{isMember ? `Deduct ${formatNaira(deposit)} & Confirm` : `Pay ${formatNaira(deposit)} & Confirm`}</button><p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground"><LockKeyhole className="size-3" />CashPoints cannot pay booking deposits.</p></>;
}

function PaymentOption({ active, onClick, icon: Icon, title, detail }: { active: boolean; onClick: () => void; icon: typeof CreditCard; title: string; detail: string }) { return <button type="button" onClick={onClick} className={cn("flex w-full items-center gap-4 rounded-2xl border p-4 text-left", active && "border-foreground")}><span className="grid size-10 place-items-center rounded-full bg-oasis-surface"><Icon className="size-4" /></span><span className="flex-1"><span className="block text-sm font-medium">{title}</span><span className="mt-1 block text-xs text-muted-foreground">{detail}</span></span><span className={cn("grid size-5 place-items-center rounded-full border", active && "border-foreground bg-foreground text-white")}>{active ? <Check className="size-3" /> : null}</span></button>; }

function BookingConfirmation({ booking }: { booking: Booking }) {
  return <div className="flex min-h-[calc(100dvh-9rem)] flex-col justify-center py-8 text-center"><span className="mx-auto grid size-20 place-items-center rounded-full bg-oasis-gold-soft"><CheckCircle2 className="size-9" /></span><p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Appointments confirmed</p><h1 className="mt-3 text-[2.4rem] font-medium tracking-[-0.05em]">Your Oasis awaits.</h1><div className="mt-5 space-y-2 text-left">{booking.appointments.map((appointment) => <div key={appointment.serviceId} className="rounded-2xl border p-3"><p className="text-sm font-medium">{appointment.serviceName}</p><p className="mt-1 text-xs text-muted-foreground">{getBookingDateLabel(appointment.date)} · {getBookingTimeLabel(appointment.time)}</p></div>)}</div><section className="mt-5 rounded-3xl bg-oasis-surface p-5 text-left"><MoneyRow label="Combined deposit paid" value={booking.depositPaid} strong /><MoneyRow label="Total balance due" value={booking.balanceDue} /><div className="mt-3 flex justify-between border-t pt-4 text-xs"><span className="text-muted-foreground">Booking ID</span><span className="font-mono font-medium">{booking.id}</span></div></section><Link href={`/bookings/${booking.id}`} className="mt-7 flex h-12 items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-white">View booking <ChevronRight className="size-4" /></Link><Link href="/" className="mt-4 text-xs font-medium text-muted-foreground underline underline-offset-4">Back Home</Link></div>;
}
