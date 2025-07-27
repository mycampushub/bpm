
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CardMetric } from "@/components/ui/card-metric";
import {
  Copy,
  Download,
  FileText,
  Filter,
  LayoutGrid,
  LineChart,
  List,
  MoreHorizontal,
  PieChart,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  Share2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ReportsDashboards() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  return (
    <MainLayout pageTitle="Reports & Dashboards">
      <Tabs defaultValue="dashboards" className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <TabsList className="bg-transparent p-0">
            <TabsTrigger value="dashboards" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Dashboards
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Reports
            </TabsTrigger>
            <TabsTrigger value="builder" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Dashboard Builder
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Create New
            </Button>
          </div>
        </div>
        
        <TabsContent value="dashboards" className="m-0">
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search dashboards..."
                className="pl-8"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setViewMode("grid")}
                className={cn(
                  "h-8 w-8",
                  viewMode === "grid" ? "bg-muted" : ""
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setViewMode("list")}
                className={cn(
                  "h-8 w-8",
                  viewMode === "list" ? "bg-muted" : ""
                )}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className={cn(
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
              : "flex flex-col space-y-2"
          )}>
            {dashboards.map((dashboard, index) => (
              <DashboardItem
                key={index}
                dashboard={dashboard}
                viewMode={viewMode}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="m-0">
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-8"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setViewMode("grid")}
                className={cn(
                  "h-8 w-8",
                  viewMode === "grid" ? "bg-muted" : ""
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setViewMode("list")}
                className={cn(
                  "h-8 w-8",
                  viewMode === "list" ? "bg-muted" : ""
                )}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className={cn(
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
              : "flex flex-col space-y-2"
          )}>
            {reports.map((report, index) => (
              <ReportItem
                key={index}
                report={report}
                viewMode={viewMode}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="builder" className="m-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle>
                    <Input 
                      placeholder="Dashboard Title" 
                      defaultValue="Process Performance Overview"
                      className="text-xl h-auto py-1 font-semibold" 
                    />
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button size="sm" className="gap-1">
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <CardMetric
                      title="Average Process Time"
                      value="3.5 days"
                      trend={{ value: 15, isUpward: false, isPositive: true }}
                      variant="primary"
                    />
                    <CardMetric
                      title="Process Efficiency"
                      value="72%"
                      trend={{ value: 8, isUpward: true, isPositive: true }}
                      variant="success"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="text-sm font-medium mb-4">Process Execution Time Trend</h4>
                      <div className="w-full aspect-[4/3] bg-muted/50 rounded flex items-center justify-center">
                        <LineChart className="h-10 w-10 text-muted-foreground/70" />
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="text-sm font-medium mb-4">Process Distribution by Type</h4>
                      <div className="w-full aspect-[4/3] bg-muted/50 rounded flex items-center justify-center">
                        <PieChart className="h-10 w-10 text-muted-foreground/70" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-4">Top Process Bottlenecks</h4>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">Process Step</th>
                          <th className="text-left py-2 font-medium">Avg. Wait Time</th>
                          <th className="text-left py-2 font-medium">Impact</th>
                          <th className="text-left py-2 font-medium">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">Approval Decision</td>
                          <td className="py-2">18.2 hours</td>
                          <td className="py-2">High</td>
                          <td className="py-2 text-red-500">↑ 12%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Document Verification</td>
                          <td className="py-2">9.5 hours</td>
                          <td className="py-2">Medium</td>
                          <td className="py-2 text-amber-500">↑ 3%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Input Validation</td>
                          <td className="py-2">4.3 hours</td>
                          <td className="py-2">Low</td>
                          <td className="py-2 text-green-500">↓ 8%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Widget Library</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4">
                    <Label className="mb-2 block">Metrics</Label>
                    <div className="space-y-2">
                      <div className="border border-dashed rounded-md p-2 cursor-move hover:border-primary hover:bg-muted/50">
                        Single Metric with Trend
                      </div>
                      <div className="border border-dashed rounded-md p-2 cursor-move hover:border-primary hover:bg-muted/50">
                        Multi-Metric Comparison
                      </div>
                      <div className="border border-dashed rounded-md p-2 cursor-move hover:border-primary hover:bg-muted/50">
                        Progress Gauge
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="p-4">
                    <Label className="mb-2 block">Charts</Label>
                    <div className="space-y-2">
                      <div className="border border-dashed rounded-md p-2 cursor-move hover:border-primary hover:bg-muted/50">
                        Line Chart
                      </div>
                      <div className="border border-dashed rounded-md p-2 cursor-move hover:border-primary hover:bg-muted/50">
                        Bar Chart
                      </div>
                      <div className="border border-dashed rounded-md p-2 cursor-move hover:border-primary hover:bg-muted/50">
                        Pie/Donut Chart
                      </div>
                      <div className="border border-dashed rounded-md p-2 cursor-move hover:border-primary hover:bg-muted/50">
                        Scatter Plot
                      </div>
                      <div className="border border-dashed rounded-md p-2 cursor-move hover:border-primary hover:bg-muted/50">
                        Heatmap
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="p-4">
                    <Label className="mb-2 block">Tables & Lists</Label>
                    <div className="space-y-2">
                      <div className="border border-dashed rounded-md p-2 cursor-move hover:border-primary hover:bg-muted/50">
                        Data Table
                      </div>
                      <div className="border border-dashed rounded-md p-2 cursor-move hover:border-primary hover:bg-muted/50">
                        Ranked List
                      </div>
                      <div className="border border-dashed rounded-md p-2 cursor-move hover:border-primary hover:bg-muted/50">
                        Timeline
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}

interface Dashboard {
  name: string;
  description: string;
  lastModified: string;
  owner: string;
  type: "Process Performance" | "Executive Summary" | "Operational" | "Custom";
  tags: string[];
}

const dashboards: Dashboard[] = [
  {
    name: "Process Performance Overview",
    description: "Key metrics and trends for all critical business processes",
    lastModified: "Today",
    owner: "John Doe",
    type: "Process Performance",
    tags: ["KPIs", "Trends", "Performance"]
  },
  {
    name: "Executive Summary Dashboard",
    description: "High-level overview of business transformation initiatives for leadership",
    lastModified: "Yesterday",
    owner: "Sarah Miller",
    type: "Executive Summary",
    tags: ["Executive", "Summary", "Strategic"]
  },
  {
    name: "Order-to-Cash Analysis",
    description: "Detailed metrics and bottlenecks in the order-to-cash process",
    lastModified: "3 days ago",
    owner: "Michael Chen",
    type: "Process Performance",
    tags: ["Order", "Finance", "Cash Flow"]
  },
  {
    name: "Customer Journey Insights",
    description: "Customer touchpoints and experience metrics across journeys",
    lastModified: "1 week ago",
    owner: "Lisa Johnson",
    type: "Operational",
    tags: ["Customer", "Journey", "Experience"]
  },
  {
    name: "Compliance Tracking Dashboard",
    description: "Monitor regulatory compliance status across processes",
    lastModified: "2 weeks ago",
    owner: "Robert Taylor",
    type: "Operational",
    tags: ["Compliance", "Regulatory", "Risk"]
  },
  {
    name: "Process Mining Results",
    description: "Automated process discovery results and conformance analysis",
    lastModified: "3 weeks ago",
    owner: "Jennifer Adams",
    type: "Process Performance",
    tags: ["Mining", "Discovery", "Analysis"]
  }
];

interface Report {
  name: string;
  description: string;
  lastRun: string;
  owner: string;
  format: "PDF" | "Excel" | "PowerPoint" | "Interactive";
  status: "Ready" | "Scheduled" | "Failed";
}

const reports: Report[] = [
  {
    name: "Monthly Process Performance Report",
    description: "Comprehensive review of all process KPIs for the month",
    lastRun: "Oct 1, 2023",
    owner: "John Doe",
    format: "PDF",
    status: "Ready"
  },
  {
    name: "Quarterly Transformation Progress",
    description: "Update on transformation initiatives and their business impact",
    lastRun: "Jul 15, 2023",
    owner: "Sarah Miller",
    format: "PowerPoint",
    status: "Ready"
  },
  {
    name: "Process Compliance Audit",
    description: "Detailed analysis of process compliance with regulations",
    lastRun: "Sep 25, 2023",
    owner: "Robert Taylor",
    format: "Excel",
    status: "Ready"
  },
  {
    name: "Customer Journey Analytics",
    description: "Analysis of customer behavior across digital touchpoints",
    lastRun: "Scheduled for Oct 5, 2023",
    owner: "Lisa Johnson",
    format: "Interactive",
    status: "Scheduled"
  },
  {
    name: "Process Mining Analysis",
    description: "In-depth analysis of process execution patterns and anomalies",
    lastRun: "Failed on Oct 2, 2023",
    owner: "Jennifer Adams",
    format: "Interactive",
    status: "Failed"
  },
  {
    name: "Cost Efficiency Report",
    description: "Analysis of process costs and efficiency improvement opportunities",
    lastRun: "Sep 15, 2023",
    owner: "Michael Chen",
    format: "Excel",
    status: "Ready"
  }
];

interface DashboardItemProps {
  dashboard: Dashboard;
  viewMode: "grid" | "list";
}

function DashboardItem({ dashboard, viewMode }: DashboardItemProps) {
  if (viewMode === "grid") {
    return (
      <Card className="hover:border-primary cursor-pointer">
        <CardContent className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{dashboard.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{dashboard.description}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Open</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Badge variant="secondary" className="mt-3">
            {dashboard.type}
          </Badge>
          
          <div className="flex flex-wrap gap-1 mt-1">
            {dashboard.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t flex justify-between text-sm text-muted-foreground">
            <div>Updated {dashboard.lastModified}</div>
            <div>{dashboard.owner}</div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="hover:border-primary cursor-pointer">
      <CardContent className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LineChart className="h-5 w-5 text-muted-foreground" />
          <div>
            <h3 className="font-medium">{dashboard.name}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-xs">
                {dashboard.type}
              </Badge>
              <span>•</span>
              <span>{dashboard.owner}</span>
              <span>•</span>
              <span>Updated {dashboard.lastModified}</span>
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Open</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Export
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}

interface ReportItemProps {
  report: Report;
  viewMode: "grid" | "list";
}

function ReportItem({ report, viewMode }: ReportItemProps) {
  const statusColors = {
    "Ready": "bg-green-100 text-green-800",
    "Scheduled": "bg-blue-100 text-blue-800",
    "Failed": "bg-red-100 text-red-800"
  };
  
  const formatIcons = {
    "PDF": <FileText className="h-5 w-5 text-red-500" />,
    "Excel": <FileText className="h-5 w-5 text-green-500" />,
    "PowerPoint": <FileText className="h-5 w-5 text-orange-500" />,
    "Interactive": <LineChart className="h-5 w-5 text-blue-500" />
  };
  
  if (viewMode === "grid") {
    return (
      <Card className="hover:border-primary cursor-pointer">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {formatIcons[report.format]}
              <div>
                <h3 className="font-medium">{report.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{report.description}</p>
              </div>
            </div>
            <Badge className={statusColors[report.status]}>
              {report.status}
            </Badge>
          </div>
          
          <div className="mt-4 pt-3 border-t flex justify-between text-sm text-muted-foreground">
            <div>Last run: {report.lastRun}</div>
            <div>{report.owner}</div>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <Badge variant="outline" className="font-normal">
              {report.format}
            </Badge>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="hover:border-primary cursor-pointer">
      <CardContent className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {formatIcons[report.format]}
          <div>
            <h3 className="font-medium">{report.name}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{report.owner}</span>
              <span>•</span>
              <span>Last run: {report.lastRun}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge className={statusColors[report.status]}>
            {report.status}
          </Badge>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Download className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Schedule</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
