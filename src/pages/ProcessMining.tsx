
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { FunctionalProcessMining } from "@/components/process-mining/FunctionalProcessMining";
import { ProcessMiningVoiceGuide } from "@/components/process-mining/ProcessMiningVoiceGuide";

export default function ProcessMining() {
  return (
    <MainLayout pageTitle="Process Mining">
      <ProcessMiningVoiceGuide />
      <FunctionalProcessMining />
    </MainLayout>
  );
}
