
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  importSource: string;
  setImportSource: (source: string) => void;
  onImportConfirm: (data: string) => void;
}

export const ImportDialog: React.FC<ImportDialogProps> = ({
  open,
  onOpenChange,
  importSource,
  setImportSource,
  onImportConfirm
}) => {
  const handleImport = () => {
    onImportConfirm(importSource);
    onOpenChange(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setImportSource(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import BPMN Process</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Upload File</label>
            <input
              type="file"
              accept=".bpmn,.xml,.json"
              onChange={handleFileUpload}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="import-source">Or Paste Content</Label>
            <Textarea
              id="import-source"
              value={importSource}
              onChange={(e) => setImportSource(e.target.value)}
              placeholder="Paste your BPMN XML or JSON content here..."
              rows={8}
              className="font-mono text-sm"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!importSource.trim()}>
            Import Process
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
