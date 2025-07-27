
import React from 'react';
import { Button } from '@/components/ui/button';
import { ElementType } from './ElementTypes';

interface ElementButtonProps {
  element: ElementType;
  onClick: () => void;
  onHover?: () => void;
}

export const ElementButton: React.FC<ElementButtonProps> = ({ element, onClick, onHover }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-full justify-start h-8 px-2 text-xs hover:bg-muted"
      onClick={onClick}
      onMouseEnter={onHover}
    >
      <span className="mr-2">{element.icon}</span>
      {element.name}
    </Button>
  );
};
