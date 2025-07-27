
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { PerformanceAnalysisCard } from "@/components/process-intelligence/PerformanceAnalysis";
import { EventLogAnalysisCard } from "@/components/process-intelligence/EventLogAnalysis";
import { ProcessDiscovery } from "@/components/process-intelligence/ProcessDiscovery";
import { RootCauseAnalysisCard, ConformanceCheckingCard } from "@/components/process-intelligence/AnalysisCards";

export default function ProcessIntelligence() {
  return (
    <MainLayout pageTitle="Process Intelligence">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <PerformanceAnalysisCard />
        </div>

        <div>
          <EventLogAnalysisCard />
        </div>
      </div>

      <div className="mt-6">
        <ProcessDiscovery />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RootCauseAnalysisCard />
        <ConformanceCheckingCard />
      </div>
    </MainLayout>
  );
}
