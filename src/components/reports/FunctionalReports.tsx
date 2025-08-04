import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { 
  Plus, 
  Search,
  Filter,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  FileText,
  Eye,
  Edit,
  Share,
  Trash2,
  Clock,
  Users,
  Target
} from "lucide-react";

interface Report {
  id: string;
  name: string;
  type: 'dashboard' | 'export' | 'scheduled';
  category: string;
  description: string;
  lastRun: string;
  frequency: string;
  status: 'active' | 'draft' | 'archived';
  views: number;
  creator: string;
}

interface Dashboard {
  id: string;
  name: string;
  description: string;
  widgets: number;
  lastUpdated: string;
  views: number;
  isPublic: boolean;
}

const demoReports: Report[] = [
  {
    id: 'r1',
    name: 'Process Performance Summary',
    type: 'dashboard',
    category: 'Performance',
    description: 'Weekly summary of all process performance metrics',
    lastRun: '2024-01-15T09:00:00Z',
    frequency: 'Weekly',
    status: 'active',
    views: 342,
    creator: 'Sarah Johnson'
  },
  {
    id: 'r2', 
    name: 'Compliance Audit Report',
    type: 'export',
    category: 'Compliance',
    description: 'Detailed compliance audit for regulatory requirements',
    lastRun: '2024-01-14T14:30:00Z',
    frequency: 'Monthly',
    status: 'active',
    views: 156,
    creator: 'Mike Wilson'
  },
  {
    id: 'r3',
    name: 'Customer Journey Analytics',
    type: 'scheduled',
    category: 'Analytics',
    description: 'Daily analytics on customer journey performance',
    lastRun: '2024-01-15T08:00:00Z',
    frequency: 'Daily',
    status: 'active',
    views: 89,
    creator: 'Emma Davis'
  }
];

const demoDashboards: Dashboard[] = [
  {
    id: 'd1',
    name: 'Executive Overview',
    description: 'High-level KPIs and business metrics',
    widgets: 8,
    lastUpdated: '2024-01-15T10:30:00Z',
    views: 1247,
    isPublic: true
  },
  {
    id: 'd2',
    name: 'Operations Dashboard',
    description: 'Real-time operational metrics and alerts',
    widgets: 12,
    lastUpdated: '2024-01-15T09:45:00Z',
    views: 856,
    isPublic: false
  },
  {
    id: 'd3',
    name: 'Process Mining Insights',
    description: 'Process discovery and optimization insights',
    widgets: 6,
    lastUpdated: '2024-01-14T16:20:00Z',
    views: 423,
    isPublic: false
  }
];

