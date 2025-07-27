
import React from "react";

// Factor Item Component for Root Cause Analysis
export interface FactorItemProps {
  factor: string;
  impact: "High" | "Medium" | "Low";
  frequency: string;
}

export const FactorItem: React.FC<FactorItemProps> = ({ factor, impact, frequency }) => {
  const impactColors = {
    High: "bg-status-danger/20 text-status-danger",
    Medium: "bg-status-warning/20 text-status-warning",
    Low: "bg-status-success/20 text-status-success",
  };
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`px-2 py-0.5 rounded text-xs ${impactColors[impact]}`}>
          {impact}
        </div>
        <span className="text-sm">{factor}</span>
      </div>
      <span className="text-sm font-medium">{frequency}</span>
    </div>
  );
};

// Conformance Item Component for Process Conformance
export interface ConformanceItemProps {
  label: string;
  value: number;
  description: string;
}

export const ConformanceItem: React.FC<ConformanceItemProps> = ({ label, value, description }) => {
  // Calculate color based on value
  const getColor = (val: number) => {
    if (val >= 0.8) return "text-status-success";
    if (val >= 0.6) return "text-status-warning";
    return "text-status-danger";
  };
  
  const percentage = Math.round(value * 100);
  
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className={`font-medium ${getColor(value)}`}>{percentage}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted">
        <div 
          className={`h-2 rounded-full ${getColor(value)}`} 
          style={{ width: `${percentage}%`, opacity: 0.5 }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};
