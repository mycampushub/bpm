
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { ReportsDashboard } from "@/components/reports/ReportsDashboard";

export default function Reports() {
  return (
    <MainLayout pageTitle="Reports & Analytics">
      <ReportsDashboard />
    </MainLayout>
  );
}
