
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
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
  Download,
  History,
  Filter,
  Search,
  MoreHorizontal,
  Users,
  Tag
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVoice } from "@/contexts/VoiceContext";

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
  tags: string[];
  impact: string;
  businessJustification: string;
  riskAssessment: string;
  timeline: string;
  stakeholders: string[];
  comments: Array<{
    id: string;
    author: string;
    authorInitials: string;
    content: string;
    timestamp: string;
    type: "comment" | "approval" | "rejection" | "request-info";
  }>;
}

export const EnhancedWorkflowApprovals: React.FC = () => {
  const { speakText } = useVoice();
  const currentUser = "Mike Rodriguez"; // Mock current user
  
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([
    {
      id: "1",
      title: "Update Purchase Order Approval Process",
      description: "Modify the approval workflow to include additional risk assessment step for orders over $50,000. This will help ensure compliance with new financial regulations and reduce procurement risks.",
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
      attachments: ["process-diagram.bpmn", "risk-assessment.pdf", "compliance-checklist.xlsx"],
      priority: "high",
      tags: ["procurement", "compliance", "risk-management"],
      impact: "High - affects all purchase orders over $50k",
      businessJustification: "Required for regulatory compliance and risk reduction",
      riskAssessment: "Medium risk if not implemented by Q1 deadline",
      timeline: "Implementation required by January 31, 2024",
      stakeholders: ["Procurement Team", "Finance Department", "Legal Team"],
      comments: [
        {
          id: "c1",
          author: "Sarah Chen",
          authorInitials: "SC",
          content: "This change is critical for compliance with new SOX requirements. I've attached the detailed risk assessment.",
          timestamp: "2024-01-15T10:30:00Z",
          type: "comment"
        }
      ]
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
      priority: "medium",
      tags: ["hr", "onboarding", "remote-work"],
      impact: "Medium - affects new hire experience",
      businessJustification: "Standardize remote onboarding experience",
      riskAssessment: "Low risk, process improvement initiative",
      timeline: "Rollout planned for February 2024",
      stakeholders: ["HR Department", "IT Team", "Security Team"],
      comments: [
        {
          id: "c2",
          author: "Mike Rodriguez",
          authorInitials: "MR",
          content: "Approved with minor suggestions. Please add more detail to the security training section.",
          timestamp: "2024-01-15T14:20:00Z",
          type: "approval"
        }
      ]
    }
  ]);

  const [selectedApproval, setSelectedApproval] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [viewDetailsId, setViewDetailsId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");

  const filteredApprovals = approvals.filter(approval => {
    const matchesSearch = approval.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         approval.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || approval.status === statusFilter;
    const matchesPriority = !priorityFilter || approval.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

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
          
          // Add approval comment
          const newComment = {
            id: `c${Date.now()}`,
            author: currentUser,
            authorInitials: "MR",
            content: comment || `Approved step ${currentStepIndex + 1}`,
            timestamp: new Date().toISOString(),
            type: "approval" as const
          };
          
          return {
            ...approval,
            approvalWorkflow: updatedWorkflow,
            status: newStatus as any,
            currentApprover: newCurrentApprover,
            comments: [...approval.comments, newComment]
          };
        }
      }
      return approval;
    }));
    
    setComment("");
    setSelectedApproval(null);
    speakText("Approval submitted successfully");
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
          
          // Add rejection comment
          const newComment = {
            id: `c${Date.now()}`,
            author: currentUser,
            authorInitials: "MR",
            content: comment || `Rejected step ${currentStepIndex + 1}`,
            timestamp: new Date().toISOString(),
            type: "rejection" as const
          };
          
          return {
            ...approval,
            approvalWorkflow: updatedWorkflow,
            status: "rejected" as any,
            comments: [...approval.comments, newComment]
          };
        }
      }
      return approval;
    }));
    
    setComment("");
    setSelectedApproval(null);
    speakText("Request rejected with comments");
  };

  const addComment = (id: string) => {
    if (!comment.trim()) {
      speakText("Please enter a comment");
      return;
    }

    setApprovals(approvals.map(approval => {
      if (approval.id === id) {
        const newComment = {
          id: `c${Date.now()}`,
          author: currentUser,
          authorInitials: "MR",
          content: comment,
          timestamp: new Date().toISOString(),
          type: "comment" as const
        };
        
        return {
          ...approval,
          comments: [...approval.comments, newComment]
        };
      }
      return approval;
    }));
    
    setComment("");
    speakText("Comment added successfully");
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const DetailedApprovalView = ({ approval }: { approval: ApprovalRequest }) => (
    <Dialog open={viewDetailsId === approval.id} onOpenChange={(open) => !open && setViewDetailsId(null)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStatusIcon(approval.status)}
            {approval.title}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(approval.status)}
                    {getPriorityBadge(approval.priority)}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Submitted By</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{approval.submittedByInitials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{approval.submittedBy}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Timeline</label>
                  <p className="text-sm text-muted-foreground mt-1">{approval.timeline}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Due Date</label>
                  <p className="text-sm text-muted-foreground mt-1">{formatDate(approval.dueDate)}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Impact</label>
                  <p className="text-sm text-muted-foreground mt-1">{approval.impact}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Risk Assessment</label>
                  <p className="text-sm text-muted-foreground mt-1">{approval.riskAssessment}</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <p className="text-sm text-muted-foreground mt-1">{approval.description}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium">Business Justification</label>
              <p className="text-sm text-muted-foreground mt-1">{approval.businessJustification}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium">Tags</label>
              <div className="flex gap-2 mt-1">
                {approval.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Stakeholders</label>
              <div className="flex gap-2 mt-1">
                {approval.stakeholders.map(stakeholder => (
                  <Badge key={stakeholder} variant="secondary" className="text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    {stakeholder}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="workflow" className="space-y-4">
            <div className="space-y-4">
              {approval.approvalWorkflow.map((step, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    {step.status === "approved" && <CheckCircle className="h-6 w-6 text-green-500" />}
                    {step.status === "rejected" && <XCircle className="h-6 w-6 text-red-500" />}
                    {step.status === "pending" && index === approval.approvalWorkflow.findIndex(s => s.status === "pending") && (
                      <Clock className="h-6 w-6 text-yellow-500" />
                    )}
                    {step.status === "pending" && index !== approval.approvalWorkflow.findIndex(s => s.status === "pending") && (
                      <div className="h-6 w-6 border-2 border-gray-300 rounded-full" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Step {step.step}: {step.approver}</div>
                        <div className="text-sm text-muted-foreground">{step.role}</div>
                      </div>
                      {step.approvedAt && (
                        <div className="text-sm text-muted-foreground">{formatDate(step.approvedAt)}</div>
                      )}
                    </div>
                    {step.comments && (
                      <div className="mt-2 p-2 bg-muted rounded text-sm">
                        {step.comments}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="attachments" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {approval.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">{attachment}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="comments" className="space-y-4">
            <div className="space-y-4">
              {approval.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 p-3 border rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{comment.authorInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <Badge variant="outline" className="text-xs">{comment.type}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.content}</p>
                  </div>
                </div>
              ))}
              
              <div className="space-y-3 pt-4 border-t">
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-20"
                />
                <div className="flex justify-end">
                  <Button size="sm" onClick={() => addComment(approval.id)}>
                    <Send className="h-3 w-3 mr-2" />
                    Add Comment
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <History className="h-4 w-4" />
                <span className="font-medium">Approval History</span>
              </div>
              {/* This would show detailed audit trail */}
              <div className="text-sm text-muted-foreground">
                Complete audit trail functionality would be implemented here
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );

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

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search approvals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Approvals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredApprovals.map((approval) => (
          <div key={approval.id}>
            <Card className="h-full">
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
                <p className="text-sm text-muted-foreground line-clamp-3">{approval.description}</p>
                
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
                    Due: {formatDate(approval.dueDate)}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Progress</div>
                  <div className="flex items-center gap-1">
                    {approval.approvalWorkflow.map((step, index) => (
                      <div key={index} className="flex-1">
                        <div className={`h-2 rounded-full ${
                          step.status === "approved" ? "bg-green-500" :
                          step.status === "rejected" ? "bg-red-500" :
                          step.status === "pending" && index === approval.approvalWorkflow.findIndex(s => s.status === "pending") ? "bg-yellow-500" :
                          "bg-gray-200"
                        }`} />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Step {approval.approvalWorkflow.findIndex(s => s.status === "pending") + 1} of {approval.approvalWorkflow.length}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  {approval.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setViewDetailsId(approval.id);
                      speakText(`Opening detailed view for ${approval.title}`);
                    }}
                  >
                    <Eye className="h-3 w-3 mr-2" />
                    View Details
                  </Button>
                  
                  {approval.currentApprover === currentUser && approval.status === "pending" && (
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedApproval(selectedApproval === approval.id ? null : approval.id);
                          speakText("Opening approval actions");
                        }}
                      >
                        <MessageSquare className="h-3 w-3 mr-2" />
                        Actions
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
                        variant="outline" 
                        size="sm"
                        onClick={() => addComment(approval.id)}
                      >
                        <MessageSquare className="h-3 w-3 mr-2" />
                        Comment
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
            
            <DetailedApprovalView approval={approval} />
          </div>
        ))}
      </div>

      {filteredApprovals.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No approvals found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter || priorityFilter 
                ? "Try adjusting your search criteria"
                : "All process changes have been reviewed and processed."
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
