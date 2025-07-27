
import { useState, useEffect } from "react";

export interface EventLog {
  id: string;
  name: string;
  uploadDate: string;
  status: "uploading" | "processing" | "ready" | "error";
  size: string;
  activities: number;
  variants: number;
  cases: number;
}

export interface ProcessCase {
  id: string;
  caseId: string;
  startTime: string;
  endTime: string;
  duration: number;
  activities: number;
  variant: string;
  status: "completed" | "active" | "cancelled";
}

export interface ProcessVariant {
  id: string;
  name: string;
  frequency: number;
  avgDuration: number;
  activities: string[];
}

export interface Bottleneck {
  id: string;
  activity: string;
  waitTime: number;
  frequency: number;
  severity: "low" | "medium" | "high";
  impact: string;
}

export const useProcessMiningData = () => {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([
    {
      id: "1",
      name: "Purchase_Order_Log.csv",
      uploadDate: "2024-01-15T10:30:00Z",
      status: "ready",
      size: "2.3 MB",
      activities: 8,
      variants: 4,
      cases: 1250
    },
    {
      id: "2", 
      name: "Invoice_Processing.xes",
      uploadDate: "2024-01-14T14:20:00Z",
      status: "ready",
      size: "1.8 MB",
      activities: 6,
      variants: 3,
      cases: 890
    }
  ]);

  const [processCases, setProcessCases] = useState<ProcessCase[]>([
    {
      id: "1",
      caseId: "PO-2024-001",
      startTime: "2024-01-15T09:00:00Z",
      endTime: "2024-01-15T17:30:00Z",
      duration: 8.5,
      activities: 8,
      variant: "Standard Approval",
      status: "completed"
    },
    {
      id: "2",
      caseId: "PO-2024-002",
      startTime: "2024-01-15T10:15:00Z",
      endTime: "2024-01-16T12:45:00Z",
      duration: 26.5,
      activities: 10,
      variant: "Manager Approval",
      status: "completed"
    }
  ]);

  const [variants, setVariants] = useState<ProcessVariant[]>([
    {
      id: "1",
      name: "Standard Approval",
      frequency: 65,
      avgDuration: 8.2,
      activities: ["Create PO", "Manager Review", "Finance Check", "Approve", "Send to Vendor"]
    },
    {
      id: "2",
      name: "Manager Approval",
      frequency: 25,
      avgDuration: 24.8,
      activities: ["Create PO", "Manager Review", "Director Review", "Finance Check", "Approve", "Send to Vendor"]
    }
  ]);

  const [bottlenecks, setBottlenecks] = useState<Bottleneck[]>([
    {
      id: "1",
      activity: "Finance Check",
      waitTime: 4.2,
      frequency: 85,
      severity: "high",
      impact: "Delays 85% of purchase orders by average 4.2 hours"
    },
    {
      id: "2",
      activity: "Manager Review",
      waitTime: 2.1,
      frequency: 45,
      severity: "medium", 
      impact: "Creates bottleneck during peak periods"
    }
  ]);

  const uploadEventLog = (file: File) => {
    const newLog: EventLog = {
      id: Date.now().toString(),
      name: file.name,
      uploadDate: new Date().toISOString(),
      status: "uploading",
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      activities: 0,
      variants: 0,
      cases: 0
    };

    setEventLogs(prev => [newLog, ...prev]);

    // Simulate real upload process
    setTimeout(() => {
      setEventLogs(prev => prev.map(log => 
        log.id === newLog.id 
          ? { ...log, status: "processing" as const }
          : log
      ));
    }, 1000);

    setTimeout(() => {
      setEventLogs(prev => prev.map(log => 
        log.id === newLog.id 
          ? { 
              ...log, 
              status: "ready" as const,
              activities: Math.floor(Math.random() * 15) + 5,
              variants: Math.floor(Math.random() * 8) + 2,
              cases: Math.floor(Math.random() * 2000) + 500
            }
          : log
      ));
    }, 3000);

    return newLog.id;
  };

  const runAnalysis = (logId: string) => {
    console.log(`Running analysis on log ${logId}`);
    
    // Simulate analysis by adding new cases and variants
    const newCases = Array.from({ length: 3 }, (_, i) => ({
      id: `case-${Date.now()}-${i}`,
      caseId: `CASE-${Date.now()}-${i}`,
      startTime: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      endTime: new Date().toISOString(),
      duration: Math.random() * 48,
      activities: Math.floor(Math.random() * 10) + 3,
      variant: Math.random() > 0.5 ? "Standard Approval" : "Manager Approval",
      status: "completed" as const
    }));

    setProcessCases(prev => [...newCases, ...prev]);
  };

  const exportData = (format: string, filename: string) => {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const fullFilename = `${filename}-${timestamp}.${format}`;
    
    // Simulate file creation
    const data = {
      eventLogs,
      processCases,
      variants,
      bottlenecks,
      exportedAt: new Date().toISOString()
    };

    console.log(`Exporting data as ${fullFilename}:`, data);
    return fullFilename;
  };

  return {
    eventLogs,
    processCases,
    variants,
    bottlenecks,
    uploadEventLog,
    runAnalysis,
    exportData
  };
};
