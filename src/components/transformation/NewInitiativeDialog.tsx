
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface NewInitiativeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateInitiative: (initiative: any) => void;
}

interface InitiativeFormData {
  name: string;
  description: string;
  budget: string;
  timeline: string;
  status: string;
  priority: string;
}

export const NewInitiativeDialog: React.FC<NewInitiativeDialogProps> = ({ 
  open, 
  onOpenChange, 
  onCreateInitiative 
}) => {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<InitiativeFormData>();
  const { toast } = useToast();

  const onSubmit = (data: InitiativeFormData) => {
    const newInitiative = {
      id: `init-${Date.now()}`,
      name: data.name,
      description: data.description,
      status: data.status,
      progress: 0,
      budget: data.budget,
      timeline: data.timeline,
      priority: data.priority
    };
    
    onCreateInitiative(newInitiative);
    toast({
      title: "Initiative Created",
      description: `${data.name} has been added to your transformation portfolio.`
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Initiative</DialogTitle>
          <DialogDescription>
            Add a new transformation initiative to your portfolio.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Initiative Name</Label>
            <Input 
              id="name" 
              {...register("name", { required: "Initiative name is required" })}
              placeholder="Enter initiative name"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              {...register("description")}
              placeholder="Describe the initiative"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">Budget</Label>
              <Input 
                id="budget" 
                {...register("budget", { required: "Budget is required" })}
                placeholder="e.g., $250K"
              />
              {errors.budget && <p className="text-sm text-red-500 mt-1">{errors.budget.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <Input 
                id="timeline" 
                {...register("timeline", { required: "Timeline is required" })}
                placeholder="e.g., Q2 2024"
              />
              {errors.timeline && <p className="text-sm text-red-500 mt-1">{errors.timeline.message}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Controller
                name="priority"
                control={control}
                rules={{ required: "Priority is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.priority && <p className="text-sm text-red-500 mt-1">{errors.priority.message}</p>}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Initiative</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
