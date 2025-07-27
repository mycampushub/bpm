
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { JourneyModelerDashboard } from "@/components/journey-modeler/JourneyModelerDashboard";

export default function JourneyModeler() {
  return (
    <MainLayout pageTitle="Journey Modeler">
      <JourneyModelerDashboard />
    </MainLayout>
  );
}
