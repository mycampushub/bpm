import { useState, useCallback, useEffect } from 'react';
import { useToast } from './use-toast';

export interface BaseEntity {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  status: 'active' | 'draft' | 'archived';
}

export interface UseDataManagerOptions<T> {
  storageKey: string;
  initialData?: T[];
  validator?: (item: Partial<T>) => string | null;
}

export function useDataManager<T extends BaseEntity>(options: UseDataManagerOptions<T>) {
  const { storageKey, initialData = [], validator } = options;
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        setItems(initialData);
        localStorage.setItem(storageKey, JSON.stringify(initialData));
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      setItems(initialData);
    }
  }, [storageKey, initialData]);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (items.length > 0 || localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, storageKey]);

  // Filtered items based on search and status
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const create = useCallback(async (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (validator) {
      const error = validator(data as Partial<T>);
      if (error) {
        toast({ title: 'Validation Error', description: error, variant: 'destructive' });
        return null;
      }
    }

    setLoading(true);
    try {
      const newItem: T = {
        ...data,
        id: `${storageKey}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as T;

      setItems(prev => [...prev, newItem]);
      toast({ title: 'Success', description: `${data.name} created successfully` });
      return newItem;
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create item', variant: 'destructive' });
      return null;
    } finally {
      setLoading(false);
    }
  }, [validator, toast, storageKey]);

  const update = useCallback(async (id: string, updates: Partial<Omit<T, 'id' | 'createdAt'>>) => {
    if (validator) {
      const error = validator(updates as Partial<T>);
      if (error) {
        toast({ title: 'Validation Error', description: error, variant: 'destructive' });
        return false;
      }
    }

    setLoading(true);
    try {
      setItems(prev => prev.map(item => 
        item.id === id 
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item
      ));
      toast({ title: 'Success', description: 'Item updated successfully' });
      return true;
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update item', variant: 'destructive' });
      return false;
    } finally {
      setLoading(false);
    }
  }, [validator, toast]);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const item = items.find(i => i.id === id);
      setItems(prev => prev.filter(item => item.id !== id));
      toast({ title: 'Success', description: `${item?.name || 'Item'} deleted successfully` });
      return true;
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete item', variant: 'destructive' });
      return false;
    } finally {
      setLoading(false);
    }
  }, [items, toast]);

  const getById = useCallback((id: string) => {
    return items.find(item => item.id === id) || null;
  }, [items]);

  const duplicate = useCallback(async (id: string) => {
    const item = getById(id);
    if (!item) return null;

    const duplicateData = {
      ...item,
      name: `${item.name} (Copy)`,
      createdBy: 'Current User', // This should come from auth context
    };

    // Remove fields that shouldn't be duplicated
    const { id: _, createdAt, updatedAt, ...dataToCreate } = duplicateData;
    return create(dataToCreate as Omit<T, 'id' | 'createdAt' | 'updatedAt'>);
  }, [getById, create]);

  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(items, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${storageKey}_export_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Success', description: 'Data exported successfully' });
  }, [items, storageKey, toast]);

  const importData = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (Array.isArray(imported)) {
          setItems(imported);
          toast({ title: 'Success', description: 'Data imported successfully' });
        } else {
          throw new Error('Invalid format');
        }
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to import data', variant: 'destructive' });
      }
    };
    reader.readAsText(file);
  }, [toast]);

  return {
    items,
    filteredItems,
    loading,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    create,
    update,
    remove,
    getById,
    duplicate,
    exportData,
    importData,
  };
}