import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRepository } from "@/hooks/useRepository";
import { RepositoryItemType } from "@/types/repository";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { 
  Search, 
  Grid, 
  List, 
  Filter,
  FileText,
  Settings,
  Eye,
  Edit,
  Share,
  Download,
  Trash2,
  Plus
} from "lucide-react";

export const RepositoryContent: React.FC = () => {
  const { 
    viewMode, 
    setViewMode, 
    filteredItems, 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    setSelectedCategory,
    handleViewItem,
    handleEditItem,
    handleRenameItem,
    handleShareItem,
    handleDownloadItem,
    deleteItem
  } = useRepository();
  
  const { toast } = useToast();
  const { speakText } = useVoice();

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "operations", label: "Operations" },
    { value: "finance", label: "Finance" },
    { value: "hr", label: "Human Resources" },
    { value: "compliance", label: "Compliance" },
    { value: "customer", label: "Customer Service" }
  ];

  const handleNewItem = () => {
    const newItem = {
      name: `New Item ${Date.now()}`,
      description: "New repository item",
      type: "process" as const,
      category: "operations",
      version: "1.0.0",
      owner: "Current User",
      size: "0 KB",
      tags: ["new"],
      lastModified: new Date().toISOString(),
      createdBy: "Current User",
      status: "draft" as const
    };
    
    // Use the data manager's create function
    const repositoryData = useRepository();
    repositoryData.create(newItem);
    
    toast({
      title: "Item Created",
      description: "New repository item has been created successfully."
    });
    speakText("New repository item created successfully. You can now edit it to add your content.");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "process": return "🔄";
      case "model": return "📊";
      case "template": return "📋";
      case "framework": return "🏗️";
      default: return "📄";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const ItemActions = ({ item }: { item: RepositoryItemType }) => (
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button size="sm" variant="ghost" onClick={() => handleViewItem(item)}>
        <Eye className="h-3 w-3" />
      </Button>
      <Button size="sm" variant="ghost" onClick={() => handleEditItem(item)}>
        <Edit className="h-3 w-3" />
      </Button>
      <Button size="sm" variant="ghost" onClick={() => handleShareItem(item)}>
        <Share className="h-3 w-3" />
      </Button>
      <Button size="sm" variant="ghost" onClick={() => handleDownloadItem(item)}>
        <Download className="h-3 w-3" />
      </Button>
      <Button size="sm" variant="ghost" onClick={() => deleteItem(item.id)} className="text-red-500 hover:text-red-700">
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Repository</h1>
          <p className="text-muted-foreground">Manage your process assets, templates, and knowledge base</p>
        </div>
        
        <Button onClick={handleNewItem}>
          <Plus className="h-4 w-4 mr-2" />
          New Item
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search repository..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-md bg-background"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        
        <div className="flex items-center border rounded-md">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(item.type)}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                  <ItemActions item={item} />
                </div>
                <CardTitle className="text-sm font-medium line-clamp-2">
                  {item.name}
                </CardTitle>
                <CardDescription className="text-xs line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>v{item.version}</span>
                    <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{item.owner}</span>
                    <span>{item.size}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{item.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-lg flex-shrink-0">{getTypeIcon(item.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium truncate">{item.name}</h3>
                        <Badge variant="outline" className="text-xs flex-shrink-0">
                          {item.type}
                        </Badge>
                        <Badge className={`text-xs flex-shrink-0 ${getStatusColor(item.status)}`}>
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span>v{item.version}</span>
                        <span>{item.owner}</span>
                        <span>{item.size}</span>
                        <span>{new Date(item.lastModified).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <ItemActions item={item} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || selectedCategory !== "all" 
              ? "Try adjusting your search or filters" 
              : "Start by creating your first repository item"
            }
          </p>
          <Button onClick={handleNewItem}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Item
          </Button>
        </div>
      )}
    </div>
  );
};
