
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Shield, CheckCircle, AlertTriangle, Clock, User, FileText } from 'lucide-react';

interface GovernanceRule {
  id: string;
  name: string;
  type: 'approval' | 'compliance' | 'audit' | 'security';
  enabled: boolean;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface ApprovalWorkflow {
  id: string;
  name: string;
  approver: string;
  status: 'pending' | 'approved' | 'rejected';
  dueDate: string;
  comments?: string;
}

export const ProcessGovernance: React.FC = () => {
  const [governanceRules, setGovernanceRules] = useState<GovernanceRule[]>([
    {
      id: '1',
      name: 'SOX Compliance Check',
      type: 'compliance',
      enabled: true,
      description: 'Ensure all financial processes comply with Sarbanes-Oxley requirements',
      severity: 'critical'
    },
    {
      id: '2',
      name: 'Manager Approval Required',
      type: 'approval',
      enabled: true,
      description: 'High-value transactions require manager approval',
      severity: 'high'
    },
    {
      id: '3',
      name: 'Data Privacy Review',
      type: 'security',
      enabled: true,
      description: 'GDPR compliance check for customer data handling',
      severity: 'high'
    },
    {
      id: '4',
      name: 'Audit Trail Logging',
      type: 'audit',
      enabled: true,
      description: 'Comprehensive logging of all process activities',
      severity: 'medium'
    }
  ]);

  const [approvalWorkflows, setApprovalWorkflows] = useState<ApprovalWorkflow[]>([
    {
      id: '1',
      name: 'Process Design Review',
      approver: 'Sarah Johnson',
      status: 'pending',
      dueDate: '2024-01-20',
      comments: 'Please review the updated gateway conditions'
    },
    {
      id: '2',
      name: 'Compliance Verification',
      approver: 'Mike Wilson',
      status: 'approved',
      dueDate: '2024-01-18',
      comments: 'All compliance requirements met'
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'approval': return <User className="h-4 w-4" />;
      case 'compliance': return <Shield className="h-4 w-4" />;
      case 'audit': return <FileText className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Process Governance & Compliance</h3>
        <p className="text-sm text-muted-foreground">Manage approval workflows, compliance rules, and audit requirements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Governance Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {governanceRules.map((rule) => (
                <div key={rule.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeIcon(rule.type)}
                      <span className="font-medium">{rule.name}</span>
                      <Badge variant="outline" className={getSeverityColor(rule.severity)}>
                        {rule.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  </div>
                  <Switch checked={rule.enabled} />
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Add New Rule
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Approval Workflows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {approvalWorkflows.map((workflow) => (
                <div key={workflow.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{workflow.name}</span>
                    <Badge variant="outline" className={getStatusColor(workflow.status)}>
                      {workflow.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Approver: {workflow.approver}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Due: {new Date(workflow.dueDate).toLocaleDateString()}
                    </div>
                    {workflow.comments && (
                      <p className="text-xs mt-2 p-2 bg-gray-50 rounded">
                        {workflow.comments}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Create Approval Workflow
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Compliance Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-sm text-muted-foreground">Compliance Score</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-muted-foreground">Active Rules</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-muted-foreground">Pending Approvals</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-sm text-muted-foreground">Violations</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div className="flex-1">
                <p className="font-medium text-red-800">Compliance Violation Detected</p>
                <p className="text-sm text-red-600">Process lacks required audit trail for financial transactions</p>
              </div>
              <Button variant="outline" size="sm">
                Resolve
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Risk Level Assessment</label>
            <select className="w-full px-3 py-2 border rounded-md mt-1">
              <option>Low Risk</option>
              <option>Medium Risk</option>
              <option>High Risk</option>
              <option>Critical Risk</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Risk Mitigation Notes</label>
            <Textarea 
              placeholder="Document risk mitigation strategies and controls..."
              rows={3}
              className="mt-1"
            />
          </div>
          <Button>Update Risk Assessment</Button>
        </CardContent>
      </Card>
    </div>
  );
};
