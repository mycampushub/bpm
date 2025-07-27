
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import {
  FileText,
  Upload,
  Download,
  Search,
  Filter,
  Eye,
  Trash2,
  Edit,
  Calendar,
  Database,
  BarChart3
} from "lucide-react";

interface EventLog {
  id: string;
  name: string;
  description: string;
  size: string;
  format: string;
  uploadDate: string;
  lastModified: string;
  status: "processing" | "ready" | "error";
  cases: number;
  events: number;
  variants: number;
  activities: string[];
}

export const EventLogRepository: React.FC = () => {
  const { toast } = useToast();
  const { speakText } = useVoice();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [eventLogs, setEventLogs] = useState<EventLog[]>([
    {
      id: "log-001",
      name: "Order Processing Q1 2024",
      description: "Customer order processing data for Q1 2024",
      size: "45.2 MB",
      format: "CSV",
      uploadDate: "2024-01-15",
      lastModified: "2024-02-20",
      status: "ready",
      cases: 1254,
      events: 8734,
      variants: 12,
      activities: ["Order Received", "Credit Check", "Payment", "Fulfillment", "Delivery"]
    },
    {
      id: "log-002",
      name: "Customer Support Tickets",
      description: "Support ticket lifecycle from creation to resolution",
      size: "23.8 MB",
      format: "XES",
      uploadDate: "2024-02-01",
      lastModified: "2024-02-25",
      status: "ready",
      cases: 876,
      events: 4521,
      variants: 8,
      activities: ["Ticket Created", "Assignment", "Investigation", "Resolution", "Closure"]
    },
    {
      id: "log-003",
      name: "Invoice Processing",
      description: "Invoice processing workflow data",
      size: "67.1 MB",
      format: "XLSX",
      uploadDate: "2024-02-10",
      lastModified: "2024-02-28",
      status: "processing",
      cases: 1560,
      events: 12450,
      variants: 15,
      activities: ["Invoice Received", "Validation", "Approval", "Payment", "Archive"]
    },
    {
      id: "log-004",
      name: "Employee Onboarding",
      description: "New employee onboarding process logs",
      size: "12.4 MB",
      format: "CSV",
      uploadDate: "2024-02-15",
      lastModified: "2024-02-29",
      status: "error",
      cases: 340,
      events: 2180,
      variants: 6,
      activities: ["Application", "Interview", "Offer", "Acceptance", "Setup"]
    }
  ]);

  const handleUpload = () => {
    toast({
      title: "Upload Event Log",
      description: "Select event log files to upload to the repository"
    });
    speakText("Upload event log functionality. Select your process event data files in CSV, XES, or Excel format to begin analysis.");
  };

  const handleView = (log: EventLog) => {
    toast({
      title: "Event Log Details",
      description: `Viewing details for ${log.name}`
    });
    speakText(`Viewing event log: ${log.name}. Contains ${log.cases} cases with ${log.events} events across ${log.variants} process variants.`);
    console.log("Viewing log:", log);
  };

  const handleEdit = (log: EventLog) => {
    toast({
      title: "Edit Event Log",
      description: `Editing metadata for ${log.name}`
    });
    console.log("Editing log:", log);
  };

  const handleDelete = (logId: string) => {
    setEventLogs(prev => prev.filter(log => log.id !== logId));
    toast({
      title: "Event Log Deleted",
      description: "Event log has been removed from the repository"
    });
  };

  const handleDownload = (log: EventLog) => {
    toast({
      title: "Download Started",
      description: `Downloading ${log.name}`
    });
    console.log("Downloading log:", log);
  };

  const filteredLogs = eventLogs.filter(log => {
    const matchesSearch = log.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFormat = selectedFormat === "all" || log.format === selectedFormat;
    const matchesStatus = selectedStatus === "all" || log.status === selectedStatus;
    return matchesSearch && matchesFormat && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-green-100 text-green-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case "CSV": return "bg-blue-100 text-blue-800";
      case "XES": return "bg-purple-100 text-purple-800";
      case "XLSX": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Event Log Repository</h2>
          <p className="text-muted-foreground">Manage and analyze your process event data</p>
        </div>
        <Button onClick={handleUpload}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Event Log
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search event logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formats</SelectItem>
                  <SelectItem value="CSV">CSV</SelectItem>
                  <SelectItem value="XES">XES</SelectItem>
                  <SelectItem value="XLSX">XLSX</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repository Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4 text-blue-500" />
              <h3 className="font-medium text-sm">Total Logs</h3>
            </div>
            <div className="text-2xl font-bold">{eventLogs.length}</div>
            <div className="text-xs text-muted-foreground">Event log files</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-green-500" />
              <h3 className="font-medium text-sm">Total Cases</h3>
            </div>
            <div className="text-2xl font-bold">
              {eventLogs.reduce((sum, log) => sum + log.cases, 0).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Process instances</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-purple-500" />
              <h3 className="font-medium text-sm">Total Events</h3>
            </div>
            <div className="text-2xl font-bold">
              {eventLogs.reduce((sum, log) => sum + log.events, 0).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Activity executions</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-orange-500" />
              <h3 className="font-medium text-sm">Ready Logs</h3>
            </div>
            <div className="text-2xl font-bold">
              {eventLogs.filter(log => log.status === "ready").length}
            </div>
            <div className="text-xs text-muted-foreground">Available for analysis</div>
          </CardContent>
        </Card>
      </div>

      {/* Event Logs List */}
      <Card>
        <CardHeader>
          <CardTitle>Event Logs</CardTitle>
          <CardDescription>
            {filteredLogs.length} of {eventLogs.length} event logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4 hover:bg-muted/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold">{log.name}</h3>
                      <Badge className={getStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                      <Badge className={getFormatColor(log.format)}>
                        {log.format}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{log.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Size</div>
                        <div className="font-medium">{log.size}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Cases</div>
                        <div className="font-medium">{log.cases.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Events</div>
                        <div className="font-medium">{log.events.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Variants</div>
                        <div className="font-medium">{log.variants}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Last Modified</div>
                        <div className="font-medium">{new Date(log.lastModified).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm text-muted-foreground mb-1">Activities</div>
                      <div className="flex flex-wrap gap-1">
                        {log.activities.slice(0, 3).map((activity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {activity}
                          </Badge>
                        ))}
                        {log.activities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{log.activities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleView(log)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(log)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(log)}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(log.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
