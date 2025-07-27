
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import {
  AlertTriangle,
  Clock,
  TrendingDown,
  Zap,
  Eye,
  Settings,
  Download
} from "lucide-react";

interface Bottleneck {
  id: string;
  processName: string;
  activityName: string;
  averageWaitTime: number;
  impactScore: number;
  frequency: number;
  severity: "critical" | "high" | "medium" | "low";
  recommendation: string;
  potentialSavings: string;
}

export const ProcessBottlenecksAnalysis: React.FC = () => {
  const { speakText } = useVoice();
  const { toast } = useToast();

  const [bottlenecks] = useState<Bottleneck[]>([
    {
      id: "btn-001",
      processName: "Order-to-Cash",
      activityName: "Credit Approval",
      averageWaitTime: 4.2,
      impactScore: 85,
      frequency: 156,
      severity: "critical",
      recommendation: "Implement automated credit scoring system and parallel approval workflows",
      potentialSavings: "$45,000/month"
    },
    {
      id: "btn-002",
      processName: "Customer Support",
      activityName: "Ticket Assignment",
      averageWaitTime: 2.1,
      impactScore: 72,
      frequency: 289,
      severity: "high",
      recommendation: "Deploy AI-powered ticket routing based on complexity and expertise",
      potentialSavings: "$28,000/month"
    },
    {
      id: "btn-003",
      processName: "Invoice Processing",
      activityName: "Document Verification",
      averageWaitTime: 3.8,
      impactScore: 68,
      frequency: 203,
      severity: "high",
      recommendation: "Implement OCR and automated document validation",
      potentialSavings: "$32,000/month"
    },
    {
      id: "btn-004",
      processName: "Employee Onboarding",
      activityName: "System Access Setup",
      averageWaitTime: 1.5,
      impactScore: 45,
      frequency: 67,
      severity: "medium",
      recommendation: "Create self-service portal with automated provisioning",
      potentialSavings: "$12,000/month"
    }
  ]);

  const bottleneckMetrics = [
    {
      label: "Critical Bottlenecks",
      value: bottlenecks.filter(b => b.severity === "critical").length.toString(),
      change: "+2",
      icon: AlertTriangle,
      color: "text-red-500"
    },
    {
      label: "Avg Wait Time",
      value: `${(bottlenecks.reduce((acc, b) => acc + b.averageWaitTime, 0) / bottlenecks.length).toFixed(1)}h`,
      change: "-12%",
      icon: Clock,
      color: "text-orange-500"
    },
    {
      label: "Total Impact Score",
      value: bottlenecks.reduce((acc, b) => acc + b.impactScore, 0).toString(),
      change: "+8%",
      icon: TrendingDown,
      color: "text-blue-500"
    },
    {
      label: "Optimization Potential",
      value: "$117K/mo",
      change: "+15%",
      icon: Zap,
      color: "text-green-500"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleOptimize = (bottleneck: Bottleneck) => {
    toast({
      title: "Optimization Started",
      description: `Implementing optimization for ${bottleneck.activityName} in ${bottleneck.processName}`
    });
    speakText(`Starting optimization for ${bottleneck.activityName}. Estimated savings: ${bottleneck.potentialSavings}.`);
  };

  const handleViewDetails = (bottleneck: Bottleneck) => {
    toast({
      title: "Bottleneck Analysis",
      description: `Viewing detailed analysis for ${bottleneck.activityName}`
    });
    speakText(`Analyzing ${bottleneck.activityName} bottleneck. Average wait time: ${bottleneck.averageWaitTime} hours. Impact score: ${bottleneck.impactScore}.`);
  };

  const handleExportAnalysis = () => {
    const dataToExport = {
      bottlenecks,
      exportDate: new Date().toISOString(),
      totalBottlenecks: bottlenecks.length,
      totalPotentialSavings: bottlenecks.reduce((acc, b) => acc + parseInt(b.potentialSavings.replace(/[^\d]/g, '')), 0)
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bottleneck-analysis.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Analysis Exported",
      description: "Bottleneck analysis has been downloaded successfully."
    });
  };

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Process Bottleneck Analysis. Identify and resolve process inefficiencies. Track wait times, impact scores, and optimization opportunities across all business processes.")}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Process Bottlenecks</h2>
          <p className="text-muted-foreground">Identify and resolve process inefficiencies</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportAnalysis}>
            <Download className="h-4 w-4 mr-2" />
            Export Analysis
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {bottleneckMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <IconComponent className={`h-6 w-6 ${metric.color}`} />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold">{metric.value}</p>
                      <Badge variant="outline" className="text-xs">
                        {metric.change}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottlenecks List */}
      <Card>
        <CardHeader>
          <CardTitle>Identified Bottlenecks</CardTitle>
          <CardDescription>Process activities causing delays and inefficiencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bottlenecks.map((bottleneck) => (
              <div key={bottleneck.id} className="border rounded-lg p-4 hover:bg-muted/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{bottleneck.processName}</h3>
                      <Badge className={getSeverityColor(bottleneck.severity)}>
                        {bottleneck.severity.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      Activity: <span className="font-medium">{bottleneck.activityName}</span>
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Wait Time</div>
                        <div className="font-medium">{bottleneck.averageWaitTime}h avg</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Impact Score</div>
                        <div className="flex items-center gap-2">
                          <Progress value={bottleneck.impactScore} className="flex-1" />
                          <span className="text-sm font-medium">{bottleneck.impactScore}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Frequency</div>
                        <div className="font-medium">{bottleneck.frequency}/month</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Potential Savings</div>
                        <div className="font-medium text-green-600">{bottleneck.potentialSavings}</div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-sm text-muted-foreground mb-1">Recommendation</div>
                      <p className="text-sm">{bottleneck.recommendation}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(bottleneck)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                    <Button size="sm" onClick={() => handleOptimize(bottleneck)}>
                      <Zap className="h-4 w-4 mr-2" />
                      Optimize
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
