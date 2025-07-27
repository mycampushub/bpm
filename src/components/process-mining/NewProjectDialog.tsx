
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProject: (project: any) => void;
}

interface ProjectFormData {
  name: string;
  description: string;
  industry: string;
  processType: string;
  objectives: string;
}

export const NewProjectDialog: React.FC<NewProjectDialogProps> = ({ 
  open, 
  onOpenChange, 
  onCreateProject 
}) => {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ProjectFormData>();
  const { toast } = useToast();

  const onSubmit = (data: ProjectFormData) => {
    const newProject = {
      id: `proj-${Date.now()}`,
      name: data.name,
      description: data.description,
      industry: data.industry,
      processType: data.processType,
      objectives: data.objectives,
      createdDate: new Date().toISOString(),
      status: "active"
    };
    
    onCreateProject(newProject);
    toast({
      title: "Project Created",
      description: `${data.name} has been created successfully. You can now upload event logs for analysis.`
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Process Mining Project</DialogTitle>
          <DialogDescription>
            Set up a new project to analyze your business processes and discover insights.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input 
              id="name" 
              {...register("name", { required: "Project name is required" })}
              placeholder="Enter project name"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              {...register("description")}
              placeholder="Describe your process mining objectives"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Controller
                name="industry"
                control={control}
                rules={{ required: "Industry is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="logistics">Logistics</SelectItem>
                      <SelectItem value="telecommunications">Telecommunications</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.industry && <p className="text-sm text-red-500 mt-1">{errors.industry.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="processType">Process Type</Label>
              <Controller
                name="processType"
                control={control}
                rules={{ required: "Process type is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select process type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order-to-cash">Order to Cash</SelectItem>
                      <SelectItem value="procure-to-pay">Procure to Pay</SelectItem>
                      <SelectItem value="lead-to-order">Lead to Order</SelectItem>
                      <SelectItem value="issue-to-resolution">Issue to Resolution</SelectItem>
                      <SelectItem value="hire-to-retire">Hire to Retire</SelectItem>
                      <SelectItem value="custom">Custom Process</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.processType && <p className="text-sm text-red-500 mt-1">{errors.processType.message}</p>}
            </div>
          </div>
          
          <div>
            <Label htmlFor="objectives">Analysis Objectives</Label>
            <Textarea 
              id="objectives" 
              {...register("objectives")}
              placeholder="What do you want to discover or improve in this process?"
              rows={2}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
