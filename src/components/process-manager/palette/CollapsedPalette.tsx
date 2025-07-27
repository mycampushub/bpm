
import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { elementCategories } from "./ElementTypes";

interface CollapsedPaletteProps {
  onElementClick: (element: any) => void;
}

export const CollapsedPalette: React.FC<CollapsedPaletteProps> = ({ onElementClick }) => {
  // Get first 4 elements from all categories
  const allElements = Object.values(elementCategories).flat();
  
  return (
    <div className="flex flex-col gap-2 items-center">
      {allElements.slice(0, 4).map(element => (
        <TooltipProvider key={element.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="p-1.5 h-auto w-auto"
                onClick={() => onElementClick(element)}
              >
                <span className="h-4 w-4">{element.icon}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{element.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};
