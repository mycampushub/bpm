import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { useUsersData } from "@/hooks/useUsersData";
import { 
  Plus, 
  Search,
  Filter,
  Users,
  Shield,
  Settings,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

const demoRoles: Role[] = [
  {
    id: 'r1',
    name: 'Administrator',
    description: 'Full system access and user management',
    permissions: ['all'],
    userCount: 2
  },
  {
    id: 'r2',
    name: 'Process Manager',
    description: 'Manage processes and workflows',
    permissions: ['create_process', 'edit_process', 'view_analytics'],
    userCount: 5
  },
  {
    id: 'r3',
    name: 'Analyst',
    description: 'View and analyze process data',
    permissions: ['view_process', 'view_analytics', 'export_data'],
    userCount: 8
  },
  {
    id: 'r4',
    name: 'Viewer',
    description: 'Read-only access to processes',
    permissions: ['view_process'],
    userCount: 12
  }
];

export function FunctionalUserManagement() {
  const usersData = useUsersData();
  const [roles, setRoles] = useState<Role[]>(demoRoles);
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { toast } = useToast();
  const { speakText } = useVoice();

  const handleCreateUser = () => {
    const newUser = {
      name: `New User ${usersData.items.length + 1}`,
      description: 'New user description',
      email: `user${usersData.items.length + 1}@company.com`,
      firstName: 'New',
      lastName: `User ${usersData.items.length + 1}`,
      role: 'viewer' as const,
      department: 'General',
      permissions: ['view_process'],
      lastLogin: new Date().toISOString(),
      isActive: true,
      status: 'active' as const,
      createdBy: 'System Admin'
    };
    
    usersData.create(newUser);
    toast({
      title: "User Created",
      description: `Created new user: ${newUser.firstName} ${newUser.lastName}`
    });
    speakText(`Created new user: ${newUser.firstName} ${newUser.lastName}`);
  };

  const handleEditUser = (userId: string) => {
    const user = usersData.items.find(u => u.id === userId);
    toast({
      title: "Edit User",
      description: `Opening ${user?.firstName} ${user?.lastName} for editing`
    });
    speakText(`Opening user ${user?.firstName} ${user?.lastName} for editing`);
  };

  const handleDeleteUser = (userId: string) => {
    const user = usersData.items.find(u => u.id === userId);
    usersData.remove(userId);
    toast({
      title: "User Deleted",
      description: `Deleted user: ${user?.firstName} ${user?.lastName}`
    });
    speakText(`Deleted user: ${user?.firstName} ${user?.lastName}`);
  };

  const handleToggleUserStatus = (userId: string) => {
    const user = usersData.items.find(u => u.id === userId);
    if (user) {
      usersData.update(userId, { isActive: !user.isActive });
      toast({
        title: "User Status Updated",
        description: `${user.firstName} ${user.lastName} is now ${!user.isActive ? 'active' : 'inactive'}`
      });
      speakText(`User ${user.firstName} ${user.lastName} is now ${!user.isActive ? 'active' : 'inactive'}`);
    }
  };

  const handleCreateRole = () => {
    const newRole: Role = {
      id: `r${Date.now()}`,
      name: `New Role ${roles.length + 1}`,
      description: 'New role description',
      permissions: ['view_process'],
      userCount: 0
    };
    
    setRoles([...roles, newRole]);
    toast({
      title: "Role Created",
      description: `Created new role: ${newRole.name}`
    });
    speakText(`Created new role: ${newRole.name}`);
  };

  const handleSendInvite = (userEmail: string) => {
    toast({
      title: "Invitation Sent",
      description: `Sent invitation to ${userEmail}`
    });
    speakText(`Sent invitation to user at ${userEmail}`);
  };

  const filteredUsers = usersData.items.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'analyst': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage users, roles, and permissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => speakText("User Management dashboard loaded with user administration tools")}>
            <Users className="h-4 w-4 mr-2" />
            Directory
          </Button>
          <Button onClick={handleCreateUser}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{usersData.items.length}</div>
            <div className="text-xs text-blue-600">+{usersData.items.filter(u => u.isActive).length} active</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {usersData.items.filter(u => u.isActive).length}
            </div>
            <div className="text-xs text-green-600">Online now</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{roles.length}</div>
            <div className="text-xs text-purple-600">Permission groups</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {new Set(usersData.items.map(u => u.department)).size}
            </div>
            <div className="text-xs text-orange-600">Across organization</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">User Directory</h2>
            <Button onClick={handleCreateUser}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left p-4 font-medium">User</th>
                      <th className="text-left p-4 font-medium">Role</th>
                      <th className="text-left p-4 font-medium">Department</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Last Login</th>
                      <th className="text-center p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-muted/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.firstName} {user.lastName}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="p-4">{user.department}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(user.isActive)}>
                            {user.isActive ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3 mr-1" />
                                Inactive
                              </>
                            )}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-1">
                            <Button size="sm" variant="ghost" onClick={() => handleEditUser(user.id)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleSendInvite(user.email)}>
                              <Mail className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleToggleUserStatus(user.id)}>
                              {user.isActive ? <XCircle className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteUser(user.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Roles & Permissions</h2>
            <Button onClick={handleCreateRole}>
              <Shield className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <Card key={role.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      {role.name}
                    </CardTitle>
                    <Badge variant="outline">{role.userCount} users</Badge>
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-medium text-sm text-muted-foreground mb-2">Permissions</div>
                    <div className="space-y-1">
                      {role.permissions.slice(0, 3).map((permission, index) => (
                        <div key={index} className="text-sm flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {permission.replace('_', ' ')}
                        </div>
                      ))}
                      {role.permissions.length > 3 && (
                        <div className="text-sm text-muted-foreground">
                          +{role.permissions.length - 3} more permissions
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View Users
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>Manage role-based permissions across the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left p-3 font-medium">Permission</th>
                      <th className="text-center p-3 font-medium">Admin</th>
                      <th className="text-center p-3 font-medium">Manager</th>
                      <th className="text-center p-3 font-medium">Analyst</th>
                      <th className="text-center p-3 font-medium">Viewer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-3 font-medium">User Management</td>
                      <td className="p-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                      <td className="p-3 text-center"><XCircle className="h-4 w-4 text-red-500 mx-auto" /></td>
                      <td className="p-3 text-center"><XCircle className="h-4 w-4 text-red-500 mx-auto" /></td>
                      <td className="p-3 text-center"><XCircle className="h-4 w-4 text-red-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Create Process</td>
                      <td className="p-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                      <td className="p-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                      <td className="p-3 text-center"><XCircle className="h-4 w-4 text-red-500 mx-auto" /></td>
                      <td className="p-3 text-center"><XCircle className="h-4 w-4 text-red-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Edit Process</td>
                      <td className="p-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                      <td className="p-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                      <td className="p-3 text-center"><XCircle className="h-4 w-4 text-red-500 mx-auto" /></td>
                      <td className="p-3 text-center"><XCircle className="h-4 w-4 text-red-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">View Analytics</td>
                      <td className="p-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                      <td className="p-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                      <td className="p-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                      <td className="p-3 text-center"><XCircle className="h-4 w-4 text-red-500 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure system-wide security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium">Password Policy</div>
                    <div className="text-sm text-muted-foreground">Minimum 8 characters, mixed case, numbers</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium">Session Timeout</div>
                    <div className="text-sm text-muted-foreground">30 minutes of inactivity</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Access Control</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium">IP Restrictions</div>
                    <div className="text-sm text-muted-foreground">Allow from specific IP ranges</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium">Multi-Factor Auth</div>
                    <div className="text-sm text-muted-foreground">Required for admin accounts</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}