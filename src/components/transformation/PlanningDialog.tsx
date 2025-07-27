
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface PlanningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PlanningFormData {
  planName: string;
  description: string;
  timeline: string;
  priority: string;
  assignee: string;
}

export const PlanningDialog: React.FC<PlanningDialogProps> = ({ open, onOpenChange }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PlanningFormData>();
  const { toast } = useToast();

  const onSubmit = (data: PlanningFormData) => {
    console.log("Planning data:", data);
    toast({
      title: "Planning Created",
      description: `${data.planName} has been added to your transformation roadmap.`
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Transformation Plan</DialogTitle>
          <DialogDescription>
            Define a new transformation planning item with timeline and priorities.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="planName">Plan Name</Label>
            <Input 
              id="planName" 
              {...register("planName", { required: "Plan name is required" })}
              placeholder="Enter plan name"
            />
            {errors.planName && <p className="text-sm text-red-500 mt-1">{errors.planName.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              {...register("description")}
              placeholder="Describe the transformation plan"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="timeline">Timeline</Label>
            <Select {...register("timeline", { required: "Timeline is required" })}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q1">Q1 2024</SelectItem>
                <SelectItem value="q2">Q2 2024</SelectItem>
                <SelectItem value="q3">Q3 2024</SelectItem>
                <SelectItem value="q4">Q4 2024</SelectItem>
              </SelectContent>
            </Select>
            {errors.timeline && <p className="text-sm text-red-500 mt-1">{errors.timeline.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select {...register("priority", { required: "Priority is required" })}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            {errors.priority && <p className="text-sm text-red-500 mt-1">{errors.priority.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="assignee">Assignee</Label>
            <Input 
              id="assignee" 
              {...register("assignee")}
              placeholder="Enter assignee name"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Plan</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
