
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { UserManagement } from "@/components/users/UserManagement";

export default function Users() {
  return (
    <MainLayout pageTitle="User Management">
      <UserManagement />
    </MainLayout>
  );
}
