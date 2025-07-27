
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  MoreHorizontal,
  Edit,
  Trash2,
  Share2,
  Bookmark
} from "lucide-react";
import { useCollaborationData } from "@/hooks/useCollaborationData";
import { useVoice } from "@/contexts/VoiceContext";

export const EnhancedProcessDiscussions: React.FC = () => {
  const { 
    discussions, 
    createDiscussion, 
    addReply, 
    toggleLike, 
    togglePin, 
    resolveDiscussion,
    currentUserId 
  } = useCollaborationData();
  const { speakText } = useVoice();

  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "replied">("recent");
  const [showResolved, setShowResolved] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    tags: "",
    processId: "",
    processName: ""
  });

  const allTags = Array.from(new Set(discussions.flatMap(d => d.tags)));

  const filteredDiscussions = discussions
    .filter(discussion => {
      const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === "all" || discussion.tags.includes(selectedTag);
      const matchesResolved = showResolved || !discussion.resolved;
      return matchesSearch && matchesTag && matchesResolved;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.likes.length - a.likes.length;
        case "replied":
          return b.replies.length - a.replies.length;
        case "recent":
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

  const handleCreateDiscussion = () => {
    if (!newDiscussion.title || !newDiscussion.content) {
      speakText("Please fill in the title and content fields");
      return;
    }

    const tags = newDiscussion.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    
    createDiscussion(newDiscussion.title, newDiscussion.content);

    setNewDiscussion({
      title: "",
      content: "",
      tags: "",
      processId: "",
      processName: ""
    });
    
    setIsCreating(false);
    speakText(`New discussion "${newDiscussion.title}" created successfully`);
  };

  const handleAddReply = (discussionId: string) => {
    if (!replyContent.trim()) {
      speakText("Please enter a reply message");
      return;
    }

    addReply(discussionId, replyContent);
    setReplyContent("");
    setReplyingTo(null);
    speakText("Reply added successfully");
  };

  const handleLike = (discussionId: string, replyId?: string) => {
    toggleLike(discussionId);
    speakText(replyId ? "Reply liked" : "Discussion liked");
  };

  const handlePin = (discussionId: string) => {
    togglePin(discussionId);
    const discussion = discussions.find(d => d.id === discussionId);
    speakText(discussion?.isPinned ? "Discussion unpinned" : "Discussion pinned");
  };

  const handleResolve = (discussionId: string) => {
    resolveDiscussion(discussionId);
    const discussion = discussions.find(d => d.id === discussionId);
    speakText(discussion?.resolved ? "Discussion reopened" : "Discussion marked as resolved");
  };

  const toggleReplies = (discussionId: string) => {
    const newExpanded = new Set(expandedReplies);
    if (newExpanded.has(discussionId)) {
      newExpanded.delete(discussionId);
    } else {
      newExpanded.add(discussionId);
    }
    setExpandedReplies(newExpanded);
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
        <Button onClick={() => {
          setIsCreating(true);
          speakText("Opening new discussion form");
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Start Discussion
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="replied">Most Replied</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2">
              <Button
                variant={showResolved ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setShowResolved(!showResolved);
                  speakText(showResolved ? "Hiding resolved discussions" : "Showing resolved discussions");
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                {showResolved ? "All" : "Active"}
              </Button>
            </div>
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
            <Input 
              placeholder="Discussion title..." 
              value={newDiscussion.title}
              onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
            />
            <Textarea 
              placeholder="Describe the topic or question..." 
              className="min-h-24" 
              value={newDiscussion.content}
              onChange={(e) => setNewDiscussion(prev => ({ ...prev, content: e.target.value }))}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                placeholder="Tags (comma-separated)..." 
                value={newDiscussion.tags}
                onChange={(e) => setNewDiscussion(prev => ({ ...prev, tags: e.target.value }))}
              />
              <Select value={newDiscussion.processId} onValueChange={(value) => setNewDiscussion(prev => ({ ...prev, processId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Link to Process (Optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="po-001">Purchase Order Process</SelectItem>
                  <SelectItem value="vendor-001">Vendor Onboarding</SelectItem>
                  <SelectItem value="invoice-001">Invoice Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateDiscussion}>
                Create Discussion
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
          <Card key={discussion.id} className={`${discussion.isPinned ? "border-primary" : ""} ${discussion.resolved ? "opacity-75" : ""}`}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Discussion Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{discussion.authorInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{discussion.title}</h3>
                        {discussion.isPinned && <Pin className="h-4 w-4 text-primary" />}
                        {discussion.resolved && (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Resolved
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{discussion.author}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(discussion.createdAt)}</span>
                        <span>•</span>
                        <span>{discussion.views} views</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handlePin(discussion.id)}>
                      <Pin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleResolve(discussion.id)}>
                      {discussion.resolved ? <MessageSquare className="h-4 w-4" /> : <Flag className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Discussion Content */}
                <p className="text-muted-foreground">{discussion.content}</p>
                
                {/* Tags */}
                <div className="flex items-center gap-2">
                  {discussion.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Process Link */}
                {discussion.processName && (
                  <Badge variant="secondary" className="text-xs">
                    📋 {discussion.processName}
                  </Badge>
                )}
                
                {/* Action Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleLike(discussion.id)}
                      className={`flex items-center gap-1 ${discussion.likes.includes(currentUserId) ? 'text-primary' : ''}`}
                    >
                      <ThumbsUp className="h-3 w-3" />
                      {discussion.likes.length}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleReplies(discussion.id)}
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      {discussion.replies.length} replies
                      {discussion.replies.length > 0 && (
                        expandedReplies.has(discussion.id) ? 
                        <ChevronUp className="h-3 w-3 ml-1" /> : 
                        <ChevronDown className="h-3 w-3 ml-1" />
                      )}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setReplyingTo(discussion.id);
                        speakText("Reply form opened");
                      }}
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>

                {/* Reply Form */}
                {replyingTo === discussion.id && (
                  <div className="space-y-3 pt-4 border-t">
                    <Textarea
                      placeholder="Write your reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="min-h-20"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={() => handleAddReply(discussion.id)}>
                        Post Reply
                      </Button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {expandedReplies.has(discussion.id) && discussion.replies.length > 0 && (
                  <div className="space-y-3 pt-4 border-t">
                    {discussion.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{reply.authorInitials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{reply.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(reply.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{reply.content}</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleLike(discussion.id, reply.id)}
                            className={`text-xs ${reply.likes.includes(currentUserId) ? 'text-primary' : ''}`}
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {reply.likes.length}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
              {searchTerm || selectedTag !== "all"
                ? "Try adjusting your search criteria"
                : "Start the first discussion about process improvements"
              }
            </p>
            {!searchTerm && selectedTag === "all" && (
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
