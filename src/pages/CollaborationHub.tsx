
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCollaborationData } from "@/hooks/useCollaborationData";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { ProcessDiscussions } from "@/components/collaboration/ProcessDiscussions";
import { WorkflowApprovals } from "@/components/collaboration/WorkflowApprovals";
import { NotificationCenter } from "@/components/collaboration/NotificationCenter";
import { CollaborationVoiceGuide } from "@/components/collaboration/CollaborationVoiceGuide";
import { CollaborationHeader } from "@/components/collaboration/CollaborationHeader";
import { CollaborationStats } from "@/components/collaboration/CollaborationStats";
import { RecentActivity } from "@/components/collaboration/RecentActivity";
import { 
  MessageCircle, 
  CheckCircle, 
  AlertCircle
} from "lucide-react";

export default function CollaborationHub() {
  const { 
    discussions, 
    teamMembers, 
    activities, 
    processReviews, 
    scheduleEvents,
    createDiscussion,
    createProcessReview,
    createScheduleEvent
  } = useCollaborationData();
  
  const { speakText } = useVoice();
  const { toast } = useToast();

  const handleCreateDiscussion = () => {
    const newDiscussion = createDiscussion("New Process Discussion", "Let's discuss this process improvement");
    
    toast({
      title: "Discussion Created",
      description: "New discussion thread has been started"
    });
    
    speakText("New discussion created successfully. Team members can now participate in the conversation.");
  };

  const handleCreateReview = () => {
    const review = createProcessReview("Performance Review - Customer Onboarding");
    
    toast({
      title: "Review Created",
      description: "Process review request has been sent to team members"
    });
    
    speakText("Process review created. Team members will receive notifications to review the process.");
  };

  const handleScheduleEvent = () => {
    const event = createScheduleEvent({
      title: "Process Review Meeting",
      type: "meeting",
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
      organizer: "Current User",
      attendees: teamMembers.slice(0, 3).map(m => m.name),
      isVirtual: true
    });
    
    toast({
      title: "Event Scheduled",
      description: "Meeting has been scheduled and invitations sent"
    });
    
    speakText("Event scheduled successfully. Calendar invitations have been sent to all attendees.");
  };

  return (
    <MainLayout pageTitle="Collaboration Hub">
      <CollaborationVoiceGuide />
      
      <div className="space-y-6">
        <CollaborationHeader
          onCreateDiscussion={handleCreateDiscussion}
          onCreateReview={handleCreateReview}
          onScheduleEvent={handleScheduleEvent}
        />

        <CollaborationStats
          discussions={discussions.length}
          teamMembers={teamMembers.length}
          pendingReviews={processReviews.filter(r => r.status === "active").length}
          scheduledEvents={scheduleEvents.length}
        />

        <RecentActivity activities={activities} />

        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discussions" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Discussions
            </TabsTrigger>
            <TabsTrigger value="approvals" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Approvals
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="discussions" className="mt-6">
            <ProcessDiscussions />
          </TabsContent>
          
          <TabsContent value="approvals" className="mt-6">
            <WorkflowApprovals />
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <NotificationCenter />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
