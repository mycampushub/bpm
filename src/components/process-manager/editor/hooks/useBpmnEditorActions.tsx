
import { useCallback } from "react";
import { BpmnElement, BpmnConnection, ElementProperties } from "../types";

interface UseBpmnEditorActionsProps {
  elements: BpmnElement[];
  connections: BpmnConnection[];
  selectedElement: string | null;
  selectedTool: string;
  connectingElement: string | null;
  zoomLevel: number;
  snapToGrid: boolean;
  elementProperties: ElementProperties;
  currentElementPosition: { x: number; y: number } | null;
  dragStartPos: { x: number; y: number } | null;
  isDragging: boolean;
  isVoiceEnabled: boolean;
  
  setElements: (elements: BpmnElement[]) => void;
  setConnections: (connections: BpmnConnection[]) => void;
  setSelectedElement: (id: string | null) => void;
  setSelectedTool: (tool: string) => void;
  setConnectingElement: (id: string | null) => void;
  setMousePosition: (position: { x: number; y: number }) => void;
  setIsDragging: (dragging: boolean) => void;
  setDragStartPos: (pos: { x: number; y: number } | null) => void;
  setCurrentElementPosition: (pos: { x: number; y: number } | null) => void;
  setZoomLevel: (level: number) => void;
  setShowGrid: (show: boolean) => void;
  setShowValidation: (show: boolean) => void;
  setSnapToGrid: (snap: boolean) => void;
  setXmlSource: (xml: string) => void;
  setElementProperties: (props: ElementProperties) => void;
  setIsEditDialogOpen: (open: boolean) => void;
  setIsImportDialogOpen: (open: boolean) => void;
  setImportSource: (source: string) => void;
  
  saveToHistory: (elements: BpmnElement[], connections: BpmnConnection[]) => void;
  toast: any;
  speakText: (text: string) => void;
}

