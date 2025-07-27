
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users } from "lucide-react";

interface Project {
  id: string;
  name: string;
  status: string;
  progress: number;
  team: string[];
  lastUpdated: string;
}

export interface RecentProjectsProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export const RecentProjects: React.FC<RecentProjectsProps> = ({ projects, onProjectClick }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-green-100 text-green-800";
      case "in progress": return "bg-blue-100 text-blue-800";
      case "review": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => onProjectClick(project)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-medium">{project.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                    {project.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Updated {project.lastUpdated}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Open
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{project.team.length} team members</span>
                <span>•</span>
                <span>{project.team.slice(0, 2).join(", ")}</span>
                {project.team.length > 2 && <span>+{project.team.length - 2} more</span>}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
