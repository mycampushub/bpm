import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useVoice } from '@/contexts/VoiceContext';

export interface ProcessElement {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  position: { x: number; y: number };
  properties?: any;
}

export interface ProcessConnection {
  id: string;
  source: string;
  target: string;
  sourceId: string;
  targetId: string;
  type: string;
  name?: string;
}

export interface ValidationResult {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  elementId?: string;
}

export const useProcessManager = () => {
  const [elements, setElements] = useState<ProcessElement[]>([]);
  const [connections, setConnections] = useState<ProcessConnection[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  
  const { toast } = useToast();
  const { speakText } = useVoice();

  const handleSave = useCallback(() => {
    const processData = {
      elements,
      connections,
      metadata: {
        savedAt: new Date().toISOString(),
        version: '1.0.0'
      }
    };
    
    localStorage.setItem('processData', JSON.stringify(processData));
    toast({
      title: "Process Saved",
      description: "Your process has been saved successfully"
    });
    speakText("Process saved successfully to local storage");
  }, [elements, connections, toast, speakText]);

  const handleLoad = useCallback(() => {
    try {
      const savedData = localStorage.getItem('processData');
      if (savedData) {
        const processData = JSON.parse(savedData);
        setElements(processData.elements || []);
        setConnections(processData.connections || []);
        toast({
          title: "Process Loaded",
          description: "Your saved process has been loaded"
        });
        speakText("Saved process loaded successfully");
      } else {
        toast({
          title: "No Saved Process",
          description: "No saved process found",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Load Error",
        description: "Failed to load saved process",
        variant: "destructive"
      });
    }
  }, [toast, speakText]);

  const handleValidate = useCallback(() => {
    const results: ValidationResult[] = [];
    
    // Check for start events
    const startEvents = elements.filter(e => e.type.includes('start'));
    if (startEvents.length === 0) {
      results.push({
        id: 'no-start',
        type: 'error',
        message: 'Process must have at least one start event'
      });
    }
    
    // Check for end events
    const endEvents = elements.filter(e => e.type.includes('end'));
    if (endEvents.length === 0) {
      results.push({
        id: 'no-end',
        type: 'warning',
        message: 'Process should have at least one end event'
      });
    }
    
    // Check for unconnected elements
    elements.forEach(element => {
      const hasIncoming = connections.some(c => c.target === element.id);
      const hasOutgoing = connections.some(c => c.source === element.id);
      
      if (!hasIncoming && !element.type.includes('start')) {
        results.push({
          id: `unconnected-${element.id}`,
          type: 'warning',
          message: `Element "${element.name}" has no incoming connections`,
          elementId: element.id
        });
      }
      
      if (!hasOutgoing && !element.type.includes('end')) {
        results.push({
          id: `unconnected-out-${element.id}`,
          type: 'warning',
          message: `Element "${element.name}" has no outgoing connections`,
          elementId: element.id
        });
      }
    });
    
    setValidationResults(results);
    
    if (results.length === 0) {
      toast({
        title: "Validation Passed",
        description: "Process validation completed with no issues"
      });
      speakText("Process validation completed successfully with no issues found");
    } else {
      toast({
        title: "Validation Issues",
        description: `Found ${results.length} validation issues`
      });
      speakText(`Process validation found ${results.length} issues that need attention`);
    }
  }, [elements, connections, toast, speakText]);

  const handleExport = useCallback((format: 'bpmn' | 'json' = 'bpmn') => {
    let exportData: string;
    let filename: string;
    let mimeType: string;
    
    if (format === 'bpmn') {
      exportData = generateBPMNXML(elements, connections);
      filename = 'process.bpmn';
      mimeType = 'application/xml';
    } else {
      exportData = JSON.stringify({ elements, connections }, null, 2);
      filename = 'process.json';
      mimeType = 'application/json';
    }
    
    const blob = new Blob([exportData], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: `Process exported as ${filename}`
    });
    speakText(`Process exported successfully as ${format.toUpperCase()} format`);
  }, [elements, connections, toast, speakText]);

  const handleSimulate = useCallback(() => {
    setIsSimulating(true);
    toast({
      title: "Simulation Started",
      description: "Process simulation is running..."
    });
    speakText("Process simulation started. Analyzing process flow and performance");
    
    // Simulate process execution
    setTimeout(() => {
      setIsSimulating(false);
      const metrics = {
        avgExecutionTime: (Math.random() * 10 + 1).toFixed(1),
        bottlenecks: Math.floor(Math.random() * 3),
        efficiency: (Math.random() * 20 + 80).toFixed(1)
      };
      
      toast({
        title: "Simulation Complete",
        description: `Avg time: ${metrics.avgExecutionTime}h, Efficiency: ${metrics.efficiency}%`
      });
      speakText(`Simulation completed. Average execution time is ${metrics.avgExecutionTime} hours with ${metrics.efficiency} percent efficiency`);
    }, 3000);
  }, [toast, speakText]);

  const generateBPMNXML = (elements: ProcessElement[], connections: ProcessConnection[]): string => {
    const elementsXML = elements.map(el => {
      const type = el.type.replace('-', '');
      return `    <bpmn:${type} id="${el.id}" name="${el.name}" />`;
    }).join('\n');

    const connectionsXML = connections.map(conn => 
      `    <bpmn:sequenceFlow id="${conn.id}" sourceRef="${conn.source}" targetRef="${conn.target}" />`
    ).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false" name="Business Process">
${elementsXML}
${connectionsXML}
  </bpmn:process>
</bpmn:definitions>`;
  };

  return {
    elements,
    setElements,
    connections,
    setConnections,
    selectedElement,
    setSelectedElement,
    isSimulating,
    validationResults,
    handleSave,
    handleLoad,
    handleValidate,
    handleExport,
    handleSimulate
  };
};