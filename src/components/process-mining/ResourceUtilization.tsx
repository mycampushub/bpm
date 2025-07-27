
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import {
  Users,
  Clock,
  TrendingUp,
  AlertTriangle,
  User,
  Calendar,
  BarChart3
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface Resource {
  id: string;
  name: string;
  role: string;
  department: string;
  utilization: number;
  capacity: number;
  currentLoad: number;
  avgCaseTime: number;
  completedCases: number;
  skills: string[];
  availability: "available" | "busy" | "offline";
}

export const ResourceUtilization: React.FC = () => {
  const { toast } = useToast();
  const { speakText } = useVoice();
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const [resources, setResources] = useState<Resource[]>([
    {
      id: "res-001",
      name: "Sarah Johnson",
      role: "Credit Analyst",
      department: "Finance",
      utilization: 85,
      capacity: 40,
      currentLoad: 34,
      avgCaseTime: 2.3,
      completedCases: 145,
      skills: ["Credit Assessment", "Risk Analysis", "Documentation"],
      availability: "busy"
    },
    {
      id: "res-002",
      name: "Mike Chen",
      role: "Process Specialist",
      department: "Operations",
      utilization: 72,
      capacity: 35,
      currentLoad: 25,
      avgCaseTime: 1.8,
      completedCases: 198,
      skills: ["Process Analysis", "Quality Control", "Training"],
      availability: "available"
    },
    {
      id: "res-003",
      name: "Emily Davis",
      role: "Customer Service Rep",
      department: "Customer Service",
      utilization: 95,
      capacity: 50,
      currentLoad: 48,
      avgCaseTime: 0.5,
      completedCases: 312,
      skills: ["Customer Support", "Issue Resolution", "Communication"],
      availability: "busy"
    },
    {
      id: "res-004",
      name: "David Wilson",
      role: "Approval Manager",
      department: "Management",
      utilization: 45,
      capacity: 30,
      currentLoad: 14,
      avgCaseTime: 3.2,
      completedCases: 89,
      skills: ["Decision Making", "Risk Assessment", "Leadership"],
      availability: "available"
    }
  ]);

  const utilizationData = [
    { department: "Finance", utilization: 78, capacity: 120, load: 94 },
    { department: "Operations", utilization: 65, capacity: 100, load: 65 },
    { department: "Customer Service", utilization: 88, capacity: 150, load: 132 },
    { department: "Management", utilization: 52, capacity: 80, load: 42 }
  ];

  const workloadData = [
    { name: "Overloaded", value: 15, color: "#ef4444" },
    { name: "High Load", value: 35, color: "#f59e0b" },
    { name: "Optimal", value: 40, color: "#22c55e" },
    { name: "Underutilized", value: 10, color: "#6b7280" }
  ];

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return "text-red-600";
    if (utilization >= 75) return "text-orange-600";
    if (utilization >= 50) return "text-green-600";
    return "text-gray-600";
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available": return "bg-green-100 text-green-800";
      case "busy": return "bg-orange-100 text-orange-800";
      case "offline": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredResources = resources.filter(resource => 
    selectedDepartment === "all" || resource.department === selectedDepartment
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Resource Utilization</h2>
          <p className="text-muted-foreground">Monitor team workload and capacity planning</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Customer Service">Customer Service</SelectItem>
              <SelectItem value="Management">Management</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Utilization Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-500" />
              <h3 className="font-medium text-sm">Total Resources</h3>
            </div>
            <div className="text-2xl font-bold">{filteredResources.length}</div>
            <div className="text-xs text-muted-foreground">Active team members</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-green-500" />
              <h3 className="font-medium text-sm">Avg Utilization</h3>
            </div>
            <div className="text-2xl font-bold">
              {Math.round(filteredResources.reduce((sum, r) => sum + r.utilization, 0) / filteredResources.length)}%
            </div>
            <div className="text-xs text-muted-foreground">Resource efficiency</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <h3 className="font-medium text-sm">Overloaded</h3>
            </div>
            <div className="text-2xl font-bold">
              {filteredResources.filter(r => r.utilization >= 90).length}
            </div>
            <div className="text-xs text-muted-foreground">Resources at capacity</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-purple-500" />
              <h3 className="font-medium text-sm">Avg Case Time</h3>
            </div>
            <div className="text-2xl font-bold">
              {(filteredResources.reduce((sum, r) => sum + r.avgCaseTime, 0) / filteredResources.length).toFixed(1)}h
            </div>
            <div className="text-xs text-muted-foreground">Per case handling</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Utilization</CardTitle>
            <CardDescription>Resource utilization by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={utilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="utilization" fill="#3b82f6" name="Utilization %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workload Distribution</CardTitle>
            <CardDescription>Resource capacity allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={workloadData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {workloadData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resource Details */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Details</CardTitle>
          <CardDescription>Individual resource utilization and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="border rounded-lg p-4 hover:bg-muted/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <User className="h-8 w-8 text-blue-500" />
                    <div>
                      <h3 className="font-semibold">{resource.name}</h3>
                      <p className="text-sm text-muted-foreground">{resource.role} • {resource.department}</p>
                    </div>
                    <Badge className={getAvailabilityColor(resource.availability)}>
                      {resource.availability}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Utilization</div>
                    <div className="flex items-center gap-2">
                      <div className={`text-xl font-bold ${getUtilizationColor(resource.utilization)}`}>
                        {resource.utilization}%
                      </div>
                      <Progress value={resource.utilization} className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Current Load</div>
                    <div className="font-medium">{resource.currentLoad}/{resource.capacity}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Avg Case Time</div>
                    <div className="font-medium">{resource.avgCaseTime}h</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Completed Cases</div>
                    <div className="font-medium">{resource.completedCases}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Skills</div>
                    <div className="flex flex-wrap gap-1">
                      {resource.skills.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {resource.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{resource.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
