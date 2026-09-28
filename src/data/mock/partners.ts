import type { Partner } from "@/domain/types";

export const PARTNERS: Partner[] = [
  { id: "northwest-fuel", name: "Northwest Fuel Station", category: "Fuel", description: "Priority service for Oasis members at participating locations.", gold: { priority: true, benefitText: "Priority queue" }, black: { priority: true, discountPercent: 5, benefitText: "Priority queue" } },
  { id: "crave", name: "CRAVE Foods", category: "Food & Beverage", description: "Illustrative dining privileges for Oasis members.", gold: { priority: true, benefitText: "Priority service" }, black: { priority: true, discountPercent: 10, benefitText: "Priority service" } },
  { id: "i-fitness", name: "i-Fitness", category: "Fitness", description: "Illustrative wellness membership benefits and priority onboarding.", gold: { priority: true, benefitText: "Priority onboarding and service" }, black: { priority: true, discountPercent: 7, benefitText: "Priority onboarding" } },
  { id: "eko-hotels", name: "Eko Hotels & Suites", category: "Hospitality", description: "Illustrative premium hospitality handling for Oasis members.", gold: { priority: true, benefitText: "Priority handling where applicable" }, black: { priority: true, benefitText: "Premium hospitality benefit and upgrade where available" } },
];
