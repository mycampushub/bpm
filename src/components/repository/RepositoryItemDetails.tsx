
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVoice } from "@/contexts/VoiceContext";
import { ItemHeader } from "./details/ItemHeader";
import { DetailsTab } from "./details/DetailsTab";
import { ActionFooter } from "./details/ActionFooter";
import { getEducationalContent } from "./details/ItemEducation";

interface RepositoryItemDetailsProps {
  open: boolean;
  item: any;
  onClose: () => void;
  onEdit: () => void;
  onShare: () => void;
  onDownload: () => void;
}

export function RepositoryItemDetails({
  open,
  item,
  onClose,
  onEdit,
  onShare,
  onDownload,
}: RepositoryItemDetailsProps) {
  const { speakText } = useVoice();

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto"
        onMouseEnter={() => speakText(`${item.name}. ${getEducationalContent(item.type)}`)}
      >
        <DialogHeader>
          <ItemHeader item={item} />
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="mb-4">
            <TabsTrigger 
              value="details" 
              onMouseEnter={() => speakText("View detailed information about this item, including owner, last modified date, and type. Understanding these details helps track process governance and ownership.")}
            >
              Details
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              onMouseEnter={() => speakText("View the version history of this item. Version control is crucial for tracking changes and maintaining process compliance.")}
            >
              History
            </TabsTrigger>
            <TabsTrigger 
              value="permissions"
              onMouseEnter={() => speakText("Manage access permissions for this item. Proper access control ensures process security and compliance with organizational policies.")}
            >
              Permissions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <DetailsTab item={item} />
          </TabsContent>
          
          <TabsContent value="history">
            <p className="text-sm text-muted-foreground">Version history not available for this item.</p>
          </TabsContent>
          
          <TabsContent value="permissions">
            <p className="text-sm text-muted-foreground">This item is shared with project members only.</p>
          </TabsContent>
        </Tabs>

        <ActionFooter 
          onClose={onClose}
          onEdit={onEdit}
          onShare={onShare}
          onDownload={onDownload}
        />
      </DialogContent>
    </Dialog>
  );
}
