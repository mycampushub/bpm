
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface BpmnToolbarProps {
  selectedTool: string;
  onToolChange: (tool: string) => void;
}

export const BpmnToolbar: React.FC<BpmnToolbarProps> = ({ 
  selectedTool, 
  onToolChange 
}) => {
  return (
    <div className="p-2 border-b bg-muted/20">
      <div className="flex gap-2 items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={selectedTool === "select" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => onToolChange("select")}
              >
                Select
              </Button>
            </TooltipTrigger>
            <TooltipContent>Select and modify elements</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={selectedTool === "hand" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => onToolChange("hand")}
              >
                Hand
              </Button>
            </TooltipTrigger>
            <TooltipContent>Pan and navigate the canvas</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={selectedTool === "task" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => onToolChange("task")}
              >
                Task
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add a new task</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={selectedTool === "gateway" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => onToolChange("gateway")}
              >
                Gateway
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add a decision gateway</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={selectedTool === "event" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => onToolChange("event")}
              >
                Event
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add start, intermediate, or end events</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={selectedTool === "subprocess" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => onToolChange("subprocess")}
              >
                Subprocess
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add a subprocess container</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={selectedTool === "data" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => onToolChange("data")}
              >
                Data Object
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add data objects or stores</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={selectedTool === "pool" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => onToolChange("pool")}
              >
                Pool/Lane
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add swimlanes for participants</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={selectedTool === "connect" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => onToolChange("connect")}
              >
                Connect
              </Button>
            </TooltipTrigger>
            <TooltipContent>Connect elements with flows</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
