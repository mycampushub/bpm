
import React from "react";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface ApprovalItemProps {
  stage: string;
  approver: string;
  status: "Pending" | "Approved" | "Rejected";
  date?: string;
  comment?: string;
}

export function ApprovalItem({ stage, approver, status, date, comment }: ApprovalItemProps) {
  return (
    <div className="border rounded-md p-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{stage}</h3>
        <Badge
          className={cn(
            status === "Approved" ? "bg-status-success/10 text-status-success" :
            status === "Rejected" ? "bg-status-danger/10 text-status-danger" :
            "bg-status-warning/10 text-status-warning"
          )}
        >
          {status}
        </Badge>
      </div>
      
      <div className="mt-2 flex items-center justify-between text-sm">
        <div>Approver: <span className="font-medium">{approver}</span></div>
        {date && (
          <div className="flex items-center text-muted-foreground gap-2">
            <Clock className="h-3.5 w-3.5" />
            {date}
          </div>
        )}
      </div>
      
      {comment && (
        <div className="mt-2 text-sm bg-muted/50 p-2 rounded-md">
          {comment}
        </div>
      )}
    </div>
  );
}
