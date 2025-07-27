import { useDataManager } from './useDataManager';
import { User } from '@/types/modules';

const initialUsersData: User[] = [
  {
    id: 'user_1',
    name: 'John Smith',
    description: 'Process Analyst with expertise in workflow optimization',
    email: 'john.smith@company.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'analyst',
    department: 'Process Excellence',
    permissions: ['view_processes', 'edit_processes', 'create_analysis'],
    lastLogin: '2024-01-15T09:30:00Z',
    isActive: true,
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-01-15T09:30:00Z',
    createdBy: 'System Admin',
    status: 'active'
  },
  {
    id: 'user_2',
    name: 'Sarah Johnson',
    description: 'Senior Process Manager leading digital transformation initiatives',
    email: 'sarah.johnson@company.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'admin',
    department: 'Digital Transformation',
    permissions: ['all'],
    lastLogin: '2024-01-15T08:15:00Z',
    isActive: true,
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-01-15T08:15:00Z',
    createdBy: 'System Admin',
    status: 'active'
  }
];

const validateUser = (item: Partial<User>): string | null => {
  if (!item.email?.trim()) return 'Email is required';
  if (!item.firstName?.trim()) return 'First name is required';
  if (!item.lastName?.trim()) return 'Last name is required';
  if (!item.role) return 'Role is required';
  if (!item.department?.trim()) return 'Department is required';
  return null;
};

export const useUsersData = () => {
  return useDataManager<User>({
    storageKey: 'users',
    initialData: initialUsersData,
    validator: validateUser
  });
};