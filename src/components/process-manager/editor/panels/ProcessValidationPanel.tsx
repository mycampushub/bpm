
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ValidationIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  elementId?: string;
  suggestion?: string;
}

interface ProcessValidationPanelProps {
  elements: any[];
  connections: any[];
  onClose: () => void;
}

export const ProcessValidationPanel: React.FC<ProcessValidationPanelProps> = ({
  elements,
  connections,
  onClose
}) => {
  // Mock validation logic
  const validateProcess = (): ValidationIssue[] => {
    const issues: ValidationIssue[] = [];
    
    // Check for start events
    const startEvents = elements.filter(el => el.type === 'start-event');
    if (startEvents.length === 0) {
      issues.push({
        id: 'no-start',
        type: 'error',
        message: 'Process must have at least one start event',
        suggestion: 'Add a start event to begin the process flow'
      });
    }
    
    // Check for end events
    const endEvents = elements.filter(el => el.type === 'end-event');
    if (endEvents.length === 0) {
      issues.push({
        id: 'no-end',
        type: 'error',
        message: 'Process must have at least one end event',
        suggestion: 'Add an end event to complete the process flow'
      });
    }
    
    // Check for disconnected elements
    elements.forEach(element => {
      const hasIncoming = connections.some(conn => conn.target === element.id);
      const hasOutgoing = connections.some(conn => conn.source === element.id);
      
      if (!hasIncoming && element.type !== 'start-event') {
        issues.push({
          id: `disconnected-${element.id}`,
          type: 'warning',
          message: `Element "${element.name}" has no incoming connections`,
          elementId: element.id,
          suggestion: 'Connect this element to ensure proper process flow'
        });
      }
      
      if (!hasOutgoing && element.type !== 'end-event') {
        issues.push({
          id: `no-outgoing-${element.id}`,
          type: 'warning',
          message: `Element "${element.name}" has no outgoing connections`,
          elementId: element.id,
          suggestion: 'Add connections to continue the process flow'
        });
      }
    });
    
    // Add some info messages
    if (elements.length > 10) {
      issues.push({
        id: 'complex-process',
        type: 'info',
        message: 'Process has many elements - consider breaking into sub-processes',
        suggestion: 'Use sub-processes to improve readability and maintainability'
      });
    }
    
    return issues;
  };

  const issues = validateProcess();
  const errorCount = issues.filter(i => i.type === 'error').length;
  const warningCount = issues.filter(i => i.type === 'warning').length;
  const infoCount = issues.filter(i => i.type === 'info').length;

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'error': return 'border-l-red-500 bg-red-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-green-500 bg-green-50';
    }
  };

  return (
    <Card className="absolute right-4 top-4 w-96 max-h-96 overflow-y-auto z-20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Process Validation</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <XCircle className="h-4 w-4 text-red-500" />
            <span>{errorCount} Errors</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span>{warningCount} Warnings</span>
          </div>
          <div className="flex items-center gap-1">
            <Info className="h-4 w-4 text-blue-500" />
            <span>{infoCount} Info</span>
          </div>
        </div>

        {issues.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <p className="font-medium">Process is valid!</p>
            <p className="text-sm text-muted-foreground">No issues found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className={`p-3 border-l-4 rounded-r ${getIssueColor(issue.type)}`}
              >
                <div className="flex items-start gap-2">
                  {getIssueIcon(issue.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{issue.message}</p>
                    {issue.suggestion && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {issue.suggestion}
                      </p>
                    )}
                    {issue.elementId && (
                      <Badge variant="outline" className="text-xs mt-1">
                        {issue.elementId}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
