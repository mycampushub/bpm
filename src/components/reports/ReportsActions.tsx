
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { Plus, Download, Play, FileText, BarChart3 } from "lucide-react";

interface Report {
  id: string;
  name: string;
  type: string;
  description: string;
  schedule: string;
  format: string;
  recipients: string[];
}

interface ReportsActionsProps {
  onCreateReport: (report: Report) => void;
  onGenerateReport: (reportId: string) => void;
  onDownloadReport: (reportId: string) => void;
}

export const ReportsActions: React.FC<ReportsActionsProps> = ({
  onCreateReport,
  onGenerateReport,
  onDownloadReport
}) => {
  const { toast } = useToast();
  const { speakText } = useVoice();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    schedule: "",
    format: "PDF",
    recipients: ""
  });

  const handleCreateReport = async () => {
    if (!formData.name || !formData.type) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const newReport: Report = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      description: formData.description,
      schedule: formData.schedule,
      format: formData.format,
      recipients: formData.recipients.split(',').map(email => email.trim()).filter(email => email)
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onCreateReport(newReport);
      
      toast({
        title: "Report Created",
        description: `${formData.name} has been added to your report library.`
      });
      
      speakText(`New report ${formData.name} has been created successfully`);
      
      setFormData({ name: "", type: "", description: "", schedule: "", format: "PDF", recipients: "" });
      setIsCreateOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAllReports = async () => {
    setIsLoading(true);
    toast({
      title: "Generating Reports",
      description: "Creating all scheduled reports..."
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate bulk report generation
      const reportData = {
        timestamp: new Date().toISOString(),
        reports: [
          "Performance Summary",
          "Compliance Audit",
          "Process Analytics",
          "ROI Analysis"
        ]
      };
      
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bulk-reports-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Reports Generated",
        description: "All reports have been generated and downloaded."
      });
      
      speakText("All scheduled reports have been generated and downloaded successfully");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate reports. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeData = async () => {
    setIsLoading(true);
    toast({
      title: "Analyzing Data",
      description: "Running comprehensive data analysis..."
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      toast({
        title: "Analysis Complete",
        description: "Data analysis has been completed. Results are available in the dashboard."
      });
      
      speakText("Data analysis has been completed. Key insights and trends are now available in your dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogTrigger asChild>
          <Button className="hover-scale text-xs md:text-sm" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Report</DialogTitle>
            <DialogDescription>
              Set up a new automated report for your process analytics.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Report Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Weekly Performance Report"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Report Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Performance">Performance Analysis</SelectItem>
                  <SelectItem value="Compliance">Compliance Report</SelectItem>
                  <SelectItem value="Bottleneck">Bottleneck Analysis</SelectItem>
                  <SelectItem value="ROI">ROI Analysis</SelectItem>
                  <SelectItem value="Custom">Custom Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the report content..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="schedule">Schedule</Label>
                <Select value={formData.schedule} onValueChange={(value) => setFormData(prev => ({ ...prev, schedule: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="On-Demand">On-Demand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="format">Format</Label>
                <Select value={formData.format} onValueChange={(value) => setFormData(prev => ({ ...prev, format: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="Excel">Excel</SelectItem>
                    <SelectItem value="PowerPoint">PowerPoint</SelectItem>
                    <SelectItem value="CSV">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="recipients">Recipients (comma-separated emails)</Label>
              <Input
                id="recipients"
                value={formData.recipients}
                onChange={(e) => setFormData(prev => ({ ...prev, recipients: e.target.value }))}
                placeholder="john@company.com, jane@company.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateReport} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Report"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button 
        variant="outline"
        onClick={handleGenerateAllReports}
        disabled={isLoading}
        className="hover-scale text-xs md:text-sm"
        size="sm"
      >
        <FileText className="h-4 w-4 mr-2" />
        {isLoading ? "Generating..." : "Generate All"}
      </Button>

      <Button 
        variant="outline"
        onClick={handleAnalyzeData}
        disabled={isLoading}
        className="hover-scale text-xs md:text-sm"
        size="sm"
      >
        <BarChart3 className="h-4 w-4 mr-2" />
        {isLoading ? "Analyzing..." : "Analyze Data"}
      </Button>

      <Button 
        variant="outline"
        onClick={() => onDownloadReport("all")}
        className="hover-scale text-xs md:text-sm"
        size="sm"
      >
        <Download className="h-4 w-4 mr-2" />
        Download All
      </Button>
    </div>
  );
};
