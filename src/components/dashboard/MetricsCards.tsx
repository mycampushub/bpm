
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  link: string;
  color: string;
}

export interface MetricsCardsProps {
  metrics: Metric[];
  onMetricClick: (link: string, label: string) => void;
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics, onMetricClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <Card 
            key={index} 
            className="hover:shadow-md transition-shadow cursor-pointer hover-scale"
            onClick={() => onMetricClick(metric.link, metric.label)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <IconComponent className={`h-5 w-5 ${metric.color} flex-shrink-0`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground truncate">{metric.label}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <Badge 
                      variant={metric.trend === "up" ? "default" : "secondary"} 
                      className="text-xs"
                    >
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
  );
};
