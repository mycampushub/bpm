
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Square, Clock, TrendingUp } from 'lucide-react';

interface ProcessSimulatorProps {
  elements: any[];
  connections: any[];
  onElementHighlight: (elementId: string | null) => void;
}

export const ProcessSimulator: React.FC<ProcessSimulatorProps> = ({ 
  elements, 
  connections, 
  onElementHighlight 
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentElement, setCurrentElement] = useState<string | null>(null);
  const [simulationResults, setSimulationResults] = useState<any>(null);

  const startSimulation = () => {
    setIsRunning(true);
    const startEvent = elements.find(el => el.type === 'start-event');
    if (startEvent) {
      simulateFlow(startEvent.id);
    }
  };

  const simulateFlow = async (elementId: string) => {
    setCurrentElement(elementId);
    onElementHighlight(elementId);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find next element
    const nextConnection = connections.find(conn => conn.source === elementId);
    if (nextConnection && isRunning) {
      simulateFlow(nextConnection.target);
    } else {
      completeSimulation();
    }
  };

  const completeSimulation = () => {
    setIsRunning(false);
    setCurrentElement(null);
    onElementHighlight(null);
    
    // Generate mock results
    setSimulationResults({
      executionTime: (Math.random() * 10 + 5).toFixed(1) + 's',
      throughput: Math.floor(Math.random() * 50 + 20) + ' cases/hour',
      efficiency: Math.floor(Math.random() * 20 + 80) + '%',
      bottlenecks: ['Task validation might be slow', 'Consider parallel processing']
    });
  };

  const stopSimulation = () => {
    setIsRunning(false);
    setCurrentElement(null);
    onElementHighlight(null);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Process Simulation
            <div className="flex items-center gap-2">
              <Badge variant={isRunning ? 'default' : 'secondary'}>
                {isRunning ? 'Running' : 'Stopped'}
              </Badge>
              {currentElement && (
                <Badge variant="outline">
                  Current: {elements.find(el => el.id === currentElement)?.name}
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button onClick={startSimulation} disabled={isRunning}>
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
            <Button onClick={stopSimulation} disabled={!isRunning} variant="outline">
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
          </div>
          
          {simulationResults && (
            <div className="space-y-2">
              <h4 className="font-medium">Simulation Results:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Execution Time: {simulationResults.executionTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">Throughput: {simulationResults.throughput}</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm font-medium">Efficiency: {simulationResults.efficiency}</span>
              </div>
              <div className="mt-2">
                <span className="text-sm font-medium">Recommendations:</span>
                <ul className="text-xs text-muted-foreground list-disc list-inside">
                  {simulationResults.bottlenecks.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
