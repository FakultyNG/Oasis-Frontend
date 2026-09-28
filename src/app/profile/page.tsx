import { AppShell } from "@/components/layout/app-shell";
import { ProfileDashboard } from "@/components/profile/profile-dashboard";
import { repositories } from "@/repositories";

export default async function ProfilePage() {
  const [regular, gold, black, history, notifications] = await Promise.all([
    repositories.users.getByTier("regular"), repositories.users.getByTier("gold"), repositories.users.getByTier("black"),
    repositories.account.getTreatmentHistory(), repositories.account.getNotifications(),
  ]);
  return <AppShell><ProfileDashboard users={{ regular, gold, black }} treatmentCount={history.length} notificationCount={notifications.length} /></AppShell>;
}
