
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { Plus, Edit, Trash2, Download, Share2 } from "lucide-react";

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
  filters?: any;
}

interface ReportActionsProps {
  report?: Report;
  onSave: (report: Report) => void;
  onDelete?: (reportId: string) => void;
  onGenerate?: (reportId: string) => void;
  onShare?: (reportId: string) => void;
  mode: "create" | "edit";
}

export const ReportActions: React.FC<ReportActionsProps> = ({ 
  report, 
  onSave, 
  onDelete, 
  onGenerate,
  onShare,
  mode 
}) => {
  const { toast } = useToast();
  const { speakText } = useVoice();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Report>>(
    report || {
      name: "",
      type: "Performance",
      description: "",
      schedule: "Weekly",
      format: "PDF",
      recipients: [],
      status: "Active"
    }
  );

  const handleSave = () => {
    if (!formData.name || !formData.type) {
      toast({
        title: "Validation Error",
        description: "Report name and type are required.",
        variant: "destructive"
      });
      return;
    }

    const reportData: Report = {
      id: report?.id || `report_${Date.now()}`,
      name: formData.name || "",
      type: formData.type || "Performance",
      description: formData.description || "",
      schedule: formData.schedule || "Weekly",
      format: formData.format || "PDF",
      recipients: formData.recipients || [],
      lastGenerated: report?.lastGenerated || "Never",
      status: formData.status || "Active"
    };

    onSave(reportData);
    setOpen(false);
    
    toast({
      title: mode === "create" ? "Report Created" : "Report Updated",
      description: `${reportData.name} has been ${mode === "create" ? "created" : "updated"} successfully.`
    });

    speakText(`Report ${reportData.name} has been ${mode === "create" ? "created" : "updated"}`);
  };

  const handleGenerate = () => {
    if (report && onGenerate) {
      onGenerate(report.id);
      toast({
        title: "Report Generation Started",
        description: `${report.name} is being generated...`
      });
      speakText(`Generating report ${report.name}`);
    }
  };

  const handleShare = () => {
    if (report && onShare) {
      onShare(report.id);
      toast({
        title: "Report Shared",
        description: `${report.name} sharing options opened.`
      });
      speakText(`Sharing report ${report.name}`);
    }
  };

  return (
    <>
      {mode === "edit" && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerate}
            onMouseEnter={() => speakText("Generate this report with current data.")}
          >
            <Download className="h-4 w-4 mr-2" />
            Generate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            onMouseEnter={() => speakText("Share this report with team members.")}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      )}
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={mode === "create" ? "default" : "ghost"}
            size={mode === "create" ? "default" : "sm"}
            onMouseEnter={() => speakText(
              mode === "create" 
                ? "Create new report. Set up automated reporting for process analytics." 
                : "Edit report configuration. Update schedule, format, and recipients."
            )}
          >
            {mode === "create" ? (
              <>
                <Plus className="h-4 w-4 mr-2" />
                New Report
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </>
            )}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {mode === "create" ? "Create New Report" : `Edit ${report?.name}`}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Report Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter report name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Report Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Performance">Performance Analysis</SelectItem>
                    <SelectItem value="Compliance">Compliance Report</SelectItem>
                    <SelectItem value="Bottleneck">Bottleneck Analysis</SelectItem>
                    <SelectItem value="User Activity">User Activity</SelectItem>
                    <SelectItem value="Process Mining">Process Mining</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule</Label>
                <Select
                  value={formData.schedule}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, schedule: value }))}
                >
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
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="format">Output Format</Label>
                <Select
                  value={formData.format}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, format: value }))}
                >
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
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the purpose and scope of this report..."
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex justify-between">
            <div>
              {mode === "edit" && onDelete && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (report) {
                      onDelete(report.id);
                      setOpen(false);
                      toast({
                        title: "Report Deleted",
                        description: `${report.name} has been removed.`,
                        variant: "destructive"
                      });
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {mode === "create" ? "Create Report" : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
