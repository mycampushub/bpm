
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FactorItem, ConformanceItem } from "./AnalysisComponents";

export const RootCauseAnalysisCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Root Cause Analysis</CardTitle>
        <CardDescription>
          Identify factors contributing to process bottlenecks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Issue: Long Approval Times</h3>
              <p className="text-xs text-muted-foreground">Average delay: 3.5 days</p>
            </div>
            <Button variant="outline" size="sm">Analyze</Button>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Contributing Factors:</h4>
            <FactorItem
              factor="Missing Documentation"
              impact="High"
              frequency="62%"
            />
            <FactorItem
              factor="Approver Unavailable"
              impact="Medium"
              frequency="38%"
            />
            <FactorItem
              factor="System Delays"
              impact="Low"
              frequency="14%"
            />
          </div>
          
          <Separator />
          
          <div className="flex justify-end">
            <Button size="sm">Generate Recommendations</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ConformanceCheckingCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conformance Checking</CardTitle>
        <CardDescription>
          Compare actual process execution against reference models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-full">
              <label className="text-sm font-medium">Reference Process Model</label>
              <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>Order to Cash (Standard)</option>
                <option>Customer Onboarding (v2)</option>
                <option>Incident Management</option>
              </select>
            </div>
            <Button className="mt-6" size="sm">Compare</Button>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium mb-2">Conformance Results</h3>
            <div className="space-y-3">
              <ConformanceItem
                label="Fitness"
                value={0.85}
                description="How well the event log can be replayed on the model"
              />
              <ConformanceItem
                label="Precision"
                value={0.72}
                description="How well the model describes the observed behavior"
              />
              <ConformanceItem
                label="Generalization"
                value={0.91}
                description="How well the model generalizes the observed behavior"
              />
            </div>
          </div>
          
          <div className="rounded-lg bg-muted/50 p-3 text-center text-sm">
            <p>13 cases with conformance issues detected</p>
            <Button variant="link" size="sm" className="mt-1">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
