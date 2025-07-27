
import React from "react";
import { Folder, GitMerge, Users, FileText, File } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useVoice } from "@/contexts/VoiceContext";

interface ItemIconProps {
  type: string;
  className?: string;
  showTooltip?: boolean;
}

export function ItemIcon({ type, className = "h-5 w-5", showTooltip = true }: ItemIconProps) {
  const { speakText } = useVoice();
  
  const getIconComponent = () => {
    switch (type) {
      case "folder":
        return <Folder className={`${className} text-enterprise-blue-600`} />;
      case "bpmn":
        return <GitMerge className={`${className} text-enterprise-blue-600`} />;
      case "journey":
        return <Users className={`${className} text-enterprise-blue-600`} />;
      case "dmn":
        return <FileText className={`${className} text-status-warning`} />;
      case "document":
        return <FileText className={`${className} text-enterprise-gray-600`} />;
      default:
        return <File className={className} />;
    }
  };
  
  const getTooltipText = () => {
    switch (type) {
      case "folder":
        return "Folder - Organizes related process artifacts";
      case "bpmn":
        return "BPMN - Business Process Model and Notation diagram";
      case "journey":
        return "Journey Map - Customer experience visualization";
      case "dmn":
        return "DMN - Decision Model and Notation diagram";
      case "document":
        return "Document - Process documentation or requirements";
      default:
        return "File";
    }
  };
  
  const icon = getIconComponent();
  
  if (!showTooltip) {
    return icon;
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className="cursor-help" 
            onMouseEnter={() => speakText(getTooltipText())}
          >
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
