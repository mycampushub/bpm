
import { useState, useCallback } from 'react';
import { RepositoryItemType } from '@/types/repository';
import { useRepositoryData } from './useRepositoryData';
import { useToast } from '@/hooks/use-toast';
import { useVoice } from '@/contexts/VoiceContext';

export const useRepository = () => {
  const repositoryData = useRepositoryData();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { toast } = useToast();
  const { speakText } = useVoice();

  // Filter by category
  const filteredItems = repositoryData.filteredItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesCategory;
  });

  const handleViewItem = useCallback((item: RepositoryItemType) => {
    toast({
      title: "Opening Item",
      description: `Opening ${item.name} for viewing`
    });
    speakText(`Opening ${item.name} for detailed view`);
  }, [toast, speakText]);

  const handleEditItem = useCallback((item: RepositoryItemType) => {
    toast({
      title: "Edit Mode",
      description: `Opening ${item.name} for editing`
    });
    speakText(`Opening ${item.name} for editing`);
  }, [toast, speakText]);

  const handleRenameItem = useCallback((item: RepositoryItemType) => {
    const newName = prompt('Enter new name:', item.name);
    if (newName && newName !== item.name) {
      repositoryData.update(item.id, { name: newName });
    }
  }, [repositoryData]);

  const handleShareItem = useCallback((item: RepositoryItemType) => {
    toast({
      title: "Share Item",
      description: `Sharing ${item.name} with team members`
    });
    speakText(`Sharing ${item.name} with your team`);
  }, [toast, speakText]);

  const handleDownloadItem = useCallback((item: RepositoryItemType) => {
    toast({
      title: "Download Started",
      description: `Downloading ${item.name} (${item.size})`
    });
    speakText(`Starting download of ${item.name}`);
  }, [toast, speakText]);

  const deleteItem = useCallback((itemId: string) => {
    repositoryData.remove(itemId);
  }, [repositoryData]);

  return {
    ...repositoryData,
    filteredItems,
    selectedCategory,
    setSelectedCategory,
    viewMode,
    setViewMode,
    handleViewItem,
    handleEditItem,
    handleRenameItem,
    handleShareItem,
    handleDownloadItem,
    deleteItem
  };
};
