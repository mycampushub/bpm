
import React from "react";
import { Badge } from "@/components/ui/badge";
import { RepositoryItemType } from "@/types/repository";
import { FileText, Folder, Settings } from "lucide-react";

interface ItemHeaderProps {
  item: RepositoryItemType;
}

export function ItemHeader({ item }: ItemHeaderProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "process": return <FileText className="h-6 w-6 text-blue-500" />;
      case "model": return <Settings className="h-6 w-6 text-green-500" />;
      case "template": return <Folder className="h-6 w-6 text-purple-500" />;
      case "framework": return <Settings className="h-6 w-6 text-orange-500" />;
      default: return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-center gap-3">
      {getIcon(item.type)}
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline">{item.type}</Badge>
          <Badge variant={item.status === "active" ? "default" : "secondary"}>
            {item.status}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Version {item.version}
          </span>
        </div>
      </div>
    </div>
  );
}
