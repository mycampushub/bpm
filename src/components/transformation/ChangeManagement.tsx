
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useVoice } from "@/contexts/VoiceContext";
import { Users, BookOpen, MessageSquare, TrendingUp } from "lucide-react";

export const ChangeManagement: React.FC = () => {
  const { speakText } = useVoice();

  const changeMetrics = [
    { title: "Training Completion", value: 85, target: 95 },
    { title: "User Adoption Rate", value: 73, target: 80 },
    { title: "Satisfaction Score", value: 4.2, target: 4.5 },
    { title: "Support Tickets", value: 23, target: 15 }
  ];

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Change Management dashboard. Track user adoption, training progress, and organizational readiness for transformation initiatives.")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {changeMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">{metric.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">
                    {metric.title.includes("Score") ? metric.value : `${metric.value}${metric.title.includes("Tickets") ? "" : "%"}`}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    Target: {metric.target}{metric.title.includes("Score") ? "" : metric.title.includes("Tickets") ? "" : "%"}
                  </Badge>
                </div>
                <Progress value={metric.title.includes("Tickets") ? 100 - (metric.value / metric.target * 100) : (metric.value / metric.target * 100)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Training Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Digital Process Training", completed: 120, total: 150, status: "In Progress" },
                { name: "New System Onboarding", completed: 85, total: 100, status: "Completed" },
                { name: "Change Leadership Workshop", completed: 45, total: 60, status: "Active" }
              ].map((program, i) => (
                <div key={i} className="space-y-2 p-3 border rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{program.name}</span>
                    <Badge variant={program.status === "Completed" ? "default" : "secondary"}>
                      {program.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{program.completed}/{program.total} participants</span>
                    <span>{Math.round((program.completed / program.total) * 100)}%</span>
                  </div>
                  <Progress value={(program.completed / program.total) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Communication & Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Town Hall Sessions", count: 8, engagement: "92%" },
                { type: "Feedback Surveys", count: 234, engagement: "78%" },
                { type: "Change Champion Network", count: 25, engagement: "95%" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <span className="font-medium">{item.type}</span>
                    <p className="text-sm text-muted-foreground">{item.count} activities</p>
                  </div>
                  <Badge variant="outline">{item.engagement} engagement</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
