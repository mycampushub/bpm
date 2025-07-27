
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  User,
  Calendar,
  FileText,
  Eye,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Send,
  Download
} from "lucide-react";

interface ApprovalRequest {
  id: string;
  title: string;
  description: string;
  type: "process-change" | "new-process" | "process-retirement" | "compliance-update";
  status: "pending" | "approved" | "rejected" | "in-review";
  submittedBy: string;
  submittedByInitials: string;
  submittedAt: string;
  dueDate: string;
  currentApprover: string;
  approvalWorkflow: Array<{
    step: number;
    approver: string;
    role: string;
    status: "pending" | "approved" | "rejected";
    approvedAt?: string;
    comments?: string;
  }>;
  attachments: string[];
  priority: "low" | "medium" | "high" | "critical";
}

export const WorkflowApprovals: React.FC = () => {
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([
    {
      id: "1",
      title: "Update Purchase Order Approval Process",
      description: "Modify the approval workflow to include additional risk assessment step for orders over $50,000",
      type: "process-change",
      status: "pending",
      submittedBy: "Sarah Chen",
      submittedByInitials: "SC",
      submittedAt: "2024-01-15",
      dueDate: "2024-01-22",
      currentApprover: "Mike Rodriguez",
      approvalWorkflow: [
        {
          step: 1,
          approver: "Mike Rodriguez",
          role: "Process Owner",
          status: "pending"
        },
        {
          step: 2,
          approver: "Lisa Wang",
          role: "Compliance Manager",
          status: "pending"
        },
        {
          step: 3,
          approver: "John Smith",
          role: "Department Head",
          status: "pending"
        }
      ],
      attachments: ["process-diagram.bpmn", "risk-assessment.pdf"],
      priority: "high"
    },
    {
      id: "2",
      title: "New Employee Onboarding Process",
      description: "Implement standardized onboarding process for remote employees including security training and equipment setup",
      type: "new-process",
      status: "in-review",
      submittedBy: "David Park",
      submittedByInitials: "DP",
      submittedAt: "2024-01-14",
      dueDate: "2024-01-21",
      currentApprover: "Lisa Wang",
      approvalWorkflow: [
        {
          step: 1,
          approver: "Mike Rodriguez",
          role: "Process Owner",
          status: "approved",
          approvedAt: "2024-01-15",
          comments: "Looks good, minor suggestions for security section"
        },
        {
          step: 2,
          approver: "Lisa Wang",
          role: "HR Manager",
          status: "pending"
        },
        {
          step: 3,
          approver: "John Smith",
          role: "Department Head",
          status: "pending"
        }
      ],
      attachments: ["onboarding-checklist.pdf"],
      priority: "medium"
    }
  ]);

  const [selectedApproval, setSelectedApproval] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const handleApprove = (id: string) => {
    setApprovals(approvals.map(approval => {
      if (approval.id === id) {
        const currentStepIndex = approval.approvalWorkflow.findIndex(step => step.status === "pending");
        if (currentStepIndex !== -1) {
          const updatedWorkflow = [...approval.approvalWorkflow];
          updatedWorkflow[currentStepIndex] = {
            ...updatedWorkflow[currentStepIndex],
            status: "approved",
            approvedAt: new Date().toISOString().split('T')[0],
            comments: comment
          };
          
          const nextStepExists = currentStepIndex + 1 < updatedWorkflow.length;
          const newStatus = nextStepExists ? "in-review" : "approved";
          const newCurrentApprover = nextStepExists ? updatedWorkflow[currentStepIndex + 1].approver : "";
          
          return {
            ...approval,
            approvalWorkflow: updatedWorkflow,
            status: newStatus as any,
            currentApprover: newCurrentApprover
          };
        }
      }
      return approval;
    }));
    setComment("");
    setSelectedApproval(null);
  };

  const handleReject = (id: string) => {
    setApprovals(approvals.map(approval => {
      if (approval.id === id) {
        const currentStepIndex = approval.approvalWorkflow.findIndex(step => step.status === "pending");
        if (currentStepIndex !== -1) {
          const updatedWorkflow = [...approval.approvalWorkflow];
          updatedWorkflow[currentStepIndex] = {
            ...updatedWorkflow[currentStepIndex],
            status: "rejected",
            approvedAt: new Date().toISOString().split('T')[0],
            comments: comment
          };
          
          return {
            ...approval,
            approvalWorkflow: updatedWorkflow,
            status: "rejected" as any
          };
        }
      }
      return approval;
    }));
    setComment("");
    setSelectedApproval(null);
  };

  const getStatusIcon = (status: ApprovalRequest["status"]) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "approved": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected": return <XCircle className="h-4 w-4 text-red-500" />;
      case "in-review": return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: ApprovalRequest["status"]) => {
    const variants = {
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
      "in-review": "outline"
    } as const;
    
    return <Badge variant={variants[status]}>{status.replace("-", " ")}</Badge>;
  };

  const getPriorityBadge = (priority: ApprovalRequest["priority"]) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      critical: "bg-red-100 text-red-800"
    };
    
    return <Badge className={colors[priority]}>{priority}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CheckCircle className="h-6 w-6" />
            Workflow Approvals
          </h2>
          <p className="text-muted-foreground">Review and approve process changes</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800">
            {approvals.filter(a => a.status === "pending").length} Pending
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-800">
            {approvals.filter(a => a.status === "in-review").length} In Review
          </Badge>
        </div>
      </div>

      {/* Approvals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {approvals.map((approval) => (
          <Card key={approval.id} className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{approval.title}</CardTitle>
                    {getStatusIcon(approval.status)}
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(approval.status)}
                    {getPriorityBadge(approval.priority)}
                    <Badge variant="outline" className="text-xs">
                      {approval.type.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{approval.description}</p>
              
              {/* Submission Info */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">{approval.submittedByInitials}</AvatarFallback>
                  </Avatar>
                  <span>{approval.submittedBy}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  Due: {approval.dueDate}
                </div>
              </div>

              {/* Approval Workflow */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Approval Progress</div>
                {approval.approvalWorkflow.map((step, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="flex-shrink-0">
                      {step.status === "approved" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {step.status === "rejected" && <XCircle className="h-4 w-4 text-red-500" />}
                      {step.status === "pending" && index === approval.approvalWorkflow.findIndex(s => s.status === "pending") && (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      )}
                      {step.status === "pending" && index !== approval.approvalWorkflow.findIndex(s => s.status === "pending") && (
                        <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{step.approver}</div>
                      <div className="text-xs text-muted-foreground">{step.role}</div>
                      {step.comments && (
                        <div className="text-xs text-muted-foreground italic mt-1">"{step.comments}"</div>
                      )}
                    </div>
                    {step.approvedAt && (
                      <div className="text-xs text-muted-foreground">{step.approvedAt}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Attachments */}
              {approval.attachments.length > 0 && (
                <div>
                  <div className="text-sm font-medium mb-2">Attachments</div>
                  <div className="space-y-1">
                    {approval.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <FileText className="h-3 w-3" />
                        <span className="text-blue-600 hover:underline cursor-pointer">{attachment}</span>
                        <Button variant="ghost" size="icon" className="h-4 w-4">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button variant="outline" size="sm">
                  <Eye className="h-3 w-3 mr-2" />
                  View Details
                </Button>
                
                {approval.currentApprover === "Mike Rodriguez" && approval.status === "pending" && (
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedApproval(selectedApproval === approval.id ? null : approval.id)}
                    >
                      <MessageSquare className="h-3 w-3 mr-2" />
                      Comment
                    </Button>
                  </div>
                )}
              </div>

              {/* Comment and Action Section */}
              {selectedApproval === approval.id && (
                <div className="space-y-3 pt-4 border-t">
                  <Textarea
                    placeholder="Add your comments..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-20"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReject(approval.id)}
                    >
                      <ThumbsDown className="h-3 w-3 mr-2" />
                      Reject
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleApprove(approval.id)}
                    >
                      <ThumbsUp className="h-3 w-3 mr-2" />
                      Approve
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {approvals.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No pending approvals</h3>
            <p className="text-muted-foreground">
              All process changes have been reviewed and processed.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
