
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RepositoryItemType } from "@/types/repository";
import { useVoice } from "@/contexts/VoiceContext";
import { 
  FileText, 
  Folder, 
  Settings, 
  Download, 
  Share2, 
  Edit, 
  MoreVertical,
  Eye
} from "lucide-react";

interface ListViewProps {
  item: RepositoryItemType;
  onClick: (item: RepositoryItemType) => void;
  onEdit: (item: RepositoryItemType) => void;
  onRename: (item: RepositoryItemType) => void;
  onShare: (item: RepositoryItemType) => void;
  onDownload: (item: RepositoryItemType) => void;
}

export function ListView({ item, onClick, onEdit, onRename, onShare, onDownload }: ListViewProps) {
  const { speakText } = useVoice();

  const getIcon = (type: string) => {
    switch (type) {
      case "process": return <FileText className="h-5 w-5 text-blue-500" />;
      case "model": return <Settings className="h-5 w-5 text-green-500" />;
      case "template": return <Folder className="h-5 w-5 text-purple-500" />;
      case "framework": return <Settings className="h-5 w-5 text-orange-500" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleRowClick = () => {
    onClick(item);
    speakText(`Opening ${item.name}. This is a ${item.type} owned by ${item.owner}. ${item.description}`);
  };

  return (
    <div 
      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={handleRowClick}
      onMouseEnter={() => speakText(`${item.name}. ${item.type} by ${item.owner}. Click to view or use actions menu.`)}
    >
      <div className="flex items-center gap-3 flex-1">
        {getIcon(item.type)}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium truncate">{item.name}</h3>
            <Badge variant="outline" className="text-xs">
              {item.type}
            </Badge>
            <Badge 
              variant={item.status === "active" ? "default" : item.status === "draft" ? "secondary" : "outline"}
              className="text-xs"
            >
              {item.status}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground truncate">
            {item.description}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
            <span>by {item.owner}</span>
            <span>v{item.version}</span>
            <span>{item.size}</span>
            <span>Modified {new Date(item.lastModified).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 max-w-xs">
          {item.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {item.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{item.tags.length - 3}
            </Badge>
          )}
        </div>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onMouseEnter={() => speakText("Item actions menu. View, edit, rename, share, or download this item.")}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleRowClick(); }}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(item); }}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onRename(item); }}>
            <Edit className="h-4 w-4 mr-2" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onShare(item); }}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDownload(item); }}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
