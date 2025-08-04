
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { FunctionalTransformation } from "@/components/transformation/FunctionalTransformation";

export default function TransformationCockpit() {
  return (
    <MainLayout pageTitle="Transformation Cockpit">
      <FunctionalTransformation />
    </MainLayout>
  );
}
