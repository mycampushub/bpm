
import React, { useState } from "react";
import { GitMerge, ZoomIn, ZoomOut, Save, Download, Share2, Edit, Trash2, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const ModelViewer: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const { toast } = useToast();

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  const handleSave = () => {
    toast({
      title: "Model Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Model Exported",
      description: "The model has been exported successfully.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "A link to share this model has been copied to clipboard.",
    });
  };

  const handleElementSelect = (elementId: string) => {
    setSelectedElement(elementId === selectedElement ? null : elementId);
  };

  const handleElementDelete = (elementId: string) => {
    toast({
      title: "Element Deleted",
      description: `Element ${elementId} has been deleted.`,
    });
    setSelectedElement(null);
  };

  const handleElementEdit = (elementId: string) => {
    toast({
      title: "Editing Element",
      description: `Now editing element ${elementId}.`,
    });
  };

  // Sample elements for the model
  const sampleElements = [
    { id: "task1", type: "task", name: "Review Order", position: { x: 150, y: 100 } },
    { id: "gateway1", type: "gateway", name: "Approved?", position: { x: 300, y: 100 } },
    { id: "task2", type: "task", name: "Process Payment", position: { x: 450, y: 50 } },
    { id: "task3", type: "task", name: "Reject Order", position: { x: 450, y: 150 } }
  ];

  return (
    <div className="border-t border-b h-[300px]">
      <Tabs defaultValue="view" className="w-full h-full">
        <div className="flex flex-col h-full">
          <div className="border-b px-4 py-2 flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="view">View</TabsTrigger>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 mr-2">
                <Button variant="ghost" size="icon" onClick={handleZoomOut} className="h-7 w-7">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-xs font-medium w-10 text-center">{zoomLevel}%</span>
                <Button variant="ghost" size="icon" onClick={handleZoomIn} className="h-7 w-7">
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="ghost" size="sm" onClick={handleSave} className="h-7">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="ghost" size="sm" onClick={handleExport} className="h-7">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare} className="h-7">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="flex-1 bg-muted/50">
            <TabsContent value="view" className="flex-1 flex items-center justify-center h-full m-0 p-0">
              <div 
                className="text-muted-foreground flex flex-col items-center"
                style={{ 
                  transform: `scale(${zoomLevel/100})`,
                  transition: "transform 0.2s ease-out" 
                }}
              >
                <GitMerge className="h-10 w-10 mb-2 opacity-70" />
                <p>[Process Model Viewer]</p>
                <p className="text-xs mt-2">Click Edit to make changes to this model</p>
              </div>
            </TabsContent>
            
            <TabsContent value="edit" className="flex-1 flex items-center justify-center h-full m-0 p-0">
              <div className="text-muted-foreground flex flex-col items-center w-full h-full">
                <div className="border-b w-full p-2 bg-white">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Task</Button>
                    <Button variant="outline" size="sm">Gateway</Button>
                    <Button variant="outline" size="sm">Event</Button>
                    <Button variant="outline" size="sm">Connect</Button>
                    <div className="ml-auto flex gap-2">
                      {selectedElement && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleElementEdit(selectedElement)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleElementDelete(selectedElement)}>
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleElementSelect(selectedElement)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center flex-1 w-full relative bg-slate-50 p-4">
                  <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
                    {sampleElements.map((element) => (
                      <div 
                        key={element.id}
                        className={`absolute cursor-move p-2 ${selectedElement === element.id ? 'ring-2 ring-primary' : ''}`}
                        style={{ 
                          left: element.position.x, 
                          top: element.position.y
                        }}
                        onClick={() => handleElementSelect(element.id)}
                      >
                        {element.type === 'task' ? (
                          <div className="w-24 h-16 bg-white border rounded-md flex items-center justify-center shadow-sm">
                            {element.name}
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-white border transform rotate-45 flex items-center justify-center shadow-sm">
                            <span className="transform -rotate-45">{element.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="comments" className="flex-1 flex items-center justify-center h-full m-0 p-0 overflow-auto">
              <div className="text-muted-foreground flex flex-col items-center p-4 w-full">
                <GitMerge className="h-10 w-10 mb-2 opacity-70" />
                <p>[Process Model Comments]</p>
                <div className="w-full max-w-lg mt-4 border rounded-md p-4 bg-white text-left">
                  <p className="text-sm font-medium">No comments yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Be the first to add a comment to this model</p>
                  <div className="mt-4">
                    <Button size="sm">Add Comment</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
