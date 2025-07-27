
import React, { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { complexProcessTemplates, generateBpmnXml, ProcessTemplate } from "@/data/processTemplates";
import { ElementProperties } from "../types";

interface BpmnEditorStateOptions {
  activeTool: string;
}

export const useBpmnEditorState = ({ activeTool }: BpmnEditorStateOptions) => {
  // Initialize with a simple working example
  const [elements, setElements] = useState<any[]>([
    { 
      id: "StartEvent_1", 
      type: "start-event", 
      name: "Start", 
      x: 100, 
      y: 100, 
      width: 36, 
      height: 36, 
      position: { x: 100, y: 100 } 
    },
    { 
      id: "Task_1", 
      type: "task", 
      name: "Process Task", 
      x: 200, 
      y: 80, 
      width: 100, 
      height: 80, 
      position: { x: 200, y: 80 } 
    },
    { 
      id: "EndEvent_1", 
      type: "end-event", 
      name: "End", 
      x: 360, 
      y: 100, 
      width: 36, 
      height: 36, 
      position: { x: 360, y: 100 } 
    }
  ]);
  const [connections, setConnections] = useState<any[]>([
    { 
      id: "Flow_1", 
      source: "StartEvent_1", 
      target: "Task_1", 
      type: "sequence-flow", 
      sourceId: "StartEvent_1", 
      targetId: "Task_1" 
    },
    { 
      id: "Flow_2", 
      source: "Task_1", 
      target: "EndEvent_1", 
      type: "sequence-flow", 
      sourceId: "Task_1", 
      targetId: "EndEvent_1" 
    }
  ]);
  
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState(activeTool);
  const [connectingElement, setConnectingElement] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("editor");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showGrid, setShowGrid] = useState(true);
  const [showValidation, setShowValidation] = useState(false);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [xmlSource, setXmlSource] = useState('<?xml version="1.0" encoding="UTF-8"?>\n<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">\n  <bpmn:process id="Process_1" isExecutable="false">\n  </bpmn:process>\n</bpmn:definitions>');
  
  const [elementProperties, setElementProperties] = useState<ElementProperties>({
    id: "",
    name: "",
    type: "",
    documentation: "",
    assignee: "",
    dueDate: "",
    implementation: "",
    description: "",
    color: "#ffffff"
  });
  
  // Dialog states
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importSource, setImportSource] = useState("");
  
  // Drag and drop states
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentElementPosition, setCurrentElementPosition] = useState<{ x: number; y: number } | null>(null);
  
  // History management - initialize with current state
  const [history, setHistory] = useState([{ elements, connections }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // Current template tracking
  const [currentTemplate, setCurrentTemplate] = useState<ProcessTemplate | null>(null);
  const [isModified, setIsModified] = useState(false);
  
  const { toast } = useToast();
  const { speakText, isVoiceEnabled } = useVoice();
  
  const saveToHistory = useCallback((newElements: any[], newConnections: any[]) => {
    const newState = { elements: [...newElements], connections: [...newConnections] };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    
    // Limit history to 50 entries for performance
    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      setHistoryIndex(historyIndex + 1);
    }
    
    setHistory(newHistory);
    setIsModified(true);
  }, [history, historyIndex]);

  // Load template function with enhanced synchronization
  const loadTemplate = useCallback((templateId: string) => {
    const template = complexProcessTemplates.find(t => t.id === templateId);
    if (template) {
      // Convert template elements to match editor format
      const convertedElements = template.elements.map(el => ({
        ...el,
        position: { x: el.x, y: el.y },
        // Ensure all required properties are present
        documentation: el.properties?.documentation || '',
        assignee: el.properties?.assignee || '',
        dueDate: el.properties?.dueDate || '',
        implementation: el.properties?.implementation || '',
        description: el.properties?.description || '',
        color: el.properties?.color || '#ffffff'
      }));

      const convertedConnections = template.connections.map(conn => ({
        ...conn,
        sourceId: conn.source,
        targetId: conn.target
      }));

      setElements(convertedElements);
      setConnections(convertedConnections);
      setCurrentTemplate(template);
      setIsModified(false);
      setSelectedElement(null);
      
      // Update XML source
      const newXml = generateBpmnXml(template);
      setXmlSource(newXml);
      
      // Add to history
      const newHistory = [{ elements: convertedElements, connections: convertedConnections }];
      setHistory(newHistory);
      setHistoryIndex(0);
      
      toast({
        title: "Template Loaded Successfully",
        description: `Loaded ${template.name} with ${template.elements.length} elements and ${template.connections.length} connections`
      });
      
      if (isVoiceEnabled) {
        speakText(`Successfully loaded ${template.name} template. This ${template.properties.complexity} complexity process includes ${template.elements.length} elements from the ${template.category} category.`);
      }
    }
  }, [toast, speakText, isVoiceEnabled]);

  // Undo functionality
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const previousState = history[newIndex];
      setElements(previousState.elements);
      setConnections(previousState.connections);
      setHistoryIndex(newIndex);
      setIsModified(true);
      
      toast({
        title: "Undo",
        description: "Reverted to previous state"
      });
    }
  }, [history, historyIndex, toast]);

  // Redo functionality
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextState = history[newIndex];
      setElements(nextState.elements);
      setConnections(nextState.connections);
      setHistoryIndex(newIndex);
      setIsModified(true);
      
      toast({
        title: "Redo",
        description: "Applied next state"
      });
    }
  }, [history, historyIndex, toast]);

  return {
    // State
    elements,
    connections,
    selectedElement,
    selectedTool,
    connectingElement,
    mousePosition,
    activeTab,
    zoomLevel,
    showGrid,
    showValidation,
    snapToGrid,
    xmlSource,
    elementProperties,
    isEditDialogOpen,
    isImportDialogOpen,
    importSource,
    isDragging,
    dragStartPos,
    currentElementPosition,
    history,
    historyIndex,
    isVoiceEnabled,
    currentTemplate,
    isModified,
    
    // Setters
    setElements,
    setConnections,
    setSelectedElement,
    setSelectedTool,
    setConnectingElement,
    setMousePosition,
    setActiveTab,
    setZoomLevel,
    setShowGrid,
    setShowValidation,
    setSnapToGrid,
    setXmlSource,
    setElementProperties,
    setIsEditDialogOpen,
    setIsImportDialogOpen,
    setImportSource,
    setIsDragging,
    setDragStartPos,
    setCurrentElementPosition,
    
    // Functions
    saveToHistory,
    loadTemplate,
    undo,
    redo,
    toast,
    speakText,
    
    // Available templates
    availableTemplates: complexProcessTemplates
  };
};
