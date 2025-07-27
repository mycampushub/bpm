
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UserPlus, X, Send, Copy } from "lucide-react";
import { useVoice } from "@/contexts/VoiceContext";
import { useCollaborationData } from "@/hooks/useCollaborationData";

interface TeamInviteDialogProps {
  trigger?: React.ReactNode;
}

export const TeamInviteDialog: React.FC<TeamInviteDialogProps> = ({ trigger }) => {
  const { inviteTeamMember } = useCollaborationData();
  const { speakText } = useVoice();
  const [open, setOpen] = useState(false);
  const [inviteMode, setInviteMode] = useState<"single" | "bulk">("single");
  
  const [singleInvite, setSingleInvite] = useState({
    email: "",
    role: "",
    message: "",
    permissions: {
      read: true,
      write: false,
      approve: false,
      admin: false
    }
  });

  const [bulkInvites, setBulkInvites] = useState("");
  const [inviteLink, setInviteLink] = useState("");

  const roles = [
    { value: "viewer", label: "Viewer", description: "Can view processes and discussions" },
    { value: "contributor", label: "Contributor", description: "Can create and edit content" },
    { value: "approver", label: "Approver", description: "Can approve process changes" },
    { value: "admin", label: "Administrator", description: "Full access to all features" }
  ];

  const handleSingleInvite = () => {
    if (!singleInvite.email || !singleInvite.role) {
      speakText("Please fill in all required fields");
      return;
    }

    inviteTeamMember(singleInvite.email, singleInvite.role);
    
    setSingleInvite({
      email: "",
      role: "",
      message: "",
      permissions: { read: true, write: false, approve: false, admin: false }
    });
    
    setOpen(false);
    speakText(`Invitation sent to ${singleInvite.email} as ${singleInvite.role}`);
  };

  const handleBulkInvite = () => {
    const emails = bulkInvites.split('\n').filter(email => email.trim());
    if (emails.length === 0) {
      speakText("Please enter at least one email address");
      return;
    }

    emails.forEach(email => {
      if (email.trim()) {
        inviteTeamMember(email.trim(), "contributor");
      }
    });

    setBulkInvites("");
    setOpen(false);
    speakText(`Sent invitations to ${emails.length} team members`);
  };

  const generateInviteLink = () => {
    const link = `https://app.company.com/invite/${Math.random().toString(36).substring(7)}`;
    setInviteLink(link);
    speakText("Invite link generated successfully");
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    speakText("Invite link copied to clipboard");
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setSingleInvite(prev => ({
      ...prev,
      permissions: { ...prev.permissions, [permission]: checked }
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Team
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite Team Members</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Invite Mode Selection */}
          <div className="flex gap-2">
            <Button
              variant={inviteMode === "single" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setInviteMode("single");
                speakText("Single invite mode selected");
              }}
            >
              Single Invite
            </Button>
            <Button
              variant={inviteMode === "bulk" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setInviteMode("bulk");
                speakText("Bulk invite mode selected");
              }}
            >
              Bulk Invite
            </Button>
          </div>

          {inviteMode === "single" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={singleInvite.email}
                  onChange={(e) => setSingleInvite(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="colleague@company.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select 
                  value={singleInvite.role} 
                  onValueChange={(value) => setSingleInvite(prev => ({ ...prev, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div>
                          <div className="font-medium">{role.label}</div>
                          <div className="text-xs text-muted-foreground">{role.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="space-y-2">
                  {Object.entries(singleInvite.permissions).map(([permission, checked]) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Checkbox
                        id={permission}
                        checked={checked}
                        onCheckedChange={(checked) => handlePermissionChange(permission, checked as boolean)}
                      />
                      <Label htmlFor={permission} className="text-sm capitalize">
                        {permission}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={singleInvite.message}
                  onChange={(e) => setSingleInvite(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Welcome to our collaboration space..."
                  rows={3}
                />
              </div>

              <Button onClick={handleSingleInvite} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          )}

          {inviteMode === "bulk" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bulk-emails">Email Addresses (one per line)</Label>
                <Textarea
                  id="bulk-emails"
                  value={bulkInvites}
                  onChange={(e) => setBulkInvites(e.target.value)}
                  placeholder="colleague1@company.com&#10;colleague2@company.com&#10;colleague3@company.com"
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">
                  All invitees will be assigned the Contributor role by default
                </p>
              </div>

              <Button onClick={handleBulkInvite} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Bulk Invitations
              </Button>
            </div>
          )}

          {/* Invite Link Section */}
          <div className="border-t pt-4">
            <div className="space-y-3">
              <Label>Share Invite Link</Label>
              <div className="flex gap-2">
                <Button variant="outline" onClick={generateInviteLink} className="flex-1">
                  Generate Link
                </Button>
                {inviteLink && (
                  <Button variant="outline" size="icon" onClick={copyInviteLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {inviteLink && (
                <div className="p-2 bg-muted rounded text-sm font-mono">
                  {inviteLink}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
