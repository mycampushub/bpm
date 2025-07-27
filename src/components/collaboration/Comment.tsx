
import React from "react";

export interface CommentProps {
  author: string;
  avatar: string;
  time: string;
  text: string;
  replies?: {
    author: string;
    avatar: string;
    time: string;
    text: string;
  }[];
}

export function Comment({ author, avatar, time, text, replies = [] }: CommentProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground font-medium">
          {avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{author}</span>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
          <p className="mt-1 text-sm">{text}</p>
          <div className="flex items-center gap-4 mt-2">
            <button className="text-xs text-muted-foreground hover:text-foreground">Reply</button>
            <button className="text-xs text-muted-foreground hover:text-foreground">Like</button>
          </div>
        </div>
      </div>
      
      {replies.length > 0 && (
        <div className="ml-10 pl-6 border-l space-y-4">
          {replies.map((reply, index) => (
            <div className="flex gap-3" key={index}>
              <div className="w-7 h-7 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-muted-foreground font-medium text-sm">
                {reply.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{reply.author}</span>
                  <span className="text-xs text-muted-foreground">{reply.time}</span>
                </div>
                <p className="mt-1 text-sm">{reply.text}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button className="text-xs text-muted-foreground hover:text-foreground">Reply</button>
                  <button className="text-xs text-muted-foreground hover:text-foreground">Like</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
