
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ProcessTemplateSelector } from '../ProcessTemplateSelector';
import { useRepository } from '@/hooks/useRepository';
import { Search, Filter, Grid, List, Plus, Eye, Edit, Download, Share2, Trash2 } from 'lucide-react';

interface EnterpriseProcessManagerProps {
  onLoadTemplate: (templateId: string) => void;
  onCreateTemplate: () => void;
  onUpdateTemplate: (templateId: string) => void;
  onDeleteTemplate: (templateId: string) => void;
}

export const EnterpriseProcessManager: React.FC<EnterpriseProcessManagerProps> = ({
  onLoadTemplate,
  onCreateTemplate,
  onUpdateTemplate,
  onDeleteTemplate
}) => {
  const [activeView, setActiveView] = useState<'templates' | 'repository'>('templates');
  const {
    filteredItems,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    viewMode,
    setViewMode,
    handleViewItem,
    handleEditItem,
    handleShareItem,
    handleDownloadItem,
    deleteItem
  } = useRepository();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Enterprise Process Repository</h3>
          <p className="text-sm text-muted-foreground">
            Manage process templates, models, and reusable components
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeView === 'templates' ? 'default' : 'outline'}
            onClick={() => setActiveView('templates')}
          >
            Templates
          </Button>
          <Button
            variant={activeView === 'repository' ? 'default' : 'outline'}
            onClick={() => setActiveView('repository')}
          >
            Repository
          </Button>
        </div>
      </div>

      {activeView === 'templates' ? (
        <ProcessTemplateSelector
          onLoadTemplate={onLoadTemplate}
          onPreviewTemplate={(templateId) => console.log('Preview template:', templateId)}
        />
      ) : (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Process Repository</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button onClick={onCreateTemplate}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Process
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search processes, templates, and frameworks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Categories</option>
                <option value="customer">Customer</option>
                <option value="finance">Finance</option>
                <option value="compliance">Compliance</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
              {filteredItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{item.type}</Badge>
                          <Badge variant="secondary">{item.status}</Badge>
                          <span className="text-xs text-muted-foreground">v{item.version}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>{item.owner}</span>
                      <span>{item.size}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewItem(item)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleShareItem(item)}>
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDownloadItem(item)}>
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteItem(item.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
