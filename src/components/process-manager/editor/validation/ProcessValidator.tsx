
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface ProcessValidatorProps {
  elements: any[];
  connections: any[];
  onElementHighlight: (elementId: string | null) => void;
}

export const ProcessValidator: React.FC<ProcessValidatorProps> = ({ 
  elements, 
  connections, 
  onElementHighlight 
}) => {
  const [validationResults, setValidationResults] = useState<any[]>([]);

  useEffect(() => {
    validateProcess();
  }, [elements, connections]);

  const validateProcess = () => {
    const results = [];
    
    // Check for start events
    const startEvents = elements.filter(el => el.type === 'start-event');
    if (startEvents.length === 0) {
      results.push({
        type: 'error',
        message: 'Process must have at least one start event',
        elementId: null
      });
    }
    
    // Check for end events
    const endEvents = elements.filter(el => el.type === 'end-event');
    if (endEvents.length === 0) {
      results.push({
        type: 'error',
        message: 'Process must have at least one end event',
        elementId: null
      });
    }
    
    // Check for disconnected elements
    elements.forEach(element => {
      const hasIncoming = connections.some(conn => conn.target === element.id);
      const hasOutgoing = connections.some(conn => conn.source === element.id);
      
      if (!hasIncoming && element.type !== 'start-event') {
        results.push({
          type: 'warning',
          message: `Element "${element.name}" has no incoming connections`,
          elementId: element.id
        });
      }
      
      if (!hasOutgoing && element.type !== 'end-event') {
        results.push({
          type: 'warning',
          message: `Element "${element.name}" has no outgoing connections`,
          elementId: element.id
        });
      }
    });
    
    setValidationResults(results);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'error': return 'destructive';
      case 'warning': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Process Validation Results
          <Badge variant={validationResults.length === 0 ? 'default' : 'secondary'}>
            {validationResults.length === 0 ? 'Valid' : `${validationResults.length} Issues`}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {validationResults.length === 0 ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-4 w-4" />
            Process is valid and ready for deployment
          </div>
        ) : (
          <div className="space-y-2">
            {validationResults.map((result, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 p-2 rounded border cursor-pointer hover:bg-muted"
                onClick={() => onElementHighlight(result.elementId)}
              >
                {getIcon(result.type)}
                <span className="flex-1">{result.message}</span>
                <Badge variant={getBadgeVariant(result.type)}>
                  {result.type}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
