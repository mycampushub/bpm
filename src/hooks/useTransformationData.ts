import { useDataManager } from './useDataManager';
import { TransformationInitiative } from '@/types/modules';

const initialTransformationData: TransformationInitiative[] = [
  {
    id: 'transform_1',
    name: 'Digital Process Automation Initiative',
    description: 'Enterprise-wide initiative to automate manual processes and improve efficiency',
    type: 'digital',
    scope: 'Enterprise-wide',
    objectives: [
      'Reduce manual processing time by 60%',
      'Improve process accuracy to 99.5%',
      'Reduce operational costs by 25%'
    ],
    timeline: '18 months',
    budget: 2500000,
    risks: [
      {
        id: 'risk_1',
        title: 'Staff resistance to change',
        probability: 'medium',
        impact: 'high',
        mitigation: 'Comprehensive change management and training program'
      }
    ],
    benefits: [
      'Reduced processing time',
      'Improved accuracy',
      'Cost savings',
      'Better customer experience'
    ],
    progress: 35,
    milestones: [
      {
        id: 'milestone_1',
        title: 'Process Assessment Complete',
        targetDate: '2024-03-31T17:00:00Z',
        status: 'completed',
        deliverables: ['Current state analysis', 'Gap assessment']
      },
      {
        id: 'milestone_2',
        title: 'Automation Platform Selection',
        targetDate: '2024-06-30T17:00:00Z',
        status: 'in-progress',
        deliverables: ['Platform evaluation', 'Vendor selection']
      }
    ],
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    createdBy: 'Transformation Office',
    status: 'active'
  }
];

const validateTransformation = (item: Partial<TransformationInitiative>): string | null => {
  if (!item.name?.trim()) return 'Initiative name is required';
  if (!item.type) return 'Initiative type is required';
  if (!item.scope?.trim()) return 'Scope is required';
  return null;
};

export const useTransformationData = () => {
  return useDataManager<TransformationInitiative>({
    storageKey: 'transformation_initiatives',
    initialData: initialTransformationData,
    validator: validateTransformation
  });
};