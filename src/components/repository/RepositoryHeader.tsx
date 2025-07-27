
import React from "react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Folder,
  GitMerge,
  Plus,
  Settings,
  Upload,
  Users
} from "lucide-react";
import { useVoice } from "@/contexts/VoiceContext";

interface RepositoryHeaderProps {
  onNewItem: (type: string) => void;
  onUpload: () => void;
  onSettings: () => void;
}

export function RepositoryHeader({ onNewItem, onUpload, onSettings }: RepositoryHeaderProps) {
  const { speakText } = useVoice();

  return (
    <div className="pb-3 flex flex-row items-center justify-between">
      <div>
        <CardTitle 
          onMouseEnter={() => speakText("Process Repository - This is where all your process documentation is stored. It serves as a centralized location for accessing and managing all your process assets, ensuring everyone in your organization works from consistent, up-to-date information.")}
        >
          Process Repository
        </CardTitle>
        <Breadcrumb className="mt-1">
          <BreadcrumbItem>
            <BreadcrumbLink 
              href="#" 
              onClick={() => speakText("Navigating to Main Repository")}
              onMouseEnter={() => speakText("Main Repository - This is the top level folder containing all process documentation. Clicking here will take you back to the main repository view where you can see all your process collections.")}
            >
              Main Repository
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink 
              href="#" 
              onClick={() => speakText("Order Management section")}
              onMouseEnter={() => speakText("Order Management - This section contains all processes related to managing customer orders. Having dedicated sections helps organize your processes by business function, making them easier to find and manage.")}
            >
              Order Management
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onMouseEnter={() => speakText("Create new item menu - This button allows you to create new process artifacts. Creating standardized documentation is essential for consistent process management across your organization.")}
            >
              <Plus className="h-4 w-4" />
              New
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => onNewItem("BPMN Process")}
              onMouseEnter={() => speakText("BPMN Process - Business Process Model and Notation is an international standard for process modeling. Creating BPMN diagrams helps visualize, communicate, and execute business processes with a standard notation that both business analysts and technical developers can understand.")}
            >
              <GitMerge className="h-4 w-4 mr-2" />
              <span>BPMN Process</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => onNewItem("Journey Map")}
              onMouseEnter={() => speakText("Journey Map - Customer Journey Maps help visualize the experience of your customers across different touchpoints. Creating journey maps allows you to identify pain points and opportunities for improvement in your customer experience, leading to increased customer satisfaction.")}
            >
              <Users className="h-4 w-4 mr-2" />
              <span>Journey Map</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => onNewItem("Decision Model")}
              onMouseEnter={() => speakText("Decision Model - Decision Models help document and automate business rules and decision-making processes. Creating decision models ensures consistent decision-making across your organization and makes complex business rules explicit and manageable.")}
            >
              <FileText className="h-4 w-4 mr-2" />
              <span>Decision Model</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => onNewItem("Folder")}
              onMouseEnter={() => speakText("New Folder - Folders help organize your process artifacts in a structured way. Good organization of your process repository is crucial for maintaining clear governance and efficient access to process knowledge.")}
            >
              <Folder className="h-4 w-4 mr-2" />
              <span>New Folder</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={onUpload}
              onMouseEnter={() => speakText("Import File - This allows you to upload existing process models, spreadsheets, or documentation to the repository. Importing existing documents helps you consolidate your process knowledge in one place and migrate legacy documentation into your centralized repository.")}
            >
              <Upload className="h-4 w-4 mr-2" />
              <span>Import File</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          size="sm" 
          variant="outline"
          onClick={onUpload}
          onMouseEnter={() => speakText("Upload files - This button allows you to import existing process documentation into your repository. Uploading files is essential for consolidating all your process knowledge and ensuring you have a single source of truth for process information.")}
        >
          <Upload className="h-4 w-4" />
        </Button>
        
        <Button 
          size="sm" 
          variant="outline"
          onClick={onSettings}
          onMouseEnter={() => speakText("Repository settings - Configure access permissions, versioning rules, and integration configurations. Proper configuration of repository settings ensures secure and efficient process management, helping you control who can see and edit process information while maintaining versioning history.")}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
