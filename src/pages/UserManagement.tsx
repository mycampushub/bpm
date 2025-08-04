import { MainLayout } from "@/components/layout/main-layout";
import { FunctionalUserManagement } from "@/components/users/FunctionalUserManagement";

export default function UserManagement() {
  return (
    <MainLayout pageTitle="User Management">
      <FunctionalUserManagement />
    </MainLayout>
  );
}