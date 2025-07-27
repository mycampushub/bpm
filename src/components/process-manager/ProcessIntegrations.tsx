
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Link, Database, Cloud, Webhook, Settings, Plus, CheckCircle } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  type: 'api' | 'database' | 'service' | 'webhook';
  status: 'connected' | 'disconnected' | 'error';
  description: string;
  endpoint?: string;
  lastSync?: string;
}

export const ProcessIntegrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'CRM System',
      type: 'api',
      status: 'connected',
      description: 'Customer data synchronization',
      endpoint: 'https://api.crm.company.com/v1',
      lastSync: '2024-01-15T14:30:00Z'
    },
    {
      id: '2',
      name: 'Payment Gateway',
      type: 'service',
      status: 'connected',
      description: 'Payment processing integration',
      endpoint: 'https://api.payments.com/v2',
      lastSync: '2024-01-15T14:25:00Z'
    },
    {
      id: '3',
      name: 'Document Storage',
      type: 'database',
      status: 'disconnected',
      description: 'Document management system',
      endpoint: 'https://docs.company.com/api'
    },
    {
      id: '4',
      name: 'Notification Service',
      type: 'webhook',
      status: 'error',
      description: 'Email and SMS notifications',
      endpoint: 'https://notifications.company.com/webhook'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'api': return <Link className="h-4 w-4" />;
      case 'database': return <Database className="h-4 w-4" />;
      case 'service': return <Cloud className="h-4 w-4" />;
      case 'webhook': return <Webhook className="h-4 w-4" />;
      default: return <Link className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">System Integrations</h3>
          <p className="text-sm text-muted-foreground">Connect with external systems and services</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  {getTypeIcon(integration.type)}
                  {integration.name}
                </CardTitle>
                <Badge variant="outline" className={getStatusColor(integration.status)}>
                  {integration.status === 'connected' && <CheckCircle className="h-3 w-3 mr-1" />}
                  {integration.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{integration.description}</p>
              
              {integration.endpoint && (
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-1">Endpoint:</p>
                  <p className="text-xs font-mono bg-gray-100 p-2 rounded break-all">
                    {integration.endpoint}
                  </p>
                </div>
              )}
              
              {integration.lastSync && (
                <p className="text-xs text-muted-foreground mb-3">
                  Last sync: {new Date(integration.lastSync).toLocaleString()}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={integration.status === 'connected'} 
                    disabled={integration.status === 'error'}
                  />
                  <span className="text-sm">Active</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    Test
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Available Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Salesforce', 'Microsoft Teams', 'Slack', 'Jira', 'AWS S3', 'Google Drive'].map((service) => (
              <div key={service} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{service}</span>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Custom Integration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Integration Name</label>
            <Input placeholder="Enter integration name" className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">API Endpoint</label>
            <Input placeholder="https://api.example.com" className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Authentication</label>
            <select className="w-full px-3 py-2 border rounded-md mt-1">
              <option>API Key</option>
              <option>OAuth 2.0</option>
              <option>Basic Auth</option>
              <option>Bearer Token</option>
            </select>
          </div>
          <Button>Add Custom Integration</Button>
        </CardContent>
      </Card>
    </div>
  );
};
