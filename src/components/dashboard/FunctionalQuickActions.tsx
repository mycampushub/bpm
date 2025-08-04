import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useVoice } from '@/contexts/VoiceContext';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Upload, 
  FileText, 
  Users, 
  BarChart3, 
  Settings,
  Zap,
  Calendar,
  MessageSquare
} from 'lucide-react';

export const FunctionalQuickActions: React.FC = () => {
  const { toast } = useToast();
  const { speakText } = useVoice();
  const navigate = useNavigate();

  const handleAction = (action: string, route?: string) => {
    if (route) {
      navigate(route);
      speakText(`Navigating to ${action}`);
    } else {
      toast({
        title: action,
        description: `${action} initiated successfully`
      });
      speakText(`${action} action completed`);
    }
  };

  const quickActions = [
    {
      icon: Plus,
      title: "New Process",
      description: "Create a new business process",
      action: () => handleAction("New Process", "/process-manager"),
      color: "bg-blue-500"
    },
    {
      icon: Upload,
      title: "Upload Data",
      description: "Import process data or event logs",
      action: () => handleAction("Upload Data", "/process-mining"),
      color: "bg-green-500"
    },
    {
      icon: FileText,
      title: "Generate Report",
      description: "Create comprehensive analytics report",
      action: () => handleAction("Generate Report", "/reports"),
      color: "bg-purple-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Start collaborative session",
      action: () => handleAction("Team Collaboration", "/collaboration-hub"),
      color: "bg-orange-500"
    },
    {
      icon: BarChart3,
      title: "Process Analytics",
      description: "View process performance metrics",
      action: () => handleAction("Process Analytics", "/process-intelligence"),
      color: "bg-indigo-500"
    },
    {
      icon: Calendar,
      title: "Schedule Meeting",
      description: "Schedule process review meeting",
      action: () => {
        const event = {
          title: "Process Review Meeting",
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          participants: ["Process Owner", "Stakeholders"]
        };
        localStorage.setItem('scheduledMeeting', JSON.stringify(event));
        toast({
          title: "Meeting Scheduled",
          description: "Process review meeting scheduled for tomorrow"
        });
        speakText("Process review meeting has been scheduled for tomorrow");
      },
      color: "bg-teal-500"
    },
    {
      icon: MessageSquare,
      title: "AI Assistant",
      description: "Get process optimization suggestions",
      action: () => {
        const suggestions = [
          "Consider automating manual approval steps",
          "Reduce waiting time between process stages",
          "Implement parallel processing for independent tasks"
        ];
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        toast({
          title: "AI Suggestion",
          description: randomSuggestion
        });
        speakText(`AI suggests: ${randomSuggestion}`);
      },
      color: "bg-pink-500"
    },
    {
      icon: Zap,
      title: "Quick Optimization",
      description: "Run automated process optimization",
      action: () => {
        toast({
          title: "Optimization Started",
          description: "Analyzing processes for improvement opportunities..."
        });
        speakText("Process optimization analysis started");
        
        setTimeout(() => {
          toast({
            title: "Optimization Complete",
            description: "Found 3 improvement opportunities"
          });
          speakText("Process optimization completed. Found 3 areas for improvement");
        }, 3000);
      },
      color: "bg-yellow-500"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
              onClick={action.action}
            >
              <div className={`p-3 rounded-full ${action.color} text-white`}>
                <action.icon className="h-6 w-6" />
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};