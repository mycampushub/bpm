
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, 
  Filter, 
  LineChart, 
  Minus, 
  PieChart, 
  Plus, 
  Search, 
  Settings
} from "lucide-react";

export const ProcessDiscovery: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Process Discovery</CardTitle>
            <CardDescription>
              Automatically discover process models from event logs
            </CardDescription>
          </div>
          
          <Tabs defaultValue="activity">
            <TabsList>
              <TabsTrigger value="activity">Activity View</TabsTrigger>
              <TabsTrigger value="process">Process View</TabsTrigger>
              <TabsTrigger value="social">Social View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Minus className="h-4 w-4" />
              Zoom Out
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Zoom In
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="activity">
          <TabsContent value="activity" className="m-0">
            <ProcessViewContent 
              icon={<LineChart className="h-16 w-16 text-muted-foreground/60" />}
              title="Process Activities View"
              description="Discover and analyze process activities and their relationships"
              actionText="Generate Activity View"
            />
          </TabsContent>
          
          <TabsContent value="process" className="m-0">
            <ProcessViewContent 
              icon={<PieChart className="h-16 w-16 text-muted-foreground/60" />}
              title="Process Flow View"
              description="Visualize complete process flows based on event data"
              actionText="Generate Process View"
            />
          </TabsContent>
          
          <TabsContent value="social" className="m-0">
            <ProcessViewContent 
              icon={<BarChart className="h-16 w-16 text-muted-foreground/60" />}
              title="Social Interaction View"
              description="Analyze handovers and interactions between process participants"
              actionText="Generate Social View"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface ProcessViewContentProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
}

const ProcessViewContent: React.FC<ProcessViewContentProps> = ({ icon, title, description, actionText }) => (
  <div className="h-[500px] bg-muted/50 rounded-lg border flex items-center justify-center">
    <div className="flex flex-col items-center gap-3 text-center">
      {icon}
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button className="mt-2">{actionText}</Button>
    </div>
  </div>
);
