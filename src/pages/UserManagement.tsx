
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import {
  Check,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Shield,
  User,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

export default function UserManagement() {
  return (
    <MainLayout pageTitle="User Management">
      <Tabs defaultValue="users" className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="settings">Security Settings</TabsTrigger>
          </TabsList>
          
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>
        
        <TabsContent value="users" className="space-y-6 mt-0">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>User Directory</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-[240px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8"
                    />
                  </div>
                  
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Name</th>
                      <th className="px-4 py-3 text-left font-medium">Email</th>
                      <th className="px-4 py-3 text-left font-medium">Role</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Last Active</th>
                      <th className="px-4 py-3 text-center font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {users.map((user, index) => (
                      <tr key={index} className="hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <div className="flex h-full w-full items-center justify-center bg-muted rounded-full">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            </Avatar>
                            <div>{user.name}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">
                          {user.isAdmin ? (
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1 w-fit">
                              <Shield className="h-3 w-3" />
                              Admin
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="flex items-center gap-1 w-fit">
                              {user.role}
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Badge 
                            className={user.status === 'Active' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : user.status === 'Pending' 
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">{user.lastActive}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit User</DropdownMenuItem>
                                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {user.status === 'Active' ? (
                                  <DropdownMenuItem className="text-red-600">
                                    Deactivate User
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="text-green-600">
                                    Activate User
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="flex items-center justify-between p-4 border-t bg-muted/30">
                  <div className="text-sm text-muted-foreground">
                    Showing 1-8 of 56 users
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roles" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Available Roles</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {roles.map((role, index) => (
                      <div 
                        key={index} 
                        className="px-4 py-3 hover:bg-muted/50 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium">{role.name}</div>
                          <div className="text-sm text-muted-foreground">{role.description}</div>
                        </div>
                        <Badge variant="outline">{role.users} users</Badge>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t">
                    <Button variant="outline" className="w-full gap-1">
                      <Plus className="h-4 w-4" />
                      Create New Role
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Permission Matrix</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium">Permission</th>
                          <th className="px-4 py-3 text-center font-medium">Admin</th>
                          <th className="px-4 py-3 text-center font-medium">Process Owner</th>
                          <th className="px-4 py-3 text-center font-medium">Modeler</th>
                          <th className="px-4 py-3 text-center font-medium">Analyst</th>
                          <th className="px-4 py-3 text-center font-medium">Viewer</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <PermissionRow
                          category="User Management"
                          permission="Manage Users"
                          admin={true}
                          processOwner={false}
                          modeler={false}
                          analyst={false}
                          viewer={false}
                        />
                        <PermissionRow
                          category="User Management"
                          permission="Manage Roles"
                          admin={true}
                          processOwner={false}
                          modeler={false}
                          analyst={false}
                          viewer={false}
                        />
                        <PermissionRow
                          category="Process Models"
                          permission="Create Process Models"
                          admin={true}
                          processOwner={true}
                          modeler={true}
                          analyst={false}
                          viewer={false}
                        />
                        <PermissionRow
                          category="Process Models"
                          permission="Edit Process Models"
                          admin={true}
                          processOwner={true}
                          modeler={true}
                          analyst={false}
                          viewer={false}
                        />
                        <PermissionRow
                          category="Process Models"
                          permission="Delete Process Models"
                          admin={true}
                          processOwner={true}
                          modeler={false}
                          analyst={false}
                          viewer={false}
                        />
                        <PermissionRow
                          category="Process Models"
                          permission="View Process Models"
                          admin={true}
                          processOwner={true}
                          modeler={true}
                          analyst={true}
                          viewer={true}
                        />
                        <PermissionRow
                          category="Dashboards"
                          permission="Create Dashboards"
                          admin={true}
                          processOwner={true}
                          modeler={false}
                          analyst={true}
                          viewer={false}
                        />
                        <PermissionRow
                          category="Dashboards"
                          permission="Edit Dashboards"
                          admin={true}
                          processOwner={true}
                          modeler={false}
                          analyst={true}
                          viewer={false}
                        />
                        <PermissionRow
                          category="Dashboards"
                          permission="View Dashboards"
                          admin={true}
                          processOwner={true}
                          modeler={true}
                          analyst={true}
                          viewer={true}
                        />
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="p-4 border-t bg-muted/30 flex justify-end gap-2">
                    <Button variant="outline">Reset to Default</Button>
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="groups" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User Groups</CardTitle>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  Create Group
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userGroups.map((group, index) => (
                  <GroupCard key={index} group={group} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two-Factor Authentication (2FA)</div>
                    <div className="text-sm text-muted-foreground">Require users to provide a second form of authentication</div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Single Sign-On (SSO)</div>
                    <div className="text-sm text-muted-foreground">Enable authentication via corporate identity provider</div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Password Complexity</div>
                    <div className="text-sm text-muted-foreground">Enforce strong passwords with numbers, special characters</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Session Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue={30} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-sessions">Maximum Concurrent Sessions</Label>
                    <Input id="max-sessions" type="number" defaultValue={3} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Audit & Compliance</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Activity Logging</div>
                    <div className="text-sm text-muted-foreground">Log all user activities for audit purposes</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">IP Restriction</div>
                    <div className="text-sm text-muted-foreground">Limit access to specified IP ranges</div>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-2 border-t">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}

interface User {
  name: string;
  email: string;
  role: string;
  isAdmin: boolean;
  status: 'Active' | 'Pending' | 'Suspended';
  lastActive: string;
}

const users: User[] = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Process Owner',
    isAdmin: true,
    status: 'Active',
    lastActive: 'Just now'
  },
  {
    name: 'Sarah Miller',
    email: 'sarah.miller@example.com',
    role: 'Process Owner',
    isAdmin: false,
    status: 'Active',
    lastActive: '5 minutes ago'
  },
  {
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    role: 'Modeler',
    isAdmin: false,
    status: 'Active',
    lastActive: '1 hour ago'
  },
  {
    name: 'Lisa Johnson',
    email: 'lisa.johnson@example.com',
    role: 'Analyst',
    isAdmin: false,
    status: 'Active',
    lastActive: '3 hours ago'
  },
  {
    name: 'Robert Taylor',
    email: 'robert.taylor@example.com',
    role: 'Process Owner',
    isAdmin: false,
    status: 'Pending',
    lastActive: 'Never'
  },
  {
    name: 'Jennifer Adams',
    email: 'jennifer.adams@example.com',
    role: 'Modeler',
    isAdmin: false,
    status: 'Active',
    lastActive: 'Yesterday'
  },
  {
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    role: 'Viewer',
    isAdmin: false,
    status: 'Suspended',
    lastActive: '2 weeks ago'
  },
  {
    name: 'Emma Garcia',
    email: 'emma.garcia@example.com',
    role: 'Viewer',
    isAdmin: false,
    status: 'Active',
    lastActive: '2 days ago'
  }
];

interface Role {
  name: string;
  description: string;
  users: number;
}

const roles: Role[] = [
  {
    name: 'Admin',
    description: 'Full system access and control',
    users: 1
  },
  {
    name: 'Process Owner',
    description: 'Can create, modify, and approve processes',
    users: 3
  },
  {
    name: 'Modeler',
    description: 'Can create and modify process models',
    users: 12
  },
  {
    name: 'Analyst',
    description: 'Can analyze processes and create reports',
    users: 8
  },
  {
    name: 'Viewer',
    description: 'Read-only access to published content',
    users: 32
  }
];

interface PermissionRowProps {
  category: string;
  permission: string;
  admin: boolean;
  processOwner: boolean;
  modeler: boolean;
  analyst: boolean;
  viewer: boolean;
}

function PermissionRow({
  category,
  permission,
  admin,
  processOwner,
  modeler,
  analyst,
  viewer
}: PermissionRowProps) {
  return (
    <tr className="hover:bg-muted/50">
      <td className="px-4 py-3">
        <div>
          <div className="text-xs text-muted-foreground">{category}</div>
          <div>{permission}</div>
        </div>
      </td>
      <td className="px-4 py-3 text-center">
        {admin && <Check className="h-4 w-4 mx-auto text-green-600" />}
      </td>
      <td className="px-4 py-3 text-center">
        {processOwner && <Check className="h-4 w-4 mx-auto text-green-600" />}
      </td>
      <td className="px-4 py-3 text-center">
        {modeler && <Check className="h-4 w-4 mx-auto text-green-600" />}
      </td>
      <td className="px-4 py-3 text-center">
        {analyst && <Check className="h-4 w-4 mx-auto text-green-600" />}
      </td>
      <td className="px-4 py-3 text-center">
        {viewer && <Check className="h-4 w-4 mx-auto text-green-600" />}
      </td>
    </tr>
  );
}

interface UserGroup {
  name: string;
  description: string;
  members: number;
  type: 'Department' | 'Project' | 'Region' | 'Custom';
}

const userGroups: UserGroup[] = [
  {
    name: 'Finance Department',
    description: 'Financial process owners and analysts',
    members: 12,
    type: 'Department'
  },
  {
    name: 'Sales Team',
    description: 'Sales process stakeholders',
    members: 18,
    type: 'Department'
  },
  {
    name: 'IT Operations',
    description: 'IT infrastructure and service management',
    members: 15,
    type: 'Department'
  },
  {
    name: 'Digital Transformation',
    description: 'Cross-departmental transformation project',
    members: 8,
    type: 'Project'
  },
  {
    name: 'EMEA Region',
    description: 'Users from Europe, Middle East and Africa',
    members: 24,
    type: 'Region'
  },
  {
    name: 'Process Architects',
    description: 'Process design specialists',
    members: 5,
    type: 'Custom'
  }
];

interface GroupCardProps {
  group: UserGroup;
}

function GroupCard({ group }: GroupCardProps) {
  return (
    <Card className="hover:border-primary cursor-pointer">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{group.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
          </div>
          <Badge variant="outline">{group.type}</Badge>
        </div>
        
        <div className="mt-4 flex items-center gap-1">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground text-sm">{group.members} members</span>
        </div>
        
        <div className="mt-3 pt-3 border-t flex justify-between">
          <Button variant="ghost" size="sm" className="h-8">
            <User className="h-4 w-4 mr-1" />
            Members
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
