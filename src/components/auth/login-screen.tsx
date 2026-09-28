"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { MembershipTier } from "@/domain/types";
import { cn } from "@/lib/utils";
import { useDemoStore } from "@/stores/demo-store";

type AuthMode = "login" | "signup";
const tiers: MembershipTier[] = ["regular", "gold", "black"];

export function LoginScreen({ initialMode = "login" }: { initialMode?: AuthMode }) {
  const signIn = useDemoStore((state) => state.signIn);
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [step, setStep] = useState<"details" | "otp">("details");
  const [tier, setTier] = useState<MembershipTier>("regular");
  const [email, setEmail] = useState("bette@oasis.demo");
  const [accessCode, setAccessCode] = useState("2026");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  function switchMode(next: AuthMode) { setMode(next); setStep("details"); setOtp(""); setError(""); }
  function submitDetails(event: FormEvent) {
    event.preventDefault();
    const validLogin = email.includes("@") && accessCode.length >= 4;
    const validSignup = validLogin && firstName.trim() && lastName.trim() && gender && phone.replace(/\D/g, "").length >= 10;
    if (!(mode === "login" ? validLogin : validSignup)) { setError("Complete all required details correctly."); return; }
    setError("");
    if (mode === "login") { signIn(tier); router.push("/"); return; }
    setStep("otp");
  }
  function verifyOtp(event: FormEvent) {
    event.preventDefault();
    if (!/^\d{6}$/.test(otp)) { setError("Enter the 6-digit verification code."); return; }
    signIn(mode === "signup" ? "regular" : tier); router.push("/");
  }

  return <main className="safe-top mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-background px-6 pb-8 shadow-[0_0_60px_rgba(23,23,23,0.06)]">
    <header className="flex items-center justify-between"><Image src="/brand/oasis-logo.webp" alt="Oasis MedSpa" width={300} height={120} priority className="h-auto w-[150px]" /><span className="grid size-10 place-items-center rounded-full bg-oasis-gold-soft"><Sparkles className="size-4" /></span></header>
    {step === "otp" ? <form className="flex flex-1 flex-col justify-center" onSubmit={verifyOtp}><button type="button" onClick={() => { setStep("details"); setError(""); }} aria-label="Back to account details" className="grid size-11 place-items-center rounded-full border"><ArrowLeft className="size-4" /></button><span className="mt-10 grid size-16 place-items-center rounded-full bg-oasis-gold-soft"><ShieldCheck className="size-6" /></span><p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Verify your identity</p><h1 className="mt-2 text-[2.45rem] font-medium tracking-[-0.05em]">Enter your OTP.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">A six-digit verification code was sent to {email}. Use any six digits in this prototype.</p><Label htmlFor="otp" className="mt-7">Verification code</Label><Input id="otp" value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" maxLength={6} className="mt-2 h-14 rounded-xl bg-oasis-surface px-4 text-center font-mono text-xl tracking-[0.4em]" autoFocus />{error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}<button type="submit" className="mt-7 flex h-12 items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-white">Verify & continue <CheckCircle2 className="size-4" /></button></form> : <>
      <div className="mt-9"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Your wellness, elevated</p><h1 className="balance mt-3 text-[2.45rem] font-medium leading-[1.04] tracking-[-0.055em]">{mode === "login" ? "Welcome to your Oasis." : "Create your Oasis account."}</h1></div>
      <div className="mt-6 grid grid-cols-2 rounded-full border bg-oasis-surface p-1"><button type="button" onClick={() => switchMode("login")} className={cn("h-11 rounded-full text-xs font-medium", mode === "login" && "bg-foreground text-white")}>Sign in</button><button type="button" onClick={() => switchMode("signup")} className={cn("h-11 rounded-full text-xs font-medium", mode === "signup" && "bg-foreground text-white")}>Create account</button></div>
      <form className="mt-6 space-y-4" onSubmit={submitDetails} noValidate>
        {mode === "signup" ? <><div className="grid grid-cols-2 gap-3"><Field id="firstName" label="First name" value={firstName} onChange={setFirstName} autoComplete="given-name" /><Field id="lastName" label="Last name" value={lastName} onChange={setLastName} autoComplete="family-name" /></div><div><Label htmlFor="gender">Gender</Label><select id="gender" value={gender} onChange={(event) => setGender(event.target.value)} className="mt-2 h-12 w-full rounded-xl border bg-oasis-surface px-4 text-sm"><option value="">Select gender</option><option value="female">Female</option><option value="male">Male</option><option value="nonbinary">Non-binary</option><option value="prefer-not">Prefer not to say</option></select></div><Field id="phone" label="Phone number" value={phone} onChange={setPhone} autoComplete="tel" inputMode="tel" /></> : null}
        <Field id="email" label="Email address" value={email} onChange={setEmail} autoComplete="email" inputMode="email" />
        <Field id="accessCode" label="Access code" value={accessCode} onChange={setAccessCode} autoComplete={mode === "login" ? "current-password" : "new-password"} type="password" inputMode="numeric" />
        {mode === "login" ? <fieldset><legend className="mb-2 text-xs font-medium text-muted-foreground">Demo profile</legend><div className="grid grid-cols-3 rounded-full border bg-oasis-surface p-1">{tiers.map((item) => <button key={item} type="button" onClick={() => setTier(item)} className={cn("h-11 rounded-full text-xs font-medium capitalize", tier === item && "bg-foreground text-white")}>{item}</button>)}</div></fieldset> : null}
        {error ? <p className="text-xs text-destructive">{error}</p> : null}<button type="submit" className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-white">{mode === "login" ? "Sign in" : "Continue to OTP"} <ArrowRight className="size-4" /></button>
      </form>
    </>}
    <div className="mt-auto flex items-center justify-center gap-2 pt-8 text-[11px] text-muted-foreground"><ShieldCheck className="size-3.5" />Secure prototype · simulated OTP verification</div>
  </main>;
}

function Field({ id, label, value, onChange, ...props }: { id: string; label: string; value: string; onChange: (value: string) => void; type?: string; inputMode?: "email" | "numeric" | "tel"; autoComplete?: string }) { return <div><Label htmlFor={id}>{label}</Label><Input id={id} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-12 rounded-xl bg-oasis-surface px-4" {...props} /></div>; }
