
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useJourneyData, Touchpoint } from "@/hooks/useJourneyData";
import { useVoice } from "@/contexts/VoiceContext";
import { Plus } from "lucide-react";

interface CreateTouchpointDialogProps {
  journeyId: string;
  stageId: string;
  trigger?: React.ReactNode;
  onTouchpointCreated?: () => void;
}

export const CreateTouchpointDialog: React.FC<CreateTouchpointDialogProps> = ({ 
  journeyId,
  stageId,
  trigger, 
  onTouchpointCreated 
}) => {
  const { addTouchpointToStage } = useJourneyData();
  const { speakText } = useVoice();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "digital" as "digital" | "physical" | "human",
    channel: "",
    satisfaction: 3,
    effort: 3,
    frequency: 50,
    emotion: "neutral" as Touchpoint["emotion"],
    duration: "",
    painPoints: "",
    opportunities: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.channel) {
      speakText("Please fill in the touchpoint name and channel to continue.");
      return;
    }

    const painPointsArray = formData.painPoints ? formData.painPoints.split(',').map(p => p.trim()).filter(p => p) : [];
    const opportunitiesArray = formData.opportunities ? formData.opportunities.split(',').map(o => o.trim()).filter(o => o) : [];

    addTouchpointToStage(journeyId, stageId, {
      name: formData.name,
      description: formData.description,
      type: formData.type,
      channel: formData.channel,
      satisfaction: formData.satisfaction,
      effort: formData.effort,
      frequency: formData.frequency,
      emotion: formData.emotion,
      duration: formData.duration,
      painPoints: painPointsArray,
      opportunities: opportunitiesArray
    });

    setFormData({
      name: "",
      description: "",
      type: "digital",
      channel: "",
      satisfaction: 3,
      effort: 3,
      frequency: 50,
      emotion: "neutral",
      duration: "",
      painPoints: "",
      opportunities: ""
    });
    
    setOpen(false);
    onTouchpointCreated?.();
    
    speakText(`New touchpoint ${formData.name} has been added to the stage. This interaction point will help track customer experience and identify improvement opportunities.`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Touchpoint
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Touchpoint</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Touchpoint Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Website Visit, Phone Call, Email"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="channel">Channel *</Label>
            <Input
              id="channel"
              value={formData.channel}
              onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
              placeholder="e.g., Website, Email, Phone, Social Media"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value: "digital" | "physical" | "human") => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="digital">Digital</SelectItem>
                <SelectItem value="physical">Physical</SelectItem>
                <SelectItem value="human">Human</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="emotion">Customer Emotion</Label>
            <Select 
              value={formData.emotion} 
              onValueChange={(value: Touchpoint["emotion"]) => setFormData({ ...formData, emotion: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="very-negative">Very Negative</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="very-positive">Very Positive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="satisfaction">Satisfaction (1-10)</Label>
              <Input
                id="satisfaction"
                type="number"
                min="1"
                max="10"
                value={formData.satisfaction}
                onChange={(e) => setFormData({ ...formData, satisfaction: parseInt(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="effort">Effort (1-10)</Label>
              <Input
                id="effort"
                type="number"
                min="1"
                max="10"
                value={formData.effort}
                onChange={(e) => setFormData({ ...formData, effort: parseInt(e.target.value) })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency (%)</Label>
              <Input
                id="frequency"
                type="number"
                min="0"
                max="100"
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: parseInt(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 5 minutes, 2 hours"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe this touchpoint"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="painPoints">Pain Points (comma-separated)</Label>
            <Textarea
              id="painPoints"
              value={formData.painPoints}
              onChange={(e) => setFormData({ ...formData, painPoints: e.target.value })}
              placeholder="e.g., Slow loading, Confusing navigation, Long wait times"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="opportunities">Opportunities (comma-separated)</Label>
            <Textarea
              id="opportunities"
              value={formData.opportunities}
              onChange={(e) => setFormData({ ...formData, opportunities: e.target.value })}
              placeholder="e.g., Add live chat, Simplify form, Provide tutorials"
              rows={2}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Touchpoint</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
