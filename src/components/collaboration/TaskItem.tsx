
import React from "react";
import { cn } from "@/lib/utils";
import { Calendar, CheckCircle2, File } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface TaskItemProps {
  title: string;
  assigned: string;
  dueDate: string;
  status: "Not Started" | "In Progress" | "Completed";
}

export function TaskItem({ title, assigned, dueDate, status }: TaskItemProps) {
  const statusColors = {
    "Not Started": "bg-muted text-muted-foreground",
    "In Progress": "bg-enterprise-blue-100 text-enterprise-blue-800",
    "Completed": "bg-status-success/10 text-status-success",
  };
  
  return (
    <div className="border rounded-md p-3 hover:border-primary">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {status === "Completed" ? (
            <CheckCircle2 className="h-5 w-5 text-status-success" />
          ) : (
            <File className="h-5 w-5 text-muted-foreground" />
          )}
          <h3 className="font-medium">{title}</h3>
        </div>
        <Badge className={cn(statusColors[status], "font-normal")}>
          {status}
        </Badge>
      </div>
      <div className="ml-7 mt-2 flex items-center justify-between text-sm">
        <div className="text-muted-foreground">
          Assigned to: <span className="text-foreground">{assigned}</span>
        </div>
        <div className="flex items-center text-muted-foreground gap-2">
          <Calendar className="h-3.5 w-3.5" />
          {dueDate}
        </div>
      </div>
    </div>
  );
}
