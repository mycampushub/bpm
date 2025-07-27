
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVoice } from "@/contexts/VoiceContext";
import { Search, Filter, X } from "lucide-react";

export function AdvancedSearch() {
  const { speakText } = useVoice();
  const [searchFilters, setSearchFilters] = useState({
    keyword: "",
    type: "all",
    category: "all",
    owner: "all",
    status: "all",
    dateRange: "all"
  });

  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const filters = Object.entries(searchFilters)
      .filter(([_, value]) => value !== "all" && value !== "")
      .map(([key, value]) => `${key}:${value}`);
    
    setAppliedFilters(filters);
    speakText(`Applied ${filters.length} search filters. Results will be filtered based on your criteria.`);
  };

  const clearFilters = () => {
    setSearchFilters({
      keyword: "",
      type: "all",
      category: "all",
      owner: "all",
      status: "all",
      dateRange: "all"
    });
    setAppliedFilters([]);
    speakText("All search filters have been cleared. Showing all repository items.");
  };

  const removeFilter = (filter: string) => {
    const [key] = filter.split(":");
    handleFilterChange(key, key === "keyword" ? "" : "all");
    setAppliedFilters(prev => prev.filter(f => f !== filter));
  };

  return (
    <Card onMouseEnter={() => speakText("Advanced search interface. Use these filters to find specific items in your repository based on type, category, owner, and other criteria.")}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Advanced Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Keyword</label>
            <Input
              placeholder="Search by name or description..."
              value={searchFilters.keyword}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
              onFocus={() => speakText("Enter keywords to search by item name, description, or tags.")}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Type</label>
            <Select value={searchFilters.type} onValueChange={(value) => handleFilterChange("type", value)}>
              <SelectTrigger onFocus={() => speakText("Filter by item type such as process, model, template, or framework.")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="process">Process</SelectItem>
                <SelectItem value="model">Model</SelectItem>
                <SelectItem value="template">Template</SelectItem>
                <SelectItem value="framework">Framework</SelectItem>
                <SelectItem value="document">Document</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={searchFilters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger onFocus={() => speakText("Filter by business category such as operations, finance, HR, or compliance.")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="it">IT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Owner</label>
            <Select value={searchFilters.owner} onValueChange={(value) => handleFilterChange("owner", value)}>
              <SelectTrigger onFocus={() => speakText("Filter by item owner to find items created or managed by specific team members.")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Owners</SelectItem>
                <SelectItem value="sarah-chen">Sarah Chen</SelectItem>
                <SelectItem value="mike-rodriguez">Mike Rodriguez</SelectItem>
                <SelectItem value="lisa-wang">Lisa Wang</SelectItem>
                <SelectItem value="david-park">David Park</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select value={searchFilters.status} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger onFocus={() => speakText("Filter by status to find active, draft, or archived items.")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Date Range</label>
            <Select value={searchFilters.dateRange} onValueChange={(value) => handleFilterChange("dateRange", value)}>
              <SelectTrigger onFocus={() => speakText("Filter by modification date to find recently updated items.")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={applyFilters} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Apply Filters
          </Button>
          <Button variant="outline" onClick={clearFilters}>
            Clear All
          </Button>
        </div>

        {appliedFilters.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Applied Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {appliedFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFilter(filter)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
