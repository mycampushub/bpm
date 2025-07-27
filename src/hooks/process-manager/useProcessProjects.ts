import { useState, useCallback } from 'react';

export interface ProcessProject {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'in-progress' | 'review' | 'completed' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'critical';
  owner: string;
  collaborators: string[];
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  tags: string[];
  category: string;
  version: string;
  elements: any[];
  connections: any[];
  progress: number;
}

export const useProcessProjects = () => {
  const [projects, setProjects] = useState<ProcessProject[]>([
    {
      id: '1',
      name: 'Customer Onboarding Redesign',
      description: 'Redesigning the customer onboarding process to improve efficiency and user experience',
      status: 'in-progress',
      priority: 'high',
      owner: 'Sarah Chen',
      collaborators: ['John Doe', 'Mike Johnson', 'Lisa Wang'],
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-25T14:30:00Z',
      dueDate: '2024-02-15T23:59:59Z',
      tags: ['customer', 'onboarding', 'ux'],
      category: 'Customer Service',
      version: '1.3',
      elements: [],
      connections: [],
      progress: 75
    },
    {
      id: '2',
      name: 'Invoice Processing Automation',
      description: 'Automating the invoice processing workflow with RPA integration',
      status: 'review',
      priority: 'medium',
      owner: 'David Kumar',
      collaborators: ['Anna Smith', 'Robert Taylor'],
      createdAt: '2024-01-05T09:00:00Z',
      updatedAt: '2024-01-24T11:15:00Z',
      dueDate: '2024-02-28T23:59:59Z',
      tags: ['automation', 'finance', 'rpa'],
      category: 'Finance',
      version: '2.1',
      elements: [],
      connections: [],
      progress: 90
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const createProject = useCallback(async (projectData: Partial<ProcessProject>) => {
    setIsLoading(true);
    
    const newProject: ProcessProject = {
      id: Date.now().toString(),
      name: projectData.name || 'New Project',
      description: projectData.description || '',
      status: 'draft',
      priority: projectData.priority || 'medium',
      owner: 'Current User',
      collaborators: projectData.collaborators || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: projectData.dueDate,
      tags: projectData.tags || [],
      category: projectData.category || 'General',
      version: '1.0',
      elements: [],
      connections: [],
      progress: 0,
      ...projectData
    };

    await new Promise(resolve => setTimeout(resolve, 1000));
    setProjects(prev => [newProject, ...prev]);
    setIsLoading(false);
    
    return newProject.id;
  }, []);

  const updateProject = useCallback(async (id: string, updates: Partial<ProcessProject>) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setProjects(prev => prev.map(project =>
      project.id === id
        ? { ...project, ...updates, updatedAt: new Date().toISOString() }
        : project
    ));
    
    setIsLoading(false);
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setProjects(prev => prev.filter(project => project.id !== id));
    
    setIsLoading(false);
  }, []);

  const duplicateProject = useCallback(async (id: string) => {
    const project = projects.find(p => p.id === id);
    if (!project) return;

    const duplicated = {
      ...project,
      id: Date.now().toString(),
      name: `${project.name} (Copy)`,
      status: 'draft' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: 0
    };

    setProjects(prev => [duplicated, ...prev]);
    return duplicated.id;
  }, [projects]);

  const updateProjectProgress = useCallback(async (id: string, progress: number) => {
    await updateProject(id, { progress: Math.max(0, Math.min(100, progress)) });
  }, [updateProject]);

  const addCollaborator = useCallback(async (id: string, collaborator: string) => {
    const project = projects.find(p => p.id === id);
    if (project && !project.collaborators.includes(collaborator)) {
      await updateProject(id, {
        collaborators: [...project.collaborators, collaborator]
      });
    }
  }, [projects, updateProject]);

  const removeCollaborator = useCallback(async (id: string, collaborator: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      await updateProject(id, {
        collaborators: project.collaborators.filter(c => c !== collaborator)
      });
    }
  }, [projects, updateProject]);

  return {
    projects,
    isLoading,
    createProject,
    updateProject,
    deleteProject,
    duplicateProject,
    updateProjectProgress,
    addCollaborator,
    removeCollaborator
  };
};