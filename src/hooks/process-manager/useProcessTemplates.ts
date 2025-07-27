import { useState, useCallback } from 'react';

export interface ProcessTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  industry: string;
  complexity: 'simple' | 'medium' | 'complex';
  version: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  isPublic: boolean;
  downloadCount: number;
  rating: number;
  elements: any[];
  connections: any[];
}

export const useProcessTemplates = () => {
  const [templates, setTemplates] = useState<ProcessTemplate[]>([
    {
      id: '1',
      name: 'Purchase Order Process',
      description: 'Standard purchase order approval workflow with multi-level approvals',
      category: 'Finance',
      industry: 'General',
      complexity: 'medium',
      version: '1.2',
      author: 'John Smith',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-20T14:30:00Z',
      tags: ['purchase', 'approval', 'finance'],
      isPublic: true,
      downloadCount: 245,
      rating: 4.5,
      elements: [],
      connections: []
    },
    {
      id: '2',
      name: 'Customer Onboarding',
      description: 'Digital customer onboarding process with KYC and account setup',
      category: 'Customer Service',
      industry: 'Banking',
      complexity: 'complex',
      version: '2.1',
      author: 'Sarah Johnson',
      createdAt: '2024-01-10T09:00:00Z',
      updatedAt: '2024-01-18T16:45:00Z',
      tags: ['customer', 'onboarding', 'kyc'],
      isPublic: true,
      downloadCount: 182,
      rating: 4.8,
      elements: [],
      connections: []
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);

  const createTemplate = useCallback(async (templateData: Partial<ProcessTemplate>) => {
    setIsLoading(true);
    
    const newTemplate: ProcessTemplate = {
      id: Date.now().toString(),
      name: templateData.name || 'New Template',
      description: templateData.description || '',
      category: templateData.category || 'General',
      industry: templateData.industry || 'General',
      complexity: templateData.complexity || 'simple',
      version: '1.0',
      author: 'Current User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: templateData.tags || [],
      isPublic: templateData.isPublic || false,
      downloadCount: 0,
      rating: 0,
      elements: templateData.elements || [],
      connections: templateData.connections || [],
      ...templateData
    };

    await new Promise(resolve => setTimeout(resolve, 1000));
    setTemplates(prev => [newTemplate, ...prev]);
    setIsLoading(false);
    
    return newTemplate.id;
  }, []);

  const updateTemplate = useCallback(async (id: string, updates: Partial<ProcessTemplate>) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setTemplates(prev => prev.map(template =>
      template.id === id
        ? { ...template, ...updates, updatedAt: new Date().toISOString() }
        : template
    ));
    
    setIsLoading(false);
  }, []);

  const deleteTemplate = useCallback(async (id: string) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setTemplates(prev => prev.filter(template => template.id !== id));
    
    setIsLoading(false);
  }, []);

  const duplicateTemplate = useCallback(async (id: string) => {
    const template = templates.find(t => t.id === id);
    if (!template) return;

    const duplicated = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      downloadCount: 0,
      isPublic: false
    };

    setTemplates(prev => [duplicated, ...prev]);
    return duplicated.id;
  }, [templates]);

  const searchTemplates = useCallback((query: string, filters: any = {}) => {
    let filtered = templates;

    if (query) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(query.toLowerCase()) ||
        template.description.toLowerCase().includes(query.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    if (filters.category) {
      filtered = filtered.filter(template => template.category === filters.category);
    }

    if (filters.complexity) {
      filtered = filtered.filter(template => template.complexity === filters.complexity);
    }

    return filtered;
  }, [templates]);

  return {
    templates,
    isLoading,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    duplicateTemplate,
    searchTemplates
  };
};