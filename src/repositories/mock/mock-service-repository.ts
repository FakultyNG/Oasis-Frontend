import { SERVICES } from "@/data/mock/services";
import type { ServiceRepository } from "@/repositories/service-repository";

export class MockServiceRepository implements ServiceRepository {
  async getAll() { return structuredClone(SERVICES); }

  async getById(id: string) {
    const service = SERVICES.find((item) => item.id === id);
    return service ? structuredClone(service) : null;
  }
}
