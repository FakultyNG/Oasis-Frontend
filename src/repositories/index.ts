import { MockUserRepository } from "@/repositories/mock/mock-user-repository";
import { MockHomeRepository } from "@/repositories/mock/mock-home-repository";
import { MockServiceRepository } from "@/repositories/mock/mock-service-repository";
import { MockPartnerRepository } from "@/repositories/mock/mock-partner-repository";
import { MockSkinRepository } from "@/repositories/mock/mock-skin-repository";
import { MockAccountRepository } from "@/repositories/mock/mock-account-repository";

export const repositories = {
  home: new MockHomeRepository(),
  services: new MockServiceRepository(),
  users: new MockUserRepository(),
  partners: new MockPartnerRepository(),
  skin: new MockSkinRepository(),
  account: new MockAccountRepository(),
};
