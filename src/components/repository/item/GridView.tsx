
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

interface GridViewProps {
  item: RepositoryItemType;
  onClick: (item: RepositoryItemType) => void;
  onEdit: (item: RepositoryItemType) => void;
  onRename: (item: RepositoryItemType) => void;
  onShare: (item: RepositoryItemType) => void;
  onDownload: (item: RepositoryItemType) => void;
}

export function GridView({ item, onClick, onEdit, onRename, onShare, onDownload }: GridViewProps) {
  const { speakText } = useVoice();

  const getIcon = (type: string) => {
    switch (type) {
      case "process": return <FileText className="h-8 w-8 text-blue-500" />;
      case "model": return <Settings className="h-8 w-8 text-green-500" />;
      case "template": return <Folder className="h-8 w-8 text-purple-500" />;
      case "framework": return <Settings className="h-8 w-8 text-orange-500" />;
      case "document": return <FileText className="h-8 w-8 text-gray-500" />;
      default: return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const handleCardClick = () => {
    onClick(item);
    speakText(`Opening ${item.name}. This is a ${item.type} owned by ${item.owner}. ${item.description}`);
  };

  // Safely handle tags array
  const tags = item.tags || [];

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onMouseEnter={() => speakText(`${item.name}. ${item.type} by ${item.owner}. Click to view details or use the menu for more actions.`)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getIcon(item.type)}
            <div className="flex-1">
              <h3 className="font-medium text-sm truncate" title={item.name}>
                {item.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                by {item.owner}
              </p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
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
              <DropdownMenuItem onClick={handleCardClick}>
                <Eye className="h-4 w-4 mr-2" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(item)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRename(item)}>
                <Edit className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onShare(item)}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDownload(item)}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground line-clamp-2">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between">
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
          
          <div className="flex flex-wrap gap-1">
            {tags.length > 0 && tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 2} more
              </Badge>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground pt-1">
            <div>Version {item.version}</div>
            <div>{item.size}</div>
            <div>Modified {new Date(item.lastModified).toLocaleDateString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
