
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EditorTabViewProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const EditorTabView: React.FC<EditorTabViewProps> = ({ 
  activeTab = "editor", 
  onTabChange = () => {} 
}) => {
  const handleTabChange = (value: string) => {
    onTabChange(value);
  };

  return (
    <TabsList>
      <TabsTrigger 
        value="editor" 
        onClick={() => handleTabChange("editor")} 
        data-state={activeTab === "editor" ? "active" : "inactive"}
      >
        Editor
      </TabsTrigger>
      <TabsTrigger 
        value="properties" 
        onClick={() => handleTabChange("properties")} 
        data-state={activeTab === "properties" ? "active" : "inactive"}
      >
        Properties
      </TabsTrigger>
      <TabsTrigger 
        value="repository" 
        onClick={() => handleTabChange("repository")} 
        data-state={activeTab === "repository" ? "active" : "inactive"}
      >
        Repository
      </TabsTrigger>
    </TabsList>
  );
};
