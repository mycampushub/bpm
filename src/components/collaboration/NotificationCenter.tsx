import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  Settings, 
  MessageSquare, 
  CheckCircle, 
  Clock,
  User,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle2
} from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { useVoice } from "@/contexts/VoiceContext";

export const NotificationCenter: React.FC = () => {
  const { notifications, markAsRead, clearAll, addNotification } = useNotifications();
  const { speakText } = useVoice();
  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    discussions: true,
    approvals: true,
    mentions: true,
    reviews: true,
    sound: true,
    desktop: true
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
    speakText("Notification marked as read");
  };

  const handleClearAll = () => {
    clearAll();
    speakText("All notifications cleared");
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
    speakText(`${setting} notifications ${value ? 'enabled' : 'disabled'}`);
  };

  const testNotification = () => {
    addNotification({
      title: "Test notification",
      description: "This is a test notification to verify the system is working",
      time: "Just now",
      type: "message"
    });
    speakText("Test notification created successfully");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowSettings(!showSettings);
                speakText(showSettings ? "Hiding notification settings" : "Showing notification settings");
              }}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {showSettings && (
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium">Notification Settings</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm">Discussion Updates</label>
                <Switch
                  checked={notificationSettings.discussions}
                  onCheckedChange={(checked) => handleSettingChange("discussions", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm">Approval Requests</label>
                <Switch
                  checked={notificationSettings.approvals}
                  onCheckedChange={(checked) => handleSettingChange("approvals", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm">Mentions</label>
                <Switch
                  checked={notificationSettings.mentions}
                  onCheckedChange={(checked) => handleSettingChange("mentions", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm">Process Reviews</label>
                <Switch
                  checked={notificationSettings.reviews}
                  onCheckedChange={(checked) => handleSettingChange("reviews", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <label className="text-sm">Sound Alerts</label>
                <Switch
                  checked={notificationSettings.sound}
                  onCheckedChange={(checked) => handleSettingChange("sound", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm">Desktop Notifications</label>
                <Switch
                  checked={notificationSettings.desktop}
                  onCheckedChange={(checked) => handleSettingChange("desktop", checked)}
                />
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={testNotification} className="w-full">
              Test Notification
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {notifications.length} notifications
          </span>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClearAll}>
              <Trash2 className="h-3 w-3 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  notification.read ? 'bg-background' : 'bg-primary/5 border-primary/20'
                }`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {notification.type === 'message' && <MessageSquare className="h-4 w-4 text-blue-500" />}
                    {notification.type === 'update' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {notification.type === 'alert' && <Clock className="h-4 w-4 text-orange-500" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{notification.title}</p>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsRead(notification.id);
                    }}
                  >
                    {notification.read ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Bell className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
