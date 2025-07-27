
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { UserDialog } from "./UserDialog";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/modules";

interface UserManagementActionsProps {
  mode: "create" | "edit";
  user?: User;
  onSave: (user: any) => void;
  onDelete?: (userId: string) => void;
}

export const UserManagementActions: React.FC<UserManagementActionsProps> = ({
  mode,
  user,
  onSave,
  onDelete
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { speakText } = useVoice();
  const { toast } = useToast();

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    const action = mode === "create" ? "Create new user" : `Edit user ${user?.name}`;
    speakText(`${action} dialog opened`);
  };

  const handleSave = (userData: any) => {
    onSave(userData);
    setIsDialogOpen(false);
    
    const action = mode === "create" ? "created" : "updated";
    toast({
      title: `User ${action}`,
      description: `${userData.name} has been ${action} successfully.`
    });
    speakText(`User ${userData.name} ${action} successfully`);
  };

  const handleDelete = () => {
    if (user && onDelete) {
      onDelete(user.id);
      setIsDialogOpen(false);
      
      toast({
        title: "User deleted",
        description: `${user.name} has been removed from the system.`
      });
      speakText(`User ${user.name} deleted successfully`);
    }
  };

  if (mode === "edit" && !user) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground p-2">
        <Edit className="h-4 w-4" />
        Edit User
      </div>
    );
  }

  return (
    <>
      {mode === "create" ? (
        <Button onClick={handleOpenDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      ) : (
        <div className="flex items-center gap-2 text-sm p-2 hover:bg-accent rounded cursor-pointer" onClick={handleOpenDialog}>
          <Edit className="h-4 w-4" />
          Edit User
        </div>
      )}

      <UserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={mode}
        user={user}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
};
