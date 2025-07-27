
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ProcessTemplateSelector } from '../../ProcessTemplateSelector';
import { Layers } from 'lucide-react';

interface TemplateSelectorProps {
  onLoadTemplate: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onLoadTemplate
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLoadTemplate = (templateId: string) => {
    onLoadTemplate(templateId);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Layers className="h-4 w-4" />
          Load Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Process Templates</DialogTitle>
        </DialogHeader>
        
        <ProcessTemplateSelector
          onLoadTemplate={handleLoadTemplate}
          onPreviewTemplate={(templateId) => console.log('Preview:', templateId)}
        />
      </DialogContent>
    </Dialog>
  );
};
