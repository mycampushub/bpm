
import React from "react";
import { cn } from "@/lib/utils";
import { Folder } from "lucide-react";

interface ProcessModel {
  name: string;
  type: "folder" | "bpmn" | "dmn";
  lastModified: string;
  owner: string;
  version?: string;
}

interface ProcessModelItemProps {
  model: ProcessModel;
  viewMode: "grid" | "list";
}

export function ProcessModelItem({ model, viewMode }: ProcessModelItemProps) {
  if (viewMode === "grid") {
    return (
      <div className="border rounded-md p-4 hover:border-primary hover:shadow-sm cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <ModelTypeIcon type={model.type} />
            <span className="font-medium truncate">{model.name}</span>
          </div>
          {model.version && (
            <span className="text-xs bg-muted rounded px-2 py-0.5">v{model.version}</span>
          )}
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          <div>Modified: {model.lastModified}</div>
          <div>Owner: {model.owner}</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-between border-b py-2 px-2 hover:bg-muted/50">
      <div className="flex items-center gap-3">
        <ModelTypeIcon type={model.type} />
        <span className="font-medium">{model.name}</span>
        {model.version && (
          <span className="text-xs bg-muted rounded px-2 py-0.5">v{model.version}</span>
        )}
      </div>
      <div className="flex items-center gap-10 text-sm text-muted-foreground">
        <span>{model.lastModified}</span>
        <span>{model.owner}</span>
      </div>
    </div>
  );
}

export function ModelTypeIcon({ type }: { type: ProcessModel["type"] }) {
  switch (type) {
    case "folder":
      return <Folder className="h-5 w-5 text-enterprise-blue-600" />;
    case "bpmn":
      return (
        <div className="h-5 w-5 text-enterprise-blue-600 flex items-center justify-center font-bold text-xs">
          BP
        </div>
      );
    case "dmn":
      return (
        <div className="h-5 w-5 text-status-warning flex items-center justify-center font-bold text-xs">
          DM
        </div>
      );
    default:
      return null;
  }
}
