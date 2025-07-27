
import React from "react";
import { Badge } from "@/components/ui/badge";
import { RepositoryItemType } from "@/types/repository";
import { useVoice } from "@/contexts/VoiceContext";

interface DetailsTabProps {
  item: RepositoryItemType;
}

export function DetailsTab({ item }: DetailsTabProps) {
  const { speakText } = useVoice();

  return (
    <div 
      className="space-y-4"
      onMouseEnter={() => speakText(`Viewing details for ${item.name}. This section shows comprehensive information about the item including description, metadata, and classification.`)}
    >
      <div>
        <h4 className="font-medium mb-2">Description</h4>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Owner</h4>
          <p className="text-sm">{item.owner}</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Category</h4>
          <p className="text-sm">{item.category}</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Size</h4>
          <p className="text-sm">{item.size}</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Last Modified</h4>
          <p className="text-sm">{new Date(item.lastModified).toLocaleString()}</p>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
