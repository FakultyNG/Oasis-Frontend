import type { Metadata } from "next";
import { CartScreen } from "@/components/cart/cart-screen";
import { AppShell } from "@/components/layout/app-shell";
import { repositories } from "@/repositories";

export const metadata: Metadata = { title: "Treatment Cart" };

export default async function CartPage() {
  const services = await repositories.services.getAll();
  return <AppShell><CartScreen services={services} /></AppShell>;
}
