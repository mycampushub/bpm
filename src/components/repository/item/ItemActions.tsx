
import React from "react";
import { Eye, Pencil, MoreHorizontal, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RepositoryItemType } from "@/types/repository";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ItemActionsProps {
  item: RepositoryItemType;
  onView: (item: RepositoryItemType) => void;
  onEdit: (item: RepositoryItemType) => void;
  onRename: (item: RepositoryItemType) => void;
  onShare: (item: RepositoryItemType) => void;
  onDownload: (item: RepositoryItemType) => void;
}

export function ItemActions({ item, onView, onEdit, onRename, onShare, onDownload }: ItemActionsProps) {
  const { speakText } = useVoice();
  const { toast } = useToast();

  const handleAction = (action: string) => {
    switch (action) {
      case "view":
        onView(item);
        speakText(`Viewing ${item.name}`);
        break;
      case "edit":
        onEdit(item);
        speakText(`Editing ${item.name}`);
        break;
      case "rename":
        onRename(item);
        speakText(`Renaming ${item.name}`);
        break;
      case "share":
        onShare(item);
        speakText(`Sharing ${item.name}`);
        toast({
          title: "Sharing initiated",
          description: `Preparing to share ${item.name}`,
        });
        break;
      case "download":
        onDownload(item);
        speakText(`Downloading ${item.name}`);
        toast({
          title: "Download started",
          description: `${item.name} will be downloaded shortly`,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex space-x-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleAction("view")}
              onMouseEnter={() => speakText("View this item in detail. Viewing allows you to examine the process artifact without making changes.")}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>View</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleAction("edit")}
              onMouseEnter={() => speakText("Edit this item. Regular updates ensure your process documentation stays current and reflects actual business operations.")}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onMouseEnter={() => speakText("Open options menu for additional actions like sharing, downloading, or renaming this item.")}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>More options</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleAction("rename")}
            onMouseEnter={() => speakText("Rename this item. Maintaining clear and descriptive names helps with process organization and searchability.")}>
            Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleAction("share")}
            onMouseEnter={() => speakText("Share this item with others. Collaboration is key to successful process management and continuous improvement.")}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction("download")}
            onMouseEnter={() => speakText("Download this item to your device. This is useful for offline access or sharing with stakeholders who don't have direct system access.")}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
