
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { useJourneyData } from "@/hooks/useJourneyData";
import { CustomerJourneyCanvas } from "./CustomerJourneyCanvas";
import { PersonaManagement } from "./PersonaManagement";
import { TouchpointManager } from "./TouchpointManager";
import { JourneyAnalytics } from "./JourneyAnalytics";
import { JourneyLibrary } from "./JourneyLibrary";
import { CreateJourneyDialog } from "./dialogs/CreateJourneyDialog";
import { 
  User, 
  Map, 
  Target, 
  BarChart3,
  Plus,
  Download,
  Share2,
  FileText,
  TrendingUp,
  Users,
  Activity
} from "lucide-react";

export const JourneyModelerDashboard: React.FC = () => {
  const { speakText } = useVoice();
  const { toast } = useToast();
  const { journeys, personas, exportJourneyData, shareJourney } = useJourneyData();
  const [activeTab, setActiveTab] = useState("journeys");
  const [isLoading, setIsLoading] = useState(false);

  // Calculate dynamic metrics
  const journeyMetrics = [
    { 
      label: "Active Journeys", 
      value: journeys.filter(j => j.status === "active").length.toString(), 
      change: `+${journeys.filter(j => j.status === "draft").length}`, 
      trend: "up",
      icon: Map,
      description: "Currently mapped customer journeys"
    },
    { 
      label: "Customer Personas", 
      value: personas.length.toString(), 
      change: "+1", 
      trend: "up",
      icon: Users,
      description: "Defined customer personas"
    },
    { 
      label: "Touchpoints Mapped", 
      value: journeys.reduce((acc, journey) => 
        acc + journey.stages.reduce((stageAcc, stage) => 
          stageAcc + stage.touchpoints.length, 0), 0
      ).toString(), 
      change: "+24", 
      trend: "up",
      icon: Target,
      description: "Total customer touchpoints"
    },
    { 
      label: "Journey Completion", 
      value: "87%", 
      change: "+5%", 
      trend: "up",
      icon: TrendingUp,
      description: "Average completion rate"
    }
  ];

  const handleExport = async () => {
    setIsLoading(true);
    toast({
      title: "Export Started",
      description: "Preparing journey maps for export..."
    });
    speakText("Exporting journey maps. This includes all touchpoints, personas, and analytics data for stakeholder sharing and backup purposes.");
    
    setTimeout(async () => {
      await exportJourneyData();
      setIsLoading(false);
    }, 1000);
  };

  const handleShare = async () => {
    if (journeys.length === 0) {
      toast({
        title: "No Journeys to Share",
        description: "Create a journey first before sharing.",
        variant: "destructive"
      });
      speakText("No customer journeys available to share. Please create a journey first using the New Journey button.");
      return;
    }

    const mainJourney = journeys[0];
    await shareJourney(mainJourney.id, ['stakeholder@company.com']);
    speakText(`Sharing journey ${mainJourney.name}. Stakeholders will be able to view the complete customer journey map with all touchpoints and insights.`);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const tabNames = {
      journeys: "Journey Canvas",
      personas: "Persona Management", 
      touchpoints: "Touchpoint Manager",
      analytics: "Journey Analytics",
      library: "Journey Library"
    };
    speakText(`Switched to ${tabNames[value as keyof typeof tabNames]}. ${getTabDescription(value)}`);
  };

  const getTabDescription = (tab: string) => {
    const descriptions = {
      journeys: "Here you can visualize and edit customer journey maps with stages and touchpoints.",
      personas: "Manage customer personas that represent your target audience segments.",
      touchpoints: "Track and optimize all customer interaction points across channels.",
      analytics: "Analyze journey performance metrics and identify improvement opportunities.",
      library: "Browse and use pre-built journey templates to accelerate your mapping process."
    };
    return descriptions[tab as keyof typeof descriptions] || "";
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Journey Modeler</h1>
          <p className="text-muted-foreground text-sm md:text-base">Design exceptional customer experiences</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleExport}
            disabled={isLoading}
            className="hover-scale text-xs md:text-sm"
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline" 
            onClick={handleShare}
            className="hover-scale text-xs md:text-sm"
            size="sm"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <CreateJourneyDialog 
            trigger={
              <Button 
                disabled={isLoading}
                className="hover-scale text-xs md:text-sm"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                {isLoading ? "Creating..." : "New Journey"}
              </Button>
            }
            onJourneyCreated={() => {
              speakText("Journey created successfully. You can now start adding stages and touchpoints to map the complete customer experience.");
            }}
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {journeyMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer hover-scale">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="h-4 w-4 text-primary flex-shrink-0" />
                      <p className="text-xs md:text-sm text-muted-foreground truncate">{metric.label}</p>
                    </div>
                    <p className="text-xl md:text-2xl font-bold">{metric.value}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{metric.description}</p>
                  </div>
                  <Badge variant="default" className="text-xs ml-2 flex-shrink-0">
                    {metric.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="w-full overflow-x-auto">
          <TabsList className="grid w-full min-w-[600px] grid-cols-5 h-auto">
            <TabsTrigger value="journeys" className="flex items-center gap-2 p-2 md:p-3 text-xs md:text-sm">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Journeys</span>
            </TabsTrigger>
            <TabsTrigger value="personas" className="flex items-center gap-2 p-2 md:p-3 text-xs md:text-sm">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Personas</span>
            </TabsTrigger>
            <TabsTrigger value="touchpoints" className="flex items-center gap-2 p-2 md:p-3 text-xs md:text-sm">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Touchpoints</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 p-2 md:p-3 text-xs md:text-sm">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2 p-2 md:p-3 text-xs md:text-sm">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Library</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="mt-6 w-full">
          <TabsContent value="journeys" className="mt-0 w-full">
            <CustomerJourneyCanvas />
          </TabsContent>
          
          <TabsContent value="personas" className="mt-0 w-full">
            <PersonaManagement />
          </TabsContent>
          
          <TabsContent value="touchpoints" className="mt-0 w-full">
            <TouchpointManager />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-0 w-full">
            <JourneyAnalytics />
          </TabsContent>
          
          <TabsContent value="library" className="mt-0 w-full">
            <JourneyLibrary />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
