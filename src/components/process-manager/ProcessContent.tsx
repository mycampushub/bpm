import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BpmnEditor } from "./BpmnEditor";
import { ProcessTemplateSelector } from "./ProcessTemplateSelector";
import { 
  Share2, Download, Save, Upload, FileJson, FileCode, 
  History, Users, Database, FileSearch, Settings,
  Shield, Link, Copy, Edit, Trash2, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProcessVersionHistory } from "./ProcessVersionHistory";
import { ProcessCollaborators } from "./ProcessCollaborators";
import { ProcessAttributes } from "./ProcessAttributes";
import { ProcessIntegrations } from "./ProcessIntegrations";
import { ProcessGovernance } from "./ProcessGovernance";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { useVoice } from "@/contexts/VoiceContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ProcessContent: React.FC = () => {
  const { toast } = useToast();
  const { speakText, isVoiceEnabled } = useVoice();
  const [activeProcessTab, setActiveProcessTab] = useState("editor");
  const [processName, setProcessName] = useState("Order to Cash Process");
  const [processStatus, setProcessStatus] = useState("Draft");
  const [isRenaming, setIsRenaming] = useState(false);
  const [tempProcessName, setTempProcessName] = useState(processName);
  const [activeTool, setActiveTool] = useState<string>("select");
  const [isLoading, setIsLoading] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const handleSaveProcess = async () => {
    setIsLoading(true);
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Process Saved",
        description: `${processName} has been saved successfully.`,
      });
      
      if (isVoiceEnabled) {
        speakText(`Process ${processName} saved successfully.`);
      }
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save the process. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareProcess = () => {
    toast({
      title: "Share Link Generated",
      description: "Process sharing link has been copied to clipboard.",
    });
    
    if (isVoiceEnabled) {
      speakText("Process sharing link generated and copied to clipboard.");
    }
  };

  const handleExportProcess = (format: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Process Exported",
        description: `${processName} has been exported as ${format}.`,
      });
      
      if (isVoiceEnabled) {
        speakText(`Process exported as ${format} format.`);
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleImportProcess = () => {
    toast({
      title: "Import Process",
      description: "Select a file to import a process model.",
    });
  };

  const handleDuplicateProcess = () => {
    toast({
      title: "Process Duplicated",
      description: `A copy of ${processName} has been created.`,
    });
  };

  const handleDeleteProcess = () => {
    toast({
      title: "Process Deleted",
      description: `${processName} has been moved to trash.`,
    });
  };

  const handleRenameClick = () => {
    setIsRenaming(true);
  };

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessName(tempProcessName);
    setIsRenaming(false);
    toast({
      title: "Process Renamed",
      description: `Process has been renamed to ${tempProcessName}.`,
    });
  };

  const handleStatusChange = (newStatus: string) => {
    setProcessStatus(newStatus);
    toast({
      title: "Status Updated",
      description: `Process status changed to ${newStatus}.`,
    });
  };

  const handleToolSelect = (tool: string) => {
    setActiveTool(tool);
    toast({
      title: "Tool Selected",
      description: `${tool.charAt(0).toUpperCase() + tool.slice(1)} tool is now active`,
      variant: "default",
    });
  };

  const handleTabChange = (newTab: string) => {
    setActiveProcessTab(newTab);
    
    if (isVoiceEnabled) {
      const tabDescriptions = {
        editor: "Process editor opened. Design your process using drag-and-drop elements.",
        history: "Version history opened. View and compare different versions of your process.",
        collaborators: "Collaborators panel opened. Manage team access and permissions.",
        attributes: "Process attributes opened. Configure process metadata and properties.",
        integrations: "Integrations panel opened. Connect with external systems and applications.",
        governance: "Governance panel opened. Set up compliance and approval workflows."
      };
      
      speakText(tabDescriptions[newTab as keyof typeof tabDescriptions] || `${newTab} tab opened.`);
    }
  };

  const handleLoadTemplate = (templateId: string) => {
    setShowTemplateSelector(false);
    toast({
      title: "Template Loading",
      description: "Loading process template into editor..."
    });
    
    if (isVoiceEnabled) {
      speakText("Loading process template into editor. The template includes pre-configured elements and connections.");
    }
  };

  const handlePreviewTemplate = (templateId: string) => {
    toast({
      title: "Template Preview",
      description: "Opening template preview..."
    });
  };

  return (
    <ErrorBoundary>
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              {isRenaming ? (
                <form onSubmit={handleRenameSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={tempProcessName}
                    onChange={(e) => setTempProcessName(e.target.value)}
                    className="text-lg font-semibold border-b border-primary px-1 py-0.5 focus:outline-none focus:border-primary/80"
                    autoFocus
                  />
                  <Button type="submit" variant="ghost" size="sm" className="ml-2">
                    Save
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsRenaming(false)}>
                    Cancel
                  </Button>
                </form>
              ) : (
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold">{processName} ({processStatus})</h2>
                  <Button variant="ghost" size="icon" onClick={handleRenameClick} className="ml-2 h-6 w-6">
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
              <div className="flex items-center mt-1">
                <p className="text-sm text-muted-foreground">Last edited: Today at 10:45 AM • Version 1.3</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 px-2 ml-2">
                      {processStatus} ▼
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleStatusChange("Draft")}>
                      Draft
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange("In Review")}>
                      In Review
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange("Approved")}>
                      Approved
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange("Published")}>
                      Published
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange("Archived")}>
                      Archived
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1" 
                onClick={() => setShowTemplateSelector(!showTemplateSelector)}
              >
                <Layers className="h-4 w-4" />
                Templates
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={() => {}}>
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1" 
                onClick={handleSaveProcess}
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size="sm" text="" /> : <Save className="h-4 w-4" />}
                Save
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={handleShareProcess}>
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleExportProcess('BPMN XML')}>
                    <FileCode className="h-4 w-4 mr-2" /> BPMN XML
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportProcess('JSON')}>
                    <FileJson className="h-4 w-4 mr-2" /> JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportProcess('PNG')}>
                    <Download className="h-4 w-4 mr-2" /> PNG Image
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportProcess('SVG')}>
                    <Download className="h-4 w-4 mr-2" /> SVG Vector
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleDuplicateProcess}>
                    <Copy className="h-4 w-4 mr-2" /> Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleRenameClick}>
                    <Edit className="h-4 w-4 mr-2" /> Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDeleteProcess} className="text-destructive focus:text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {showTemplateSelector && (
            <div className="mb-6 p-4 border rounded-lg bg-muted/50">
              <ProcessTemplateSelector 
                onLoadTemplate={handleLoadTemplate}
                onPreviewTemplate={handlePreviewTemplate}
              />
            </div>
          )}
          
          <Separator className="my-4" />
          
          <div className="bg-muted/50 p-3 rounded-md mb-4 overflow-x-auto whitespace-nowrap">
            <div className="flex items-center gap-3">
              <span className="font-medium text-sm">Tools:</span>
              <Button 
                variant={activeTool === "select" ? "secondary" : "ghost"} 
                size="sm" 
                onClick={() => handleToolSelect("select")}
              >
                Select
              </Button>
              <Button 
                variant={activeTool === "hand" ? "secondary" : "ghost"} 
                size="sm"
                onClick={() => handleToolSelect("hand")}
              >
                Hand
              </Button>
              <Button 
                variant={activeTool === "task" ? "secondary" : "ghost"} 
                size="sm"
                onClick={() => handleToolSelect("task")}
              >
                Task
              </Button>
              <Button 
                variant={activeTool === "gateway" ? "secondary" : "ghost"} 
                size="sm"
                onClick={() => handleToolSelect("gateway")}
              >
                Gateway
              </Button>
              <Button 
                variant={activeTool === "event" ? "secondary" : "ghost"} 
                size="sm"
                onClick={() => handleToolSelect("event")}
              >
                Event
              </Button>
              <Button 
                variant={activeTool === "subprocess" ? "secondary" : "ghost"} 
                size="sm"
                onClick={() => handleToolSelect("subprocess")}
              >
                Subprocess
              </Button>
              <Button 
                variant={activeTool === "dataobject" ? "secondary" : "ghost"} 
                size="sm"
                onClick={() => handleToolSelect("dataobject")}
              >
                Data Object
              </Button>
              <Button 
                variant={activeTool === "pool" ? "secondary" : "ghost"} 
                size="sm"
                onClick={() => handleToolSelect("pool")}
              >
                Pool/Lane
              </Button>
              <Button 
                variant={activeTool === "connector" ? "secondary" : "ghost"} 
                size="sm"
                onClick={() => handleToolSelect("connector")}
              >
                Connector
              </Button>
            </div>
          </div>
          
          <Tabs value={activeProcessTab} onValueChange={handleTabChange} className="mt-4">
            <TabsList className="grid grid-cols-6 mb-4">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="history">
                <History className="h-4 w-4 mr-2" /> 
                Version History
              </TabsTrigger>
              <TabsTrigger value="collaborators">
                <Users className="h-4 w-4 mr-2" /> 
                Collaborators
              </TabsTrigger>
              <TabsTrigger value="attributes">
                <Database className="h-4 w-4 mr-2" /> 
                Attributes
              </TabsTrigger>
              <TabsTrigger value="integrations">
                <Link className="h-4 w-4 mr-2" /> 
                Integrations
              </TabsTrigger>
              <TabsTrigger value="governance">
                <Shield className="h-4 w-4 mr-2" /> 
                Governance
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor">
              <ErrorBoundary fallback={<LoadingSpinner text="Loading editor..." />}>
                <BpmnEditor activeTool={activeTool} />
              </ErrorBoundary>
            </TabsContent>
            
            <TabsContent value="history">
              <ErrorBoundary>
                <ProcessVersionHistory />
              </ErrorBoundary>
            </TabsContent>
            
            <TabsContent value="collaborators">
              <ErrorBoundary>
                <ProcessCollaborators />
              </ErrorBoundary>
            </TabsContent>
            
            <TabsContent value="attributes">
              <ErrorBoundary>
                <ProcessAttributes />
              </ErrorBoundary>
            </TabsContent>
            
            <TabsContent value="integrations">
              <ErrorBoundary>
                <ProcessIntegrations />
              </ErrorBoundary>
            </TabsContent>
            
            <TabsContent value="governance">
              <ErrorBoundary>
                <ProcessGovernance />
              </ErrorBoundary>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
};
