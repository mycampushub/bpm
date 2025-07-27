
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, User, GitBranch, Download, Eye } from 'lucide-react';

interface VersionHistoryItem {
  id: string;
  version: string;
  timestamp: string;
  author: string;
  changes: string;
  status: 'current' | 'previous' | 'archived';
}

export const ProcessVersionHistory: React.FC = () => {
  const versions: VersionHistoryItem[] = [
    {
      id: '1',
      version: '2.1.0',
      timestamp: '2024-01-15T14:30:00Z',
      author: 'John Smith',
      changes: 'Updated approval workflow and added compliance checks',
      status: 'current'
    },
    {
      id: '2',
      version: '2.0.3',
      timestamp: '2024-01-12T09:15:00Z',
      author: 'Sarah Johnson',
      changes: 'Fixed gateway conditions and optimized process flow',
      status: 'previous'
    },
    {
      id: '3',
      version: '2.0.2',
      timestamp: '2024-01-10T16:45:00Z',
      author: 'Mike Wilson',
      changes: 'Added new subprocess for document validation',
      status: 'previous'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Version History</h3>
        <Button variant="outline" size="sm">
          <GitBranch className="h-4 w-4 mr-2" />
          Create Branch
        </Button>
      </div>
      
      <div className="space-y-3">
        {versions.map((version) => (
          <Card key={version.id} className={version.status === 'current' ? 'border-blue-200 bg-blue-50/50' : ''}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant={version.status === 'current' ? 'default' : 'secondary'}>
                      v{version.version}
                    </Badge>
                    {version.status === 'current' && (
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm mb-2">{version.changes}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {version.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(version.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  {version.status !== 'current' && (
                    <Button variant="outline" size="sm">
                      Restore
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
