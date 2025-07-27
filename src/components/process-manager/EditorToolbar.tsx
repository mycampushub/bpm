
import React from "react";
import { Button } from "@/components/ui/button";
import { Undo2, Save, Plus, Upload, CopyPlus, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const EditorToolbar: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon">
        <Undo2 className="h-4 w-4" />
      </Button>
      
      <Button variant="outline" className="gap-2">
        <Save className="h-4 w-4" />
        Save
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            Create
            <ChevronDown className="h-3 w-3 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Plus className="h-4 w-4 mr-2" /> New Process
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CopyPlus className="h-4 w-4 mr-2" /> From Template
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Upload className="h-4 w-4 mr-2" /> Import BPMN
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
