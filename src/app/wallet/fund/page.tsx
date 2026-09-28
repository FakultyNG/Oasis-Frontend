import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { FundWallet } from "@/components/wallet/fund-wallet";
export const metadata: Metadata = { title: "Fund Wallet" };
export default function FundWalletPage() { return <AppShell><FundWallet /></AppShell>; }
