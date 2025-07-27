
import React from "react";
import { cn } from "@/lib/utils";
import { GitMerge, MessageSquare, Users, FileText } from "lucide-react";

export interface ModelItemProps {
  title: string;
  type: "BPMN" | "DMN" | "Journey";
  author: string;
  time: string;
  comments: number;
  isActive?: boolean;
}

export function ModelItem({ title, type, author, time, comments, isActive = false }: ModelItemProps) {
  const icon = type === "BPMN" ? (
    <GitMerge className="h-4 w-4 text-enterprise-blue-600" />
  ) : type === "Journey" ? (
    <Users className="h-4 w-4 text-enterprise-blue-600" />
  ) : (
    <FileText className="h-4 w-4 text-enterprise-blue-600" />
  );
  
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 cursor-pointer",
      isActive ? "bg-enterprise-blue-50" : "hover:bg-muted/50"
    )}>
      <div className="bg-muted rounded-md p-1.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn(
          "truncate",
          isActive ? "font-medium" : ""
        )}>
          {title}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{author}</span>
          <span>•</span>
          <span>{time}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <MessageSquare className="h-3.5 w-3.5" />
        {comments}
      </div>
    </div>
  );
}
