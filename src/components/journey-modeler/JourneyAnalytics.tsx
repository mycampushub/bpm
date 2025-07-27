
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVoice } from "@/contexts/VoiceContext";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target,
  Clock,
  Heart,
  DollarSign,
  ArrowRight,
  AlertTriangle
} from "lucide-react";

export const JourneyAnalytics: React.FC = () => {
  const { speakText } = useVoice();
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [selectedJourney, setSelectedJourney] = useState("all");

  const overviewMetrics = [
    { 
      label: "Journey Completion Rate", 
      value: "72.5%", 
      change: "+5.2%", 
      trend: "up",
      icon: Target,
      description: "Percentage of customers completing the full journey"
    },
    { 
      label: "Average Journey Time", 
      value: "14.2 days", 
      change: "-2.1 days", 
      trend: "up",
      icon: Clock,
      description: "Average time from awareness to conversion"
    },
    { 
      label: "Customer Satisfaction", 
      value: "4.3/5", 
      change: "+0.2", 
      trend: "up",
      icon: Heart,
      description: "Overall satisfaction across all touchpoints"
    },
    { 
      label: "Revenue per Journey", 
      value: "$2,450", 
      change: "+$340", 
      trend: "up",
      icon: DollarSign,
      description: "Average revenue generated per completed journey"
    }
  ];

  const stagePerformance = [
    { stage: "Awareness", completion: 85, dropOff: 15, avgTime: "2.1 days", satisfaction: 3.8 },
    { stage: "Interest", completion: 68, dropOff: 32, avgTime: "3.4 days", satisfaction: 4.1 },
    { stage: "Consideration", completion: 52, dropOff: 48, avgTime: "5.2 days", satisfaction: 4.2 },
    { stage: "Purchase", completion: 73, dropOff: 27, avgTime: "1.8 days", satisfaction: 4.5 },
    { stage: "Onboarding", completion: 89, dropOff: 11, avgTime: "7.3 days", satisfaction: 3.9 },
    { stage: "Advocacy", completion: 34, dropOff: 66, avgTime: "12.1 days", satisfaction: 4.7 }
  ];

  const painPointAnalysis = [
    { 
      touchpoint: "Product Demo Scheduling", 
      severity: "high", 
      frequency: 342, 
      impact: "25% conversion drop",
      description: "Customers struggle with scheduling conflicts and technical setup"
    },
    { 
      touchpoint: "Pricing Page", 
      severity: "medium", 
      frequency: 189, 
      impact: "18% bounce rate",
      description: "Complex pricing structure causes confusion"
    },
    { 
      touchpoint: "Account Setup", 
      severity: "high", 
      frequency: 156, 
      impact: "31% abandonment",
      description: "Too many required fields and verification steps"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Journey Analytics dashboard. Monitor customer journey performance, identify drop-off points, and optimize touchpoint effectiveness to improve overall customer experience and conversion rates.")}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            Journey Analytics
          </h2>
          <p className="text-muted-foreground">Analyze customer journey performance and optimization opportunities</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={selectedJourney} onValueChange={setSelectedJourney}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select journey" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Journeys</SelectItem>
              <SelectItem value="b2b-sales">B2B Sales Journey</SelectItem>
              <SelectItem value="onboarding">Customer Onboarding</SelectItem>
              <SelectItem value="support">Support Journey</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="90d">90 days</SelectItem>
              <SelectItem value="1y">1 year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className="h-5 w-5 text-muted-foreground" />
                  <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                    {metric.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {metric.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stage Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Stage Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stagePerformance.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{stage.stage}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {stage.completion}% completion
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {stage.avgTime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${stage.completion}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{stage.completion}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Satisfaction: {stage.satisfaction}/5</span>
                    <span className="text-red-600">{stage.dropOff}% drop-off</span>
                  </div>
                  
                  {index < stagePerformance.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pain Point Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Critical Pain Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {painPointAnalysis.map((painPoint, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">{painPoint.touchpoint}</span>
                    </div>
                    <Badge variant={getSeverityColor(painPoint.severity)} className="text-xs">
                      {painPoint.severity}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {painPoint.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Frequency:</span>
                      <span className="font-medium ml-1">{painPoint.frequency} reports</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Impact:</span>
                      <span className="font-medium ml-1 text-red-600">{painPoint.impact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Journey Flow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Journey Flow & Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Total Visitors: 10,000</span>
              <span>Final Conversions: 340 (3.4%)</span>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-between">
                {stagePerformance.map((stage, index) => {
                  const visitors = Math.round(10000 * (stage.completion / 100) * Math.pow(0.8, index));
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="bg-primary rounded-lg flex items-center justify-center text-white text-xs font-medium mb-2"
                        style={{ 
                          width: `${Math.max(60, visitors / 50)}px`, 
                          height: `${Math.max(40, visitors / 100)}px` 
                        }}
                      >
                        {visitors.toLocaleString()}
                      </div>
                      <span className="text-xs font-medium">{stage.stage}</span>
                      <span className="text-xs text-muted-foreground">{stage.completion}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
