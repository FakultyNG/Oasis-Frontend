import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { WalletScreen } from "@/components/wallet/wallet-screen";
export const metadata: Metadata = { title: "Oasis Wallet" };
export default function WalletPage() { return <AppShell><WalletScreen /></AppShell>; }
