
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Users, 
  Briefcase, 
  Target, 
  Heart, 
  DollarSign,
  Calendar,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Save,
  X
} from "lucide-react";

interface Persona {
  id: string;
  name: string;
  role: string;
  department: string;
  age: number;
  location: string;
  goals: string[];
  painPoints: string[];
  motivations: string[];
  preferredChannels: string[];
  techSavviness: "low" | "medium" | "high";
  decisionInfluence: "low" | "medium" | "high";
}

export const PersonaManagement: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([
    {
      id: "business-user",
      name: "Sarah Chen",
      role: "Business Analyst",
      department: "Operations",
      age: 32,
      location: "San Francisco, CA",
      goals: ["Improve process efficiency", "Reduce manual work", "Better reporting"],
      painPoints: ["Complex software", "Too many tools", "Lack of integration"],
      motivations: ["Career advancement", "Recognition", "Work-life balance"],
      preferredChannels: ["Email", "Slack", "Video calls"],
      techSavviness: "high",
      decisionInfluence: "medium"
    },
    {
      id: "technical-user",
      name: "Marcus Rodriguez",
      role: "IT Manager",
      department: "Information Technology",
      age: 38,
      location: "Austin, TX",
      goals: ["System reliability", "Security compliance", "Cost optimization"],
      painPoints: ["Legacy systems", "Security concerns", "Resource constraints"],
      motivations: ["Technical excellence", "Problem solving", "Innovation"],
      preferredChannels: ["Documentation", "Forums", "Direct contact"],
      techSavviness: "high",
      decisionInfluence: "high"
    }
  ]);

  const [editingPersona, setEditingPersona] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Partial<Persona>>({});

  const handleEdit = (persona: Persona) => {
    setEditingPersona(persona.id);
    setFormData(persona);
  };

  const handleSave = () => {
    if (isCreating) {
      const newPersona = {
        id: Date.now().toString(),
        name: formData.name || "",
        role: formData.role || "",
        department: formData.department || "",
        age: formData.age || 25,
        location: formData.location || "",
        goals: formData.goals || [],
        painPoints: formData.painPoints || [],
        motivations: formData.motivations || [],
        preferredChannels: formData.preferredChannels || [],
        techSavviness: formData.techSavviness || "medium",
        decisionInfluence: formData.decisionInfluence || "medium"
      } as Persona;
      setPersonas([...personas, newPersona]);
      setIsCreating(false);
    } else if (editingPersona) {
      setPersonas(personas.map(p => 
        p.id === editingPersona ? { ...p, ...formData } as Persona : p
      ));
      setEditingPersona(null);
    }
    setFormData({});
  };

  const handleCancel = () => {
    setEditingPersona(null);
    setIsCreating(false);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    setPersonas(personas.filter(p => p.id !== id));
  };

  const renderPersonaCard = (persona: Persona) => {
    const isEditing = editingPersona === persona.id;

    return (
      <Card key={persona.id} className="h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                {isEditing ? (
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="font-semibold"
                  />
                ) : (
                  <CardTitle className="text-lg">{persona.name}</CardTitle>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Briefcase className="h-3 w-3" />
                  {isEditing ? (
                    <Input
                      value={formData.role || ""}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="text-sm h-6"
                    />
                  ) : (
                    <span>{persona.role}</span>
                  )}
                </div>
              </div>
            </div>
            
            {!isEditing && (
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(persona)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(persona.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium mb-1">Department</div>
              {isEditing ? (
                <Input
                  value={formData.department || ""}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="text-sm h-8"
                />
              ) : (
                <div className="text-muted-foreground">{persona.department}</div>
              )}
            </div>
            <div>
              <div className="font-medium mb-1">Age</div>
              {isEditing ? (
                <Input
                  type="number"
                  value={formData.age || ""}
                  onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                  className="text-sm h-8"
                />
              ) : (
                <div className="text-muted-foreground">{persona.age} years</div>
              )}
            </div>
          </div>

          <div>
            <div className="font-medium mb-1 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Location
            </div>
            {isEditing ? (
              <Input
                value={formData.location || ""}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="text-sm h-8"
              />
            ) : (
              <div className="text-muted-foreground text-sm">{persona.location}</div>
            )}
          </div>

          {/* Goals */}
          <div>
            <div className="font-medium mb-2 flex items-center gap-1">
              <Target className="h-3 w-3" />
              Goals
            </div>
            {isEditing ? (
              <Textarea
                value={formData.goals?.join(", ") || ""}
                onChange={(e) => setFormData({...formData, goals: e.target.value.split(", ")})}
                className="text-sm min-h-16"
                placeholder="Separate goals with commas"
              />
            ) : (
              <div className="space-y-1">
                {(persona.goals || []).map((goal, index) => (
                  <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                    {goal}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Pain Points */}
          <div>
            <div className="font-medium mb-2 flex items-center gap-1">
              <Heart className="h-3 w-3" />
              Pain Points
            </div>
            {isEditing ? (
              <Textarea
                value={formData.painPoints?.join(", ") || ""}
                onChange={(e) => setFormData({...formData, painPoints: e.target.value.split(", ")})}
                className="text-sm min-h-16"
                placeholder="Separate pain points with commas"
              />
            ) : (
              <div className="space-y-1">
                {(persona.painPoints || []).map((pain, index) => (
                  <Badge key={index} variant="destructive" className="text-xs mr-1 mb-1">
                    {pain}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Influence & Tech Level */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-medium mb-1 text-sm">Decision Influence</div>
              <Badge variant={
                persona.decisionInfluence === "high" ? "default" : 
                persona.decisionInfluence === "medium" ? "secondary" : "outline"
              }>
                {persona.decisionInfluence}
              </Badge>
            </div>
            <div>
              <div className="font-medium mb-1 text-sm">Tech Savviness</div>
              <Badge variant={
                persona.techSavviness === "high" ? "default" : 
                persona.techSavviness === "medium" ? "secondary" : "outline"
              }>
                {persona.techSavviness}
              </Badge>
            </div>
          </div>

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
            <Users className="h-6 w-6" />
            Persona Management
          </h2>
          <p className="text-muted-foreground">Create and manage customer personas for journey mapping</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Persona
        </Button>
      </div>

      {/* Personas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map(renderPersonaCard)}
        
        {/* Create New Persona Card */}
        {isCreating && (
          <Card className="h-full">
            <CardHeader>
              <CardTitle>New Persona</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={formData.name || ""}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter persona name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <Input
                    value={formData.role || ""}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    placeholder="Job title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <Input
                    value={formData.department || ""}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    placeholder="Department"
                  />
                </div>
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
