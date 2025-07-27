
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { SignavioProcessManager } from "@/components/process-manager/SignavioProcessManager";
import { ReactFlowProvider } from '@xyflow/react';

export default function ProcessManager() {
  return (
    <MainLayout pageTitle="Process Manager" fullHeight={true} className="p-0">
      <ReactFlowProvider>
        <SignavioProcessManager />
      </ReactFlowProvider>
    </MainLayout>
  );
}
