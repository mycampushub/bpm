
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useVoice } from "@/contexts/VoiceContext";

interface ItemStatusProps {
  status?: string;
}

export function ItemStatus({ status }: ItemStatusProps) {
  const { speakText } = useVoice();
  
  if (!status) return null;
  
  const statusColors = {
    "Draft": "bg-muted text-muted-foreground",
    "In Review": "bg-enterprise-blue-100 text-enterprise-blue-800",
    "Approved": "bg-status-success/10 text-status-success",
    "Published": "bg-status-success/10 text-status-success",
    "Rejected": "bg-destructive/10 text-destructive",
    "Needs Revision": "bg-amber-100 text-amber-800",
  };

  const statusDescriptions = {
    "Draft": "Initial creation phase, not yet submitted for review",
    "In Review": "Currently being evaluated by process stakeholders",
    "Approved": "Validated and ready for implementation",
    "Published": "Active and in production use",
    "Rejected": "Did not meet required standards or policies",
    "Needs Revision": "Requires modifications before approval",
  };
  
  const color = statusColors[status as keyof typeof statusColors] || "bg-muted text-muted-foreground";
  const description = statusDescriptions[status as keyof typeof statusDescriptions] || "";
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            className={`${color} cursor-help transition-all duration-200 hover:scale-105`}
            onMouseEnter={() => speakText(`Status: ${status}. ${description}`)}
          >
            {status}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
