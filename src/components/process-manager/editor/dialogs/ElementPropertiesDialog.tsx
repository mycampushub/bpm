
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ElementProperties } from '../types';

interface ElementPropertiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  elementProperties: ElementProperties;
  setElementProperties: (properties: ElementProperties) => void;
  onUpdateProperties: (properties: ElementProperties) => void;
}

export const ElementPropertiesDialog: React.FC<ElementPropertiesDialogProps> = ({
  open,
  onOpenChange,
  elementProperties,
  setElementProperties,
  onUpdateProperties
}) => {
  const handleSave = () => {
    onUpdateProperties(elementProperties);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Element Properties</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="element-name">Name</Label>
            <Input
              id="element-name"
              value={elementProperties.name}
              onChange={(e) => setElementProperties({
                ...elementProperties,
                name: e.target.value
              })}
            />
          </div>
          
          <div>
            <Label htmlFor="element-description">Description</Label>
            <Textarea
              id="element-description"
              value={elementProperties.description || ''}
              onChange={(e) => setElementProperties({
                ...elementProperties,
                description: e.target.value
              })}
              rows={3}
            />
          </div>
          
          {elementProperties.type === 'user-task' && (
            <div>
              <Label htmlFor="element-assignee">Assignee</Label>
              <Input
                id="element-assignee"
                value={elementProperties.assignee || ''}
                onChange={(e) => setElementProperties({
                  ...elementProperties,
                  assignee: e.target.value
                })}
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="element-color">Color</Label>
            <Input
              id="element-color"
              type="color"
              value={elementProperties.color}
              onChange={(e) => setElementProperties({
                ...elementProperties,
                color: e.target.value
              })}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
