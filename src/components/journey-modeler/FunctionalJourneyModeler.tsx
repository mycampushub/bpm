import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { 
  Plus, 
  Users, 
  MapPin, 
  Zap, 
  BarChart3, 
  Workflow,
  Target,
  Clock,
  Star,
  Edit,
  Eye,
  Trash2
} from "lucide-react";

interface Journey {
  id: string;
  name: string;
  persona: string;
  stages: number;
  touchpoints: number;
  satisfaction: number;
  status: 'draft' | 'active' | 'archived';
  lastModified: string;
}

interface Persona {
  id: string;
  name: string;
  description: string;
  goals: string[];
  painPoints: string[];
}

interface Touchpoint {
  id: string;
  name: string;
  channel: string;
  stage: string;
  satisfaction: number;
  effort: number;
}

const demoJourneys: Journey[] = [
  {
    id: 'j1',
    name: 'Customer Onboarding Journey',
    persona: 'New Customer',
    stages: 5,
    touchpoints: 12,
    satisfaction: 4.2,
    status: 'active',
    lastModified: '2024-01-15'
  },
  {
    id: 'j2',
    name: 'Product Purchase Flow',
    persona: 'Existing Customer',
    stages: 4,
    touchpoints: 8,
    satisfaction: 4.5,
    status: 'active',
    lastModified: '2024-01-14'
  },
  {
    id: 'j3',
    name: 'Support Experience',
    persona: 'All Customers',
    stages: 3,
    touchpoints: 6,
    satisfaction: 3.8,
    status: 'draft',
    lastModified: '2024-01-13'
  }
];

const demoPersonas: Persona[] = [
  {
    id: 'p1',
    name: 'New Customer',
    description: 'First-time users exploring our platform',
    goals: ['Quick setup', 'Easy navigation', 'Clear value demonstration'],
    painPoints: ['Complex onboarding', 'Too many steps', 'Lack of guidance']
  },
  {
    id: 'p2',
    name: 'Existing Customer',
    description: 'Established users making additional purchases',
    goals: ['Fast checkout', 'Personalized recommendations', 'Loyalty rewards'],
    painPoints: ['Slow loading', 'Limited payment options', 'Poor recommendations']
  }
];

const demoTouchpoints: Touchpoint[] = [
  {
    id: 't1',
    name: 'Landing Page',
    channel: 'Website',
    stage: 'Awareness',
    satisfaction: 4.1,
    effort: 2.3
  },
  {
    id: 't2',
    name: 'Registration Form',
    channel: 'Website',
    stage: 'Consideration',
    satisfaction: 3.8,
    effort: 3.2
  },
  {
    id: 't3',
    name: 'Welcome Email',
    channel: 'Email',
    stage: 'Onboarding',
    satisfaction: 4.3,
    effort: 1.8
  }
];

