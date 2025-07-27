
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { ProcessMiningDashboard } from "@/components/process-mining/ProcessMiningDashboard";
import { ProcessMiningVoiceGuide } from "@/components/process-mining/ProcessMiningVoiceGuide";

export default function ProcessMining() {
  return (
    <MainLayout pageTitle="Process Mining">
      <ProcessMiningVoiceGuide />
      <ProcessMiningDashboard />
    </MainLayout>
  );
}
