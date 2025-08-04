
import React from "react";
import { SignavioProcessManager } from "@/components/process-manager/SignavioProcessManager";
import { ReactFlowProvider } from '@xyflow/react';

export default function ProcessManager() {
  return (
    <ReactFlowProvider>
      <SignavioProcessManager />
    </ReactFlowProvider>
  );
}
