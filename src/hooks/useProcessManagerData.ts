
import { useProcessTemplates } from "./process-manager/useProcessTemplates";
import { useProcessProjects } from "./process-manager/useProcessProjects";
import { useProcessOperations } from "./process-manager/useProcessOperations";
import { useProcessMetrics } from "./process-manager/useProcessMetrics";

export type { ProcessTemplate } from "./process-manager/useProcessTemplates";
export type { ProcessProject } from "./process-manager/useProcessProjects";
export type { ValidationResult } from "./process-manager/useProcessOperations";
export type { ProcessMetric } from "./process-manager/useProcessMetrics";

export const useProcessManagerData = () => {
  const templateHooks = useProcessTemplates();
  const projectHooks = useProcessProjects();
  const operationHooks = useProcessOperations();
  const metricHooks = useProcessMetrics();

  return {
    // Template operations
    ...templateHooks,
    
    // Project operations
    ...projectHooks,
    
    // Process operations
    ...operationHooks,
    
    // Metrics
    ...metricHooks
  };
};
