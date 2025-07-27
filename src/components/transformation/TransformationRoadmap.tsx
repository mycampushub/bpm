
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Calendar, 
  Users, 
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Edit,
  BarChart3,
  Zap
} from "lucide-react";

interface Initiative {
  id: string;
  title: string;
  description: string;
  phase: "planning" | "in-progress" | "testing" | "completed" | "on-hold";
  priority: "low" | "medium" | "high" | "critical";
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  expectedROI: string;
  owner: string;
  team: string[];
  dependencies: string[];
  kpis: Array<{
    name: string;
    current: number;
    target: number;
    unit: string;
  }>;
}

export const TransformationRoadmap: React.FC = () => {
  const [initiatives, setInitiatives] = useState<Initiative[]>([
    {
      id: "1",
      title: "Procurement Process Automation",
      description: "Implement RPA solution for purchase order processing to reduce manual effort by 80%",
      phase: "in-progress",
      priority: "high",
      progress: 65,
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      budget: 250000,
      expectedROI: "300%",
      owner: "Sarah Chen",
      team: ["Mike Rodriguez", "Lisa Wang", "David Park"],
      dependencies: ["System Integration", "User Training"],
      kpis: [
        { name: "Processing Time", current: 45, target: 10, unit: "minutes" },
        { name: "Error Rate", current: 5, target: 1, unit: "%" },
        { name: "Cost per Transaction", current: 25, target: 5, unit: "$" }
      ]
    },
    {
      id: "2",
      title: "Customer Service Digital Transformation",
      description: "Deploy AI-powered chatbot and self-service portal to improve customer satisfaction",
      phase: "planning",
      priority: "medium",
      progress: 20,
      startDate: "2024-03-01",
      endDate: "2024-09-15",
      budget: 180000,
      expectedROI: "250%",
      owner: "Lisa Wang",
      team: ["Sarah Chen", "John Smith"],
      dependencies: ["Technology Evaluation", "Vendor Selection"],
      kpis: [
        { name: "Customer Satisfaction", current: 3.2, target: 4.5, unit: "/5" },
        { name: "First Call Resolution", current: 65, target: 85, unit: "%" },
        { name: "Support Cost", current: 15, target: 8, unit: "$/ticket" }
      ]
    },
    {
      id: "3",
      title: "Financial Reporting Modernization",
      description: "Modernize financial reporting with real-time dashboards and automated reconciliation",
      phase: "testing",
      priority: "high",
      progress: 85,
      startDate: "2023-10-01",
      endDate: "2024-02-28",
      budget: 320000,
      expectedROI: "400%",
      owner: "Mike Rodriguez",
      team: ["Sarah Chen", "Lisa Wang", "Finance Team"],
      dependencies: ["Data Migration", "User Acceptance Testing"],
      kpis: [
        { name: "Report Generation Time", current: 120, target: 15, unit: "minutes" },
        { name: "Data Accuracy", current: 92, target: 99, unit: "%" },
        { name: "Manual Effort", current: 40, target: 5, unit: "hours/week" }
      ]
    }
  ]);

  const [selectedPhase, setSelectedPhase] = useState("all");

  const getPhaseIcon = (phase: Initiative["phase"]) => {
    switch (phase) {
      case "planning": return <Calendar className="h-4 w-4 text-blue-500" />;
      case "in-progress": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "testing": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "on-hold": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPhaseBadge = (phase: Initiative["phase"]) => {
    const variants = {
      planning: "outline",
      "in-progress": "secondary",
      testing: "default",
      completed: "default",
      "on-hold": "destructive"
    } as const;
    
    return <Badge variant={variants[phase]}>{phase.replace("-", " ")}</Badge>;
  };

  const getPriorityBadge = (priority: Initiative["priority"]) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      critical: "bg-red-100 text-red-800"
    };
    
    return <Badge className={colors[priority]}>{priority}</Badge>;
  };

  const filteredInitiatives = selectedPhase === "all" 
    ? initiatives 
    : initiatives.filter(init => init.phase === selectedPhase);

  const phaseStats = {
    planning: initiatives.filter(i => i.phase === "planning").length,
    "in-progress": initiatives.filter(i => i.phase === "in-progress").length,
    testing: initiatives.filter(i => i.phase === "testing").length,
    completed: initiatives.filter(i => i.phase === "completed").length,
    "on-hold": initiatives.filter(i => i.phase === "on-hold").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6" />
            Transformation Roadmap
          </h2>
          <p className="text-muted-foreground">Track and manage digital transformation initiatives</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Initiative
        </Button>
      </div>

      {/* Phase Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <span className="font-medium">Filter by phase:</span>
            <div className="flex items-center gap-2">
              <Button 
                variant={selectedPhase === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPhase("all")}
              >
                All ({initiatives.length})
              </Button>
              {Object.entries(phaseStats).map(([phase, count]) => (
                <Button
                  key={phase}
                  variant={selectedPhase === phase ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPhase(phase)}
                  className="flex items-center gap-1"
                >
                  {getPhaseIcon(phase as Initiative["phase"])}
                  {phase.replace("-", " ")} ({count})
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Initiatives Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInitiatives.map((initiative) => (
          <Card key={initiative.id} className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{initiative.title}</CardTitle>
                    {getPhaseIcon(initiative.phase)}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {getPhaseBadge(initiative.phase)}
                    {getPriorityBadge(initiative.priority)}
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{initiative.description}</p>
              
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{initiative.progress}%</span>
                </div>
                <Progress value={initiative.progress} className="h-2" />
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium mb-1">Timeline</div>
                  <div className="text-muted-foreground">
                    {new Date(initiative.startDate).toLocaleDateString()} - {new Date(initiative.endDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">Budget</div>
                  <div className="text-muted-foreground">
                    ${initiative.budget.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">Owner</div>
                  <div className="text-muted-foreground">{initiative.owner}</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Expected ROI</div>
                  <div className="text-green-600 font-medium">{initiative.expectedROI}</div>
                </div>
              </div>

              {/* Team */}
              <div>
                <div className="font-medium mb-2 text-sm">Team Members</div>
                <div className="flex items-center gap-1 flex-wrap">
                  {initiative.team.map((member, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Users className="h-3 w-3 mr-1" />
                      {member}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* KPIs Preview */}
              <div>
                <div className="font-medium mb-2 text-sm">Key Metrics</div>
                <div className="space-y-2">
                  {initiative.kpis.slice(0, 2).map((kpi, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{kpi.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          {kpi.current}{kpi.unit}
                        </span>
                        <span>→</span>
                        <span className="font-medium text-green-600">
                          {kpi.target}{kpi.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dependencies */}
              {initiative.dependencies.length > 0 && (
                <div>
                  <div className="font-medium mb-2 text-sm">Dependencies</div>
                  <div className="flex flex-wrap gap-1">
                    {initiative.dependencies.map((dep, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {dep}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-3 w-3 mr-2" />
                  View Details
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Zap className="h-3 w-3 mr-2" />
                    Update Status
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${initiatives.reduce((sum, init) => sum + init.budget, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Across {initiatives.length} initiatives
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Expected ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">285%</div>
            <div className="text-sm text-muted-foreground mt-1">
              Average across all initiatives
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(initiatives.reduce((sum, init) => sum + init.progress, 0) / initiatives.length)}%
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Overall progress
            </div>
          </CardContent>
        </Card>
      </div>

      {filteredInitiatives.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No initiatives found</h3>
            <p className="text-muted-foreground mb-4">
              {selectedPhase === "all" 
                ? "Start by creating your first transformation initiative"
                : `No initiatives in ${selectedPhase.replace("-", " ")} phase`
              }
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Initiative
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
