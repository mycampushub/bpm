
import { useState } from "react";

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  status: "online" | "away" | "offline";
  lastActive: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  user: string;
  userName: string;
  time: string;
  timestamp: string;
  status: "approved" | "pending" | "rejected";
  type: "discussion" | "review" | "approval";
}

export const useTeamData = () => {
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      initials: "JD",
      role: "Process Manager",
      status: "online",
      lastActive: "Now"
    },
    {
      id: "2",
      name: "Jane Smith",
      initials: "JS",
      role: "Business Analyst",
      status: "away",
      lastActive: "5 min ago"
    },
    {
      id: "3",
      name: "Mike Johnson",
      initials: "MJ",
      role: "Operations Lead",
      status: "online",
      lastActive: "Now"
    },
    {
      id: "4",
      name: "Sarah Chen",
      initials: "SC",
      role: "Project Manager",
      status: "offline",
      lastActive: "2 hours ago"
    }
  ]);

  const [activities] = useState<Activity[]>([
    {
      id: "1",
      title: "Process workflow approved",
      description: "Workflow for customer onboarding has been approved",
      user: "John Doe",
      userName: "John Doe",
      time: "2 minutes ago",
      timestamp: "2 minutes ago",
      status: "approved",
      type: "approval"
    },
    {
      id: "2",
      title: "New discussion started",
      description: "Discussion about process optimization has been created",
      user: "Sarah Chen",
      userName: "Sarah Chen",
      time: "15 minutes ago",
      timestamp: "15 minutes ago",
      status: "pending",
      type: "discussion"
    },
    {
      id: "3",
      title: "Process review completed",
      description: "Review of invoice processing workflow is complete",
      user: "Mike Johnson",
      userName: "Mike Johnson",
      time: "1 hour ago",
      timestamp: "1 hour ago",
      status: "approved",
      type: "review"
    }
  ]);

  const inviteTeamMember = (email: string, role: string) => {
    console.log(`Inviting ${email} as ${role}`);
  };

  return {
    teamMembers,
    activities,
    inviteTeamMember
  };
};
