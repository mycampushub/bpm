
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BpmnElement, BpmnConnection } from './types';
import { Play, Pause, Square, RotateCcw, Activity, Clock, Users, TrendingUp } from 'lucide-react';

interface SimulationViewProps {
  elements: BpmnElement[];
  connections: BpmnConnection[];
}

export const SimulationView: React.FC<SimulationViewProps> = ({
  elements,
  connections
}) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [simulationResults, setSimulationResults] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleStartSimulation = async () => {
    setIsSimulating(true);
    setSimulationProgress(0);
    setCurrentStep(0);
    
    // Simulate process execution
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setSimulationProgress(i);
      setCurrentStep(Math.floor(i / 20));
    }
    
    // Generate mock results
    setSimulationResults({
      totalExecutionTime: (Math.random() * 30 + 10).toFixed(1),
      averageWaitTime: (Math.random() * 5 + 2).toFixed(1),
      throughput: Math.floor(Math.random() * 50 + 20),
      resourceUtilization: Math.floor(Math.random() * 30 + 70),
      bottlenecks: [
        { element: 'Task_1', waitTime: '4.2s', utilization: '95%' },
        { element: 'Gateway_1', decisions: 234, avgTime: '0.8s' }
      ]
    });
    
    setIsSimulating(false);
  };

  const handleStopSimulation = () => {
    setIsSimulating(false);
    setSimulationProgress(0);
    setCurrentStep(0);
  };

  const handleResetSimulation = () => {
    setSimulationResults(null);
    setSimulationProgress(0);
    setCurrentStep(0);
  };

  const simulationSteps = [
    'Initializing Process',
    'Executing Start Event',
    'Processing Tasks',
    'Evaluating Gateways',
    'Completing End Events',
    'Generating Results'
  ];

  return (
    <div className="h-full p-4 space-y-6">
      {/* Simulation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Process Simulation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleStartSimulation}
              disabled={isSimulating || elements.length === 0}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Start Simulation
            </Button>
            <Button
              variant="outline"
              onClick={handleStopSimulation}
              disabled={!isSimulating}
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Stop
            </Button>
            <Button
              variant="outline"
              onClick={handleResetSimulation}
              disabled={isSimulating}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Badge variant={isSimulating ? "default" : "secondary"}>
              {isSimulating ? "Running" : "Stopped"}
            </Badge>
          </div>
          
          {isSimulating && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress: {simulationProgress}%</span>
                <span>{simulationSteps[currentStep] || 'Completing...'}</span>
              </div>
              <Progress value={simulationProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Process Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Elements</p>
                <p className="text-2xl font-bold">{elements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Connections</p>
                <p className="text-2xl font-bold">{connections.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Tasks</p>
                <p className="text-2xl font-bold">
                  {elements.filter(el => el.type.includes('task')).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Gateways</p>
                <p className="text-2xl font-bold">
                  {elements.filter(el => el.type.includes('gateway')).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Simulation Results */}
      {simulationResults && (
        <Card>
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Execution Time</p>
                <p className="text-2xl font-bold text-blue-600">
                  {simulationResults.totalExecutionTime}s
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Average Wait Time</p>
                <p className="text-2xl font-bold text-orange-600">
                  {simulationResults.averageWaitTime}s
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Throughput</p>
                <p className="text-2xl font-bold text-green-600">
                  {simulationResults.throughput}/hr
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Resource Utilization</p>
                <p className="text-2xl font-bold text-purple-600">
                  {simulationResults.resourceUtilization}%
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Identified Bottlenecks</h4>
              <div className="space-y-2">
                {simulationResults.bottlenecks.map((bottleneck: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <span className="font-medium">{bottleneck.element}</span>
                    <div className="flex gap-4 text-sm">
                      {bottleneck.waitTime && (
                        <span className="text-orange-600">Wait: {bottleneck.waitTime}</span>
                      )}
                      {bottleneck.utilization && (
                        <span className="text-red-600">Util: {bottleneck.utilization}</span>
                      )}
                      {bottleneck.avgTime && (
                        <span className="text-blue-600">Avg: {bottleneck.avgTime}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
