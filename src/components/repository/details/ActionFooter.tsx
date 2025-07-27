
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useVoice } from "@/contexts/VoiceContext";
import { Edit, Share2, Download, X } from "lucide-react";

interface ActionFooterProps {
  onClose: () => void;
  onEdit: () => void;
  onShare: () => void;
  onDownload: () => void;
}

export function ActionFooter({ onClose, onEdit, onShare, onDownload }: ActionFooterProps) {
  const { speakText } = useVoice();

  return (
    <DialogFooter className="gap-2">
      <Button 
        variant="outline" 
        onClick={onClose}
        onMouseEnter={() => speakText("Close this dialog and return to the repository view.")}
      >
        <X className="h-4 w-4 mr-2" />
        Close
      </Button>
      <Button 
        variant="outline" 
        onClick={onEdit}
        onMouseEnter={() => speakText("Edit this item. Opens the editor to modify the item's content and properties.")}
      >
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </Button>
      <Button 
        variant="outline" 
        onClick={onShare}
        onMouseEnter={() => speakText("Share this item with team members or generate a shareable link.")}
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
      <Button 
        onClick={onDownload}
        onMouseEnter={() => speakText("Download this item to your local machine in the appropriate format.")}
      >
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
    </DialogFooter>
  );
}
