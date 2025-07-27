
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Save,
  FileText,
  Settings,
  Check,
  Link,
} from "lucide-react";

interface IntegrationSystem {
  id: string;
  name: string;
  type: "sap" | "database" | "api" | "workflow" | "other";
  status: "connected" | "disconnected" | "pending";
  lastSync?: string;
}

interface IntegrationCardProps {
  integration: IntegrationSystem;
  isActive: boolean;
  onToggle: (id: string, isActive: boolean) => void;
  onSync: (id: string) => void;
  onConfigure: (id: string) => void;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  isActive,
  onToggle,
  onSync,
  onConfigure
}) => {
  return (
    <Card key={integration.id} className={integration.status === "disconnected" ? "opacity-70" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base">{integration.name}</CardTitle>
            <CardDescription>Integration Type: {integration.type.toUpperCase()}</CardDescription>
          </div>
          <Switch 
            checked={isActive}
            onCheckedChange={(checked) => onToggle(integration.id, checked)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge 
                variant={integration.status === "connected" ? "outline" : 
                        integration.status === "pending" ? "secondary" : "destructive"}
                className={
                  integration.status === "connected" ? "bg-green-50 text-green-700" : 
                  integration.status === "pending" ? "bg-amber-50 text-amber-700" : 
                  "bg-red-50"
                }
              >
                {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
              </Badge>
              {integration.lastSync && (
                <span className="text-xs text-muted-foreground">
                  Last sync: {integration.lastSync}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                disabled={integration.status !== "connected"}
                onClick={() => onSync(integration.id)}
              >
                <Save className="h-4 w-4 mr-1" />
                Sync
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onConfigure(integration.id)}
              >
                <Settings className="h-4 w-4 mr-1" />
                Configure
              </Button>
            </div>
          </div>
          
          {integration.status === "connected" && (
            <div className="bg-muted/50 p-2 rounded text-sm">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Secure connection established</span>
              </div>
            </div>
          )}
          
          {integration.status === "pending" && (
            <div className="bg-muted/50 p-2 rounded text-sm">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-600" />
                <span>Authentication pending. Configure credentials.</span>
              </div>
            </div>
          )}
          
          {integration.status === "disconnected" && (
            <div className="bg-muted/50 p-2 rounded text-sm">
              <div className="flex items-center gap-2">
                <Link className="h-4 w-4 text-red-600" />
                <span>Connection failed. Check settings and try again.</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
