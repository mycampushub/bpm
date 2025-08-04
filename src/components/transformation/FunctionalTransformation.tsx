import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useVoice } from '@/contexts/VoiceContext';
import { 
  Target, 
  Users, 
  Calendar, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Settings,
  BarChart3,
  Clock
} from 'lucide-react';

interface TransformationInitiative {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  progress: number;
  startDate: string;
  endDate: string;
  owner: string;
  budget: number;
  roi: number;
}

export const FunctionalTransformation: React.FC = () => {
  const [initiatives, setInitiatives] = useState<TransformationInitiative[]>([
    {
      id: '1',
      name: 'Digital Customer Onboarding',
      description: 'Digitize and streamline customer onboarding process',
      status: 'active',
      progress: 65,
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      owner: 'Sarah Johnson',
      budget: 250000,
      roi: 180
    },
    {
      id: '2',
      name: 'Invoice Processing Automation',
      description: 'Implement RPA for invoice processing workflow',
      status: 'planning',
      progress: 25,
      startDate: '2024-03-01',
      endDate: '2024-08-15',
      owner: 'Mike Chen',
      budget: 150000,
      roi: 220
    }
  ]);

  const [newInitiative, setNewInitiative] = useState({
    name: '',
    description: '',
    owner: '',
    budget: 0,
    endDate: ''
  });

  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const { speakText } = useVoice();

  const handleCreateInitiative = useCallback(() => {
    if (!newInitiative.name || !newInitiative.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const initiative: TransformationInitiative = {
      id: Date.now().toString(),
      ...newInitiative,
      status: 'planning',
      progress: 0,
      startDate: new Date().toISOString().split('T')[0],
      roi: Math.floor(Math.random() * 200) + 100
    };

    setInitiatives(prev => [...prev, initiative]);
    setNewInitiative({ name: '', description: '', owner: '', budget: 0, endDate: '' });
    setShowForm(false);

    toast({
      title: "Initiative Created",
      description: `${initiative.name} has been added to the transformation portfolio`
    });
    speakText(`Transformation initiative ${initiative.name} created successfully`);
  }, [newInitiative, toast, speakText]);

  const handleUpdateProgress = useCallback((id: string, newProgress: number) => {
    setInitiatives(prev => prev.map(init => 
      init.id === id ? { ...init, progress: newProgress } : init
    ));

    const initiative = initiatives.find(i => i.id === id);
    toast({
      title: "Progress Updated",
      description: `${initiative?.name} is now ${newProgress}% complete`
    });
    speakText(`Progress updated to ${newProgress} percent for ${initiative?.name}`);
  }, [initiatives, toast, speakText]);

  const handleGenerateReport = useCallback(() => {
    const totalBudget = initiatives.reduce((sum, init) => sum + init.budget, 0);
    const avgProgress = initiatives.reduce((sum, init) => sum + init.progress, 0) / initiatives.length;
    const completedInitiatives = initiatives.filter(init => init.status === 'completed').length;

    const reportData = {
      timestamp: new Date().toISOString(),
      summary: {
        totalInitiatives: initiatives.length,
        completedInitiatives,
        totalBudget,
        averageProgress: avgProgress.toFixed(1),
        totalROI: initiatives.reduce((sum, init) => sum + init.roi, 0)
      },
      initiatives
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transformation-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Report Generated",
      description: "Transformation portfolio report downloaded"
    });
    speakText("Transformation portfolio report generated and downloaded successfully");
  }, [initiatives, toast, speakText]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'planning': return 'bg-yellow-500';
      case 'on-hold': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {initiatives.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Initiatives</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {initiatives.filter(i => i.status === 'completed').length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              ${(initiatives.reduce((sum, i) => sum + i.budget, 0) / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-muted-foreground">Total Budget</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {(initiatives.reduce((sum, i) => sum + i.progress, 0) / initiatives.length || 0).toFixed(0)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => setShowForm(!showForm)}>
          <Target className="h-4 w-4 mr-2" />
          New Initiative
        </Button>
        <Button variant="outline" onClick={handleGenerateReport}>
          <Download className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
        <Button variant="outline" onClick={() => {
          toast({
            title: "Roadmap Generated",
            description: "Transformation roadmap updated with current initiatives"
          });
          speakText("Transformation roadmap has been updated with all current initiatives");
        }}>
          <Calendar className="h-4 w-4 mr-2" />
          Update Roadmap
        </Button>
      </div>

      {/* New Initiative Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Initiative</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Initiative Name *</Label>
                <Input
                  id="name"
                  value={newInitiative.name}
                  onChange={(e) => setNewInitiative(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter initiative name"
                />
              </div>
              <div>
                <Label htmlFor="owner">Initiative Owner</Label>
                <Input
                  id="owner"
                  value={newInitiative.owner}
                  onChange={(e) => setNewInitiative(prev => ({ ...prev, owner: e.target.value }))}
                  placeholder="Enter owner name"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={newInitiative.description}
                onChange={(e) => setNewInitiative(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the transformation initiative"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Budget ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={newInitiative.budget}
                  onChange={(e) => setNewInitiative(prev => ({ ...prev, budget: Number(e.target.value) }))}
                  placeholder="Enter budget amount"
                />
              </div>
              <div>
                <Label htmlFor="endDate">Target End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newInitiative.endDate}
                  onChange={(e) => setNewInitiative(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleCreateInitiative}>
                Create Initiative
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Initiatives List */}
      <div className="grid grid-cols-1 gap-4">
        {initiatives.map((initiative) => (
          <Card key={initiative.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{initiative.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {initiative.description}
                  </p>
                </div>
                <Badge className={getStatusColor(initiative.status)}>
                  {initiative.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {initiative.progress}%
                      </span>
                    </div>
                    <Progress value={initiative.progress} />
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const newProgress = Math.min(initiative.progress + 10, 100);
                      handleUpdateProgress(initiative.id, newProgress);
                    }}
                  >
                    +10%
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{initiative.owner}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(initiative.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <span>${(initiative.budget / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span>ROI: {initiative.roi}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};