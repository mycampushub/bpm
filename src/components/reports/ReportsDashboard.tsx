
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { useReportsData } from "@/hooks/useReportsData";
import { ReportsActions } from "./ReportsActions";
import { 
  BarChart3, 
  FileText, 
  Calendar, 
  Search,
  Filter,
  TrendingUp,
  Clock,
  Users
} from "lucide-react";

interface Report {
  id: string;
  name: string;
  type: string;
  description: string;
  schedule: string;
  format: string;
  recipients: string[];
  lastGenerated: string;
  status: string;
}

export const ReportsDashboard: React.FC = () => {
  const { speakText } = useVoice();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Use the data manager for reports
  const reportsData = useReportsData();

  const filteredReports = reportsData.filteredItems.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || 
                      (activeTab === "active" && report.status === "active") ||
                      (activeTab === "scheduled" && report.scheduleEnabled) ||
                      (activeTab === "recent" && report.lastGenerated);
    return matchesSearch && matchesTab;
  });

  const handleCreateReport = (reportData: any) => {
    reportsData.create(reportData);
    speakText(`New report ${reportData.name} has been created`);
  };

  const handleGenerateReport = (reportId: string) => {
    const report = reportsData.getById(reportId);
    if (report) {
      reportsData.update(reportId, { lastGenerated: new Date().toISOString() });
      toast({
        title: "Report Generated",
        description: `${report.name} has been generated successfully.`
      });
      speakText(`Report ${report.name} has been generated and is ready for download`);
    }
  };

  const handleDownloadReport = (reportId: string) => {
    if (reportId === "all") {
      reportsData.exportData();
    } else {
      const report = reportsData.getById(reportId);
      if (report) {
        toast({
          title: "Download Started",
          description: `Downloading ${report.name}...`
        });
      }
    }
  };

  const handleReportClick = (reportId: string) => {
    const report = reportsData.getById(reportId);
    if (report) {
      toast({
        title: "Report Details",
        description: `Opening details for ${report.name}`
      });
    }
  };

  const stats = [
    { label: "Total Reports", value: reportsData.items.length, icon: <FileText className="h-6 w-6 text-blue-500" /> },
    { label: "Active Reports", value: reportsData.items.filter(r => r.status === "active").length, icon: <TrendingUp className="h-6 w-6 text-green-500" /> },
    { label: "Scheduled Reports", value: reportsData.items.filter(r => r.scheduleEnabled).length, icon: <Clock className="h-6 w-6 text-orange-500" /> },
    { label: "Recipients", value: new Set(reportsData.items.flatMap(r => r.recipients || [])).size, icon: <Users className="h-6 w-6 text-purple-500" /> }
  ];

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Reports and Analytics Dashboard. Generate automated reports, schedule deliveries, and analyze process performance data.")}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and manage automated process reports</p>
        </div>
        
        <ReportsActions
          onCreateReport={handleCreateReport}
          onGenerateReport={handleGenerateReport}
          onDownloadReport={handleDownloadReport}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer hover-scale">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {stat.icon}
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Report Library</CardTitle>
              <CardDescription>Manage and generate process reports</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-4">
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div 
                    key={report.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleReportClick(report.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{report.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {report.type}
                          </Badge>
                          <Badge variant={report.status === "active" ? "default" : "secondary"} className="text-xs">
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                           <span className="flex items-center gap-1">
                             <Calendar className="h-3 w-3" />
                              {report.scheduleEnabled ? report.scheduleFrequency : "On-demand"}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              PDF
                            </span>
                           <span>Last generated: {report.lastGenerated ? new Date(report.lastGenerated).toLocaleDateString() : "Never"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredReports.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No reports found matching your criteria.</p>
                    <p className="text-sm">Try adjusting your search or create a new report.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
