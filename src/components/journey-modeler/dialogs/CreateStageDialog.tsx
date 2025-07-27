
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useJourneyData } from "@/hooks/useJourneyData";
import { useVoice } from "@/contexts/VoiceContext";
import { Plus } from "lucide-react";

interface CreateStageDialogProps {
  journeyId: string;
  trigger?: React.ReactNode;
  onStageCreated?: () => void;
}

export const CreateStageDialog: React.FC<CreateStageDialogProps> = ({ 
  journeyId,
  trigger, 
  onStageCreated 
}) => {
  const { addStageToJourney, journeys } = useJourneyData();
  const { speakText } = useVoice();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    order: 1
  });

  const journey = journeys.find(j => j.id === journeyId);
  const nextOrder = journey ? journey.stages.length + 1 : 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      speakText("Please enter a stage name to continue.");
      return;
    }

    addStageToJourney(journeyId, {
      name: formData.name,
      description: formData.description,
      touchpoints: [],
      emotions: [],
      goals: [],
      painPoints: [],
      actions: []
    });

    setFormData({
      name: "",
      description: "",
      order: 1
    });
    
    setOpen(false);
    onStageCreated?.();
    
    speakText(`New stage ${formData.name} has been added to the customer journey. You can now add touchpoints to this stage to track customer interactions.`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Stage
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Journey Stage</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Stage Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Awareness, Consideration, Purchase"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what happens in this stage"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="order">Order</Label>
            <Input
              id="order"
              type="number"
              value={nextOrder}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">
              This stage will be added at position {nextOrder}
            </p>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Stage</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
