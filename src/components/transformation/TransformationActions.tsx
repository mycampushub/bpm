
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Download, Calendar, Settings } from "lucide-react";
import { PlanningDialog } from "./PlanningDialog";
import { ConfigureDialog } from "./ConfigureDialog";
import { NewInitiativeDialog } from "./NewInitiativeDialog";

interface TransformationActionsProps {
  onCreateInitiative: (initiative: any) => void;
  onGenerateReport: () => void;
  onDownloadData: () => void;
  onPlanningClick: () => void;
  onConfigureClick: () => void;
}

export const TransformationActions: React.FC<TransformationActionsProps> = ({
  onCreateInitiative,
  onGenerateReport,
  onDownloadData,
  onPlanningClick,
  onConfigureClick
}) => {
  const [isPlanningOpen, setIsPlanningOpen] = useState(false);
  const [isConfigureOpen, setIsConfigureOpen] = useState(false);
  const [isNewInitiativeOpen, setIsNewInitiativeOpen] = useState(false);

  const handlePlanningClick = () => {
    setIsPlanningOpen(true);
    onPlanningClick();
  };

  const handleConfigureClick = () => {
    setIsConfigureOpen(true);
    onConfigureClick();
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={handlePlanningClick}>
          <Calendar className="h-4 w-4 mr-2" />
          Planning
        </Button>
        <Button variant="outline" onClick={handleConfigureClick}>
          <Settings className="h-4 w-4 mr-2" />
          Configure
        </Button>
        <Button variant="outline" onClick={onGenerateReport}>
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
        <Button variant="outline" onClick={onDownloadData}>
          <Download className="h-4 w-4 mr-2" />
          Download Data
        </Button>
        <Button onClick={() => setIsNewInitiativeOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Initiative
        </Button>
      </div>

      <PlanningDialog open={isPlanningOpen} onOpenChange={setIsPlanningOpen} />
      <ConfigureDialog open={isConfigureOpen} onOpenChange={setIsConfigureOpen} />
      <NewInitiativeDialog 
        open={isNewInitiativeOpen} 
        onOpenChange={setIsNewInitiativeOpen}
        onCreateInitiative={onCreateInitiative}
      />
    </>
  );
};
