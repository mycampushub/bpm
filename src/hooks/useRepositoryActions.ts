import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useVoice } from '@/contexts/VoiceContext';
import { RepositoryItemType } from '@/types/repository';

interface RepositoryItem extends RepositoryItemType {
  createdAt: string;
  updatedAt: string;
}

export const useRepositoryActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { speakText } = useVoice();

  const createItem = useCallback(async (itemData: Omit<RepositoryItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const newItem: RepositoryItem = {
        ...itemData,
        id: `item-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage
      const existingItems = JSON.parse(localStorage.getItem('repositoryItems') || '[]');
      existingItems.push(newItem);
      localStorage.setItem('repositoryItems', JSON.stringify(existingItems));
      
      toast({
        title: "Item Created",
        description: `${newItem.name} has been created successfully`
      });
      speakText(`Repository item ${newItem.name} created successfully`);
      
      return newItem;
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Failed to create repository item",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast, speakText]);

  const updateItem = useCallback(async (id: string, updates: Partial<RepositoryItem>) => {
    setIsLoading(true);
    try {
      const existingItems = JSON.parse(localStorage.getItem('repositoryItems') || '[]');
      const itemIndex = existingItems.findIndex((item: RepositoryItem) => item.id === id);
      
      if (itemIndex === -1) {
        throw new Error('Item not found');
      }
      
      existingItems[itemIndex] = {
        ...existingItems[itemIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('repositoryItems', JSON.stringify(existingItems));
      
      toast({
        title: "Item Updated",
        description: "Repository item has been updated successfully"
      });
      speakText("Repository item updated successfully");
      
      return existingItems[itemIndex];
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update repository item",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast, speakText]);

  const deleteItem = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const existingItems = JSON.parse(localStorage.getItem('repositoryItems') || '[]');
      const filteredItems = existingItems.filter((item: RepositoryItem) => item.id !== id);
      
      localStorage.setItem('repositoryItems', JSON.stringify(filteredItems));
      
      toast({
        title: "Item Deleted",
        description: "Repository item has been deleted successfully"
      });
      speakText("Repository item deleted successfully");
      
      return true;
    } catch (error) {
      toast({
        title: "Deletion Failed",
        description: "Failed to delete repository item",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast, speakText]);

  const duplicateItem = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const existingItems = JSON.parse(localStorage.getItem('repositoryItems') || '[]');
      const originalItem = existingItems.find((item: RepositoryItem) => item.id === id);
      
      if (!originalItem) {
        throw new Error('Item not found');
      }
      
      const duplicatedItem: RepositoryItem = {
        ...originalItem,
        id: `item-${Date.now()}`,
        name: `${originalItem.name} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      existingItems.push(duplicatedItem);
      localStorage.setItem('repositoryItems', JSON.stringify(existingItems));
      
      toast({
        title: "Item Duplicated",
        description: `${duplicatedItem.name} has been created`
      });
      speakText(`Repository item duplicated as ${duplicatedItem.name}`);
      
      return duplicatedItem;
    } catch (error) {
      toast({
        title: "Duplication Failed",
        description: "Failed to duplicate repository item",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast, speakText]);

  const exportItem = useCallback(async (id: string, format: 'json' | 'xml' = 'json') => {
    try {
      const existingItems = JSON.parse(localStorage.getItem('repositoryItems') || '[]');
      const item = existingItems.find((item: RepositoryItem) => item.id === id);
      
      if (!item) {
        throw new Error('Item not found');
      }
      
      let exportData: string;
      let filename: string;
      let mimeType: string;
      
      if (format === 'xml') {
        exportData = `<?xml version="1.0" encoding="UTF-8"?>
<repositoryItem>
  <id>${item.id}</id>
  <name>${item.name}</name>
  <type>${item.type}</type>
  <category>${item.category}</category>
  <status>${item.status}</status>
  <description>${item.description || ''}</description>
  <createdAt>${item.createdAt}</createdAt>
  <updatedAt>${item.updatedAt}</updatedAt>
</repositoryItem>`;
        filename = `${item.name}.xml`;
        mimeType = 'application/xml';
      } else {
        exportData = JSON.stringify(item, null, 2);
        filename = `${item.name}.json`;
        mimeType = 'application/json';
      }
      
      const blob = new Blob([exportData], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Complete",
        description: `${item.name} exported as ${format.toUpperCase()}`
      });
      speakText(`Repository item ${item.name} exported successfully`);
      
      return true;
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export repository item",
        variant: "destructive"
      });
      throw error;
    }
  }, [toast, speakText]);

  return {
    isLoading,
    createItem,
    updateItem,
    deleteItem,
    duplicateItem,
    exportItem
  };
};