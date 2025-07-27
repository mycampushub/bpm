
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useVoice } from "@/contexts/VoiceContext";
import { Users, Calendar, DollarSign, Briefcase } from "lucide-react";

export const ResourcePlanning: React.FC = () => {
  const { speakText } = useVoice();

  const resourceMetrics = [
    { title: "Total Budget", value: "$5.2M", utilized: "$3.8M", percentage: 73 },
    { title: "Team Members", value: "124", allocated: "98", percentage: 79 },
    { title: "Project Duration", value: "18 months", elapsed: "13 months", percentage: 72 },
    { title: "Vendor Resources", value: "8", active: "6", percentage: 75 }
  ];

  const initiatives = [
    {
      name: "Digital Customer Platform",
      budget: "$1.8M",
      spent: "$1.2M",
      team: 25,
      progress: 67,
      status: "On Track"
    },
    {
      name: "Process Automation Suite", 
      budget: "$950K",
      spent: "$720K",
      team: 18,
      progress: 76,
      status: "On Track"
    },
    {
      name: "Data Analytics Implementation",
      budget: "$1.1M", 
      spent: "$580K",
      team: 22,
      progress: 53,
      status: "At Risk"
    }
  ];

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Resource Planning dashboard. Monitor budget allocation, team capacity, and resource utilization across transformation initiatives.")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resourceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">{metric.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">{metric.value}</span>
                  <Badge variant="outline" className="text-xs">{metric.percentage}%</Badge>
                </div>
                <Progress value={metric.percentage} />
                <p className="text-xs text-muted-foreground">
                  {metric.title === "Total Budget" ? `Spent: ${metric.utilized}` :
                   metric.title === "Team Members" ? `Allocated: ${metric.allocated}` :
                   metric.title === "Project Duration" ? `Elapsed: ${metric.elapsed}` :
                   `Active: ${metric.active}`}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Initiative Resource Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {initiatives.map((initiative, index) => (
                <div key={index} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{initiative.name}</h4>
                    <Badge variant={initiative.status === "On Track" ? "default" : "destructive"}>
                      {initiative.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Budget:</span>
                      <p className="font-medium">{initiative.budget} (spent: {initiative.spent})</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Team Size:</span>
                      <p className="font-medium">{initiative.team} members</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{initiative.progress}%</span>
                    </div>
                    <Progress value={initiative.progress} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Capacity Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { role: "Project Managers", available: 8, allocated: 6, utilization: 75 },
                { role: "Business Analysts", available: 15, allocated: 12, utilization: 80 },
                { role: "Developers", available: 35, allocated: 28, utilization: 80 },
                { role: "UX Designers", available: 6, allocated: 4, utilization: 67 }
              ].map((capacity, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{capacity.role}</span>
                    <span className="text-sm text-muted-foreground">
                      {capacity.allocated}/{capacity.available} allocated
                    </span>
                  </div>
                  <Progress value={capacity.utilization} />
                  <p className="text-xs text-muted-foreground">{capacity.utilization}% utilization</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
