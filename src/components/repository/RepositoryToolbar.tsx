
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Grid2X2, List, Search, SortAsc } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVoice } from "@/contexts/VoiceContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RepositoryToolbarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  onSort: () => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function RepositoryToolbar({ 
  searchTerm, 
  onSearch, 
  onSort, 
  viewMode,
  onViewModeChange
}: RepositoryToolbarProps) {
  const { speakText } = useVoice();
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search repository..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => speakText("Search Repository - Use this field to quickly find process artifacts by name or type. Efficient searching helps teams locate the exact process documentation they need without having to navigate through multiple folders. This is especially important in large organizations where process documentation can be extensive.")}
          onMouseEnter={() => speakText("Enter keywords to search for specific processes, folders, or documentation in your repository. A good search strategy can save significant time when managing large process repositories.")}
        />
      </div>
      
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={onSort}
                onMouseEnter={() => speakText("Sort repository items - This allows you to change the sorting order of items in your repository. Proper sorting helps you find artifacts more easily when browsing through collections of process documentation. Sorting can be done by name, date modified, type, or status to meet different organizational needs.")}
              >
                <SortAsc className="h-4 w-4" />
                Sort
              </Button>
            </TooltipTrigger>
            <TooltipContent>Sort items in repository</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onViewModeChange("grid")}
                className={cn(
                  "h-8 w-8",
                  viewMode === "grid" ? "bg-muted" : ""
                )}
                onMouseEnter={() => speakText("Grid view - Shows process artifacts as cards in a grid layout. Grid view provides a visual overview of your repository contents and is excellent for visual recognition of process artifacts. This view is ideal when you want to see thumbnails or icons that help you quickly identify different types of process documentation.")}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Grid view</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onViewModeChange("list")}
                className={cn(
                  "h-8 w-8",
                  viewMode === "list" ? "bg-muted" : ""
                )}
                onMouseEnter={() => speakText("List view - Shows process artifacts in a detailed list format. List view is better for seeing more metadata about each process artifact like owner, status, and last modified date. This view is preferred when you need to see more details at once and is often used by process managers who need to track process governance information.")}
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>List view</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
