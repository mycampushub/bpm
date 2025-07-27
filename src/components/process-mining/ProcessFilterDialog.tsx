
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface FilterCriteria {
  timeRange: string;
  activities: string[];
  performance: string;
  frequency: { min: number; max: number };
  duration: { min: number; max: number };
  variants: string[];
}

interface ProcessFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: FilterCriteria) => void;
  currentFilters: FilterCriteria;
}

export const ProcessFilterDialog: React.FC<ProcessFilterDialogProps> = ({
  open,
  onOpenChange,
  onApplyFilters,
  currentFilters
}) => {
  const [filters, setFilters] = useState<FilterCriteria>(currentFilters);

  const activities = [
    "Order Received", "Credit Check", "Inventory Check", "Order Approval",
    "Production Planning", "Manufacturing", "Quality Control", "Shipping", "Delivery"
  ];

  const variants = ["Standard Path", "Approval Required", "Exception Handling", "Rush Processing"];

  const handleApply = () => {
    onApplyFilters(filters);
    onOpenChange(false);
  };

  const handleReset = () => {
    const resetFilters: FilterCriteria = {
      timeRange: "all",
      activities: [],
      performance: "all",
      frequency: { min: 0, max: 1000 },
      duration: { min: 0, max: 48 },
      variants: []
    };
    setFilters(resetFilters);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Process Filters</DialogTitle>
          <DialogDescription>Configure filters to analyze specific process segments</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Time Range */}
          <div className="space-y-2">
            <Label>Time Range</Label>
            <Select value={filters.timeRange} onValueChange={(value) => setFilters({...filters, timeRange: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Performance Filter */}
          <div className="space-y-2">
            <Label>Performance Level</Label>
            <Select value={filters.performance} onValueChange={(value) => setFilters({...filters, performance: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Performance Levels</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Frequency Range */}
          <div className="space-y-2">
            <Label>Frequency Range (cases/month)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs">Min</Label>
                <Input
                  type="number"
                  value={filters.frequency.min}
                  onChange={(e) => setFilters({
                    ...filters,
                    frequency: { ...filters.frequency, min: parseInt(e.target.value) || 0 }
                  })}
                />
              </div>
              <div>
                <Label className="text-xs">Max</Label>
                <Input
                  type="number"
                  value={filters.frequency.max}
                  onChange={(e) => setFilters({
                    ...filters,
                    frequency: { ...filters.frequency, max: parseInt(e.target.value) || 1000 }
                  })}
                />
              </div>
            </div>
          </div>

          {/* Duration Range */}
          <div className="space-y-2">
            <Label>Duration Range (hours)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs">Min</Label>
                <Input
                  type="number"
                  value={filters.duration.min}
                  onChange={(e) => setFilters({
                    ...filters,
                    duration: { ...filters.duration, min: parseInt(e.target.value) || 0 }
                  })}
                />
              </div>
              <div>
                <Label className="text-xs">Max</Label>
                <Input
                  type="number"
                  value={filters.duration.max}
                  onChange={(e) => setFilters({
                    ...filters,
                    duration: { ...filters.duration, max: parseInt(e.target.value) || 48 }
                  })}
                />
              </div>
            </div>
          </div>

          {/* Activities Filter */}
          <div className="space-y-2">
            <Label>Activities</Label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded p-2">
              {activities.map((activity) => (
                <div key={activity} className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.activities.includes(activity)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({...filters, activities: [...filters.activities, activity]});
                      } else {
                        setFilters({...filters, activities: filters.activities.filter(a => a !== activity)});
                      }
                    }}
                  />
                  <Label className="text-xs">{activity}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Variants Filter */}
          <div className="space-y-2">
            <Label>Process Variants</Label>
            <div className="space-y-2">
              {variants.map((variant) => (
                <div key={variant} className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.variants.includes(variant)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({...filters, variants: [...filters.variants, variant]});
                      } else {
                        setFilters({...filters, variants: filters.variants.filter(v => v !== variant)});
                      }
                    }}
                  />
                  <Label className="text-sm">{variant}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.activities.length > 0 || filters.variants.length > 0) && (
            <div className="space-y-2">
              <Label>Active Filters</Label>
              <div className="flex flex-wrap gap-1">
                {filters.activities.map((activity) => (
                  <Badge key={activity} variant="secondary" className="text-xs">
                    {activity}
                  </Badge>
                ))}
                {filters.variants.map((variant) => (
                  <Badge key={variant} variant="outline" className="text-xs">
                    {variant}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleReset}>
            Reset Filters
          </Button>
          <Button onClick={handleApply}>
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
