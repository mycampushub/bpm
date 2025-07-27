import React, { useState, useCallback } from "react";
import { useJourneyData } from "@/hooks/useJourneyData";
import { useVoice } from "@/contexts/VoiceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, MapPin, Users, Target, AlertTriangle, CheckCircle, Star } from "lucide-react";
import { CreateStageDialog } from "./dialogs/CreateStageDialog";
import { CreateTouchpointDialog } from "./dialogs/CreateTouchpointDialog";
import { useToast } from "@/hooks/use-toast";

export const CustomerJourneyCanvas: React.FC = () => {
  const { journeys, personas, updateJourney, deleteStage } = useJourneyData();
  const { speakText } = useVoice();
  const { toast } = useToast();
  const [selectedPersona, setSelectedPersona] = useState<string>(personas[0]?.id || "");
  const [selectedJourney, setSelectedJourney] = useState<string>(journeys[0]?.id || "");

  const currentPersona = personas.find(p => p.id === selectedPersona);
  const currentJourney = journeys.find(j => j.id === selectedJourney);

  const handlePersonaChange = useCallback((personaId: string) => {
    const persona = personas.find(p => p.id === personaId);
    setSelectedPersona(personaId);
    toast({
      title: "Persona Changed",
      description: `Switched to ${persona?.name || 'Unknown'} persona view`
    });
    speakText(`Switched to ${persona?.name} persona. This ${persona?.demographics.role} persona will help you understand the specific needs and pain points throughout their customer journey.`);
  }, [personas, toast, speakText]);

  const handleJourneyChange = useCallback((journeyId: string) => {
    const journey = journeys.find(j => j.id === journeyId);
    setSelectedJourney(journeyId);
    toast({
      title: "Journey Changed",
      description: `Now viewing ${journey?.name || 'Unknown'} journey`
    });
    speakText(`Now viewing the ${journey?.name} customer journey. This journey has ${journey?.stages?.length || 0} stages to guide customers through their experience.`);
  }, [journeys, toast, speakText]);

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'very-positive': return 'text-green-600';
      case 'positive': return 'text-green-500';
      case 'neutral': return 'text-gray-500';
      case 'negative': return 'text-red-500';
      case 'very-negative': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'very-positive':
      case 'positive':
        return <CheckCircle className="h-4 w-4" />;
      case 'negative':
      case 'very-negative':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  const getSatisfactionColor = (score: number) => {
    if (score >= 8) return 'text-green-500';
    if (score >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const renderPersonaOverview = () => {
    if (!currentPersona) return null;

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Persona Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{currentPersona.name}</h3>
              <p className="text-sm text-muted-foreground">{currentPersona.demographics.role} • {currentPersona.demographics.department}</p>
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <span>Experience: {currentPersona.demographics.experience}</span>
                <span>Age: {currentPersona.demographics.age}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-sm mb-2 text-green-700">Goals</h4>
                <ul className="text-xs space-y-1">
                  {currentPersona.goals.map((goal, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2 text-red-700">Pain Points</h4>
                <ul className="text-xs space-y-1">
                  {currentPersona.painPoints.map((pain, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {pain}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2 text-blue-700">Behaviors</h4>
                <ul className="text-xs space-y-1">
                  {currentPersona.behaviors.map((behavior, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {behavior}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const sortedStages = useCallback(() => {
    return currentJourney?.stages?.sort((a, b) => a.name.localeCompare(b.name)) || [];
  }, [currentJourney]);

  const renderJourneyFlow = () => {
    if (!currentJourney) return null;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Customer Journey Flow
            </span>
            <CreateStageDialog 
              journeyId={currentJourney.id}
              trigger={<Button size="sm">Add Stage</Button>}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sortedStages().length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No stages defined yet</p>
                <p className="text-sm">Add stages to map out the customer journey</p>
              </div>
            ) : (
              <div className="relative">
                {sortedStages().map((stage, index) => (
                  <div key={stage.id} className="relative">
                    {/* Stage Card */}
                    <div className="border rounded-lg p-4 mb-4 hover:shadow-md transition-shadow bg-card">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{stage.name}</h3>
                          <p className="text-sm text-muted-foreground">{stage.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Stage {index + 1}</Badge>
                          <CreateTouchpointDialog 
                            journeyId={currentJourney.id}
                            stageId={stage.id}
                            trigger={<Button size="sm" variant="outline">Add Touchpoint</Button>}
                          />
                        </div>
                      </div>

                      {/* Touchpoints */}
                      {stage.touchpoints.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                          {stage.touchpoints.map((touchpoint) => (
                            <div key={touchpoint.id} className="p-3 border rounded-md bg-muted/50">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-sm">{touchpoint.name}</h4>
                                <Badge variant="secondary" className="text-xs">
                                  {touchpoint.type}
                                </Badge>
                              </div>
                              
                              <p className="text-xs text-muted-foreground mb-2">
                                {touchpoint.channel}
                              </p>
                              
                              <div className="flex items-center justify-between text-xs">
                                <div className={`flex items-center gap-1 ${getEmotionColor(touchpoint.emotion)}`}>
                                  {getEmotionIcon(touchpoint.emotion)}
                                  <span>Emotion</span>
                                </div>
                                <div className={`flex items-center gap-1 ${getSatisfactionColor(touchpoint.satisfaction)}`}>
                                  <Star className="h-3 w-3" />
                                  <span>{touchpoint.satisfaction}/10</span>
                                </div>
                              </div>

                              {touchpoint.painPoints.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs font-medium text-red-600 mb-1">Pain Points:</p>
                                  <ul className="text-xs text-muted-foreground">
                                    {touchpoint.painPoints.slice(0, 2).map((pain, idx) => (
                                      <li key={idx}>• {pain}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {stage.touchpoints.length === 0 && (
                        <div className="text-center text-muted-foreground py-6 border-2 border-dashed rounded-lg">
                          <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No touchpoints defined</p>
                          <CreateTouchpointDialog 
                            journeyId={currentJourney.id}
                            stageId={stage.id}
                            trigger={<Button size="sm" variant="ghost" className="mt-2">Add first touchpoint</Button>}
                          />
                        </div>
                      )}
                    </div>

                    {/* Arrow to next stage */}
                    {index < sortedStages().length - 1 && (
                      <div className="flex justify-center mb-4">
                        <ArrowRight className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Persona:</label>
          <Select value={selectedPersona} onValueChange={handlePersonaChange}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select persona" />
            </SelectTrigger>
            <SelectContent>
              {personas.map((persona) => (
                <SelectItem key={persona.id} value={persona.id}>
                  {persona.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Journey:</label>
          <Select value={selectedJourney} onValueChange={handleJourneyChange}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select journey" />
            </SelectTrigger>
            <SelectContent>
              {journeys.map((journey) => (
                <SelectItem key={journey.id} value={journey.id}>
                  {journey.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Persona Overview */}
      {renderPersonaOverview()}

      {/* Journey Flow */}
      {renderJourneyFlow()}
    </div>
  );
};