export function FunctionalReports() {
  const [reports, setReports] = useState<Report[]>(demoReports);
  const [dashboards, setDashboards] = useState<Dashboard[]>(demoDashboards);
  const [activeTab, setActiveTab] = useState("reports");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { toast } = useToast();
  const { speakText } = useVoice();

  const handleCreateReport = () => {
    const newReport: Report = {
      id: `r${Date.now()}`,
      name: `New Report ${reports.length + 1}`,
      type: 'dashboard',
      category: 'Performance',
      description: 'New report description',
      lastRun: new Date().toISOString(),
      frequency: 'Weekly',
      status: 'draft',
      views: 0,
      creator: 'Current User'
    };
    
    setReports([...reports, newReport]);
    toast({
      title: "Report Created",
      description: `Created new report: ${newReport.name}`
    });
    speakText(`Created new report: ${newReport.name}`);
  };

  const handleCreateDashboard = () => {
    const newDashboard: Dashboard = {
      id: `d${Date.now()}`,
      name: `New Dashboard ${dashboards.length + 1}`,
      description: 'New dashboard description',
      widgets: 0,
      lastUpdated: new Date().toISOString(),
      views: 0,
      isPublic: false
    };
    
    setDashboards([...dashboards, newDashboard]);
    toast({
      title: "Dashboard Created",
      description: `Created new dashboard: ${newDashboard.name}`
    });
    speakText(`Created new dashboard: ${newDashboard.name}`);
  };

  const handleRunReport = (report: Report) => {
    const updatedReports = reports.map(r => 
      r.id === report.id 
        ? { ...r, lastRun: new Date().toISOString(), views: r.views + 1 }
        : r
    );
    setReports(updatedReports);
    
    toast({
      title: "Report Generated",
      description: `Generated report: ${report.name}`
    });
    speakText(`Generated ${report.name} report successfully`);
  };

  const handleExportReport = (report: Report) => {
    toast({
      title: "Export Started",
      description: `Exporting ${report.name} to PDF`
    });
    speakText(`Starting export of ${report.name} to PDF`);
  };

  const handleViewDashboard = (dashboard: Dashboard) => {
    const updatedDashboards = dashboards.map(d => 
      d.id === dashboard.id 
        ? { ...d, views: d.views + 1 }
        : d
    );
    setDashboards(updatedDashboards);
    
    toast({
      title: "Dashboard Opened",
      description: `Opening ${dashboard.name} dashboard`
    });
    speakText(`Opening ${dashboard.name} dashboard`);
  };

  const handleDeleteReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    setReports(reports.filter(r => r.id !== reportId));
    toast({
      title: "Report Deleted",
      description: `Deleted report: ${report?.name}`
    });
    speakText(`Deleted report: ${report?.name}`);
  };

  const handleDeleteDashboard = (dashboardId: string) => {
    const dashboard = dashboards.find(d => d.id === dashboardId);
    setDashboards(dashboards.filter(d => d.id !== dashboardId));
    toast({
      title: "Dashboard Deleted",
      description: `Deleted dashboard: ${dashboard?.name}`
    });
    speakText(`Deleted dashboard: ${dashboard?.name}`);
  };

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDashboards = dashboards.filter(dashboard =>
    dashboard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dashboard.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate insights and track performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => speakText("Reports and Analytics dashboard loaded with reporting tools")}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button onClick={handleCreateReport}>
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{reports.length}</div>
            <div className="text-xs text-blue-600">+3 this month</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Dashboards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{dashboards.length}</div>
            <div className="text-xs text-green-600">All active</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {reports.reduce((sum, r) => sum + r.views, 0) + dashboards.reduce((sum, d) => sum + d.views, 0)}
            </div>
            <div className="text-xs text-purple-600">This month</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {reports.filter(r => r.type === 'scheduled').length}
            </div>
            <div className="text-xs text-orange-600">Auto-generated</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports and dashboards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Reports</h2>
            <Button onClick={handleCreateReport}>
              <Plus className="h-4 w-4 mr-2" />
              Create Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <Badge 
                      variant={report.status === 'active' ? 'default' : report.status === 'draft' ? 'secondary' : 'destructive'}
                    >
                      {report.status}
                    </Badge>
                  </div>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-muted-foreground">Category</div>
                      <div className="font-semibold">{report.category}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Type</div>
                      <div className="font-semibold capitalize">{report.type}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-muted-foreground">Frequency</div>
                      <div className="font-semibold">{report.frequency}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Views</div>
                      <div className="font-semibold">{report.views}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleRunReport(report)}>
                      <Eye className="h-3 w-3 mr-1" />
                      Run
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleExportReport(report)}>
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteReport(report.id)}>
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dashboards" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Dashboards</h2>
            <Button onClick={handleCreateDashboard}>
              <Plus className="h-4 w-4 mr-2" />
              Create Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDashboards.map((dashboard) => (
              <Card key={dashboard.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{dashboard.name}</CardTitle>
                    <Badge variant={dashboard.isPublic ? 'default' : 'secondary'}>
                      {dashboard.isPublic ? 'Public' : 'Private'}
                    </Badge>
                  </div>
                  <CardDescription>{dashboard.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-muted-foreground">Widgets</div>
                      <div className="font-semibold">{dashboard.widgets}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Views</div>
                      <div className="font-semibold">{dashboard.views}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium text-muted-foreground text-sm">Last Updated</div>
                    <div className="font-semibold">
                      {new Date(dashboard.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleViewDashboard(dashboard)}>
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteDashboard(dashboard.id)}>
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Analytics</CardTitle>
              <CardDescription>Usage and performance insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {reports.reduce((sum, r) => sum + r.views, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Report Views</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {dashboards.reduce((sum, d) => sum + d.views, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Dashboard Views</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {reports.filter(r => r.status === 'active').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Active Reports</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {reports.filter(r => r.type === 'scheduled').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Scheduled Reports</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}