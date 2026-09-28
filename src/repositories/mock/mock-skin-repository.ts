import { SKIN_JOURNEY } from "@/data/mock/skin";
import type { SkinRepository } from "@/repositories/skin-repository";
export class MockSkinRepository implements SkinRepository { async getJourney() { return structuredClone(SKIN_JOURNEY); } }
