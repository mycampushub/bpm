
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { 
  Target, 
  Globe, 
  Mail, 
  Phone, 
  MessageSquare, 
  MapPin,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Star,
  Heart,
  AlertTriangle
} from "lucide-react";

interface Touchpoint {
  id: string;
  name: string;
  channel: string;
  type: "digital" | "physical" | "human";
  stage: string;
  description: string;
  owner: string;
  priority: "low" | "medium" | "high" | "critical";
  satisfaction: number; // 1-5 rating
  effort: number; // 1-5 rating (1 = low effort, 5 = high effort)
  interactions: number;
  conversionRate: number;
  painPoints: string[];
  opportunities: string[];
}

export const TouchpointManager: React.FC = () => {
  const { toast } = useToast();
  const { speakText } = useVoice();
  
  const [touchpoints, setTouchpoints] = useState<Touchpoint[]>([
    {
      id: "1",
      name: "Website Homepage",
      channel: "Website",
      type: "digital",
      stage: "Awareness",
      description: "Main landing page for first-time visitors",
      owner: "Marketing Team",
      priority: "critical",
      satisfaction: 4,
      effort: 2,
      interactions: 15420,
      conversionRate: 12.5,
      painPoints: ["Slow loading", "Complex navigation"],
      opportunities: ["A/B test CTAs", "Improve page speed"]
    },
    {
      id: "2",
      name: "Customer Support Chat",
      channel: "Live Chat",
      type: "digital",
      stage: "Support",
      description: "Real-time customer support assistance",
      owner: "Support Team",
      priority: "high",
      satisfaction: 4.2,
      effort: 3,
      interactions: 8930,
      conversionRate: 65.3,
      painPoints: ["Wait times", "Limited hours"],
      opportunities: ["24/7 chatbot", "Faster response times"]
    },
    {
      id: "3",
      name: "Product Demo Call",
      channel: "Video Call",
      type: "human",
      stage: "Consideration",
      description: "Personalized product demonstration",
      owner: "Sales Team",
      priority: "critical",
      satisfaction: 4.7,
      effort: 4,
      interactions: 1250,
      conversionRate: 78.4,
      painPoints: ["Scheduling conflicts", "Technical issues"],
      opportunities: ["Automated scheduling", "Better tech setup"]
    }
  ]);

  const [editingTouchpoint, setEditingTouchpoint] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Touchpoint>>({});

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case "website": return <Globe className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "phone": return <Phone className="h-4 w-4" />;
      case "live chat": return <MessageSquare className="h-4 w-4" />;
      case "video call": return <Phone className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "destructive";
      case "high": return "default";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const handleEdit = (touchpoint: Touchpoint) => {
    setEditingTouchpoint(touchpoint.id);
    setFormData(touchpoint);
    speakText(`Editing touchpoint ${touchpoint.name}. This ${touchpoint.type} touchpoint in the ${touchpoint.stage} stage has a satisfaction rating of ${touchpoint.satisfaction} stars.`);
  };

  const handleSave = () => {
    if (isCreating) {
      const newTouchpoint = {
        ...formData,
        id: Date.now().toString(),
        interactions: 0,
        conversionRate: 0,
        painPoints: formData.painPoints || [],
        opportunities: formData.opportunities || []
      } as Touchpoint;
      
      setTouchpoints([...touchpoints, newTouchpoint]);
      toast({
        title: "Touchpoint Created",
        description: `${newTouchpoint.name} has been added successfully.`
      });
      speakText(`New touchpoint ${newTouchpoint.name} has been created. This will help track customer interactions in the ${newTouchpoint.stage} stage.`);
      setIsCreating(false);
    } else if (editingTouchpoint) {
      setTouchpoints(touchpoints.map(tp => 
        tp.id === editingTouchpoint ? { ...formData } as Touchpoint : tp
      ));
      toast({
        title: "Touchpoint Updated",
        description: `${formData.name} has been updated successfully.`
      });
      speakText(`Touchpoint ${formData.name} has been updated. Regular updates ensure your touchpoint analysis remains accurate and actionable.`);
      setEditingTouchpoint(null);
    }
    setFormData({});
  };

  const handleCancel = () => {
    setEditingTouchpoint(null);
    setIsCreating(false);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    const touchpoint = touchpoints.find(tp => tp.id === id);
    setTouchpoints(touchpoints.filter(tp => tp.id !== id));
    toast({
      title: "Touchpoint Deleted",
      description: `${touchpoint?.name} has been removed.`
    });
    speakText(`Touchpoint ${touchpoint?.name} has been deleted from your touchpoint library.`);
  };

  const renderTouchpointCard = (touchpoint: Touchpoint) => {
    const isEditing = editingTouchpoint === touchpoint.id;

    return (
      <Card key={touchpoint.id} className="h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                {getChannelIcon(touchpoint.channel)}
              </div>
              <div>
                {isEditing ? (
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="font-semibold mb-1"
                  />
                ) : (
                  <CardTitle className="text-lg">{touchpoint.name}</CardTitle>
                )}
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{touchpoint.channel}</Badge>
                  <Badge variant={getPriorityColor(touchpoint.priority)} className="text-xs">
                    {touchpoint.priority}
                  </Badge>
                </div>
              </div>
            </div>
            
            {!isEditing && (
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(touchpoint)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(touchpoint.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Basic Info */}
          <div>
            <div className="font-medium mb-1">Description</div>
            {isEditing ? (
              <Textarea
                value={formData.description || ""}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="text-sm min-h-16"
              />
            ) : (
              <div className="text-sm text-muted-foreground">{touchpoint.description}</div>
            )}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-medium mb-1 flex items-center gap-1">
                <Star className="h-3 w-3" />
                Satisfaction
              </div>
              <div className="text-2xl font-bold">{touchpoint.satisfaction}/5</div>
            </div>
            <div>
              <div className="font-medium mb-1 flex items-center gap-1">
                <Heart className="h-3 w-3" />
                Effort Score
              </div>
              <div className="text-2xl font-bold">{touchpoint.effort}/5</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium mb-1">Interactions</div>
              <div className="text-muted-foreground">{touchpoint.interactions.toLocaleString()}</div>
            </div>
            <div>
              <div className="font-medium mb-1">Conversion</div>
              <div className="text-muted-foreground">{touchpoint.conversionRate}%</div>
            </div>
          </div>

          {/* Pain Points */}
          {touchpoint.painPoints.length > 0 && (
            <div>
              <div className="font-medium mb-2 flex items-center gap-1 text-red-600">
                <AlertTriangle className="h-3 w-3" />
                Pain Points
              </div>
              <div className="space-y-1">
                {touchpoint.painPoints.map((pain, index) => (
                  <Badge key={index} variant="destructive" className="text-xs mr-1 mb-1">
                    {pain}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Opportunities */}
          {touchpoint.opportunities.length > 0 && (
            <div>
              <div className="font-medium mb-2 flex items-center gap-1 text-green-600">
                <Target className="h-3 w-3" />
                Opportunities
              </div>
              <div className="space-y-1">
                {touchpoint.opportunities.map((opportunity, index) => (
                  <Badge key={index} variant="outline" className="text-xs mr-1 mb-1 border-green-500 text-green-600">
                    {opportunity}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons for Editing */}
          {isEditing && (
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-3 w-3 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-3 w-3 mr-1" />
                Save
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6" />
            Touchpoint Management
          </h2>
          <p className="text-muted-foreground">Manage all customer touchpoints across channels</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Touchpoint
        </Button>
      </div>

      {/* Touchpoints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {touchpoints.map(renderTouchpointCard)}
        
        {/* Create New Touchpoint Card */}
        {isCreating && (
          <Card className="h-full">
            <CardHeader>
              <CardTitle>New Touchpoint</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={formData.name || ""}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter touchpoint name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Channel</label>
                  <Input
                    value={formData.channel || ""}
                    onChange={(e) => setFormData({...formData, channel: e.target.value})}
                    placeholder="Website, Email, etc."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <Select value={formData.type || ""} onValueChange={(value) => setFormData({...formData, type: value as any})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital">Digital</SelectItem>
                      <SelectItem value="physical">Physical</SelectItem>
                      <SelectItem value="human">Human</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe this touchpoint"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="h-3 w-3 mr-1" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-3 w-3 mr-1" />
                  Create
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
