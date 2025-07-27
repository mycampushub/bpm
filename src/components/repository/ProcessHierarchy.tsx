
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVoice } from "@/contexts/VoiceContext";
import { ChevronRight, ChevronDown, Folder, FileText, Settings } from "lucide-react";

interface HierarchyNode {
  id: string;
  name: string;
  type: "folder" | "process" | "model";
  children?: HierarchyNode[];
  expanded?: boolean;
}

export function ProcessHierarchy() {
  const { speakText } = useVoice();
  const [hierarchyData, setHierarchyData] = useState<HierarchyNode[]>([
    {
      id: "1",
      name: "Core Business Processes",
      type: "folder",
      expanded: true,
      children: [
        {
          id: "1-1",
          name: "Sales & Marketing",
          type: "folder",
          expanded: false,
          children: [
            { id: "1-1-1", name: "Lead Generation Process", type: "process" },
            { id: "1-1-2", name: "Sales Qualification Model", type: "model" },
            { id: "1-1-3", name: "Customer Onboarding", type: "process" }
          ]
        },
        {
          id: "1-2",
          name: "Order Management",
          type: "folder",
          expanded: false,
          children: [
            { id: "1-2-1", name: "Order Processing", type: "process" },
            { id: "1-2-2", name: "Inventory Management", type: "process" },
            { id: "1-2-3", name: "Fulfillment Process", type: "process" }
          ]
        }
      ]
    },
    {
      id: "2",
      name: "Support Processes",
      type: "folder",
      expanded: true,
      children: [
        {
          id: "2-1",
          name: "Human Resources",
          type: "folder",
          expanded: false,
          children: [
            { id: "2-1-1", name: "Employee Onboarding", type: "process" },
            { id: "2-1-2", name: "Performance Review", type: "process" },
            { id: "2-1-3", name: "Leave Management", type: "process" }
          ]
        },
        {
          id: "2-2",
          name: "Finance & Accounting",
          type: "folder",
          expanded: false,
          children: [
            { id: "2-2-1", name: "Invoice Processing", type: "process" },
            { id: "2-2-2", name: "Expense Approval", type: "process" },
            { id: "2-2-3", name: "Financial Reporting", type: "model" }
          ]
        }
      ]
    }
  ]);

  const toggleNode = (nodeId: string) => {
    const updateNode = (nodes: HierarchyNode[]): HierarchyNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, expanded: !node.expanded };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };

    setHierarchyData(updateNode(hierarchyData));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "folder": return <Folder className="h-4 w-4 text-blue-500" />;
      case "process": return <FileText className="h-4 w-4 text-green-500" />;
      case "model": return <Settings className="h-4 w-4 text-purple-500" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const renderHierarchyNode = (node: HierarchyNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = node.expanded;

    return (
      <div key={node.id} className="select-none">
        <div 
          className={`flex items-center gap-2 p-2 hover:bg-muted/50 rounded cursor-pointer`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleNode(node.id);
            }
            speakText(`${node.type === 'folder' ? 'Folder' : node.type} ${node.name}. ${hasChildren ? (isExpanded ? 'Click to collapse' : 'Click to expand') : 'Process item'}.`);
          }}
          onMouseEnter={() => speakText(`${node.name}. ${node.type === 'folder' ? 'Contains sub-processes and models' : 'Individual process or model'}.`)}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )
          ) : (
            <div className="w-4" />
          )}
          
          {getIcon(node.type)}
          
          <span className="font-medium text-sm">{node.name}</span>
          
          <Badge variant="outline" className="text-xs ml-auto">
            {node.type}
          </Badge>
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderHierarchyNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card onMouseEnter={() => speakText("Process hierarchy view. This shows your processes organized in a tree structure by business domain and category. Expand folders to explore sub-processes and models.")}>
      <CardHeader>
        <CardTitle>Process Hierarchy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {hierarchyData.map(node => renderHierarchyNode(node))}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Process hierarchy helps organize and navigate your process library
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Expand All
              </Button>
              <Button variant="outline" size="sm">
                Collapse All
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
