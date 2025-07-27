
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  MousePointer, 
  Move, 
  Minus, 
  Undo, 
  Redo, 
  Edit, 
  Copy, 
  Trash2 
} from 'lucide-react';

interface EditorToolbarProps {
  selectedTool: string;
  onSelectTool: (tool: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onEditElement: () => void;
  onDuplicateElement: () => void;
  onDeleteElement: () => void;
  hasSelectedElement: boolean;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  selectedTool,
  onSelectTool,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onEditElement,
  onDuplicateElement,
  onDeleteElement,
  hasSelectedElement
}) => {
  const tools = [
    { id: 'select', icon: MousePointer, label: 'Select', shortcut: 'V' },
    { id: 'move', icon: Move, label: 'Move', shortcut: 'M' },
    { id: 'connector', icon: Minus, label: 'Connect', shortcut: 'C' }
  ];

  return (
    <div className="absolute top-4 left-4 z-20 bg-white border rounded-lg shadow-md p-2 flex items-center gap-2">
      {/* Selection Tools */}
      {tools.map((tool) => {
        const IconComponent = tool.icon;
        return (
          <Button
            key={tool.id}
            variant={selectedTool === tool.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onSelectTool(tool.id)}
            className="h-8 w-8 p-0"
            title={`${tool.label} (${tool.shortcut})`}
          >
            <IconComponent className="h-4 w-4" />
          </Button>
        );
      })}
      
      <Separator orientation="vertical" className="h-6" />
      
      {/* History Controls */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onUndo}
        disabled={!canUndo}
        className="h-8 w-8 p-0"
        title="Undo (Ctrl+Z)"
      >
        <Undo className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onRedo}
        disabled={!canRedo}
        className="h-8 w-8 p-0"
        title="Redo (Ctrl+Y)"
      >
        <Redo className="h-4 w-4" />
      </Button>
      
      <Separator orientation="vertical" className="h-6" />
      
      {/* Element Actions */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onEditElement}
        disabled={!hasSelectedElement}
        className="h-8 w-8 p-0"
        title="Edit Properties"
      >
        <Edit className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onDuplicateElement}
        disabled={!hasSelectedElement}
        className="h-8 w-8 p-0"
        title="Duplicate (Ctrl+D)"
      >
        <Copy className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onDeleteElement}
        disabled={!hasSelectedElement}
        className="h-8 w-8 p-0"
        title="Delete (Delete)"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
