
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface VersionItemProps {
  version: string;
  date: string;
  author: string;
  changes: string[];
  isCurrent?: boolean;
}

export function VersionItem({ version, date, author, changes, isCurrent = false }: VersionItemProps) {
  return (
    <div className={cn(
      "border rounded-md p-3",
      isCurrent ? "border-enterprise-blue-300 bg-enterprise-blue-50/30" : ""
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="font-medium flex items-center gap-1.5">
            Version {version}
            {isCurrent && <Badge variant="outline" className="font-normal text-xs">Current</Badge>}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {date}
        </div>
      </div>
      
      <div className="mt-2 text-sm">
        <div>
          Created by <span className="font-medium">{author}</span>
        </div>
        
        {changes.length > 0 && (
          <div className="mt-1.5">
            <div className="text-muted-foreground">Changes:</div>
            <ul className="list-disc list-inside pl-1 mt-1 space-y-0.5">
              {changes.map((change, index) => (
                <li key={index} className="text-sm">{change}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2 mt-3">
        <Button size="sm" variant="outline" className="text-xs h-7">
          View
        </Button>
        {!isCurrent && (
          <Button size="sm" variant="outline" className="text-xs h-7">
            Compare
          </Button>
        )}
        <Button size="sm" variant="outline" className="text-xs h-7">
          Download
        </Button>
      </div>
    </div>
  );
}
