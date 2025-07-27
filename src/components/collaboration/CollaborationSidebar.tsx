
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NotificationCenter } from "./NotificationCenter";
import { useCollaborationData } from "@/hooks/useCollaborationData";
import { 
  Users, 
  Circle,
  Clock,
  MessageSquare
} from "lucide-react";

export const CollaborationSidebar: React.FC = () => {
  const { teamMembers } = useCollaborationData();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <Circle className="h-3 w-3 fill-green-500 text-green-500" />;
      case "away":
        return <Circle className="h-3 w-3 fill-yellow-500 text-yellow-500" />;
      default:
        return <Circle className="h-3 w-3 fill-gray-400 text-gray-400" />;
    }
  };

  const recentActivity = [
    { user: "John Doe", action: "started a discussion", time: "2m ago", type: "discussion" },
    { user: "Jane Smith", action: "approved workflow", time: "15m ago", type: "approval" },
    { user: "Mike Johnson", action: "joined the team", time: "1h ago", type: "join" },
    { user: "Sarah Chen", action: "commented on process", time: "2h ago", type: "comment" }
  ];

  return (
    <div className="w-80 border-l bg-muted/30 p-4 space-y-4">
      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" />
            Team Members ({teamMembers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1">
                  {getStatusIcon(member.status)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
              <div className="text-xs text-muted-foreground">
                {member.lastActive}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1">
                {activity.type === "discussion" && <MessageSquare className="h-4 w-4 text-blue-500" />}
                {activity.type === "approval" && <Circle className="h-4 w-4 text-green-500" />}
                {activity.type === "join" && <Users className="h-4 w-4 text-purple-500" />}
                {activity.type === "comment" && <MessageSquare className="h-4 w-4 text-orange-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notifications */}
      <NotificationCenter />
    </div>
  );
};
