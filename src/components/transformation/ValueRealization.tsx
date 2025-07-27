
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVoice } from "@/contexts/VoiceContext";
import { DollarSign, TrendingUp, Target, Award } from "lucide-react";

export const ValueRealization: React.FC = () => {
  const { speakText } = useVoice();

  const valueMetrics = [
    { title: "Total Value Delivered", amount: "$2.4M", target: "$3.2M", progress: 75 },
    { title: "Cost Savings", amount: "$890K", target: "$1.2M", progress: 74 },
    { title: "Revenue Impact", amount: "$1.5M", target: "$2.0M", progress: 75 },
    { title: "Efficiency Gains", amount: "23%", target: "30%", progress: 77 }
  ];

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Value Realization tracking. Monitor the business value and ROI delivered by your transformation initiatives.")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {valueMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">{metric.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{metric.amount}</p>
                  <p className="text-xs text-muted-foreground">Target: {metric.target}</p>
                </div>
                <div className="text-right">
                  <Badge variant="default" className="text-xs">
                    {metric.progress}%
                  </Badge>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${metric.progress}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Value Stream Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Customer Onboarding Optimization", "Order Processing Automation", "Support Ticket Resolution"].map((stream, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded">
                  <span className="font-medium">{stream}</span>
                  <Badge variant="outline">${Math.floor(Math.random() * 500 + 100)}K</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Key Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Process Cycle Time Reduction", value: "45% improvement" },
                { title: "Customer Satisfaction Score", value: "+12 points" },
                { title: "Cost per Transaction", value: "32% reduction" }
              ].map((achievement, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded">
                  <span className="font-medium">{achievement.title}</span>
                  <Badge variant="default">{achievement.value}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
