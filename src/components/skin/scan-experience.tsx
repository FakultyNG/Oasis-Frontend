"use client";

import { ArrowLeft, Camera, Check, ScanFace, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SkinGate } from "@/components/skin/skin-gate";
import type { SkinJourneyData } from "@/domain/types";
import { useDemoStore } from "@/stores/demo-store";

type ScanState = "instructions" | "camera" | "scanning" | "result";

export function ScanExperience({ data }: { data: SkinJourneyData }) {
  const [state, setState] = useState<ScanState>("instructions");
  const [cameraMessage, setCameraMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const complete = useDemoStore((value) => value.completeSkinScan);

  useEffect(() => {
    if (state === "camera" && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      void videoRef.current.play();
    }
  }, [state]);

  useEffect(() => () => streamRef.current?.getTracks().forEach((track) => track.stop()), []);

  function finishScan(image?: string) {
    setState("scanning");
    window.setTimeout(() => {
      complete(image);
      setState("result");
    }, 1400);
  }

  function runDemo() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    finishScan();
  }

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 960 } }, audio: false });
      streamRef.current = stream;
      setCameraMessage("");
      setState("camera");
    } catch {
      setCameraMessage("Camera unavailable. Use Demo Scan to continue.");
    }
  }

  function captureImage() {
    const video = videoRef.current;
    if (!video || !video.videoWidth) {
      setCameraMessage("The camera is still preparing. Please try again.");
      return;
    }
    const canvas = document.createElement("canvas");
    const width = Math.min(video.videoWidth, 720);
    const height = Math.round(width * (video.videoHeight / video.videoWidth));
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.translate(width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, width, height);
    const image = canvas.toDataURL("image/jpeg", 0.82);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    finishScan(image);
  }

  return <SkinGate><div>
    {state !== "scanning" ? <Link href="/skin-journey" aria-label="Back to Skin Journey" className="grid size-10 place-items-center rounded-full border"><ArrowLeft className="size-4" /></Link> : null}
    {state === "instructions" ? <>
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">AI Skin Scan</p><h1 className="mt-2 text-[2.35rem] font-medium tracking-[-0.05em]">Prepare your face.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">This prototype uses a predetermined analysis and does not identify you or provide medical advice.</p>
      <div className="relative mx-auto mt-8 aspect-[3/4] max-h-[390px] overflow-hidden rounded-[32px] bg-oasis-black"><Image src="/skin/skin-twin.png" alt="Demo face positioned for skin scan" fill sizes="390px" className="object-cover object-top opacity-70" /><div className="absolute inset-[10%] rounded-[45%] border border-dashed border-white/75" /><div className="absolute inset-x-0 bottom-5 text-center text-xs text-white/70">Center your face inside the guide</div></div>
      <ul className="mt-6 space-y-3">{["Use even natural lighting", "Remove glasses and heavy makeup", "Keep a neutral expression"].map((item) => <li key={item} className="flex items-center gap-3 text-sm"><span className="grid size-6 place-items-center rounded-full bg-oasis-gold-soft"><Check className="size-3.5" /></span>{item}</li>)}</ul>
      <button type="button" onClick={startCamera} className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-white"><Camera className="size-4" />Start camera</button><button type="button" onClick={runDemo} className="mt-3 h-11 w-full rounded-full border text-sm font-medium">Use Demo Scan</button>{cameraMessage ? <p role="status" className="mt-3 text-center text-xs text-red-700">{cameraMessage}</p> : null}
    </> : null}
    {state === "camera" ? <div className="mt-8"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Camera scan</p><h1 className="mt-2 text-[2.35rem] font-medium tracking-[-0.05em]">Hold still.</h1><div className="relative mt-6 aspect-[3/4] overflow-hidden rounded-[32px] bg-oasis-black"><video ref={videoRef} playsInline muted className="size-full scale-x-[-1] object-cover" /><div className="pointer-events-none absolute inset-[10%] rounded-[45%] border border-dashed border-white/80" /></div><button type="button" onClick={captureImage} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-white"><Camera className="size-4" />Capture & analyse</button><button type="button" onClick={runDemo} className="mt-3 h-11 w-full rounded-full border text-sm font-medium">Use Demo Scan instead</button>{cameraMessage ? <p role="status" className="mt-3 text-center text-xs text-red-700">{cameraMessage}</p> : null}</div> : null}
    {state === "scanning" ? <div className="flex min-h-[calc(100dvh-9rem)] flex-col items-center justify-center text-center"><div className="relative grid size-32 place-items-center"><span className="absolute inset-0 animate-ping rounded-full border border-[#c8ad6d] opacity-30" /><span className="absolute inset-4 animate-pulse rounded-full bg-oasis-gold-soft" /><ScanFace className="relative size-10" /></div><h1 className="mt-8 text-3xl font-medium">Reading your skin story.</h1><p className="mt-3 text-sm text-muted-foreground">Mapping texture, tone and radiance…</p></div> : null}
    {state === "result" ? <div className="py-12 text-center"><span className="mx-auto grid size-16 place-items-center rounded-full bg-oasis-gold-soft"><Sparkles className="size-6" /></span><p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7135]">Day One baseline complete</p><h1 className="mt-2 text-[2.35rem] font-medium tracking-[-0.05em]">Glow Score {data.glowScore}.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Your personalized Oasis journey is ready from Day One.</p><div className="mt-7 flex items-start gap-3 rounded-2xl bg-oasis-surface p-4 text-left"><ShieldCheck className="mt-0.5 size-4" /><p className="text-xs leading-5 text-muted-foreground">AI-suggested wellness journey only. Oasis-approved protocols and professional oversight would guide production recommendations.</p></div><Link href="/skin-journey/plan" className="mt-7 flex h-12 items-center justify-center rounded-full bg-foreground text-sm font-medium text-white">View my generated journey</Link><Link href="/skin-journey/twin" className="mt-4 block text-xs underline underline-offset-4">Explore Skin Twin</Link></div> : null}
  </div></SkinGate>;
}
