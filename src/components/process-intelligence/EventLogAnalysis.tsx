
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";

// Sample data for event logs
const eventLogSummary = [
  { name: "Order Processing", cases: 1254, variants: 12, avgDuration: "3.2 days" },
  { name: "Invoice Handling", cases: 876, variants: 8, avgDuration: "1.5 days" },
  { name: "Customer Onboarding", cases: 542, variants: 15, avgDuration: "5.7 days" },
  { name: "Service Request", cases: 1890, variants: 23, avgDuration: "2.1 days" },
  { name: "Supplier Management", cases: 423, variants: 7, avgDuration: "4.3 days" },
];

export const EventLogAnalysisCard: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Event Log Analysis</CardTitle>
        <CardDescription>
          Upload and analyze process event logs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="rounded-lg border border-dashed border-primary/50 bg-muted/50 p-6 text-center">
            <div className="mx-auto flex max-w-[180px] flex-col items-center justify-center gap-2">
              <FileUp className="h-10 w-10 text-muted-foreground" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium">Click to upload or drag and drop</p>
                <p>CSV, XES, or XLSX (max. 50MB)</p>
              </div>
              <Button size="sm">Upload Event Log</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Recent Event Logs</h3>
            {eventLogSummary.map((log, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-3 text-sm"
              >
                <div>
                  <p className="font-medium">{log.name}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    <span>{log.cases} cases</span>
                    <span className="mx-2">•</span>
                    <span>{log.variants} variants</span>
                    <span className="mx-2">•</span>
                    <span>{log.avgDuration}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Analyze
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
