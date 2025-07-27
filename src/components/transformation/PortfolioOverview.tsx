import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { NewInitiativeDialog } from "./NewInitiativeDialog";
import { 
  Target, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Plus,
  Filter,
  Eye,
  Edit,
  Search,
  X,
  Download
} from "lucide-react";

export const PortfolioOverview: React.FC = () => {
  const { speakText } = useVoice();
  const { toast } = useToast();
  const [initiatives, setInitiatives] = useState([
    {
      id: "init-001",
      name: "Customer Experience Transformation",
      status: "in-progress",
      priority: "high",
      budget: "$450K",
      spent: "$287K",
      progress: 68,
      owner: "Sarah Chen",
      dueDate: "2024-06-30",
      category: "customer-experience"
    },
    {
      id: "init-002", 
      name: "Process Automation Suite",
      status: "planning",
      priority: "medium",
      budget: "$320K",
      spent: "$45K",
      progress: 15,
      owner: "Mike Rodriguez",
      dueDate: "2024-09-15",
      category: "automation"
    },
    {
      id: "init-003",
      name: "Data Analytics Platform",
      status: "in-progress", 
      priority: "high",
      budget: "$280K",
      spent: "$198K",
      progress: 75,
      owner: "Lisa Wang",
      dueDate: "2024-05-31",
      category: "analytics"
    }
  ]);

  const [filteredInitiatives, setFilteredInitiatives] = useState(initiatives);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isNewInitiativeOpen, setIsNewInitiativeOpen] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState<any>(null);
  const [filterCriteria, setFilterCriteria] = useState({
    status: "all",
    priority: "all",
    category: "all",
    search: ""
  });

  const applyFilters = () => {
    let filtered = initiatives;

    if (filterCriteria.status && filterCriteria.status !== "all") {
      filtered = filtered.filter(init => init.status === filterCriteria.status);
    }
    if (filterCriteria.priority && filterCriteria.priority !== "all") {
      filtered = filtered.filter(init => init.priority === filterCriteria.priority);
    }
    if (filterCriteria.category && filterCriteria.category !== "all") {
      filtered = filtered.filter(init => init.category === filterCriteria.category);
    }
    if (filterCriteria.search) {
      filtered = filtered.filter(init => 
        init.name.toLowerCase().includes(filterCriteria.search.toLowerCase()) ||
        init.owner.toLowerCase().includes(filterCriteria.search.toLowerCase())
      );
    }

    setFilteredInitiatives(filtered);
    toast({
      title: "Filters Applied",
      description: `Showing ${filtered.length} of ${initiatives.length} initiatives`
    });
  };

  const clearFilters = () => {
    setFilterCriteria({ status: "all", priority: "all", category: "all", search: "" });
    setFilteredInitiatives(initiatives);
    toast({
      title: "Filters Cleared",
      description: "Showing all initiatives"
    });
  };

  const handleView = (initiative: any) => {
    setSelectedInitiative(initiative);
    setIsViewOpen(true);
    speakText(`Viewing details for ${initiative.name}`);
  };

  const handleEdit = (initiative: any) => {
    setSelectedInitiative(initiative);
    setIsEditOpen(true);
    speakText(`Editing ${initiative.name}`);
  };

  const handleSaveEdit = () => {
    if (selectedInitiative) {
      setInitiatives(prev => 
        prev.map(init => 
          init.id === selectedInitiative.id ? selectedInitiative : init
        )
      );
      setFilteredInitiatives(prev => 
        prev.map(init => 
          init.id === selectedInitiative.id ? selectedInitiative : init
        )
      );
      toast({
        title: "Initiative Updated",
        description: `${selectedInitiative.name} has been updated successfully.`
      });
      setIsEditOpen(false);
      setSelectedInitiative(null);
    }
  };

  const handleCreateInitiative = (newInitiative: any) => {
    setInitiatives(prev => [...prev, newInitiative]);
    setFilteredInitiatives(prev => [...prev, newInitiative]);
    toast({
      title: "Initiative Created",
      description: `${newInitiative.name} has been added to your portfolio.`
    });
  };

  const handleExportData = () => {
    const dataToExport = {
      initiatives: filteredInitiatives,
      exportDate: new Date().toISOString(),
      totalInitiatives: filteredInitiatives.length
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-initiatives.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data Exported",
      description: "Portfolio data has been downloaded successfully."
    });
  };

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Portfolio Overview. Manage your transformation initiative portfolio. Track progress, budgets, and timelines across all active transformation programs.")}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transformation Portfolio</CardTitle>
              <CardDescription>Active transformation initiatives and their progress</CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Filter Initiatives</DialogTitle>
                    <DialogDescription>
                      Filter initiatives by status, priority, category, or search terms.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="search">Search</Label>
                      <Input
                        id="search"
                        placeholder="Search by name or owner..."
                        value={filterCriteria.search}
                        onChange={(e) => setFilterCriteria(prev => ({ ...prev, search: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <Label>Status</Label>
                        <Select value={filterCriteria.status} onValueChange={(value) => setFilterCriteria(prev => ({ ...prev, status: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="planning">Planning</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Priority</Label>
                        <Select value={filterCriteria.priority} onValueChange={(value) => setFilterCriteria(prev => ({ ...prev, priority: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Category</Label>
                        <Select value={filterCriteria.category} onValueChange={(value) => setFilterCriteria(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="customer-experience">Customer Experience</SelectItem>
                            <SelectItem value="automation">Automation</SelectItem>
                            <SelectItem value="analytics">Analytics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {
                      setFilterCriteria({ status: "all", priority: "all", category: "all", search: "" });
                      setFilteredInitiatives(initiatives);
                    }}>Clear All</Button>
                    <Button onClick={() => {
                      let filtered = initiatives;
                      if (filterCriteria.status && filterCriteria.status !== "all") {
                        filtered = filtered.filter(init => init.status === filterCriteria.status);
                      }
                      if (filterCriteria.priority && filterCriteria.priority !== "all") {
                        filtered = filtered.filter(init => init.priority === filterCriteria.priority);
                      }
                      if (filterCriteria.category && filterCriteria.category !== "all") {
                        filtered = filtered.filter(init => init.category === filterCriteria.category);
                      }
                      if (filterCriteria.search) {
                        filtered = filtered.filter(init => 
                          init.name.toLowerCase().includes(filterCriteria.search.toLowerCase()) ||
                          init.owner.toLowerCase().includes(filterCriteria.search.toLowerCase())
                        );
                      }
                      setFilteredInitiatives(filtered);
                      setIsFilterOpen(false);
                    }}>Apply Filters</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button onClick={() => setIsNewInitiativeOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Initiative
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInitiatives.map((initiative) => (
              <div key={initiative.id} className="border rounded-lg p-4 hover:bg-muted/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{initiative.name}</h3>
                      <Badge variant={
                        initiative.status === "in-progress" ? "default" :
                        initiative.status === "planning" ? "secondary" : "outline"
                      }>
                        {initiative.status.replace("-", " ")}
                      </Badge>
                      <Badge variant={
                        initiative.priority === "high" ? "destructive" :
                        initiative.priority === "medium" ? "secondary" : "outline"
                      }>
                        {initiative.priority} priority
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Budget</div>
                        <div className="font-semibold">{initiative.budget}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Spent</div>
                        <div className="font-semibold">{initiative.spent}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Owner</div>
                        <div className="font-semibold">{initiative.owner}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Due Date</div>
                        <div className="font-semibold">{new Date(initiative.dueDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{initiative.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${initiative.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleView(initiative)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(initiative)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Initiative Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Initiative Details</DialogTitle>
            <DialogDescription>Complete information about this transformation initiative</DialogDescription>
          </DialogHeader>
          {selectedInitiative && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-lg">{selectedInitiative.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className="mt-1">{selectedInitiative.status}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Budget</Label>
                  <p>{selectedInitiative.budget}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Spent</Label>
                  <p>{selectedInitiative.spent}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Progress</Label>
                  <p>{selectedInitiative.progress}%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Owner</Label>
                  <p>{selectedInitiative.owner}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Due Date</Label>
                  <p>{new Date(selectedInitiative.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Initiative Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Initiative</DialogTitle>
            <DialogDescription>Update initiative information</DialogDescription>
          </DialogHeader>
          {selectedInitiative && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="editName">Name</Label>
                <Input
                  id="editName"
                  value={selectedInitiative.name}
                  onChange={(e) => setSelectedInitiative(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select 
                    value={selectedInitiative.status} 
                    onValueChange={(value) => setSelectedInitiative(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Priority</Label>
                  <Select 
                    value={selectedInitiative.priority} 
                    onValueChange={(value) => setSelectedInitiative(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="editBudget">Budget</Label>
                  <Input
                    id="editBudget"
                    value={selectedInitiative.budget}
                    onChange={(e) => setSelectedInitiative(prev => ({ ...prev, budget: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editOwner">Owner</Label>
                  <Input
                    id="editOwner"
                    value={selectedInitiative.owner}
                    onChange={(e) => setSelectedInitiative(prev => ({ ...prev, owner: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <NewInitiativeDialog 
        open={isNewInitiativeOpen} 
        onOpenChange={setIsNewInitiativeOpen}
        onCreateInitiative={handleCreateInitiative}
      />
    </div>
  );
};
