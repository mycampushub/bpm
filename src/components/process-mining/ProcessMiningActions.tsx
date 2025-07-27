
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Play, Download, Loader2, Settings } from "lucide-react";
import { NewProjectDialog } from "./NewProjectDialog";
import { useVoice } from "@/contexts/VoiceContext";

interface ProcessMiningActionsProps {
  onNewProject: () => void;
  onUploadData: (file: File) => void;
  onStartAnalysis: () => void;
  onExportResults: () => void;
  isAnalysisRunning: boolean;
}

export const ProcessMiningActions: React.FC<ProcessMiningActionsProps> = ({
  onNewProject,
  onUploadData,
  onStartAnalysis,
  onExportResults,
  isAnalysisRunning
}) => {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const { speakText } = useVoice();

  const handleNewProject = () => {
    setIsNewProjectOpen(true);
    onNewProject();
    speakText("Opening new project dialog. Create a workspace for analyzing your business processes.");
  };

  const handleCreateProject = (project: any) => {
    console.log("New project created:", project);
    setIsNewProjectOpen(false);
    speakText(`New project ${project.name} created successfully. You can now upload event logs and start analysis.`);
  };

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xes,.json';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        Array.from(files).forEach(file => {
          onUploadData(file);
        });
        speakText(`Uploading ${files.length} file${files.length > 1 ? 's' : ''}. Event logs will be processed for analysis.`);
      }
    };
    input.click();
  };

  const handleAnalysisClick = () => {
    if (!isAnalysisRunning) {
      speakText("Starting comprehensive process analysis. This will discover process variants, identify bottlenecks, and generate optimization recommendations.");
    }
    onStartAnalysis();
  };

  const handleExportClick = () => {
    speakText("Exporting process mining results. The report will include process variants, performance metrics, and optimization recommendations.");
    onExportResults();
  };

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <Button onClick={handleNewProject} className="hover:scale-105 transition-transform">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
        <Button variant="outline" onClick={handleUploadClick} className="hover:scale-105 transition-transform">
          <Upload className="h-4 w-4 mr-2" />
          Upload Data
        </Button>
        <Button 
          variant="outline" 
          onClick={handleAnalysisClick}
          disabled={isAnalysisRunning}
          className="hover:scale-105 transition-transform disabled:hover:scale-100"
        >
          {isAnalysisRunning ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Play className="h-4 w-4 mr-2" />
          )}
          {isAnalysisRunning ? "Analyzing..." : "Start Analysis"}
        </Button>
        <Button variant="outline" onClick={handleExportClick} className="hover:scale-105 transition-transform">
          <Download className="h-4 w-4 mr-2" />
          Export Results
        </Button>
        <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <NewProjectDialog 
        open={isNewProjectOpen} 
        onOpenChange={setIsNewProjectOpen}
        onCreateProject={handleCreateProject}
      />
    </>
  );
};
