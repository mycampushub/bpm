
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Database, Tag, Calendar, User, FileText } from 'lucide-react';

export const ProcessAttributes: React.FC = () => {
  const [attributes, setAttributes] = useState({
    processId: 'PROC-2024-001',
    name: 'Customer Onboarding Process',
    description: 'Comprehensive workflow for new customer registration and verification',
    owner: 'John Smith',
    department: 'Customer Operations',
    category: 'Core Business Process',
    priority: 'High',
    estimatedDuration: '2-3 hours',
    slaTarget: '24 hours',
    complianceLevel: 'SOX Compliant',
    lastModified: '2024-01-15',
    version: '2.1.0',
    status: 'Active'
  });

  const [customAttributes, setCustomAttributes] = useState([
    { key: 'Cost Center', value: 'CC-001-OPS' },
    { key: 'Risk Level', value: 'Medium' },
    { key: 'Automation Level', value: '75%' }
  ]);

  const [tags, setTags] = useState(['customer', 'onboarding', 'compliance', 'kyc', 'automation']);

  const handleAttributeChange = (key: string, value: string) => {
    setAttributes(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Process Attributes & Metadata</h3>
        <p className="text-sm text-muted-foreground">Configure process properties and business metadata</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="h-4 w-4" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="processId">Process ID</Label>
              <Input
                id="processId"
                value={attributes.processId}
                onChange={(e) => handleAttributeChange('processId', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="name">Process Name</Label>
              <Input
                id="name"
                value={attributes.name}
                onChange={(e) => handleAttributeChange('name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={attributes.description}
                onChange={(e) => handleAttributeChange('description', e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="owner">Process Owner</Label>
              <Input
                id="owner"
                value={attributes.owner}
                onChange={(e) => handleAttributeChange('owner', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Business Classification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="department">Department</Label>
              <select
                id="department"
                className="w-full px-3 py-2 border rounded-md"
                value={attributes.department}
                onChange={(e) => handleAttributeChange('department', e.target.value)}
              >
                <option>Customer Operations</option>
                <option>Financial Services</option>
                <option>Human Resources</option>
                <option>IT Operations</option>
                <option>Supply Chain</option>
              </select>
            </div>
            <div>
              <Label htmlFor="category">Process Category</Label>
              <select
                id="category"
                className="w-full px-3 py-2 border rounded-md"
                value={attributes.category}
                onChange={(e) => handleAttributeChange('category', e.target.value)}
              >
                <option>Core Business Process</option>
                <option>Support Process</option>
                <option>Management Process</option>
                <option>Regulatory Process</option>
              </select>
            </div>
            <div>
              <Label htmlFor="priority">Priority Level</Label>
              <select
                id="priority"
                className="w-full px-3 py-2 border rounded-md"
                value={attributes.priority}
                onChange={(e) => handleAttributeChange('priority', e.target.value)}
              >
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <Label htmlFor="complianceLevel">Compliance Level</Label>
              <select
                id="complianceLevel"
                className="w-full px-3 py-2 border rounded-md"
                value={attributes.complianceLevel}
                onChange={(e) => handleAttributeChange('complianceLevel', e.target.value)}
              >
                <option>SOX Compliant</option>
                <option>ISO 9001</option>
                <option>GDPR Compliant</option>
                <option>Industry Standard</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Tags & Labels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {tag}
                <button
                  onClick={() => setTags(tags.filter((_, i) => i !== index))}
                  className="ml-1 text-xs hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Add new tag" className="flex-1" />
            <Button variant="outline">Add Tag</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Custom Attributes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {customAttributes.map((attr, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input value={attr.key} placeholder="Attribute name" className="flex-1" />
                <Input value={attr.value} placeholder="Value" className="flex-1" />
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Add Custom Attribute
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save All Attributes</Button>
      </div>
    </div>
  );
};
