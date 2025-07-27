
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProcessMetricsCards } from "./ProcessMetricsCards";
import { Download, RefreshCw } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

// Sample data for charts
const processPerformanceData = [
  { date: "Jan", actual: 65, expected: 80 },
  { date: "Feb", actual: 59, expected: 80 },
  { date: "Mar", actual: 80, expected: 80 },
  { date: "Apr", actual: 81, expected: 80 },
  { date: "May", actual: 56, expected: 80 },
  { date: "Jun", actual: 55, expected: 80 },
  { date: "Jul", actual: 40, expected: 80 },
  { date: "Aug", actual: 70, expected: 80 },
  { date: "Sep", actual: 90, expected: 80 },
  { date: "Oct", actual: 85, expected: 80 },
  { date: "Nov", actual: 79, expected: 80 },
  { date: "Dec", actual: 94, expected: 80 }
];

export const PerformanceAnalysisCard: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Process Performance Analysis</CardTitle>
          <CardDescription>
            Process cycle time and performance metrics
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={processPerformanceData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual Cycle Time"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="expected"
                name="Expected Cycle Time"
                stroke="#82ca9d"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <Separator className="my-4" />
        <ProcessMetricsCards />
      </CardContent>
    </Card>
  );
};
