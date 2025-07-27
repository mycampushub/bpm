import { useState, useCallback } from 'react';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  id: string;
  type: 'error';
  element?: string;
  message: string;
  description?: string;
}

export interface ValidationWarning {
  id: string;
  type: 'warning';
  element?: string;
  message: string;
  description?: string;
}

export interface ExportOptions {
  format: 'bpmn' | 'png' | 'svg' | 'pdf';
  includeValidation?: boolean;
  includeComments?: boolean;
}

export const useProcessOperations = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const validateProcess = useCallback(async (elements: any[], connections: any[]): Promise<ValidationResult> => {
    setIsValidating(true);
    
    // Simulate validation process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Check for start events
    const startEvents = elements.filter(el => el.type === 'start-event');
    if (startEvents.length === 0) {
      errors.push({
        id: 'no-start-event',
        type: 'error',
        message: 'Process must have at least one start event',
        description: 'Every process diagram must begin with a start event'
      });
    } else if (startEvents.length > 1) {
      warnings.push({
        id: 'multiple-start-events',
        type: 'warning',
        message: 'Multiple start events detected',
        description: 'Consider if multiple start events are necessary'
      });
    }

    // Check for end events
    const endEvents = elements.filter(el => el.type === 'end-event');
    if (endEvents.length === 0) {
      errors.push({
        id: 'no-end-event',
        type: 'error',
        message: 'Process must have at least one end event',
        description: 'Every process path must lead to an end event'
      });
    }

    // Check for disconnected elements
    const connectedElements = new Set();
    connections.forEach(conn => {
      connectedElements.add(conn.source);
      connectedElements.add(conn.target);
    });

    elements.forEach(element => {
      if (!connectedElements.has(element.id) && element.type !== 'start-event') {
        warnings.push({
          id: `disconnected-${element.id}`,
          type: 'warning',
          element: element.id,
          message: `Element "${element.name}" is not connected`,
          description: 'All elements should be connected to the process flow'
        });
      }
    });

    // Check for elements without names
    elements.forEach(element => {
      if (!element.name || element.name.trim() === '') {
        warnings.push({
          id: `unnamed-${element.id}`,
          type: 'warning',
          element: element.id,
          message: 'Element has no name',
          description: 'All elements should have descriptive names'
        });
      }
    });

    setIsValidating(false);
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }, []);

  const exportProcess = useCallback(async (elements: any[], connections: any[], options: ExportOptions) => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `process-model-${timestamp}.${options.format}`;
    
    const exportData = {
      format: options.format,
      elements,
      connections,
      metadata: {
        exportedAt: new Date().toISOString(),
        exportedBy: 'Current User',
        version: '1.0'
      },
      validation: options.includeValidation ? await validateProcess(elements, connections) : undefined
    };

    // Simulate file download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsExporting(false);
    return filename;
  }, [validateProcess]);

  const importProcess = useCallback(async (file: File) => {
    setIsImporting(true);
    
    return new Promise<{ elements: any[], connections: any[] }>((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          
          // Simulate processing time
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          let processData;
          
          if (file.name.endsWith('.json')) {
            processData = JSON.parse(content);
          } else if (file.name.endsWith('.bpmn') || file.name.endsWith('.xml')) {
            // Basic BPMN parsing - in real app this would use a proper BPMN parser
            processData = {
              elements: [
                {
                  id: 'imported-start',
                  type: 'start-event',
                  name: 'Start',
                  x: 100,
                  y: 100,
                  width: 36,
                  height: 36,
                  position: { x: 100, y: 100 }
                },
                {
                  id: 'imported-task',
                  type: 'task',
                  name: 'Imported Task',
                  x: 200,
                  y: 90,
                  width: 100,
                  height: 80,
                  position: { x: 200, y: 90 }
                },
                {
                  id: 'imported-end',
                  type: 'end-event',
                  name: 'End',
                  x: 350,
                  y: 100,
                  width: 36,
                  height: 36,
                  position: { x: 350, y: 100 }
                }
              ],
              connections: [
                {
                  id: 'conn1',
                  source: 'imported-start',
                  target: 'imported-task',
                  sourceId: 'imported-start',
                  targetId: 'imported-task',
                  type: 'sequence-flow'
                },
                {
                  id: 'conn2',
                  source: 'imported-task',
                  target: 'imported-end',
                  sourceId: 'imported-task',
                  targetId: 'imported-end',
                  type: 'sequence-flow'
                }
              ]
            };
          } else {
            throw new Error('Unsupported file format');
          }
          
          setIsImporting(false);
          resolve({
            elements: processData.elements || [],
            connections: processData.connections || []
          });
        } catch (error) {
          setIsImporting(false);
          reject(new Error('Failed to parse file: ' + (error as Error).message));
        }
      };
      
      reader.onerror = () => {
        setIsImporting(false);
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  }, []);

  const simulateProcess = useCallback(async (elements: any[], connections: any[]) => {
    // Simulate process execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const simulationResults = {
      totalExecutionTime: Math.random() * 100 + 50,
      averageWaitTime: Math.random() * 20 + 5,
      bottlenecks: elements
        .filter(el => el.type === 'task')
        .slice(0, 2)
        .map(el => ({
          elementId: el.id,
          elementName: el.name,
          waitTime: Math.random() * 15 + 5,
          utilization: Math.random() * 0.4 + 0.6
        })),
      throughput: Math.random() * 50 + 25,
      resourceUtilization: Math.random() * 0.3 + 0.7
    };
    
    return simulationResults;
  }, []);

  return {
    isValidating,
    isExporting,
    isImporting,
    validateProcess,
    exportProcess,
    importProcess,
    simulateProcess
  };
};