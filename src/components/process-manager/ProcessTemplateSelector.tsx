
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { complexProcessTemplates } from '@/data/processTemplates';
import { FileText, Play } from 'lucide-react';

interface ProcessTemplateSelectorProps {
  onLoadTemplate: (templateId: string) => void;
  onPreviewTemplate: (templateId: string) => void;
}

export const ProcessTemplateSelector: React.FC<ProcessTemplateSelectorProps> = ({
  onLoadTemplate,
  onPreviewTemplate
}) => {
  const handleLoadTemplate = (templateId: string) => {
    // Load template data and pass to editor
    const template = complexProcessTemplates.find(t => t.id === templateId);
    if (template) {
      // Convert template to elements and connections
      onLoadTemplate(templateId);
    }
  };

  const handlePreviewTemplate = (templateId: string) => {
    // Show template preview
    onPreviewTemplate(templateId);
  };
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select a Process Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {complexProcessTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                {template.name}
                <Badge variant="outline">{template.category}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {template.description}
              </p>
              <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                <span>Complexity: {template.properties.complexity}</span>
                <span>•</span>
                <span>Industry: {template.properties.industry}</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => handleLoadTemplate(template.id)}
                  className="flex-1"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Load Template
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handlePreviewTemplate(template.id)}
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
