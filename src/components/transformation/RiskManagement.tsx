
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { RiskDetailsDialog } from "./RiskDetailsDialog";
import { 
  AlertTriangle, 
  TrendingUp, 
  Shield,
  Eye,
  Plus,
  Filter,
  Download
} from "lucide-react";

interface Risk {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  probability: number;
  impact: string;
  mitigation: string;
  owner: string;
  status: "open" | "mitigated" | "closed";
  dueDate: string;
  affectedInitiatives: string[];
}

export const RiskManagement: React.FC = () => {
  const { speakText } = useVoice();
  const { toast } = useToast();
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
  const [isRiskDetailsOpen, setIsRiskDetailsOpen] = useState(false);

  const [risks] = useState<Risk[]>([
    {
      id: "risk-001",
      title: "Budget Overrun Risk",
      description: "Potential for project costs to exceed allocated budget due to scope creep and resource constraints.",
      severity: "high",
      probability: 75,
      impact: "Could result in $200K+ budget overrun, project delays, and reduced ROI. May affect multiple transformation initiatives.",
      mitigation: "Implement strict change control processes, weekly budget reviews, and contingency planning. Establish clear scope boundaries and stakeholder approval processes.",
      owner: "Sarah Chen",
      status: "open",
      dueDate: "2024-06-15",
      affectedInitiatives: ["Customer Experience Transformation", "Process Automation Suite"]
    },
    {
      id: "risk-002",
      title: "Resource Availability",
      description: "Key technical resources may not be available during critical project phases.",
      severity: "medium",
      probability: 60,
      impact: "Potential 2-3 week delays, increased dependency on external contractors, higher costs.",
      mitigation: "Cross-train team members, establish backup resource pool, engage contractors early for critical skills.",
      owner: "Mike Rodriguez",
      status: "mitigated",
      dueDate: "2024-05-30",
      affectedInitiatives: ["Data Analytics Platform"]
    },
    {
      id: "risk-003",
      title: "Technology Integration",
      description: "Legacy system integration challenges may impact project timeline and functionality.",
      severity: "medium",
      probability: 45,
      impact: "Integration delays, potential data migration issues, reduced system performance.",
      mitigation: "Conduct thorough technical assessment, implement phased integration approach, establish fallback procedures.",
      owner: "Lisa Wang",
      status: "open",
      dueDate: "2024-07-01",
      affectedInitiatives: ["Customer Experience Transformation", "Data Analytics Platform"]
    }
  ]);

  const riskMetrics = [
    {
      label: "High Risk Items",
      value: risks.filter(r => r.severity === "high").length.toString(),
      total: risks.length,
      icon: AlertTriangle,
      color: "text-red-500"
    },
    {
      label: "Open Risks",
      value: risks.filter(r => r.status === "open").length.toString(),
      total: risks.length,
      icon: Shield,
      color: "text-orange-500"
    },
    {
      label: "Average Probability",
      value: `${Math.round(risks.reduce((acc, r) => acc + r.probability, 0) / risks.length)}%`,
      total: 100,
      icon: TrendingUp,
      color: "text-blue-500"
    }
  ];

  const handleViewRisk = (risk: Risk) => {
    setSelectedRisk(risk);
    setIsRiskDetailsOpen(true);
    speakText(`Viewing details for ${risk.title}. This is a ${risk.severity} severity risk with ${risk.probability}% probability.`);
  };

  const handleAddRisk = () => {
    toast({
      title: "Add New Risk",
      description: "Risk creation dialog would open here."
    });
    speakText("Opening risk creation form.");
  };

  const handleExportRisks = () => {
    const dataToExport = {
      risks,
      exportDate: new Date().toISOString(),
      totalRisks: risks.length
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'risk-register.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Risks Exported",
      description: "Risk register has been downloaded successfully."
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-100 text-red-800";
      case "mitigated": return "bg-yellow-100 text-yellow-800";
      case "closed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Risk Management Dashboard. Monitor and mitigate transformation risks. Track risk severity, probability, and mitigation strategies across all initiatives.")}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Risk Management</h2>
          <p className="text-muted-foreground">Monitor and mitigate transformation risks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportRisks}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddRisk}>
            <Plus className="h-4 w-4 mr-2" />
            Add Risk
          </Button>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {riskMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <IconComponent className={`h-8 w-8 ${metric.color}`} />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Risk Register */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Risk Register</CardTitle>
              <CardDescription>Active risks across transformation initiatives</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {risks.map((risk) => (
              <div key={risk.id} className="border rounded-lg p-4 hover:bg-muted/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{risk.title}</h3>
                      <Badge className={getSeverityColor(risk.severity)}>
                        {risk.severity.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(risk.status)}>
                        {risk.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{risk.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Probability</div>
                        <div className="flex items-center gap-2">
                          <Progress value={risk.probability} className="flex-1" />
                          <span className="text-sm font-medium">{risk.probability}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Owner</div>
                        <div className="font-medium">{risk.owner}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Due Date</div>
                        <div className="font-medium">{new Date(risk.dueDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Affected Initiatives</div>
                      <div className="flex flex-wrap gap-1">
                        {risk.affectedInitiatives.map((initiative, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {initiative}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleViewRisk(risk)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <RiskDetailsDialog 
        risk={selectedRisk}
        open={isRiskDetailsOpen}
        onOpenChange={setIsRiskDetailsOpen}
      />
    </div>
  );
};
