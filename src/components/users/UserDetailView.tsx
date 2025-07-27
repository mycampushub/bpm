
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User as UserIcon, Mail, Phone, Building, FileText, Users } from "lucide-react";
import { User } from "@/types/modules";

interface UserDetailViewProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

export const UserDetailView: React.FC<UserDetailViewProps> = ({
  user,
  open,
  onClose
}) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            {user.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-xl font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{user.role}</Badge>
                <Badge variant={user.status === "active" ? "default" : "secondary"}>
                  {user.status}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Information
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Email:</span> {user.email}
                </div>
                <div>
                  <span className="text-muted-foreground">Department:</span> {user.department}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Activity
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Last Login:</span> {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
                </div>
                <div>
                  <span className="text-muted-foreground">Role:</span> {user.role}
                </div>
                <div>
                  <span className="text-muted-foreground">Active:</span> {user.isActive ? "Yes" : "No"}
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          {user.description && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">About</h4>
                <p className="text-sm text-muted-foreground">{user.description}</p>
              </div>
            </>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{user.permissions.length}</div>
                <p className="text-xs text-muted-foreground">Total</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Role</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold capitalize">{user.role}</div>
                <p className="text-xs text-muted-foreground">Permission Level</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
