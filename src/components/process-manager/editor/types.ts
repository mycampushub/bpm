
export interface BpmnElement {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  position: { x: number; y: number };
  properties?: any;
}

export interface BpmnConnection {
  id: string;
  source: string;
  target: string;
  sourceId: string;
  targetId: string;
  type: string;
  name?: string;
}

export interface ElementProperties {
  id: string;
  name: string;
  type: string;
  description?: string;
  documentation?: string;
  assignee?: string;
  dueDate?: string;
  implementation?: string;
  color: string;
  custom?: Record<string, any>;
}

export interface ElementPosition {
  x: number;
  y: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ValidationIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  element?: string;
  message: string;
  description?: string;
}
