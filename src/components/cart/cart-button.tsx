"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

export function CartButton({ inverse = false }: { inverse?: boolean }) {
  const count = useCartStore((state) => state.serviceIds.length);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  return <Link href="/cart" aria-label={`Session cart with ${hasHydrated ? count : 0} services`} className={cn("relative grid size-10 place-items-center rounded-full border backdrop-blur", inverse ? "border-white/30 bg-white/85 text-foreground" : "bg-card")}><ShoppingBag className="size-4" />{hasHydrated && count > 0 ? <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-oasis-black font-mono text-[9px] font-semibold text-white">{count}</span> : null}</Link>;
}
