
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { FunctionalReports } from "@/components/reports/FunctionalReports";

export default function Reports() {
  return (
    <MainLayout pageTitle="Reports & Analytics">
      <FunctionalReports />
    </MainLayout>
  );
}
