import type { Partner } from "@/domain/types";
export interface PartnerRepository { getAll(): Promise<Partner[]>; getById(id: string): Promise<Partner | null>; }