export function FunctionalJourneyModeler() {
  const [journeys, setJourneys] = useState<Journey[]>(demoJourneys);
  const [personas, setPersonas] = useState<Persona[]>(demoPersonas);
  const [touchpoints, setTouchpoints] = useState<Touchpoint[]>(demoTouchpoints);
  const [activeTab, setActiveTab] = useState("journeys");
  
  const { toast } = useToast();
  const { speakText } = useVoice();

  const handleCreateJourney = () => {
    const newJourney: Journey = {
      id: `j${Date.now()}`,
      name: `New Journey ${journeys.length + 1}`,
      persona: 'New Customer',
      stages: 3,
      touchpoints: 5,
      satisfaction: 4.0,
      status: 'draft',
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    setJourneys([...journeys, newJourney]);
    toast({
      title: "Journey Created",
      description: `Created new journey: ${newJourney.name}`
    });
    speakText(`Created new customer journey: ${newJourney.name}`);
  };

  const handleCreatePersona = () => {
    const newPersona: Persona = {
      id: `p${Date.now()}`,
      name: `New Persona ${personas.length + 1}`,
      description: 'New customer persona description',
      goals: ['Goal 1', 'Goal 2'],
      painPoints: ['Pain point 1', 'Pain point 2']
    };
    
    setPersonas([...personas, newPersona]);
    toast({
      title: "Persona Created",
      description: `Created new persona: ${newPersona.name}`
    });
    speakText(`Created new customer persona: ${newPersona.name}`);
  };

  const handleCreateTouchpoint = () => {
    const newTouchpoint: Touchpoint = {
      id: `t${Date.now()}`,
      name: `New Touchpoint ${touchpoints.length + 1}`,
      channel: 'Website',
      stage: 'Awareness',
      satisfaction: 4.0,
      effort: 2.5
    };
    
    setTouchpoints([...touchpoints, newTouchpoint]);
    toast({
      title: "Touchpoint Created",
      description: `Created new touchpoint: ${newTouchpoint.name}`
    });
    speakText(`Created new customer touchpoint: ${newTouchpoint.name}`);
  };

  const handleEditJourney = (journey: Journey) => {
    toast({
      title: "Edit Journey",
      description: `Opening ${journey.name} for editing`
    });
    speakText(`Opening ${journey.name} journey for editing`);
  };

  const handleDeleteJourney = (journeyId: string) => {
    const journey = journeys.find(j => j.id === journeyId);
    setJourneys(journeys.filter(j => j.id !== journeyId));
    toast({
      title: "Journey Deleted",
      description: `Deleted journey: ${journey?.name}`
    });
    speakText(`Deleted customer journey: ${journey?.name}`);
  };

  const handleAnalyzeJourney = (journey: Journey) => {
    toast({
      title: "Journey Analysis",
      description: `Analyzing ${journey.name} for optimization opportunities`
    });
    speakText(`Analyzing ${journey.name} journey for optimization opportunities`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Journey Modeler</h1>
          <p className="text-muted-foreground">Design and optimize customer journey experiences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => speakText("Journey Modeler dashboard loaded with customer journey management tools")}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button onClick={handleCreateJourney}>
            <Plus className="h-4 w-4 mr-2" />
            New Journey
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Journeys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{journeys.length}</div>
            <div className="text-xs text-blue-600">+2 this month</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Active Personas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{personas.length}</div>
            <div className="text-xs text-green-600">Fully defined</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Touchpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{touchpoints.length}</div>
            <div className="text-xs text-purple-600">Across all journeys</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Avg Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">4.2</div>
            <div className="text-xs text-orange-600">+0.3 from last month</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="journeys">Customer Journeys</TabsTrigger>
          <TabsTrigger value="personas">Personas</TabsTrigger>
          <TabsTrigger value="touchpoints">Touchpoints</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="journeys" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Customer Journeys</h2>
            <Button onClick={handleCreateJourney}>
              <Plus className="h-4 w-4 mr-2" />
              Create Journey
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {journeys.map((journey) => (
              <Card key={journey.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{journey.name}</CardTitle>
                    <Badge 
                      variant={journey.status === 'active' ? 'default' : journey.status === 'draft' ? 'secondary' : 'destructive'}
                    >
                      {journey.status}
                    </Badge>
                  </div>
                  <CardDescription>Persona: {journey.persona}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-muted-foreground">Stages</div>
                      <div className="text-lg font-semibold">{journey.stages}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Touchpoints</div>
                      <div className="text-lg font-semibold">{journey.touchpoints}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium text-muted-foreground text-sm">Satisfaction Score</div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-semibold">{journey.satisfaction}</div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(journey.satisfaction) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditJourney(journey)}>
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleAnalyzeJourney(journey)}>
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Analyze
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteJourney(journey.id)}>
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="personas" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Customer Personas</h2>
            <Button onClick={handleCreatePersona}>
              <Users className="h-4 w-4 mr-2" />
              Create Persona
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personas.map((persona) => (
              <Card key={persona.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {persona.name}
                  </CardTitle>
                  <CardDescription>{persona.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Goals</h4>
                    <div className="space-y-1">
                      {persona.goals.map((goal, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Target className="h-3 w-3 text-green-500" />
                          {goal}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Pain Points</h4>
                    <div className="space-y-1">
                      {persona.painPoints.map((pain, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Zap className="h-3 w-3 text-red-500" />
                          {pain}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="touchpoints" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Touchpoints</h2>
            <Button onClick={handleCreateTouchpoint}>
              <MapPin className="h-4 w-4 mr-2" />
              Add Touchpoint
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {touchpoints.map((touchpoint) => (
              <Card key={touchpoint.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {touchpoint.name}
                  </CardTitle>
                  <CardDescription>{touchpoint.channel} • {touchpoint.stage}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Satisfaction</div>
                      <div className="text-lg font-semibold text-green-600">{touchpoint.satisfaction}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Effort Score</div>
                      <div className="text-lg font-semibold text-blue-600">{touchpoint.effort}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Journey Analytics</CardTitle>
              <CardDescription>Performance insights across all customer journeys</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">87%</div>
                  <div className="text-sm text-muted-foreground">Journey Completion</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-green-600">4.2</div>
                  <div className="text-sm text-muted-foreground">Avg Satisfaction</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">2.8</div>
                  <div className="text-sm text-muted-foreground">Avg Effort Score</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-muted-foreground">Critical Touchpoints</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}