
import React from "react";

interface ProcessMetricCardProps {
  title: string;
  value: string;
  change: string;
  changeDirection: "up" | "down";
  icon: React.ReactNode;
}

export const ProcessMetricCard: React.FC<ProcessMetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeDirection, 
  icon 
}) => {
  return (
    <div className="bg-muted/40 rounded-lg p-3 min-w-[130px]">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{title}</span>
        {icon}
      </div>
      <div className="mt-2 flex items-baseline">
        <span className="text-2xl font-semibold">{value}</span>
        <span className={`ml-2 text-xs ${
          changeDirection === "up" ? "text-status-success" : "text-status-danger"
        }`}>
          {change}
        </span>
      </div>
    </div>
  );
};

export const ProcessMetricsCards: React.FC = () => {
  const metrics = [
    {
      title: "Avg. Cycle Time",
      value: "3.2 days",
      change: "-12%",
      changeDirection: "down" as const,
      icon: <Clock className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "Process Variants",
      value: "27",
      change: "+5",
      changeDirection: "up" as const,
      icon: <Sliders className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "Automation Rate",
      value: "68%",
      change: "+7%",
      changeDirection: "up" as const,
      icon: <Laptop className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "Bottlenecks",
      value: "3",
      change: "-2",
      changeDirection: "down" as const,
      icon: <Timer className="h-4 w-4 text-muted-foreground" />
    }
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-between">
      {metrics.map((metric, index) => (
        <ProcessMetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          changeDirection={metric.changeDirection}
          icon={metric.icon}
        />
      ))}
    </div>
  );
};

// Import icon component here to prevent circular dependency
import { Clock, Sliders, Laptop, Timer } from "lucide-react";
