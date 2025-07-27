
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface ConfigureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ConfigurationData {
  autoSync: boolean;
  notifications: boolean;
  reportFrequency: string;
  dataRetention: string;
  accessLevel: string;
}

export const ConfigureDialog: React.FC<ConfigureDialogProps> = ({ open, onOpenChange }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ConfigurationData>({
    defaultValues: {
      autoSync: true,
      notifications: true,
      reportFrequency: "weekly",
      dataRetention: "12months",
      accessLevel: "team"
    }
  });
  const { toast } = useToast();

  const onSubmit = (data: ConfigurationData) => {
    console.log("Configuration data:", data);
    toast({
      title: "Configuration Updated",
      description: "Transformation settings have been saved successfully."
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configure Transformation Settings</DialogTitle>
          <DialogDescription>
            Customize your transformation cockpit settings and preferences.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <TabsContent value="general" className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="autoSync">Auto-sync Data</Label>
                <Switch 
                  id="autoSync"
                  checked={watch("autoSync")}
                  onCheckedChange={(checked) => setValue("autoSync", checked)}
                />
              </div>
              
              <div>
                <Label htmlFor="reportFrequency">Report Frequency</Label>
                <select 
                  id="reportFrequency"
                  {...register("reportFrequency")}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="dataRetention">Data Retention</Label>
                <select 
                  id="dataRetention"
                  {...register("dataRetention")}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="3months">3 Months</option>
                  <option value="6months">6 Months</option>
                  <option value="12months">12 Months</option>
                  <option value="24months">24 Months</option>
                </select>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Enable Notifications</Label>
                <Switch 
                  id="notifications"
                  checked={watch("notifications")}
                  onCheckedChange={(checked) => setValue("notifications", checked)}
                />
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Notification preferences for transformation updates, milestones, and alerts.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              <div>
                <Label htmlFor="accessLevel">Access Level</Label>
                <select 
                  id="accessLevel"
                  {...register("accessLevel")}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="personal">Personal</option>
                  <option value="team">Team</option>
                  <option value="organization">Organization</option>
                </select>
              </div>
            </TabsContent>
            
            <div className="flex justify-end space-x-2 pt-4 mt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Configuration</Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
