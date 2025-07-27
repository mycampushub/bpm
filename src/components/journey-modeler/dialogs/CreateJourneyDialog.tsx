import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useJourneyData } from "@/hooks/useJourneyData";
import { useVoice } from "@/contexts/VoiceContext";
import { Plus } from "lucide-react";

interface CreateJourneyDialogProps {
  trigger?: React.ReactNode;
  onJourneyCreated?: () => void;
}

export const CreateJourneyDialog: React.FC<CreateJourneyDialogProps> = ({ 
  trigger, 
  onJourneyCreated 
}) => {
  const { personas, createJourney } = useJourneyData();
  const { speakText } = useVoice();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    personaId: "",
    status: "draft" as "draft" | "active" | "archived"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.personaId) {
      speakText("Please fill in all required fields to create a new customer journey.");
      return;
    }

    const journeyData = {
      name: formData.name,
      description: formData.description,
      persona: formData.personaId,
      stages: [],
      status: formData.status,
      createdBy: 'Current User'
    };

    const newJourney = await createJourney(journeyData);
    if (newJourney) {
      setFormData({
        name: "",
        description: "",
        personaId: "",
        status: "draft"
      });
      
      setOpen(false);
      onJourneyCreated?.();
      
      speakText(`New customer journey ${formData.name} has been created successfully. You can now start adding stages to map out the customer experience.`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Journey
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Customer Journey</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Journey Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter journey name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe this customer journey"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="persona">Target Persona *</Label>
            <Select 
              value={formData.personaId} 
              onValueChange={(value) => setFormData({ ...formData, personaId: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a persona" />
              </SelectTrigger>
              <SelectContent>
                {personas.map((persona) => (
                  <SelectItem key={persona.id} value={persona.id}>
                    {persona.name} - {persona.demographics.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => setFormData({ ...formData, status: value as "draft" | "active" | "archived" })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Journey</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};