
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import {
  Play,
  Pause,
  Square,
  Settings,
  BarChart3,
  Clock,
  Users,
  TrendingUp
} from "lucide-react";

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  parameters: {
    resourceCount: number;
    processingTime: number;
    arrivalRate: number;
    workingHours: number;
  };
  results?: {
    throughput: number;
    avgWaitTime: number;
    utilization: number;
    bottlenecks: string[];
  };
}

export const ProcessSimulation: React.FC = () => {
  const { toast } = useToast();
  const { speakText } = useVoice();
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState("scenario1");

  const [scenarios, setScenarios] = useState<SimulationScenario[]>([
    {
      id: "scenario1",
      name: "Current State",
      description: "Baseline simulation with current process parameters",
      parameters: {
        resourceCount: 5,
        processingTime: 30,
        arrivalRate: 10,
        workingHours: 8
      }
    },
    {
      id: "scenario2",
      name: "Optimized Resources",
      description: "Increased resources to reduce bottlenecks",
      parameters: {
        resourceCount: 7,
        processingTime: 30,
        arrivalRate: 10,
        workingHours: 8
      }
    },
    {
      id: "scenario3",
      name: "Process Automation",
      description: "Reduced processing time through automation",
      parameters: {
        resourceCount: 5,
        processingTime: 20,
        arrivalRate: 10,
        workingHours: 8
      }
    }
  ]);

  const currentScenario = scenarios.find(s => s.id === selectedScenario) || scenarios[0];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setProgress(0);
    
    toast({
      title: "Simulation Started",
      description: `Running simulation for ${currentScenario.name}`
    });

    speakText(`Starting process simulation for ${currentScenario.name}. This will analyze process performance under different conditions.`);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          
          // Generate simulated results
          const results = {
            throughput: Math.round(40 + Math.random() * 20),
            avgWaitTime: Math.round(15 + Math.random() * 10),
            utilization: Math.round(70 + Math.random() * 20),
            bottlenecks: ["Credit Approval", "Quality Control"]
          };

          setScenarios(prev => prev.map(s => 
            s.id === selectedScenario ? { ...s, results } : s
          ));

          toast({
            title: "Simulation Complete",
            description: "Results are now available for analysis"
          });

          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleStopSimulation = () => {
    setIsRunning(false);
    setProgress(0);
    toast({
      title: "Simulation Stopped",
      description: "Process simulation has been terminated"
    });
  };

  const updateScenarioParameter = (parameter: string, value: number) => {
    setScenarios(prev => prev.map(s => 
      s.id === selectedScenario 
        ? { ...s, parameters: { ...s.parameters, [parameter]: value } }
        : s
    ));
  };

  return (
    <div className="space-y-6">
      {/* Simulation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Process Simulation
          </CardTitle>
          <CardDescription>
            Model and analyze process performance under different scenarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <Label>Scenario</Label>
                <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scenarios.map((scenario) => (
                      <SelectItem key={scenario.id} value={scenario.id}>
                        {scenario.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              {!isRunning ? (
                <Button onClick={handleRunSimulation}>
                  <Play className="h-4 w-4 mr-2" />
                  Run Simulation
                </Button>
              ) : (
                <Button variant="destructive" onClick={handleStopSimulation}>
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              )}
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Simulation Progress</span>
                <span className="text-sm">{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scenario Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Scenario Parameters</CardTitle>
            <CardDescription>{currentScenario.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Resources</Label>
                <Input
                  type="number"
                  value={currentScenario.parameters.resourceCount}
                  onChange={(e) => updateScenarioParameter('resourceCount', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>Processing Time (min)</Label>
                <Input
                  type="number"
                  value={currentScenario.parameters.processingTime}
                  onChange={(e) => updateScenarioParameter('processingTime', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>Arrival Rate (cases/hour)</Label>
                <Input
                  type="number"
                  value={currentScenario.parameters.arrivalRate}
                  onChange={(e) => updateScenarioParameter('arrivalRate', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>Working Hours</Label>
                <Input
                  type="number"
                  value={currentScenario.parameters.workingHours}
                  onChange={(e) => updateScenarioParameter('workingHours', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
            <CardDescription>Performance metrics from the last simulation run</CardDescription>
          </CardHeader>
          <CardContent>
            {currentScenario.results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{currentScenario.results.throughput}</div>
                    <div className="text-sm text-muted-foreground">Cases/Day</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{currentScenario.results.avgWaitTime}h</div>
                    <div className="text-sm text-muted-foreground">Avg Wait Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{currentScenario.results.utilization}%</div>
                    <div className="text-sm text-muted-foreground">Utilization</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{currentScenario.results.bottlenecks.length}</div>
                    <div className="text-sm text-muted-foreground">Bottlenecks</div>
                  </div>
                </div>

                {currentScenario.results.bottlenecks.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Identified Bottlenecks</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {currentScenario.results.bottlenecks.map((bottleneck, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {bottleneck}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                <p>Run a simulation to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Scenario Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Scenario Comparison</CardTitle>
          <CardDescription>Compare performance across different scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Scenario</th>
                  <th className="text-right p-2">Throughput</th>
                  <th className="text-right p-2">Wait Time</th>
                  <th className="text-right p-2">Utilization</th>
                  <th className="text-right p-2">Bottlenecks</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((scenario) => (
                  <tr key={scenario.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{scenario.name}</div>
                        <div className="text-xs text-muted-foreground">{scenario.description}</div>
                      </div>
                    </td>
                    <td className="p-2 text-right">
                      {scenario.results ? `${scenario.results.throughput} cases/day` : '-'}
                    </td>
                    <td className="p-2 text-right">
                      {scenario.results ? `${scenario.results.avgWaitTime}h` : '-'}
                    </td>
                    <td className="p-2 text-right">
                      {scenario.results ? `${scenario.results.utilization}%` : '-'}
                    </td>
                    <td className="p-2 text-right">
                      {scenario.results ? scenario.results.bottlenecks.length : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
