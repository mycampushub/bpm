
import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface ProcessModel {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
}

export interface DashboardMetrics {
  totalProcesses: number;
  compliance: number;
  processingTime: number;
  deviations: number;
}

export const useDashboardState = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalProcesses: 184,
    compliance: 92,
    processingTime: 4.2,
    deviations: 24
  });

  const [activeTab, setActiveTab] = useState<string>("performance");
  const [showTeamInviteModal, setShowTeamInviteModal] = useState<boolean>(false);

  const handleCreateProcess = useCallback(() => {
    toast({
      title: "Creating new process model",
      description: "You'll be redirected to the process editor",
    });
    // In a real app, this would navigate to the process editor
    setTimeout(() => {
      window.location.href = "/process-manager";
    }, 1500);
  }, [toast]);

  const handleSearchRepository = useCallback(() => {
    toast({
      title: "Opening repository search",
      description: "Redirecting to repository",
    });
    setTimeout(() => {
      window.location.href = "/repository";
    }, 1500);
  }, [toast]);

  const handleInviteTeam = useCallback(() => {
    setShowTeamInviteModal(true);
    toast({
      title: "Team invitation",
      description: "Opening team invitation dialog",
    });
  }, [toast]);

  const closeTeamInviteModal = useCallback(() => {
    setShowTeamInviteModal(false);
  }, []);

  const updateMetrics = useCallback((newMetrics: Partial<DashboardMetrics>) => {
    setMetrics(prev => ({
      ...prev,
      ...newMetrics
    }));
    
    toast({
      title: "Metrics updated",
      description: "Dashboard metrics have been refreshed",
    });
  }, [toast]);

  const refreshData = useCallback(() => {
    // Simulate a data refresh with slightly changed metrics
    const randomChange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    updateMetrics({
      totalProcesses: metrics.totalProcesses + randomChange(-5, 5),
      compliance: Math.min(100, Math.max(0, metrics.compliance + randomChange(-3, 3))),
      processingTime: Number((metrics.processingTime + randomChange(-1, 1) * 0.1).toFixed(1)),
      deviations: metrics.deviations + randomChange(-3, 3)
    });
  }, [metrics, updateMetrics]);

  return {
    metrics,
    activeTab,
    setActiveTab,
    handleCreateProcess,
    handleSearchRepository,
    handleInviteTeam,
    showTeamInviteModal,
    closeTeamInviteModal,
    refreshData,
    updateMetrics
  };
};
