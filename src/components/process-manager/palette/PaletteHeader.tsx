
import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette, X } from 'lucide-react';

interface PaletteHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const PaletteHeader: React.FC<PaletteHeaderProps> = ({ isCollapsed, onToggle }) => {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center gap-2">
        <Palette className="h-4 w-4" />
        {!isCollapsed && <span className="text-sm font-medium">Elements</span>}
      </div>
      <Button variant="ghost" size="sm" onClick={onToggle} className="h-6 w-6 p-0">
        {isCollapsed ? <Palette className="h-3 w-3" /> : <X className="h-3 w-3" />}
      </Button>
    </div>
  );
};
