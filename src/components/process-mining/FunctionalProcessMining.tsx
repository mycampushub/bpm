import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useVoice } from '@/contexts/VoiceContext';
import { 
  Upload, 
  Play, 
  Download, 
  BarChart3, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';

interface EventLog {
  id: string;
  name: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  progress: number;
  events: number;
  cases: number;
  activities: number;
}

export const FunctionalProcessMining: React.FC = () => {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { toast } = useToast();
  const { speakText } = useVoice();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newLog: EventLog = {
      id: `log-${Date.now()}`,
      name: file.name,
      status: 'uploading',
      progress: 0,
      events: 0,
      cases: 0,
      activities: 0
    };

    setEventLogs(prev => [...prev, newLog]);
    
    toast({
      title: "Upload Started",
      description: `Uploading ${file.name}...`
    });
    speakText(`Started uploading event log ${file.name}`);

    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setEventLogs(prev => prev.map(log => {
        if (log.id === newLog.id && log.progress < 100) {
          const newProgress = Math.min(log.progress + 10, 100);
          return {
            ...log,
            progress: newProgress,
            status: newProgress === 100 ? 'processing' : 'uploading'
          };
        }
        return log;
      }));
    }, 300);

    // Complete upload after progress reaches 100
    setTimeout(() => {
      clearInterval(uploadInterval);
      setEventLogs(prev => prev.map(log => {
        if (log.id === newLog.id) {
          return {
            ...log,
            status: 'ready',
            progress: 100,
            events: Math.floor(Math.random() * 10000) + 1000,
            cases: Math.floor(Math.random() * 1000) + 100,
            activities: Math.floor(Math.random() * 50) + 10
          };
        }
        return log;
      }));
      
      toast({
        title: "Upload Complete",
        description: `${file.name} processed successfully`
      });
      speakText(`Event log ${file.name} uploaded and processed successfully`);
    }, 3000);

    // Reset input
    event.target.value = '';
  }, [toast, speakText]);

  const handleAnalyze = useCallback((logId: string) => {
    const log = eventLogs.find(l => l.id === logId);
    if (!log) return;

    setIsAnalyzing(true);
    
    toast({
      title: "Analysis Started",
      description: `Analyzing ${log.name}...`
    });
    speakText(`Starting process mining analysis on ${log.name}`);

    setTimeout(() => {
      const results = {
        logId,
        processVariants: Math.floor(Math.random() * 20) + 5,
        avgCaseDuration: (Math.random() * 10 + 1).toFixed(1),
        bottlenecks: Math.floor(Math.random() * 3) + 1,
        efficiency: (Math.random() * 30 + 70).toFixed(1),
        conformance: (Math.random() * 20 + 80).toFixed(1),
        recommendations: [
          "Reduce waiting time in approval activities",
          "Parallelize independent tasks",
          "Automate manual data entry steps"
        ]
      };

      setAnalysisResults(results);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Found ${results.processVariants} process variants`
      });
      speakText(`Process mining analysis completed. Found ${results.processVariants} process variants with ${results.efficiency} percent efficiency`);
    }, 5000);
  }, [eventLogs, toast, speakText]);

  const handleExportResults = useCallback(() => {
    if (!analysisResults) return;

    const exportData = {
      timestamp: new Date().toISOString(),
      ...analysisResults
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `process-mining-results-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Results Exported",
      description: "Analysis results downloaded successfully"
    });
    speakText("Process mining analysis results exported successfully");
  }, [analysisResults, toast, speakText]);

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Event Log Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-upload">Upload Event Log (CSV, XES, JSON)</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".csv,.xes,.json"
                onChange={handleFileUpload}
                className="mt-2"
              />
            </div>
            
            {eventLogs.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Uploaded Event Logs</h4>
                {eventLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{log.name}</span>
                        <Badge variant={
                          log.status === 'ready' ? 'default' :
                          log.status === 'error' ? 'destructive' : 'secondary'
                        }>
                          {log.status}
                        </Badge>
                      </div>
                      
                      {log.status === 'ready' && (
                        <Button
                          size="sm"
                          onClick={() => handleAnalyze(log.id)}
                          disabled={isAnalyzing}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Analyze
                        </Button>
                      )}
                    </div>
                    
                    {log.status !== 'ready' && (
                      <Progress value={log.progress} className="mb-2" />
                    )}
                    
                    {log.status === 'ready' && (
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <BarChart3 className="h-4 w-4" />
                          {log.events.toLocaleString()} events
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {log.cases.toLocaleString()} cases
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          {log.activities} activities
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResults && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Analysis Results
            </CardTitle>
            <Button onClick={handleExportResults} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {analysisResults.processVariants}
                  </div>
                  <div className="text-sm text-muted-foreground">Process Variants</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {analysisResults.avgCaseDuration}h
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Duration</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {analysisResults.efficiency}%
                  </div>
                  <div className="text-sm text-muted-foreground">Efficiency</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {analysisResults.conformance}%
                  </div>
                  <div className="text-sm text-muted-foreground">Conformance</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  Bottlenecks Identified: {analysisResults.bottlenecks}
                </h4>
              </div>

              <div>
                <h4 className="font-medium mb-2">Optimization Recommendations</h4>
                <ul className="space-y-2">
                  {analysisResults.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isAnalyzing && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <div>
                <p className="font-medium">Analyzing Process Data...</p>
                <p className="text-sm text-muted-foreground">This may take a few moments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};