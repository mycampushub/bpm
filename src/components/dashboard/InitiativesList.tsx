
import { cn } from "@/lib/utils";

export interface InitiativeRowProps {
  title: string;
  owner: string;
  progress: number;
  status: string;
  statusColor?: string;
}

function InitiativeRow({ title, owner, progress, status, statusColor = "text-foreground" }: InitiativeRowProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="font-medium">{title}</div>
          <div className="text-sm text-muted-foreground">Owner: {owner}</div>
        </div>
        <span className={cn("text-sm font-medium", statusColor)}>
          {status}
        </span>
      </div>
      <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
        <div 
          className="bg-primary h-full rounded-full" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export function InitiativesList() {
  return (
    <div className="space-y-4">
      <InitiativeRow 
        title="Customer Journey Optimization" 
        owner="Lisa Johnson"
        progress={75} 
        status="On Track" 
      />
      <InitiativeRow 
        title="Procure to Pay Automation" 
        owner="Michael Chen"
        progress={45} 
        status="At Risk" 
        statusColor="text-status-warning"
      />
      <InitiativeRow 
        title="Employee Onboarding Redesign" 
        owner="Sarah Miller"
        progress={90} 
        status="Completed" 
        statusColor="text-status-success"
      />
      <InitiativeRow 
        title="Vendor Management Process" 
        owner="Robert Taylor"
        progress={10} 
        status="Just Started" 
      />
      <InitiativeRow 
        title="Financial Closing Optimization" 
        owner="Jennifer Adams"
        progress={60} 
        status="On Track" 
      />
    </div>
  );
}
