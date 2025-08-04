
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { FunctionalJourneyModeler } from "@/components/journey-modeler/FunctionalJourneyModeler";

export default function JourneyModeler() {
  return (
    <MainLayout pageTitle="Journey Modeler">
      <FunctionalJourneyModeler />
    </MainLayout>
  );
}
