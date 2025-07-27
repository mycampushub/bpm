
export interface ElementType {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  voiceGuidance: string;
}

export const elementCategories = {
  "Events": [
    { id: 'start-event', name: 'Start Event', category: 'Events', icon: '●', description: 'Triggers the start of a process', voiceGuidance: 'Use this to begin your process flow' },
    { id: 'end-event', name: 'End Event', category: 'Events', icon: '◉', description: 'Marks the end of a process', voiceGuidance: 'Use this to complete your process flow' },
    { id: 'intermediate-event', name: 'Intermediate Event', category: 'Events', icon: '◐', description: 'Occurs during process execution', voiceGuidance: 'Use this for events that happen during the process' }
  ],
  "Tasks": [
    { id: 'task', name: 'Task', category: 'Tasks', icon: '□', description: 'A general work activity', voiceGuidance: 'Use this for general work activities' },
    { id: 'user-task', name: 'User Task', category: 'Tasks', icon: '👤', description: 'A task performed by a user', voiceGuidance: 'Use this for tasks that require human interaction' },
    { id: 'service-task', name: 'Service Task', category: 'Tasks', icon: '⚙️', description: 'An automated task', voiceGuidance: 'Use this for automated system tasks' }
  ],
  "Gateways": [
    { id: 'exclusive-gateway', name: 'Exclusive Gateway', category: 'Gateways', icon: '◇', description: 'Exclusive decision point', voiceGuidance: 'Use this for either-or decisions' },
    { id: 'parallel-gateway', name: 'Parallel Gateway', category: 'Gateways', icon: '✚', description: 'Parallel execution point', voiceGuidance: 'Use this to split or join parallel flows' }
  ],
  "Containers": [
    { id: 'subprocess', name: 'Subprocess', category: 'Containers', icon: '⊞', description: 'A collapsed subprocess', voiceGuidance: 'Use this to group related activities' }
  ],
  "Data": [
    { id: 'data-object', name: 'Data Object', category: 'Data', icon: '📄', description: 'Represents data in the process', voiceGuidance: 'Use this to represent data or documents' }
  ],
  "Participants": [
    { id: 'pool', name: 'Pool', category: 'Participants', icon: '🏊', description: 'Represents a participant', voiceGuidance: 'Use this to represent different organizations or departments' }
  ]
};

export const connectorTypes = [
  { id: 'sequence-flow', name: 'Sequence Flow', description: 'Normal flow between activities', icon: '→' },
  { id: 'message-flow', name: 'Message Flow', description: 'Communication between participants', icon: '✉️' }
];
