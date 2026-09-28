import { PARTNERS } from "@/data/mock/partners";
import type { PartnerRepository } from "@/repositories/partner-repository";
export class MockPartnerRepository implements PartnerRepository { async getAll() { return structuredClone(PARTNERS); } async getById(id: string) { return structuredClone(PARTNERS.find((partner) => partner.id === id) ?? null); } }
