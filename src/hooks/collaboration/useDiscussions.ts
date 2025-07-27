
import { useState } from "react";

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  authorInitials: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  likes: string[];
  views: number;
  replies: Reply[];
  isPinned: boolean;
  isResolved: boolean;
  processId?: string;
  processName?: string;
}

export interface Reply {
  id: string;
  content: string;
  author: string;
  authorInitials: string;
  createdAt: string;
  likes: string[];
}

export const useDiscussions = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: "1",
      title: "Streamline Purchase Order Approval Process",
      content: "Currently, our PO approval process takes too long with multiple handoffs. Can we reduce the approval steps?",
      author: "Sarah Chen",
      authorInitials: "SC",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      tags: ["approval", "efficiency", "procurement"],
      likes: ["user1", "user2"],
      views: 23,
      replies: [
        {
          id: "r1",
          content: "I agree! We could combine steps 2 and 3 into a single approval.",
          author: "Mike Johnson",
          authorInitials: "MJ",
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          likes: ["user1"]
        }
      ],
      isPinned: true,
      isResolved: false,
      processId: "po-001",
      processName: "Purchase Order Process"
    },
    {
      id: "2",
      title: "Digital Transformation Initiative Feedback",
      content: "How can we better manage the change management aspects of our digital transformation?",
      author: "Alex Rodriguez",
      authorInitials: "AR",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      tags: ["digital transformation", "change management"],
      likes: ["user3"],
      views: 15,
      replies: [],
      isPinned: false,
      isResolved: false
    }
  ]);

  const currentUserId = "user1";

  const createDiscussion = (discussionData: {
    title: string;
    content: string;
    tags: string[];
    processId?: string;
    processName?: string;
  }) => {
    const newDiscussion: Discussion = {
      id: Date.now().toString(),
      title: discussionData.title,
      content: discussionData.content,
      author: "Current User",
      authorInitials: "CU",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: discussionData.tags,
      likes: [],
      views: 1,
      replies: [],
      isPinned: false,
      isResolved: false,
      processId: discussionData.processId,
      processName: discussionData.processName
    };

    setDiscussions(prev => [newDiscussion, ...prev]);
    return newDiscussion.id;
  };

  const addReply = (discussionId: string, content: string) => {
    const newReply: Reply = {
      id: Date.now().toString(),
      content,
      author: "Current User",
      authorInitials: "CU",
      createdAt: new Date().toISOString(),
      likes: []
    };

    setDiscussions(prev => prev.map(discussion => 
      discussion.id === discussionId 
        ? {
            ...discussion,
            replies: [...discussion.replies, newReply],
            updatedAt: new Date().toISOString()
          }
        : discussion
    ));
  };

  const toggleLike = (discussionId: string, replyId?: string) => {
    setDiscussions(prev => prev.map(discussion => {
      if (discussion.id === discussionId) {
        if (replyId) {
          return {
            ...discussion,
            replies: discussion.replies.map(reply =>
              reply.id === replyId
                ? {
                    ...reply,
                    likes: reply.likes.includes(currentUserId)
                      ? reply.likes.filter(id => id !== currentUserId)
                      : [...reply.likes, currentUserId]
                  }
                : reply
            )
          };
        } else {
          return {
            ...discussion,
            likes: discussion.likes.includes(currentUserId)
              ? discussion.likes.filter(id => id !== currentUserId)
              : [...discussion.likes, currentUserId]
          };
        }
      }
      return discussion;
    }));
  };

  const togglePin = (discussionId: string) => {
    setDiscussions(prev => prev.map(discussion =>
      discussion.id === discussionId
        ? { ...discussion, isPinned: !discussion.isPinned }
        : discussion
    ));
  };

  const resolveDiscussion = (discussionId: string) => {
    setDiscussions(prev => prev.map(discussion =>
      discussion.id === discussionId
        ? { ...discussion, isResolved: !discussion.isResolved }
        : discussion
    ));
  };

  return {
    discussions,
    currentUserId,
    createDiscussion,
    addReply,
    toggleLike,
    togglePin,
    resolveDiscussion
  };
};
