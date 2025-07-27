
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { TransformationDashboard } from "@/components/transformation/TransformationDashboard";

export default function TransformationCockpit() {
  return (
    <MainLayout pageTitle="Transformation Cockpit">
      <TransformationDashboard />
    </MainLayout>
  );
}