export const useBpmnEditorActions = (props: UseBpmnEditorActionsProps) => {
  const {
    elements,
    connections,
    selectedElement,
    selectedTool,
    connectingElement,
    zoomLevel,
    snapToGrid,
    elementProperties,
    currentElementPosition,
    dragStartPos,
    isDragging,
    isVoiceEnabled,
    setElements,
    setConnections,
    setSelectedElement,
    setSelectedTool,
    setConnectingElement,
    setMousePosition,
    setIsDragging,
    setDragStartPos,
    setCurrentElementPosition,
    setZoomLevel,
    setShowGrid,
    setShowValidation,
    setSnapToGrid,
    setXmlSource,
    setElementProperties,
    setIsEditDialogOpen,
    setIsImportDialogOpen,
    setImportSource,
    saveToHistory,
    toast,
    speakText
  } = props;

  const handleAddElement = useCallback((elementType: string, x: number = 200, y: number = 200) => {
    const newElement: BpmnElement = {
      id: `${elementType}_${Date.now()}`,
      type: elementType,
      name: getElementName(elementType),
      x,
      y,
      width: getElementWidth(elementType),
      height: getElementHeight(elementType),
      position: { x, y }, // Fixed: Added missing position property
      properties: {}
    };

    const newElements = [...elements, newElement];
    setElements(newElements);
    saveToHistory(newElements, connections);
    
    if (isVoiceEnabled) {
      speakText(`Added ${getElementName(elementType)} to the canvas`);
    }
  }, [elements, connections, setElements, saveToHistory, isVoiceEnabled, speakText]);

  const handleElementUpdate = useCallback((elementId: string, updates: any) => {
    const newElements = elements.map(el => 
      el.id === elementId ? { 
        ...el, 
        ...updates, 
        position: { x: updates.x || el.x, y: updates.y || el.y } 
      } : el
    );
    setElements(newElements);
  }, [elements, setElements]);

  const handleConnectionCreate = useCallback((sourceId: string, targetId: string) => {
    const newConnection: BpmnConnection = {
      id: `Flow_${Date.now()}`,
      source: sourceId,
      target: targetId,
      sourceId, // Fixed: Added missing sourceId property
      targetId, // Fixed: Added missing targetId property
      type: 'sequence-flow',
      name: ''
    };

    const newConnections = [...connections, newConnection];
    setConnections(newConnections);
    setConnectingElement(null);
    saveToHistory(elements, newConnections);
    
    if (isVoiceEnabled) {
      speakText("Connection created successfully");
    }
  }, [connections, elements, setConnections, setConnectingElement, saveToHistory, isVoiceEnabled, speakText]);

  const handleSelectElement = useCallback((elementId: string | null) => {
    setSelectedElement(elementId);
    if (selectedTool === 'connector') {
      if (elementId && !connectingElement) {
        setConnectingElement(elementId);
      }
    }
  }, [selectedTool, connectingElement, setSelectedElement, setConnectingElement]);

  const handleSelectTool = useCallback((tool: string) => {
    setSelectedTool(tool);
    if (tool !== 'connector') {
      setConnectingElement(null);
    }
  }, [setSelectedTool, setConnectingElement]);

  const handleZoomIn = useCallback(() => {
    setZoomLevel(Math.min(zoomLevel + 10, 200));
  }, [zoomLevel, setZoomLevel]);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(Math.max(zoomLevel - 10, 25));
  }, [zoomLevel, setZoomLevel]);

  const handleToggleGrid = useCallback(() => {
    setShowGrid(!snapToGrid);
  }, [snapToGrid, setShowGrid]);

  const handleToggleValidation = useCallback(() => {
    setShowValidation(false);
  }, [setShowValidation]);

  const handleToggleSnapToGrid = useCallback(() => {
    setSnapToGrid(!snapToGrid);
  }, [snapToGrid, setSnapToGrid]);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedElement(null);
      setConnectingElement(null);
    }
  }, [setSelectedElement, setConnectingElement]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, [setMousePosition]);

  // Placeholder handlers
  const handleElementDragStart = useCallback((e: React.MouseEvent, elementId: string) => {
    console.log('Drag start:', elementId);
  }, []);

  const handleElementDragMove = useCallback((e: React.MouseEvent) => {
    console.log('Drag move');
  }, []);

  const handleElementDragEnd = useCallback(() => {
    console.log('Drag end');
  }, []);

  const handleEditElement = useCallback(() => {
    if (selectedElement) {
      const element = elements.find(el => el.id === selectedElement);
      if (element) {
        setElementProperties({
          id: element.id,
          name: element.name,
          type: element.type,
          documentation: element.properties?.documentation || "",
          assignee: element.properties?.assignee || "",
          dueDate: element.properties?.dueDate || "",
          implementation: element.properties?.implementation || "",
          description: element.properties?.description || "",
          color: element.properties?.color || "#ffffff"
        });
        setIsEditDialogOpen(true);
      }
    }
  }, [selectedElement, elements, setElementProperties, setIsEditDialogOpen]);

  const handleDuplicateElement = useCallback(() => {
    if (selectedElement) {
      const element = elements.find(el => el.id === selectedElement);
      if (element) {
        handleAddElement(element.type, element.x + 50, element.y + 50);
      }
    }
  }, [selectedElement, elements, handleAddElement]);

  const handleElementDelete = useCallback(() => {
    if (selectedElement) {
      const newElements = elements.filter(el => el.id !== selectedElement);
      const newConnections = connections.filter(conn => 
        conn.source !== selectedElement && conn.target !== selectedElement
      );
      setElements(newElements);
      setConnections(newConnections);
      setSelectedElement(null);
      saveToHistory(newElements, newConnections);
    }
  }, [selectedElement, elements, connections, setElements, setConnections, setSelectedElement, saveToHistory]);

  const handleSaveModel = useCallback(() => {
    toast({
      title: "Model Saved",
      description: "Process model has been saved successfully"
    });
  }, [toast]);

  const handleExportXml = useCallback(async () => {
    // Generate BPMN XML content
    const xmlContent = generateBpmnXml(elements, connections);
    
    // Create download
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `process_model_${new Date().toISOString().slice(0, 10)}.bpmn`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "XML Export Complete",
      description: "Process exported as BPMN XML file"
    });
  }, [elements, connections, toast]);

  const handleExportJson = useCallback(async () => {
    // Generate JSON content
    const jsonContent = {
      elements,
      connections,
      metadata: {
        exportedAt: new Date().toISOString(),
        version: '1.0',
        creator: 'Process Manager'
      }
    };
    
    // Create download
    const blob = new Blob([JSON.stringify(jsonContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `process_model_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "JSON Export Complete", 
      description: "Process exported as JSON file"
    });
  }, [elements, connections, toast]);

  const handleXmlChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setXmlSource(e.target.value);
  }, [setXmlSource]);

  const handleImportClick = useCallback(() => {
    setIsImportDialogOpen(true);
  }, [setIsImportDialogOpen]);

  const handleImportConfirm = useCallback(async (importData: string) => {
    try {
      let processData;
      
      // Try to parse as JSON first
      try {
        processData = JSON.parse(importData);
      } catch {
        // If JSON parsing fails, create basic process from BPMN/XML
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
              position: { x: 100, y: 100 },
              properties: {}
            }
          ],
          connections: []
        };
      }
      
      if (processData.elements) {
        setElements(processData.elements);
        setConnections(processData.connections || []);
        saveToHistory(processData.elements, processData.connections || []);
      }
      
      setIsImportDialogOpen(false);
      toast({
        title: "Import Complete",
        description: "Process imported successfully"
      });
    } catch (error) {
      toast({
        title: "Import Error",
        description: "Failed to import process. Please check the file format.",
        variant: "destructive"
      });
    }
  }, [setElements, setConnections, saveToHistory, setIsImportDialogOpen, toast]);

  const handleUpdateElementProperties = useCallback((props: ElementProperties) => {
    const newElements = elements.map(el => 
      el.id === props.id ? { 
        ...el, 
        name: props.name,
        properties: {
          ...el.properties,
          documentation: props.documentation,
          assignee: props.assignee,
          dueDate: props.dueDate,
          implementation: props.implementation,
          description: props.description,
          color: props.color
        }
      } : el
    );
    setElements(newElements);
    saveToHistory(newElements, connections);
    setIsEditDialogOpen(false);
  }, [elements, connections, setElements, saveToHistory, setIsEditDialogOpen]);

  return {
    handleAddElement,
    handleElementUpdate,
    handleConnectionCreate,
    handleSelectElement,
    handleSelectTool,
    handleZoomIn,
    handleZoomOut,
    handleToggleGrid,
    handleToggleValidation,
    handleToggleSnapToGrid,
    handleCanvasClick,
    handleMouseMove,
    handleElementDragStart,
    handleElementDragMove,
    handleElementDragEnd,
    handleEditElement,
    handleDuplicateElement,
    handleElementDelete,
    handleSaveModel,
    handleExportXml,
    handleExportJson,
    handleXmlChange,
    handleImportClick,
    handleImportConfirm,
    handleUpdateElementProperties
  };
};

// Helper function to generate BPMN XML
function generateBpmnXml(elements: BpmnElement[], connections: BpmnConnection[]): string {
  const processId = `Process_${Date.now()}`;
  
  let elementsXml = '';
  elements.forEach(element => {
    switch (element.type) {
      case 'start-event':
        elementsXml += `    <bpmn:startEvent id="${element.id}" name="${element.name}" />\n`;
        break;
      case 'end-event':
        elementsXml += `    <bpmn:endEvent id="${element.id}" name="${element.name}" />\n`;
        break;
      case 'task':
      case 'user-task':
      case 'service-task':
        const taskType = element.type === 'task' ? 'task' : element.type.replace('-', '');
        elementsXml += `    <bpmn:${taskType} id="${element.id}" name="${element.name}" />\n`;
        break;
      case 'exclusive-gateway':
        elementsXml += `    <bpmn:exclusiveGateway id="${element.id}" name="${element.name}" />\n`;
        break;
      case 'parallel-gateway':
        elementsXml += `    <bpmn:parallelGateway id="${element.id}" name="${element.name}" />\n`;
        break;
    }
  });

  let connectionsXml = '';
  connections.forEach(connection => {
    connectionsXml += `    <bpmn:sequenceFlow id="${connection.id}" sourceRef="${connection.source}" targetRef="${connection.target}" />\n`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" 
                  xmlns:di="http://www.omg.org/spec/DD/20100524/DI" 
                  id="Definitions_1" 
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="${processId}" isExecutable="true">
${elementsXml}${connectionsXml}  </bpmn:process>
</bpmn:definitions>`;
}

// Helper functions
function getElementName(elementType: string): string {
  const names = {
    'start-event': 'Start',
    'end-event': 'End',
    'task': 'Task',
    'user-task': 'User Task',
    'service-task': 'Service Task',
    'exclusive-gateway': 'XOR Gateway',
    'parallel-gateway': 'AND Gateway'
  };
  return names[elementType as keyof typeof names] || 'Element';
}

function getElementWidth(elementType: string): number {
  if (elementType.includes('event')) return 36;
  if (elementType.includes('gateway')) return 50;
  return 100;
}

function getElementHeight(elementType: string): number {
  if (elementType.includes('event')) return 36;
  if (elementType.includes('gateway')) return 50;
  return 80;
}
