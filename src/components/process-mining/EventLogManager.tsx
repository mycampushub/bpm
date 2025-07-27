
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useVoice } from "@/contexts/VoiceContext";
import { useProcessMiningData } from "@/hooks/useProcessMiningData";
import { Upload, Download, Trash2, Eye, RefreshCw } from "lucide-react";

export const EventLogManager: React.FC = () => {
  const { speakText } = useVoice();
  const { eventLogs, uploadEventLog } = useProcessMiningData();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xes,.json';
    input.multiple = true;
    
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        setIsUploading(true);
        Array.from(files).forEach(file => {
          uploadEventLog(file);
          speakText(`Uploading ${file.name}. The file will be processed automatically for analysis.`);
        });
        setTimeout(() => setIsUploading(false), 1000);
      }
    };
    
    input.click();
  };

  const handleDownload = (logId: string) => {
    const log = eventLogs.find(l => l.id === logId);
    if (log) {
      speakText(`Downloading ${log.name}. The processed event log will be saved to your device.`);
    }
  };

  const handleView = (logId: string) => {
    const log = eventLogs.find(l => l.id === logId);
    if (log) {
      speakText(`Opening detailed view for ${log.name}. This shows event log statistics and data preview.`);
    }
  };

  const handleDelete = (logId: string) => {
    const log = eventLogs.find(l => l.id === logId);
    if (log) {
      speakText(`Deleting ${log.name}. This will remove the event log and all associated analysis results.`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "default";
      case "processing": return "secondary";
      case "uploading": return "outline";
      case "error": return "destructive";
      default: return "outline";
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "ready": return 100;
      case "processing": return 70;
      case "uploading": return 30;
      case "error": return 0;
      default: return 0;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Event Log Manager</h3>
          <p className="text-muted-foreground">Upload and manage your process event data</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleFileUpload} disabled={isUploading}>
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Uploading..." : "Upload Event Log"}
          </Button>
        </div>
      </div>

      {/* Upload Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Formats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border rounded">
              <h4 className="font-medium">CSV Files</h4>
              <p className="text-sm text-muted-foreground">
                Requires: Case ID, Activity, Timestamp columns
              </p>
            </div>
            <div className="p-3 border rounded">
              <h4 className="font-medium">XES Files</h4>
              <p className="text-sm text-muted-foreground">
                Standard event log format for process mining
              </p>
            </div>
            <div className="p-3 border rounded">
              <h4 className="font-medium">JSON Files</h4>
              <p className="text-sm text-muted-foreground">
                Structured event data with trace information
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Logs List */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Event Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventLogs.map((log) => (
              <div key={log.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium">{log.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Uploaded on {new Date(log.uploadDate).toLocaleDateString()} • {log.size}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(log.status)}>
                      {log.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleView(log.id)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDownload(log.id)}
                        disabled={log.status !== "ready"}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(log.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {log.status === "processing" || log.status === "uploading" ? (
                  <Progress value={getStatusProgress(log.status)} className="mb-3" />
                ) : null}
                
                {log.status === "ready" && (
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Activities:</span> {log.activities}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Variants:</span> {log.variants}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cases:</span> {log.cases}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {eventLogs.length === 0 && (
              <div className="text-center py-12">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Event Logs</h3>
                <p className="text-muted-foreground mb-4">
                  Upload your first event log to start process mining analysis
                </p>
                <Button onClick={handleFileUpload}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Event Log
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
