import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  Panel,
  useReactFlow,
  NodeTypes,
  EdgeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useConversation } from '@11labs/react';
import {
  Play,
  Square,
  Circle,
  Diamond,
  Hexagon,
  Triangle,
  MousePointer,
  Hand,
  Type,
  MessageSquare,
  Save,
  Upload,
  Download,
  FileText,
  Settings,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Database,
  Globe,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Undo,
  Redo,
  Copy,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize,
  Grid,
  Layers,
  Share2,
  GitBranch,
  MessageCircle,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';

// Custom Node Types
const StartEventNode = ({ data }: { data: any }) => (
  <div className="w-8 h-8 rounded-full border-2 border-green-600 bg-green-100 flex items-center justify-center text-xs font-semibold text-green-800">
    S
  </div>
);

const EndEventNode = ({ data }: { data: any }) => (
  <div className="w-8 h-8 rounded-full border-4 border-red-600 bg-red-100 flex items-center justify-center text-xs font-semibold text-red-800">
    E
  </div>
);

const TaskNode = ({ data }: { data: any }) => (
  <div className="min-w-24 h-16 bg-blue-50 border-2 border-blue-400 rounded-lg flex items-center justify-center p-2 text-xs font-medium text-blue-900 text-center">
    {data.label}
  </div>
);

const GatewayNode = ({ data }: { data: any }) => (
  <div className="w-12 h-12 bg-yellow-100 border-2 border-yellow-500 transform rotate-45 flex items-center justify-center">
    <span className="transform -rotate-45 text-xs font-bold text-yellow-800">
      {data.type === 'exclusive' ? 'X' : data.type === 'parallel' ? '+' : '?'}
    </span>
  </div>
);

const SubProcessNode = ({ data }: { data: any }) => (
  <div className="min-w-32 h-20 bg-purple-50 border-2 border-purple-400 rounded-lg flex items-center justify-center p-2 text-xs font-medium text-purple-900 text-center relative">
    {data.label}
    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-purple-600">
      <Square className="w-3 h-3" />
    </div>
  </div>
);

const nodeTypes: NodeTypes = {
  startEvent: StartEventNode,
  endEvent: EndEventNode,
  task: TaskNode,
  gateway: GatewayNode,
  subprocess: SubProcessNode,
};

const initialNodes: Node[] = [
  {
    id: 'start-1',
    type: 'startEvent',
    position: { x: 100, y: 100 },
    data: { label: 'Start' },
  },
];

const initialEdges: Edge[] = [];

// Palette Component
const BPMNPalette = ({ onDragStart }: { onDragStart: (event: React.DragEvent, nodeType: string) => void }) => {
  const elements = [
    { type: 'startEvent', icon: Play, label: 'Start Event', color: 'text-green-600' },
    { type: 'endEvent', icon: Square, label: 'End Event', color: 'text-red-600' },
    { type: 'task', icon: FileText, label: 'Task', color: 'text-blue-600' },
    { type: 'gateway', icon: Diamond, label: 'Gateway', color: 'text-yellow-600' },
    { type: 'subprocess', icon: Layers, label: 'Sub Process', color: 'text-purple-600' },
  ];

  return (
    <Card className="w-64 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">BPMN Elements</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-3 space-y-2">
            {elements.map((element) => {
              const IconComponent = element.icon;
              return (
                <div
                  key={element.type}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-grab hover:bg-gray-50 transition-colors"
                  draggable
                  onDragStart={(event) => onDragStart(event, element.type)}
                >
                  <IconComponent className={`w-5 h-5 ${element.color}`} />
                  <span className="text-sm font-medium">{element.label}</span>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

// Properties Panel Component
const PropertiesPanel = ({ selectedNode, onNodeUpdate }: { selectedNode: Node | null, onNodeUpdate: (nodeId: string, data: any) => void }) => {
  const [nodeData, setNodeData] = useState({
    label: '',
    description: '',
    assignee: '',
    priority: 'medium',
    documentation: '',
  });

  useEffect(() => {
    if (selectedNode) {
      setNodeData({
        label: (selectedNode.data?.label as string) || '',
        description: (selectedNode.data?.description as string) || '',
        assignee: (selectedNode.data?.assignee as string) || '',
        priority: (selectedNode.data?.priority as string) || 'medium',
        documentation: (selectedNode.data?.documentation as string) || '',
      });
    }
  }, [selectedNode]);

  const handleUpdate = (field: string, value: string) => {
    setNodeData(prev => ({ ...prev, [field]: value }));
    if (selectedNode) {
      onNodeUpdate(selectedNode.id, { ...nodeData, [field]: value });
    }
  };

  if (!selectedNode) {
    return (
      <Card className="w-80 h-full">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500 text-center py-8">
            Select an element to view properties
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-80 h-full">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Properties</CardTitle>
        <Badge variant="outline" className="w-fit">
          {selectedNode.type}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="space-y-4 pr-3">
            <div>
              <Label htmlFor="label" className="text-xs font-medium">Name</Label>
              <Input
                id="label"
                value={nodeData.label}
                onChange={(e) => handleUpdate('label', e.target.value)}
                className="mt-1"
                placeholder="Enter element name"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-xs font-medium">Description</Label>
              <Textarea
                id="description"
                value={nodeData.description}
                onChange={(e) => handleUpdate('description', e.target.value)}
                className="mt-1"
                placeholder="Enter description"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="assignee" className="text-xs font-medium">Assignee</Label>
              <Input
                id="assignee"
                value={nodeData.assignee}
                onChange={(e) => handleUpdate('assignee', e.target.value)}
                className="mt-1"
                placeholder="Assign to user"
              />
            </div>

            <div>
              <Label htmlFor="priority" className="text-xs font-medium">Priority</Label>
              <Select value={nodeData.priority} onValueChange={(value) => handleUpdate('priority', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="documentation" className="text-xs font-medium">Documentation</Label>
              <Textarea
                id="documentation"
                value={nodeData.documentation}
                onChange={(e) => handleUpdate('documentation', e.target.value)}
                className="mt-1"
                placeholder="Add documentation"
                rows={4}
              />
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

// Voice Training Component
const VoiceTraining = () => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();
  
  const conversation = useConversation({
    onConnect: () => {
      toast({ title: "Voice Assistant Connected", description: "Voice training is now active" });
    },
    onDisconnect: () => {
      toast({ title: "Voice Assistant Disconnected" });
    },
    onMessage: (message) => {
      console.log('Voice message:', message);
    },
    onError: (error: any) => {
      toast({ title: "Voice Error", description: error?.message || 'An error occurred', variant: "destructive" });
    }
  });

  const toggleVoice = async () => {
    if (!isVoiceEnabled) {
      if (!apiKey) {
        toast({ 
          title: "API Key Required", 
          description: "Please enter your ElevenLabs API key",
          variant: "destructive" 
        });
        return;
      }
      
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        // Here you would start the conversation with your agent ID
        // await conversation.startSession({ agentId: 'your-agent-id' });
        setIsVoiceEnabled(true);
        toast({ title: "Voice Training Started", description: "Say 'help' to see available commands" });
      } catch (error) {
        toast({ 
          title: "Microphone Access Denied", 
          description: "Please allow microphone access for voice features",
          variant: "destructive" 
        });
      }
    } else {
      await conversation.endSession();
      setIsVoiceEnabled(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="password"
        placeholder="ElevenLabs API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="w-40 h-8 text-xs"
      />
      <Button
        variant={isVoiceEnabled ? "default" : "outline"}
        size="sm"
        onClick={toggleVoice}
        className="gap-1"
      >
        {isVoiceEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
        {isVoiceEnabled ? 'Stop' : 'Start'} Voice
      </Button>
    </div>
  );
};

// Main Toolbar Component
const MainToolbar = ({ 
  onSave, 
  onLoad, 
  onExport, 
  onValidate, 
  onSimulate,
  validationResults 
}: {
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
  onValidate: () => void;
  onSimulate: () => void;
  validationResults: { errors: number; warnings: number };
}) => {
  return (
    <div className="h-12 border-b bg-white px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onSave} className="gap-1">
          <Save className="w-4 h-4" />
          Save
        </Button>
        <Button variant="ghost" size="sm" onClick={onLoad} className="gap-1">
          <Upload className="w-4 h-4" />
          Load
        </Button>
        <Button variant="ghost" size="sm" onClick={onExport} className="gap-1">
          <Download className="w-4 h-4" />
          Export
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button variant="ghost" size="sm" onClick={onValidate} className="gap-1">
          <CheckCircle className="w-4 h-4" />
          Validate
          {validationResults.errors > 0 && (
            <Badge variant="destructive" className="ml-1 text-xs">
              {validationResults.errors}
            </Badge>
          )}
          {validationResults.warnings > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {validationResults.warnings}
            </Badge>
          )}
        </Button>
        <Button variant="ghost" size="sm" onClick={onSimulate} className="gap-1">
          <Play className="w-4 h-4" />
          Simulate
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <VoiceTraining />
        <Separator orientation="vertical" className="h-6" />
        <Button variant="ghost" size="sm" className="gap-1">
          <Users className="w-4 h-4" />
          Collaborate
        </Button>
        <Button variant="ghost" size="sm" className="gap-1">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>
    </div>
  );
};

// Validation Panel Component
const ValidationPanel = ({ 
  results, 
  isVisible, 
  onClose 
}: { 
  results: any[]; 
  isVisible: boolean; 
  onClose: () => void; 
}) => {
  if (!isVisible) return null;

  return (
    <Card className="absolute bottom-4 left-4 w-96 max-h-80 z-10">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Validation Results</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <EyeOff className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-60">
          <div className="space-y-2">
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg border text-xs ${
                  result.type === 'error' 
                    ? 'border-red-200 bg-red-50 text-red-800' 
                    : 'border-yellow-200 bg-yellow-50 text-yellow-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {result.type === 'error' ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : (
                    <AlertTriangle className="w-4 h-4" />
                  )}
                  <span className="font-medium">{result.message}</span>
                </div>
                {result.description && (
                  <p className="mt-1 text-xs opacity-80">{result.description}</p>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export const SignavioProcessManager = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [validationResults, setValidationResults] = useState({ errors: 0, warnings: 0 });
  const [validationDetails, setValidationDetails] = useState<any[]>([]);
  const [showValidation, setShowValidation] = useState(false);
  const { toast } = useToast();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowBounds) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left - 50,
        y: event.clientY - reactFlowBounds.top - 50,
      };

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { 
          label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
          description: '',
          assignee: '',
          priority: 'medium',
          documentation: ''
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
    },
    []
  );

  const onNodeUpdate = useCallback((nodeId: string, data: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      )
    );
  }, [setNodes]);

  const handleSave = () => {
    const processData = { nodes, edges };
    localStorage.setItem('signavio-process', JSON.stringify(processData));
    toast({ title: "Process Saved", description: "Your process has been saved successfully" });
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('signavio-process');
    if (saved) {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(saved);
      setNodes(savedNodes);
      setEdges(savedEdges);
      toast({ title: "Process Loaded", description: "Your process has been loaded successfully" });
    }
  };

  const handleExport = () => {
    const processData = { nodes, edges };
    const blob = new Blob([JSON.stringify(processData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `process-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Process Exported", description: "Your process has been exported successfully" });
  };

  const handleValidate = () => {
    const errors: any[] = [];
    const warnings: any[] = [];

    // Check for start events
    const startEvents = nodes.filter(node => node.type === 'startEvent');
    if (startEvents.length === 0) {
      errors.push({
        type: 'error',
        message: 'No start event found',
        description: 'Every process must have at least one start event'
      });
    }

    // Check for end events
    const endEvents = nodes.filter(node => node.type === 'endEvent');
    if (endEvents.length === 0) {
      errors.push({
        type: 'error',
        message: 'No end event found',
        description: 'Every process must have at least one end event'
      });
    }

    // Check for unnamed elements
    nodes.forEach(node => {
      const label = node.data?.label;
      if (!label || (typeof label === 'string' && label.startsWith('New '))) {
        warnings.push({
          type: 'warning',
          message: `Unnamed ${node.type}`,
          description: 'Consider giving this element a descriptive name'
        });
      }
    });

    setValidationResults({ errors: errors.length, warnings: warnings.length });
    setValidationDetails([...errors, ...warnings]);
    setShowValidation(true);
    
    toast({ 
      title: "Validation Complete", 
      description: `Found ${errors.length} errors and ${warnings.length} warnings` 
    });
  };

  const handleSimulate = () => {
    if (validationResults.errors > 0) {
      toast({ 
        title: "Cannot Simulate", 
        description: "Please fix validation errors before simulation",
        variant: "destructive" 
      });
      return;
    }

    toast({ 
      title: "Simulation Started", 
      description: "Process simulation is running..." 
    });

    // Simulate process execution
    setTimeout(() => {
      toast({ 
        title: "Simulation Complete", 
        description: "Average execution time: 4.2 hours, Bottlenecks: 2 identified" 
      });
    }, 3000);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <MainToolbar 
        onSave={handleSave}
        onLoad={handleLoad}
        onValidate={handleValidate}
        onExport={handleExport}
        onSimulate={handleSimulate}
        validationResults={validationResults}
      />
      
      <div className="flex-1 flex">
        <BPMNPalette onDragStart={onDragStart} />
        
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-white"
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          >
            <Background color="#f1f5f9" gap={20} />
            <Controls />
            <MiniMap 
              nodeColor={(node) => {
                switch (node.type) {
                  case 'startEvent': return '#22c55e';
                  case 'endEvent': return '#ef4444';
                  case 'task': return '#3b82f6';
                  case 'gateway': return '#eab308';
                  case 'subprocess': return '#8b5cf6';
                  default: return '#64748b';
                }
              }}
              className="bg-white border border-gray-200"
            />
          </ReactFlow>
          
          <ValidationPanel 
            results={validationDetails}
            isVisible={showValidation}
            onClose={() => setShowValidation(false)}
          />
        </div>
        
        <PropertiesPanel 
          selectedNode={selectedNode} 
          onNodeUpdate={onNodeUpdate}
        />
      </div>
    </div>
  );
};