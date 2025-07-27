
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useVoice } from "@/contexts/VoiceContext";
import { useProcessMiningData } from "@/hooks/useProcessMiningData";
import { Eye, Play, Download, Filter } from "lucide-react";

export const ProcessExplorer: React.FC = () => {
  const { speakText } = useVoice();
  const { variants, processCases } = useProcessMiningData();
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const handleVariantClick = (variantId: string) => {
    const variant = variants.find(v => v.id === variantId);
    setSelectedVariant(variantId);
    if (variant) {
      speakText(`Selected process variant: ${variant.name}. This variant occurs in ${variant.frequency}% of cases with average duration of ${variant.avgDuration} hours.`);
    }
  };

  const handleSimulate = (variantId: string) => {
    const variant = variants.find(v => v.id === variantId);
    if (variant) {
      speakText(`Starting simulation for ${variant.name}. This will show you the process flow animation.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Process Explorer</h3>
          <p className="text-muted-foreground">Discover and analyze your actual process flows</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Process Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Process Variants Discovered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {variants.map((variant) => (
              <div 
                key={variant.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedVariant === variant.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
                onClick={() => handleVariantClick(variant.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{variant.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {variant.activities.length} activities • {variant.avgDuration}h avg duration
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{variant.frequency}%</Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSimulate(variant.id);
                      }}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Simulate
                    </Button>
                  </div>
                </div>
                
                <Progress value={variant.frequency} className="mb-3" />
                
                <div className="flex flex-wrap gap-2">
                  {variant.activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs">
                        {activity}
                      </Badge>
                      {index < variant.activities.length - 1 && (
                        <span className="text-muted-foreground">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Process Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Process Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {processCases.slice(0, 5).map((processCase) => (
              <div key={processCase.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">{processCase.caseId}</p>
                  <p className="text-sm text-muted-foreground">
                    {processCase.variant} • {processCase.duration}h duration
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    processCase.status === "completed" ? "default" :
                    processCase.status === "active" ? "secondary" : "destructive"
                  }>
                    {processCase.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
