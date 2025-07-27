
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useVoice } from "@/contexts/VoiceContext";
import { useProcessMiningData } from "@/hooks/useProcessMiningData";
import { AlertTriangle, TrendingUp, Clock, Target } from "lucide-react";

export const ProcessPerformanceDashboard: React.FC = () => {
  const { speakText } = useVoice();
  const { bottlenecks } = useProcessMiningData();

  const handleBottleneckClick = (bottleneck: any) => {
    speakText(`Analyzing bottleneck: ${bottleneck.activity}. ${bottleneck.impact}`);
  };

  const performanceMetrics = [
    { label: "Avg Cycle Time", value: "24.5h", change: "-12%", trend: "down", icon: Clock },
    { label: "Process Efficiency", value: "78%", change: "+5%", trend: "up", icon: Target },
    { label: "Completion Rate", value: "94%", change: "+2%", trend: "up", icon: TrendingUp },
    { label: "Active Bottlenecks", value: bottlenecks.length.toString(), change: "-3", trend: "down", icon: AlertTriangle }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Performance Analysis</h3>
        <p className="text-muted-foreground">Monitor KPIs and identify process bottlenecks</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                    </div>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <Badge variant={metric.trend === "up" ? "default" : "secondary"}>
                    {metric.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottlenecks Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Identified Bottlenecks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bottlenecks.map((bottleneck) => (
              <div 
                key={bottleneck.id}
                className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50"
                onClick={() => handleBottleneckClick(bottleneck)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{bottleneck.activity}</h4>
                    <p className="text-sm text-muted-foreground">{bottleneck.impact}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      bottleneck.severity === "high" ? "destructive" :
                      bottleneck.severity === "medium" ? "default" : "secondary"
                    }>
                      {bottleneck.severity} severity
                    </Badge>
                    <Button variant="outline" size="sm">
                      Analyze
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Wait Time:</span> {bottleneck.waitTime}h
                  </div>
                  <div>
                    <span className="text-muted-foreground">Frequency:</span> {bottleneck.frequency}%
                  </div>
                </div>
                
                <Progress value={bottleneck.frequency} className="mt-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Performance trend chart will display here</p>
              <Button variant="outline" className="mt-2">
                Generate Chart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
