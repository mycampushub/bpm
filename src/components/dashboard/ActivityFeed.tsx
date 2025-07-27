
import { ReactNode } from "react";
import { Archive, GitMerge, MessageSquare, BarChart3, Layers } from "lucide-react";

interface ActivityItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  user: string;
  time: string;
}

function ActivityItem({ icon, title, description, user, time }: ActivityItemProps) {
  return (
    <div className="flex gap-3">
      <div className="bg-muted rounded-full p-2 h-fit">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm">{description}</p>
        <div className="flex items-center gap-2 text-xs">
          <span className="font-medium">{user}</span>
          <span className="text-muted-foreground">{time}</span>
        </div>
      </div>
    </div>
  );
}

export function ActivityFeed() {
  return (
    <div className="space-y-4">
      <ActivityItem
        icon={<Archive className="h-4 w-4 text-enterprise-blue-600" />}
        title="Process published"
        description="Customer Onboarding v2.1"
        user="Lisa Johnson"
        time="Today, 10:45 AM"
      />
      <ActivityItem
        icon={<GitMerge className="h-4 w-4 text-enterprise-blue-600" />}
        title="Process updated"
        description="Sales Quote to Order"
        user="Michael Chen"
        time="Yesterday, 4:23 PM"
      />
      <ActivityItem
        icon={<MessageSquare className="h-4 w-4 text-enterprise-blue-600" />}
        title="New comment"
        description="Invoice Approval Process"
        user="Sarah Miller"
        time="Yesterday, 2:15 PM"
      />
      <ActivityItem
        icon={<BarChart3 className="h-4 w-4 text-enterprise-blue-600" />}
        title="Analytics report"
        description="Monthly Process Performance"
        user="System"
        time="Oct 10, 9:00 AM"
      />
      <ActivityItem
        icon={<Layers className="h-4 w-4 text-enterprise-blue-600" />}
        title="New journey map"
        description="Customer Support Experience"
        user="Robert Taylor"
        time="Oct 9, 3:12 PM"
      />
    </div>
  );
}
