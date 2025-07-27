
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Users, FileText, Calendar } from "lucide-react";

interface CollaborationStatsProps {
  discussions: number;
  teamMembers: number;
  pendingReviews: number;
  scheduledEvents: number;
}

export const CollaborationStats: React.FC<CollaborationStatsProps> = ({
  discussions,
  teamMembers,
  pendingReviews,
  scheduledEvents
}) => {
  const stats = [
    { 
      label: "Active Discussions", 
      value: discussions, 
      icon: MessageCircle,
      color: "text-blue-600"
    },
    { 
      label: "Team Members", 
      value: teamMembers, 
      icon: Users,
      color: "text-green-600"
    },
    { 
      label: "Pending Reviews", 
      value: pendingReviews, 
      icon: FileText,
      color: "text-orange-600"
    },
    { 
      label: "Scheduled Events", 
      value: scheduledEvents, 
      icon: Calendar,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <IconComponent className={`h-6 w-6 ${stat.color}`} />
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
