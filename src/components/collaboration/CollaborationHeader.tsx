
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Calendar } from "lucide-react";

interface CollaborationHeaderProps {
  onCreateDiscussion: () => void;
  onCreateReview: () => void;
  onScheduleEvent: () => void;
}

export const CollaborationHeader: React.FC<CollaborationHeaderProps> = ({
  onCreateDiscussion,
  onCreateReview,
  onScheduleEvent
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Collaboration Hub</h1>
        <p className="text-muted-foreground">Work together on process modeling and improvement</p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button onClick={onCreateDiscussion} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Discussion
        </Button>
        <Button onClick={onCreateReview} variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Create Review
        </Button>
        <Button onClick={onScheduleEvent} variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Event
        </Button>
      </div>
    </div>
  );
};
