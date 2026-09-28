"use client";

import { useEffect, useState } from "react";
import type { Appointment, DemoUser, MembershipTier, Service } from "@/domain/types";
import { repositories } from "@/repositories";
import { useDemoStore } from "@/stores/demo-store";

type HomeData = {
  appointment: Appointment;
  services: Service[];
  user: DemoUser;
};

export function useHomeData(tier: MembershipTier) {
  const walletBalance = useDemoStore((state) => state.walletBalances[tier]);
  const cashPoints = useDemoStore((state) => state.cashPointBalances[tier]);
  const [data, setData] = useState<HomeData | null>(null);

  useEffect(() => {
    let active = true;

    Promise.all([
      repositories.users.getByTier(tier),
      repositories.home.getUpcomingAppointment(),
      repositories.services.getAll(),
    ]).then(([user, appointment, services]) => {
      if (active) setData({ user: { ...user, walletBalance, cashPoints }, appointment, services });
    });

    return () => {
      active = false;
    };
  }, [tier, walletBalance, cashPoints]);

  return data;
}
