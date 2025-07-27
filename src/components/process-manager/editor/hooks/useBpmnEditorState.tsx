import React, { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { BpmnElement, BpmnConnection, ElementProperties, ElementPosition, MousePosition } from "../types";

export interface BpmnEditorStateProps {
  activeTool?: string;
}

export const useBpmnEditorState = ({ activeTool = "select" }: BpmnEditorStateProps) => {
  const { toast } = useToast();
  const { isVoiceEnabled, speakText } = useVoice();
  const [activeTab, setActiveTab] = useState("editor");
  const [zoomLevel, setZoomLevel] = useState(100); // Fixed: Changed from 1.0 to 100 to match scale usage
  const [showGrid, setShowGrid] = useState(true);
  const [showValidation, setShowValidation] = useState(false);
  const [xmlSource, setXmlSource] = useState(sampleBpmnXml);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>(activeTool);
  const [elements, setElements] = useState<BpmnElement[]>([
    { id: "StartEvent_1", type: "start-event", name: "Order received", x: 150, y: 150, width: 80, height: 60, position: { x: 150, y: 150 } },
    { id: "Activity_1", type: "task", name: "Process Order", x: 300, y: 150, width: 120, height: 80, position: { x: 300, y: 150 } },
    { id: "EndEvent_1", type: "end-event", name: "Order fulfilled", x: 450, y: 150, width: 80, height: 60, position: { x: 450, y: 150 } },
  ]);
  const [connections, setConnections] = useState<BpmnConnection[]>([
    { id: "Flow_1", source: "StartEvent_1", target: "Activity_1", type: "sequence-flow", sourceId: "StartEvent_1", targetId: "Activity_1" },
    { id: "Flow_2", source: "Activity_1", target: "EndEvent_1", type: "sequence-flow", sourceId: "Activity_1", targetId: "EndEvent_1" },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState<MousePosition | null>(null);
  const [currentElementPosition, setCurrentElementPosition] = useState<ElementPosition | null>(null);
  const [connectingElement, setConnectingElement] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [elementProperties, setElementProperties] = useState<ElementProperties>({
    id: "",
    name: "",
    type: "",
    description: "",
    color: "#ffffff",
    custom: {}
  });
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importSource, setImportSource] = useState("");
  const [history, setHistory] = useState<{
    elements: BpmnElement[];
    connections: BpmnConnection[];
  }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Initialize history with current state
  React.useEffect(() => {
    setHistory([{ elements, connections }]);
    setHistoryIndex(0);
  }, []);

  // Sync with the parent component's tool selection
  React.useEffect(() => {
    if (activeTool) {
      setSelectedTool(activeTool);
    }
  }, [activeTool]);

  // Make sure all elements have position property 
  React.useEffect(() => {
    setElements(prevElements => 
      prevElements.map(el => ({
        ...el,
        position: { x: el.x, y: el.y }
      }))
    );
  }, []);

  // Make sure connections have sourceId and targetId
  React.useEffect(() => {
    setConnections(prevConnections => 
      prevConnections.map(conn => ({
        ...conn,
        sourceId: conn.source,
        targetId: conn.target
      }))
    );
  }, []);

  const saveToHistory = useCallback((newElements: BpmnElement[], newConnections: BpmnConnection[]) => {
    // Remove any "future" states if we're not at the end of the history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ elements: [...newElements], connections: [...newConnections] });
    
    if (newHistory.length > 20) { // Limit history to 20 steps
      newHistory.shift();
    }
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [elements, connections, history, historyIndex]);

  return {
    // State
    activeTab,
    zoomLevel,
    showGrid,
    showValidation,
    xmlSource,
    selectedElement,
    selectedTool,
    elements,
    connections,
    isDragging,
    dragStartPos,
    currentElementPosition,
    connectingElement,
    mousePosition,
    isEditDialogOpen,
    elementProperties,
    snapToGrid,
    isImportDialogOpen,
    importSource,
    history,
    historyIndex,
    
    // Setters
    setActiveTab,
    setZoomLevel,
    setShowGrid,
    setShowValidation,
    setXmlSource,
    setSelectedElement,
    setSelectedTool,
    setElements,
    setConnections,
    setIsDragging,
    setDragStartPos,
    setCurrentElementPosition,
    setConnectingElement,
    setMousePosition,
    setIsEditDialogOpen,
    setElementProperties,
    setSnapToGrid,
    setIsImportDialogOpen,
    setImportSource,
    
    // Functions
    saveToHistory,
    toast,
    isVoiceEnabled,
    speakText
  };
};

// Sample XML for demonstration
export const sampleBpmnXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" name="Order received">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_1" name="Process Order">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Activity_1" />
    <bpmn:endEvent id="EndEvent_1" name="Order fulfilled">
      <bpmn:incoming>Flow_2</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Activity_1" targetRef="EndEvent_1" />
  </bpmn:process>
</bpmn:definitions>`;
