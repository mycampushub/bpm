
import React from "react";
import { Button } from "@/components/ui/button";
import { Move, Link, Edit, Trash2, Copy, Hand, Square, Diamond, Circle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ElementToolsProps {
  selectedTool: string;
  selectedElement: string | null;
  onSelectTool: (tool: string) => void;
  onEditElement: () => void;
  onDuplicateElement: () => void;
  onDeleteElement: () => void;
}

export const ElementTools: React.FC<ElementToolsProps> = ({
  selectedTool,
  selectedElement,
  onSelectTool,
  onEditElement,
  onDuplicateElement,
  onDeleteElement,
}) => {
  return (
    <div className="p-2 border-b bg-muted/20">
      <div className="flex gap-2 flex-wrap">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={selectedTool === "select" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => onSelectTool("select")}
                className="flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
                  <path d="m13 13 6 6"/>
                </svg>
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
                onClick={() => onSelectTool("hand")}
                className="flex items-center"
              >
                <Hand className="h-4 w-4 mr-1" />
                Move
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
                onClick={() => onSelectTool("task")}
                className="flex items-center"
              >
                <Square className="h-4 w-4 mr-1" />
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
                onClick={() => onSelectTool("gateway")}
                className="flex items-center"
              >
                <Diamond className="h-4 w-4 mr-1" />
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
                onClick={() => onSelectTool("event")}
                className="flex items-center"
              >
                <Circle className="h-4 w-4 mr-1" />
                Event
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add a start or intermediate event</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={selectedTool === "connector" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => onSelectTool("connector")}
                className="flex items-center"
              >
                <Link className="h-4 w-4 mr-1" />
                Connect
              </Button>
            </TooltipTrigger>
            <TooltipContent>Connect elements with flows</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {selectedElement && (
          <div className="ml-auto flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onEditElement}
              className="flex items-center"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onDuplicateElement}
              className="flex items-center"
            >
              <Copy className="h-4 w-4 mr-1" />
              Duplicate
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onDeleteElement}
              className="flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
