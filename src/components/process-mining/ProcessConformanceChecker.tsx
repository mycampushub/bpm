
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useVoice } from "@/contexts/VoiceContext";
import { CheckCircle, XCircle, AlertTriangle, Upload } from "lucide-react";

export const ProcessConformanceChecker: React.FC = () => {
  const { speakText } = useVoice();
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const conformanceResults = [
    {
      id: "1",
      modelName: "Purchase Order BPMN",
      conformanceScore: 85,
      deviations: 12,
      compliantCases: 156,
      totalCases: 184,
      status: "good"
    },
    {
      id: "2", 
      modelName: "Invoice Processing",
      conformanceScore: 72,
      deviations: 28,
      compliantCases: 134,
      totalCases: 186,
      status: "warning"
    }
  ];

  const deviationTypes = [
    { type: "Missing Activities", count: 8, severity: "high" },
    { type: "Wrong Sequence", count: 15, severity: "medium" },
    { type: "Extra Activities", count: 5, severity: "low" },
    { type: "Timing Violations", count: 12, severity: "high" }
  ];

  const handleUploadModel = () => {
    speakText("Upload reference model dialog opened. Select your BPMN or process model file to compare against actual execution data.");
  };

  const handleCheckConformance = (modelId: string) => {
    const model = conformanceResults.find(m => m.id === modelId);
    if (model) {
      speakText(`Starting conformance check for ${model.modelName}. This will compare actual process execution against the designed model.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Conformance Checking</h3>
          <p className="text-muted-foreground">Compare actual vs. designed process flows</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleUploadModel}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Model
          </Button>
          <Button>
            Run Check
          </Button>
        </div>
      </div>

      {/* Conformance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">Avg Conformance</p>
            </div>
            <p className="text-2xl font-bold">78.5%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <p className="text-sm text-muted-foreground">Total Deviations</p>
            </div>
            <p className="text-2xl font-bold">40</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <p className="text-sm text-muted-foreground">Critical Issues</p>
            </div>
            <p className="text-2xl font-bold">8</p>
          </CardContent>
        </Card>
      </div>

      {/* Conformance Results */}
      <Card>
        <CardHeader>
          <CardTitle>Conformance Results by Model</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conformanceResults.map((result) => (
              <div 
                key={result.id}
                className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedModel(result.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{result.modelName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {result.compliantCases}/{result.totalCases} cases compliant
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      result.status === "good" ? "default" :
                      result.status === "warning" ? "destructive" : "secondary"
                    }>
                      {result.conformanceScore}%
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheckConformance(result.id);
                      }}
                    >
                      Re-check
                    </Button>
                  </div>
                </div>
                
                <Progress value={result.conformanceScore} className="mb-3" />
                
                <div className="text-sm text-muted-foreground">
                  {result.deviations} deviations found
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Deviation Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Deviation Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {deviationTypes.map((deviation, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">{deviation.type}</p>
                  <p className="text-sm text-muted-foreground">{deviation.count} occurrences</p>
                </div>
                <Badge variant={
                  deviation.severity === "high" ? "destructive" :
                  deviation.severity === "medium" ? "default" : "secondary"
                }>
                  {deviation.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
