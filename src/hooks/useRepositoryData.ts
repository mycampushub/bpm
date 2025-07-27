import { useDataManager } from './useDataManager';
import { RepositoryItem } from '@/types/modules';

const initialRepositoryData: RepositoryItem[] = [
  {
    id: 'repo_1',
    name: 'Customer Onboarding Process',
    description: 'Complete customer onboarding workflow with KYC checks',
    type: 'process',
    category: 'customer',
    version: '2.1.0',
    owner: 'Sarah Johnson',
    size: '156 KB',
    tags: ['onboarding', 'customer', 'kyc'],
    lastModified: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    createdBy: 'Sarah Johnson',
    status: 'active'
  },
  {
    id: 'repo_2',
    name: 'Invoice Processing Model',
    description: 'Automated invoice processing and approval workflow',
    type: 'model',
    category: 'finance',
    version: '1.5.2',
    owner: 'Mike Wilson',
    size: '89 KB',
    tags: ['invoice', 'automation', 'finance'],
    lastModified: '2024-01-12T14:20:00Z',
    createdAt: '2024-01-05T11:15:00Z',
    updatedAt: '2024-01-12T14:20:00Z',
    createdBy: 'Mike Wilson',
    status: 'active'
  }
];

const validateRepositoryItem = (item: Partial<RepositoryItem>): string | null => {
  if (!item.name?.trim()) return 'Name is required';
  if (!item.type) return 'Type is required';
  if (!item.category?.trim()) return 'Category is required';
  return null;
};

export const useRepositoryData = () => {
  return useDataManager<RepositoryItem>({
    storageKey: 'repository_items',
    initialData: initialRepositoryData,
    validator: validateRepositoryItem
  });
};