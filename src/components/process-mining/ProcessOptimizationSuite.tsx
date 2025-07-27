
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVoice } from "@/contexts/VoiceContext";
import { Lightbulb, Zap, TrendingUp, CheckCircle } from "lucide-react";

export const ProcessOptimizationSuite: React.FC = () => {
  const { speakText } = useVoice();

  const optimizationRecommendations = [
    {
      id: "1",
      title: "Parallelize Finance Check",
      description: "Run finance check parallel with manager review to reduce cycle time by 35%",
      impact: "High",
      effort: "Medium",
      savings: "4.2 hours",
      status: "recommended"
    },
    {
      id: "2",
      title: "Automate Data Entry",
      description: "Implement RPA for purchase order data entry to eliminate manual errors",
      impact: "Medium",
      effort: "High", 
      savings: "2.1 hours",
      status: "in-progress"
    },
    {
      id: "3",
      title: "Simplify Approval Workflow",
      description: "Combine director and manager approval for orders under $10K",
      impact: "High",
      effort: "Low",
      savings: "6.5 hours",
      status: "implemented"
    }
  ];

  const handleImplement = (recommendationId: string) => {
    const rec = optimizationRecommendations.find(r => r.id === recommendationId);
    if (rec) {
      speakText(`Implementing optimization: ${rec.title}. This could save approximately ${rec.savings} per process instance.`);
    }
  };

  const handleSimulate = (recommendationId: string) => {
    const rec = optimizationRecommendations.find(r => r.id === recommendationId);
    if (rec) {
      speakText(`Simulating optimization: ${rec.title}. This will show the projected impact on your process performance.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Process Optimization</h3>
          <p className="text-muted-foreground">AI-powered recommendations for process improvements</p>
        </div>
        <Button>
          <Lightbulb className="h-4 w-4 mr-2" />
          Generate New Recommendations
        </Button>
      </div>

      {/* Optimization Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <p className="text-sm text-muted-foreground">Potential Time Savings</p>
            </div>
            <p className="text-2xl font-bold">12.8h</p>
            <p className="text-xs text-muted-foreground">per process instance</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">Efficiency Gain</p>
            </div>
            <p className="text-2xl font-bold">+42%</p>
            <p className="text-xs text-muted-foreground">process throughput</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-purple-500" />
              <p className="text-sm text-muted-foreground">Recommendations</p>
            </div>
            <p className="text-2xl font-bold">{optimizationRecommendations.length}</p>
            <p className="text-xs text-muted-foreground">ready to implement</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Optimization Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {optimizationRecommendations.map((rec) => (
              <div key={rec.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Impact:</span>
                        <Badge variant="outline" className="ml-1">
                          {rec.impact}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Effort:</span>
                        <Badge variant="outline" className="ml-1">
                          {rec.effort}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Savings:</span>
                        <span className="font-medium ml-1">{rec.savings}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Badge variant={
                      rec.status === "implemented" ? "default" :
                      rec.status === "in-progress" ? "secondary" : "outline"
                    }>
                      {rec.status}
                    </Badge>
                    
                    {rec.status === "recommended" && (
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSimulate(rec.id)}
                        >
                          Simulate
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleImplement(rec.id)}
                        >
                          Implement
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded border">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <p className="font-medium">Phase 1: Quick Wins</p>
                <p className="text-sm text-muted-foreground">Low effort, high impact optimizations</p>
              </div>
              <Badge variant="default">Completed</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded border">
              <Zap className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <p className="font-medium">Phase 2: Process Automation</p>
                <p className="text-sm text-muted-foreground">Implement RPA and workflow automation</p>
              </div>
              <Badge variant="secondary">In Progress</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border">
              <TrendingUp className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="font-medium">Phase 3: Advanced Analytics</p>
                <p className="text-sm text-muted-foreground">Predictive analytics and AI optimization</p>
              </div>
              <Badge variant="outline">Planned</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
