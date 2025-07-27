
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";

interface RepositoryDialogProps {
  open: boolean;
  title: string;
  description: string;
  actionLabel: string;
  inputLabel?: string;
  inputPlaceholder?: string;
  showInput?: boolean;
  onClose: () => void;
  onAction: (value?: string) => void;
}

export function RepositoryDialog({
  open,
  title,
  description,
  actionLabel,
  inputLabel,
  inputPlaceholder,
  showInput = false,
  onClose,
  onAction,
}: RepositoryDialogProps) {
  const [value, setValue] = React.useState("");
  const { toast } = useToast();
  const { speakText } = useVoice();

  const handleAction = () => {
    if (showInput && !value.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a value to continue.",
      });
      speakText("Please enter a value to continue.");
      return;
    }
    
    onAction(showInput ? value : undefined);
    setValue("");
  };

  const handleClose = () => {
    setValue("");
    onClose();
  };

  const getVoiceGuidance = () => {
    if (title.includes("BPMN Process")) {
      return "BPMN Process modeling is essential for visualizing and standardizing business workflows. It helps teams understand, analyze, and improve business processes using standardized notation. This international standard ensures that both business and technical teams can speak the same language when discussing processes.";
    } else if (title.includes("Journey Map")) {
      return "Customer Journey Maps help visualize the experience of your customers across different touchpoints. This helps identify pain points and opportunities for improvement in your customer experience. By understanding the customer's perspective, you can design processes that better meet their needs and expectations.";
    } else if (title.includes("Decision Model")) {
      return "Decision Models help document and automate business rules and decision-making processes. This ensures consistent decision-making across your organization. By making complex decision logic explicit, you reduce errors and improve governance over business decision processes.";
    } else if (title.includes("New Folder")) {
      return "Folders help organize your process artifacts in a structured way. Good organization is crucial for maintaining a clear and efficient process repository. A well-structured repository makes it easier for users to find relevant information quickly and understand relationships between processes.";
    } else if (title.includes("Settings")) {
      return "Repository settings allow you to manage access permissions, versioning rules, and integration configurations. Proper configuration ensures secure and efficient process management. These settings control who can see, edit, and publish processes, which is crucial for process governance.";
    } else if (title.includes("Rename")) {
      return "Clear naming conventions improve searchability and understanding of process artifacts. Good names should be descriptive and follow organizational naming standards to ensure consistency across your repository.";
    }
    return description;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-[425px]"
        onMouseEnter={() => speakText(`${title}. ${getVoiceGuidance()}`)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {showInput && (
          <div className="py-4">
            <label 
              htmlFor="input" 
              className="text-sm font-medium block mb-2"
              onMouseEnter={() => speakText(`Enter the ${inputLabel?.toLowerCase() || "name"}. A clear and descriptive name helps team members understand the purpose of this ${title.toLowerCase()}. Good naming is crucial for searchability and governance.`)}
            >
              {inputLabel || "Name"}
            </label>
            <Input
              id="input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={inputPlaceholder || "Enter a name..."}
              className="w-full"
              onMouseEnter={() => speakText(`Type a descriptive name for your ${title.toLowerCase()} here. Follow your organization's naming conventions to ensure consistency across the repository.`)}
            />
          </div>
        )}
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleClose}
            onMouseEnter={() => speakText("Cancel the current operation and return to the repository view without saving any changes.")}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAction}
            onMouseEnter={() => speakText(`Click to ${actionLabel.toLowerCase()}. This will ${showInput ? `create a new ${title.toLowerCase()} with the specified name` : "save the changes"}. Creating well-documented process artifacts is essential for ensuring process transparency and continuity in your organization.`)}
          >
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
