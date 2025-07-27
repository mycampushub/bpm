
import { useState, useCallback } from "react";

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "message" | "update" | "alert";
  read: boolean;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New discussion started",
      description: "John Doe started a discussion about process optimization",
      time: "2 minutes ago",
      type: "message",
      read: false
    },
    {
      id: "2",
      title: "Approval required",
      description: "Purchase order workflow needs your approval",
      time: "1 hour ago",
      type: "update",
      read: false
    },
    {
      id: "3",
      title: "Process review scheduled",
      description: "Monthly process review scheduled for tomorrow",
      time: "3 hours ago",
      type: "alert",
      read: true
    }
  ]);

  const addNotification = useCallback((notification: Omit<Notification, "id" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification_${Date.now()}`,
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    markAsRead,
    clearAll
  };
};
