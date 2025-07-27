
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Share2, 
  Copy, 
  Star,
  Calendar,
  User,
  Eye,
  Edit,
  Trash2,
  Plus
} from "lucide-react";

interface JourneyTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  industry: string;
  author: string;
  createdDate: string;
  lastModified: string;
  version: string;
  rating: number;
  downloads: number;
  stages: number;
  touchpoints: number;
  personas: number;
  tags: string[];
  isPublic: boolean;
  isFavorite: boolean;
}

export const JourneyLibrary: React.FC = () => {
  const { toast } = useToast();
  const { speakText } = useVoice();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("modified");
  
  const [journeyTemplates, setJourneyTemplates] = useState<JourneyTemplate[]>([
    {
      id: "1",
      name: "B2B SaaS Customer Journey",
      description: "Complete customer journey for B2B SaaS companies from lead generation to advocacy",
      category: "Sales & Marketing",
      industry: "Technology",
      author: "Sarah Chen",
      createdDate: "2024-01-15",
      lastModified: "2024-01-20",
      version: "2.1",
      rating: 4.8,
      downloads: 342,
      stages: 6,
      touchpoints: 24,
      personas: 4,
      tags: ["B2B", "SaaS", "Technology", "Sales"],
      isPublic: true,
      isFavorite: false
    },
    {
      id: "2",
      name: "E-commerce Customer Experience",
      description: "End-to-end e-commerce journey including discovery, purchase, and post-purchase experience",
      category: "E-commerce",
      industry: "Retail",
      author: "Mike Rodriguez",
      createdDate: "2024-01-10",
      lastModified: "2024-01-18",
      version: "1.5",
      rating: 4.6,
      downloads: 256,
      stages: 5,
      touchpoints: 18,
      personas: 3,
      tags: ["E-commerce", "Retail", "Online Shopping"],
      isPublic: true,
      isFavorite: true
    },
    {
      id: "3",
      name: "Healthcare Patient Journey",
      description: "Patient experience journey from symptom awareness to treatment and follow-up",
      category: "Healthcare",
      industry: "Healthcare",
      author: "Dr. Lisa Wang",
      createdDate: "2024-01-05",
      lastModified: "2024-01-12",
      version: "1.0",
      rating: 4.9,
      downloads: 128,
      stages: 7,
      touchpoints: 32,
      personas: 5,
      tags: ["Healthcare", "Patient Experience", "Medical"],
      isPublic: false,
      isFavorite: false
    },
    {
      id: "4",
      name: "Financial Services Onboarding",
      description: "Digital onboarding journey for financial services customers",
      category: "Financial Services",
      industry: "Finance",
      author: "John Smith",
      createdDate: "2024-01-08",
      lastModified: "2024-01-15",
      version: "1.3",
      rating: 4.4,
      downloads: 198,
      stages: 4,
      touchpoints: 16,
      personas: 3,
      tags: ["Finance", "Onboarding", "Digital"],
      isPublic: true,
      isFavorite: true
    }
  ]);

  const categories = ["all", "Sales & Marketing", "E-commerce", "Healthcare", "Financial Services", "Education", "Technology"];
  
  const filteredTemplates = journeyTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "name": return a.name.localeCompare(b.name);
      case "rating": return b.rating - a.rating;
      case "downloads": return b.downloads - a.downloads;
      case "modified": return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      default: return 0;
    }
  });

  const handleUseTemplate = (template: JourneyTemplate) => {
    toast({
      title: "Template Applied",
      description: `Creating new journey from "${template.name}" template...`
    });
    speakText(`Creating a new journey using the ${template.name} template. This template includes ${template.stages} stages, ${template.touchpoints} touchpoints, and ${template.personas} personas to help you get started quickly.`);
  };

  const handleDownload = (template: JourneyTemplate) => {
    toast({
      title: "Download Started",
      description: `Downloading "${template.name}"...`
    });
    speakText(`Downloading ${template.name} template. This will allow you to use it offline or import it into other journey mapping tools.`);
  };

  const handleFavorite = (templateId: string) => {
    setJourneyTemplates(templates => 
      templates.map(template => 
        template.id === templateId 
          ? { ...template, isFavorite: !template.isFavorite }
          : template
      )
    );
  };

  const handleDuplicate = (template: JourneyTemplate) => {
    const duplicatedTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      author: "Current User",
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      downloads: 0,
      isPublic: false,
      isFavorite: false
    };
    
    setJourneyTemplates([duplicatedTemplate, ...journeyTemplates]);
    toast({
      title: "Template Duplicated",
      description: `Created a copy of "${template.name}"`
    });
    speakText(`Template ${template.name} has been duplicated. You can now customize this copy for your specific needs.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Journey Library
          </h2>
          <p className="text-muted-foreground">Browse and use pre-built journey templates</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modified">Last Modified</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="downloads">Downloads</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTemplates.map((template) => (
          <Card key={template.id} className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleFavorite(template.id)}
                >
                  <Star className={`h-4 w-4 ${template.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">{template.category}</Badge>
                <Badge variant="secondary" className="text-xs">{template.industry}</Badge>
                {!template.isPublic && (
                  <Badge variant="outline" className="text-xs">Private</Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-0 space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-medium">{template.stages}</div>
                  <div className="text-muted-foreground text-xs">Stages</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{template.touchpoints}</div>
                  <div className="text-muted-foreground text-xs">Touchpoints</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{template.personas}</div>
                  <div className="text-muted-foreground text-xs">Personas</div>
                </div>
              </div>

              {/* Rating and Downloads */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{template.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Download className="h-3 w-3" />
                  <span>{template.downloads}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {template.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {template.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{template.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Author and Date */}
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {template.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Updated {new Date(template.lastModified).toLocaleDateString()}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t">
                <Button size="sm" onClick={() => handleUseTemplate(template)}>
                  Use Template
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDuplicate(template)}>
                  <Copy className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDownload(template)}>
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium">No templates found</p>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};
