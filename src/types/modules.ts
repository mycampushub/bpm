import { BaseEntity } from '@/hooks/useDataManager';

// Repository Item
export interface RepositoryItem extends BaseEntity {
  type: 'process' | 'model' | 'template' | 'framework';
  category: string;
  version: string;
  owner: string;
  size: string;
  tags: string[];
  lastModified: string;
  fileUrl?: string;
  thumbnailUrl?: string;
}

// Process Intelligence Entity
export interface ProcessAnalysis extends BaseEntity {
  type: 'performance' | 'conformance' | 'discovery' | 'root-cause';
  processId: string;
  analysisData: any;
  insights: string[];
  recommendations: string[];
  metrics: Record<string, number>;
}

// Process Mining Entity
export interface ProcessMiningProject extends BaseEntity {
  eventLogFile: string;
  processVariants: number;
  totalCases: number;
  totalEvents: number;
  avgCaseTime: number;
  bottlenecks: string[];
  analysis: any;
}

// Journey Entity
export interface Journey extends BaseEntity {
  stages: JourneyStage[];
  personas: string[];
  touchpoints: string[];
  metrics: Record<string, number>;
}

export interface JourneyStage {
  id: string;
  name: string;
  description: string;
  touchpoints: string[];
  emotions: string[];
  painPoints: string[];
  opportunities: string[];
}

// Collaboration Entity
export interface CollaborationProject extends BaseEntity {
  participants: string[];
  discussions: Discussion[];
  approvals: Approval[];
  tasks: Task[];
  type: 'process-review' | 'model-creation' | 'analysis' | 'improvement';
}

export interface Discussion {
  id: string;
  title: string;
  author: string;
  content: string;
  timestamp: string;
  replies: Discussion[];
  resolved: boolean;
  tags?: string[];
  likes?: string[];
  isPinned?: boolean;
  authorInitials?: string;
  views?: number;
  processName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Approval {
  id: string;
  title: string;
  requestedBy: string;
  assignedTo: string;
  status: 'pending' | 'approved' | 'rejected';
  deadline: string;
  comments: string;
}

export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

// Transformation Entity
export interface TransformationInitiative extends BaseEntity {
  type: 'digital' | 'operational' | 'cultural' | 'strategic';
  scope: string;
  objectives: string[];
  timeline: string;
  budget: number;
  risks: Risk[];
  benefits: string[];
  progress: number;
  milestones: Milestone[];
}

export interface Risk {
  id: string;
  title: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  mitigation: string;
}

export interface Milestone {
  id: string;
  title: string;
  targetDate: string;
  status: 'planned' | 'in-progress' | 'completed' | 'delayed';
  deliverables: string[];
}

// Report Entity
export interface Report extends BaseEntity {
  type: 'process' | 'performance' | 'compliance' | 'analysis';
  format: 'pdf' | 'excel' | 'powerpoint' | 'dashboard';
  dataSource: string;
  parameters: Record<string, any>;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
    recipients: string[];
  };
  lastGenerated?: string;
}

// User Management
export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'analyst' | 'viewer' | 'editor';
  department: string;
  permissions: string[];
  lastLogin?: string;
  isActive: boolean;
}