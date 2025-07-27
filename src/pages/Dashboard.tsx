
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export default function Dashboard() {
  return (
    <MainLayout pageTitle="Dashboard">
      <DashboardContent />
    </MainLayout>
  );
}
