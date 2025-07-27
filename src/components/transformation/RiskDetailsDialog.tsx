
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, TrendingUp, Users, DollarSign } from "lucide-react";

interface Risk {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  probability: number;
  impact: string;
  mitigation: string;
  owner: string;
  status: "open" | "mitigated" | "closed";
  dueDate: string;
  affectedInitiatives: string[];
}

interface RiskDetailsDialogProps {
  risk: Risk | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RiskDetailsDialog: React.FC<RiskDetailsDialogProps> = ({
  risk,
  open,
  onOpenChange
}) => {
  if (!risk) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-100 text-red-800";
      case "mitigated": return "bg-yellow-100 text-yellow-800";
      case "closed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Risk Details
          </DialogTitle>
          <DialogDescription>Comprehensive risk information and mitigation strategies</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Risk Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{risk.title}</CardTitle>
              <div className="flex gap-2">
                <Badge className={getSeverityColor(risk.severity)}>
                  {risk.severity.toUpperCase()} SEVERITY
                </Badge>
                <Badge className={getStatusColor(risk.status)}>
                  {risk.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{risk.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Probability</label>
                  <div className="mt-1">
                    <Progress value={risk.probability} className="w-full" />
                    <span className="text-sm text-muted-foreground">{risk.probability}%</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Risk Owner</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="h-4 w-4" />
                    <span>{risk.owner}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Impact Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{risk.impact}</p>
            </CardContent>
          </Card>

          {/* Mitigation Strategy */}
          <Card>
            <CardHeader>
              <CardTitle>Mitigation Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{risk.mitigation}</p>
            </CardContent>
          </Card>

          {/* Affected Initiatives */}
          <Card>
            <CardHeader>
              <CardTitle>Affected Initiatives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {risk.affectedInitiatives.map((initiative, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded">
                    <DollarSign className="h-4 w-4 text-blue-500" />
                    <span>{initiative}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Due Date:</strong> {new Date(risk.dueDate).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>
            Update Risk
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
