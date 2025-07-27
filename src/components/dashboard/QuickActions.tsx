
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  link: string;
  color: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
  onActionClick: (action: QuickAction) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  onActionClick
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
        <CardDescription>Frequently used functions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Link 
                key={index} 
                to={action.link}
                onClick={() => onActionClick(action)}
                className="block"
              >
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer hover:shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded ${action.color} text-white`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{action.title}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
