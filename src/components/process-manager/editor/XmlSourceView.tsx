
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface XmlSourceViewProps {
  xmlSource: string;
  onXmlChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const XmlSourceView: React.FC<XmlSourceViewProps> = ({ 
  xmlSource, 
  onXmlChange
}) => {
  const { toast } = useToast();

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(xmlSource);
      toast({
        title: "Copied to Clipboard",
        description: "XML source has been copied to clipboard"
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy XML to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([xmlSource], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'process-model.bpmn';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "BPMN file download has started"
    });
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold">XML Source</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <Textarea
          value={xmlSource}
          onChange={onXmlChange}
          placeholder="BPMN XML source will appear here..."
          className="w-full h-full font-mono text-sm resize-none"
          style={{ minHeight: '500px' }}
        />
      </div>
    </div>
  );
};
