
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Plus, 
  Reply, 
  ThumbsUp, 
  ThumbsDown,
  Pin,
  Flag,
  Clock,
  User,
  Tag,
  Search,
  Filter
} from "lucide-react";

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  authorInitials: string;
  createdAt: string;
  replies: number;
  likes: number;
  tags: string[];
  isPinned: boolean;
  isResolved: boolean;
  processId?: string;
  processName?: string;
}

export const ProcessDiscussions: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: "1",
      title: "Approval process bottleneck in Purchase Order flow",
      content: "We're seeing significant delays in the PO approval step. Multiple stakeholders have reported that requests are sitting in the approval queue for 3-5 days on average.",
      author: "Sarah Chen",
      authorInitials: "SC",
      createdAt: "2 hours ago",
      replies: 8,
      likes: 12,
      tags: ["bottleneck", "approval", "purchase-order"],
      isPinned: true,
      isResolved: false,
      processId: "po-001",
      processName: "Purchase Order Process"
    },
    {
      id: "2",
      title: "Question about compliance requirements for new vendor onboarding",
      content: "What are the specific compliance checks we need to implement for vendor onboarding? The current process seems to be missing some regulatory requirements.",
      author: "Mike Rodriguez",
      authorInitials: "MR",
      createdAt: "5 hours ago",
      replies: 3,
      likes: 6,
      tags: ["compliance", "vendor-onboarding", "question"],
      isPinned: false,
      isResolved: false,
      processId: "vendor-001",
      processName: "Vendor Onboarding"
    },
    {
      id: "3",
      title: "Automation opportunity in invoice processing",
      content: "I've identified several manual steps in our invoice processing that could be automated. This could reduce processing time by 60%.",
      author: "Lisa Wang",
      authorInitials: "LW",
      createdAt: "1 day ago",
      replies: 15,
      likes: 24,
      tags: ["automation", "invoice", "optimization"],
      isPinned: false,
      isResolved: true,
      processId: "invoice-001",
      processName: "Invoice Processing"
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const allTags = Array.from(new Set(discussions.flatMap(d => d.tags)));

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || discussion.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleLike = (id: string) => {
    setDiscussions(discussions.map(d => 
      d.id === id ? { ...d, likes: d.likes + 1 } : d
    ));
  };

  const handlePin = (id: string) => {
    setDiscussions(discussions.map(d => 
      d.id === id ? { ...d, isPinned: !d.isPinned } : d
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            Process Discussions
          </h2>
          <p className="text-muted-foreground">Collaborate and discuss process improvements</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Start Discussion
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={selectedTag} 
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create Discussion Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Start New Discussion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Discussion title..." />
            <Textarea placeholder="Describe the topic or question..." className="min-h-24" />
            <div className="flex items-center gap-4">
              <Input placeholder="Add tags (comma-separated)..." />
              <select className="px-3 py-2 border rounded-md">
                <option value="">Select Process (Optional)</option>
                <option value="po-001">Purchase Order Process</option>
                <option value="vendor-001">Vendor Onboarding</option>
                <option value="invoice-001">Invoice Processing</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreating(false)}>
                Start Discussion
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Discussions List */}
      <div className="space-y-4">
        {filteredDiscussions
          .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
          .map((discussion) => (
          <Card key={discussion.id} className={discussion.isPinned ? "border-primary" : ""}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>{discussion.authorInitials}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{discussion.title}</h3>
                      {discussion.isPinned && (
                        <Pin className="h-4 w-4 text-primary" />
                      )}
                      {discussion.isResolved && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Resolved
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handlePin(discussion.id)}>
                        <Pin className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{discussion.content}</p>
                  
                  {/* Tags */}
                  <div className="flex items-center gap-2 mb-3">
                    {discussion.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Process Link */}
                  {discussion.processName && (
                    <div className="mb-3">
                      <Badge variant="secondary" className="text-xs">
                        📋 {discussion.processName}
                      </Badge>
                    </div>
                  )}
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {discussion.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {discussion.createdAt}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {discussion.replies} replies
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleLike(discussion.id)}
                        className="flex items-center gap-1"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        {discussion.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Reply className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDiscussions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No discussions found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedTag 
                ? "Try adjusting your search criteria"
                : "Start the first discussion about process improvements"
              }
            </p>
            {!searchTerm && !selectedTag && (
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Start Discussion
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
