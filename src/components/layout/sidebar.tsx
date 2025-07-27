
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import {
  Home,
  Workflow,
  Database,
  BarChart3,
  Users,
  Settings,
  FileText,
  Network,
  Zap,
  Target,
  Shield,
  Building
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['all'] },
  { name: 'Process Manager', href: '/process-manager', icon: Workflow, roles: ['all'] },
  { name: 'Repository', href: '/repository', icon: Database, roles: ['all'] },
  { name: 'Process Intelligence', href: '/process-intelligence', icon: BarChart3, roles: ['admin', 'process-owner', 'analyst'] },
  { name: 'Process Mining', href: '/process-mining', icon: Network, roles: ['admin', 'process-owner', 'analyst'] },
  { name: 'Journey Modeler', href: '/journey-modeler', icon: Target, roles: ['admin', 'process-owner', 'modeler'] },
  { name: 'Collaboration Hub', href: '/collaboration-hub', icon: Users, roles: ['all'] },
  { name: 'Transformation', href: '/transformation-cockpit', icon: Zap, roles: ['admin', 'process-owner'] },
  { name: 'Reports', href: '/reports', icon: FileText, roles: ['admin', 'process-owner', 'analyst'] },
];

const adminNavigation = [
  { name: 'User Management', href: '/user-management', icon: Shield, roles: ['admin'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['all'] },
];

export const Sidebar = () => {
  const location = useLocation();
  const { user, hasRole } = useAuth();

  const canAccess = (roles: string[]) => {
    if (roles.includes('all')) return true;
    if (user?.role === 'admin') return true;
    return roles.includes(user?.role || '');
  };

  const isActive = (href: string) => {
    if (href === '/dashboard' && location.pathname === '/') return true;
    return location.pathname === href;
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-gray-800">
        <Building className="h-8 w-8 text-blue-400 mr-3" />
        <div>
          <h1 className="text-lg font-bold">ProcessSuite</h1>
          <p className="text-xs text-gray-400">Enterprise Edition</p>
        </div>
      </div>

      {/* User Info */}
      <div className="px-6 py-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-sm font-medium">
              {user?.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs bg-blue-500/20 text-blue-200 border-blue-500/30">
                {user?.role}
              </Badge>
              <span className="text-xs text-gray-400">{user?.department}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          if (!canAccess(item.roles)) return null;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive(item.href)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive(item.href)
                    ? 'text-white'
                    : 'text-gray-400 group-hover:text-white'
                )}
              />
              {item.name}
            </Link>
          );
        })}

        {/* Admin Section */}
        {hasRole('admin') && (
          <>
            <div className="pt-4 pb-2">
              <div className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Administration
              </div>
            </div>
            {adminNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive(item.href)
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    isActive(item.href)
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-white'
                  )}
                />
                {item.name}
              </Link>
            ))}
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-800">
        <div className="text-xs text-gray-400">
          <p>Version 2.1.0</p>
          <p>© 2024 ProcessSuite</p>
        </div>
      </div>
    </div>
  );
};
