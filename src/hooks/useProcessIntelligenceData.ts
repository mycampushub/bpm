import { useDataManager } from './useDataManager';
import { ProcessAnalysis } from '@/types/modules';

const initialAnalysisData: ProcessAnalysis[] = [
  {
    id: 'analysis_1',
    name: 'Customer Journey Performance Analysis',
    description: 'Analysis of customer journey bottlenecks and optimization opportunities',
    type: 'performance',
    processId: 'process_customer_journey',
    analysisData: {
      avgProcessTime: 12.5,
      bottleneckSteps: ['Document Verification', 'Manager Approval'],
      efficiency: 78
    },
    insights: [
      'Document verification step causes 40% of total delays',
      'Manager approval has 15% rejection rate requiring rework'
    ],
    recommendations: [
      'Implement automated document validation',
      'Create manager approval escalation workflow'
    ],
    metrics: {
      averageTime: 12.5,
      efficiency: 78,
      bottleneckCount: 2
    },
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-15T16:30:00Z',
    createdBy: 'Analytics Team',
    status: 'active'
  }
];

const validateAnalysis = (item: Partial<ProcessAnalysis>): string | null => {
  if (!item.name?.trim()) return 'Analysis name is required';
  if (!item.type) return 'Analysis type is required';
  if (!item.processId?.trim()) return 'Process ID is required';
  return null;
};

export const useProcessIntelligenceData = () => {
  return useDataManager<ProcessAnalysis>({
    storageKey: 'process_analysis',
    initialData: initialAnalysisData,
    validator: validateAnalysis
  });
};