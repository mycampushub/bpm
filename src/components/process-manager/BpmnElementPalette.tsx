
import React, { useState } from "react";
import { useVoice } from "@/contexts/VoiceContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Palette } from "lucide-react";
import { ElementButton } from "./palette/ElementButton";
import { PaletteHeader } from "./palette/PaletteHeader";
import { elementCategories, connectorTypes } from "./palette/ElementTypes";

interface BpmnElementPaletteProps {
  onAddElement: (elementType: string) => void;
}

export const BpmnElementPalette: React.FC<BpmnElementPaletteProps> = ({ onAddElement }) => {
  const { isVoiceEnabled, speakText } = useVoice();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "Events": true,
    "Tasks": true,
    "Gateways": false,
    "Containers": false,
    "Data": false,
    "Participants": false
  });

  const handleElementClick = (element: any) => {
    onAddElement(element.id);
    if (isVoiceEnabled) {
      speakText(`Selected ${element.name}. ${element.voiceGuidance}`);
    }
  };

  const handleElementHover = (element: any) => {
    if (isVoiceEnabled) {
      speakText(element.description);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (isVoiceEnabled) {
      speakText(isCollapsed ? "Element palette expanded" : "Element palette collapsed");
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  if (isCollapsed) {
    return (
      <div className="absolute left-2 top-20 bg-white border rounded shadow-md p-2 z-10 transition-all duration-300 w-12">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapse}
          className="w-full h-8 p-0"
        >
          <Palette className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(
      "absolute left-2 top-20 bg-white border rounded shadow-md z-10 transition-all duration-300 max-h-[calc(100vh-120px)] overflow-y-auto",
      "w-64"
    )}>
      <PaletteHeader isCollapsed={isCollapsed} onToggle={toggleCollapse} />
      
      <div className="p-3 space-y-3">
        {/* Element Categories */}
        {Object.entries(elementCategories).map(([category, elements]) => (
          <Collapsible
            key={category}
            open={expandedCategories[category]}
            onOpenChange={() => toggleCategory(category)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between h-8 px-2 text-xs font-medium"
              >
                {category}
                {expandedCategories[category] ? 
                  <ChevronDown className="h-3 w-3" /> : 
                  <ChevronRight className="h-3 w-3" />
                }
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              {elements.map((element) => (
                <ElementButton
                  key={element.id}
                  element={element}
                  onClick={() => handleElementClick(element)}
                  onHover={() => handleElementHover(element)}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
        
        {/* Connectors */}
        <div className="border-t pt-2">
          <div className="text-xs font-medium mb-2 px-2">Connectors</div>
          {connectorTypes.map((connector) => (
            <Button
              key={connector.id}
              variant="ghost"
              size="sm"
              className="w-full justify-start h-8 px-2 text-xs hover:bg-muted"
              onClick={() => onAddElement(connector.id)}
            >
              <span className="mr-2">{connector.icon}</span>
              {connector.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
