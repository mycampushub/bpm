
export interface ProcessTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  elements: any[];
  connections: any[];
  properties: {
    complexity: string;
    industry: string;
    compliance: string[];
  };
}

export const complexProcessTemplates: ProcessTemplate[] = [
  {
    id: 'customer-onboarding',
    name: 'Customer Onboarding Process',
    description: 'Comprehensive customer onboarding workflow with compliance checks',
    category: 'Customer Management',
    elements: [
      { id: 'start_1', type: 'start-event', name: 'New Customer', x: 100, y: 100, width: 36, height: 36 },
      { id: 'task_1', type: 'user-task', name: 'Collect Information', x: 200, y: 80, width: 100, height: 80 },
      { id: 'gateway_1', type: 'exclusive-gateway', name: 'Complete?', x: 350, y: 90, width: 50, height: 50 },
      { id: 'task_2', type: 'service-task', name: 'Validate Data', x: 450, y: 80, width: 100, height: 80 },
      { id: 'end_1', type: 'end-event', name: 'Customer Active', x: 600, y: 100, width: 36, height: 36 }
    ],
    connections: [
      { id: 'flow_1', source: 'start_1', target: 'task_1', type: 'sequence-flow' },
      { id: 'flow_2', source: 'task_1', target: 'gateway_1', type: 'sequence-flow' },
      { id: 'flow_3', source: 'gateway_1', target: 'task_2', type: 'sequence-flow' },
      { id: 'flow_4', source: 'task_2', target: 'end_1', type: 'sequence-flow' }
    ],
    properties: {
      complexity: 'Medium',
      industry: 'Financial Services',
      compliance: ['KYC', 'AML', 'GDPR']
    }
  },
  {
    id: 'order-fulfillment',
    name: 'Order Fulfillment Process',
    description: 'End-to-end order processing and fulfillment workflow',
    category: 'Operations',
    elements: [
      { id: 'start_2', type: 'start-event', name: 'Order Received', x: 100, y: 150, width: 36, height: 36 },
      { id: 'task_3', type: 'task', name: 'Process Payment', x: 200, y: 130, width: 100, height: 80 },
      { id: 'task_4', type: 'task', name: 'Prepare Shipment', x: 350, y: 130, width: 100, height: 80 },
      { id: 'end_2', type: 'end-event', name: 'Order Delivered', x: 500, y: 150, width: 36, height: 36 }
    ],
    connections: [
      { id: 'flow_5', source: 'start_2', target: 'task_3', type: 'sequence-flow' },
      { id: 'flow_6', source: 'task_3', target: 'task_4', type: 'sequence-flow' },
      { id: 'flow_7', source: 'task_4', target: 'end_2', type: 'sequence-flow' }
    ],
    properties: {
      complexity: 'Simple',
      industry: 'E-commerce',
      compliance: ['PCI-DSS']
    }
  }
];

export const generateBpmnXml = (template: ProcessTemplate): string => {
  const elementsXml = template.elements.map(el => {
    const type = el.type.replace('-', '');
    return `    <bpmn:${type} id="${el.id}" name="${el.name}" />`;
  }).join('\n');

  const connectionsXml = template.connections.map(conn => 
    `    <bpmn:sequenceFlow id="${conn.id}" sourceRef="${conn.source}" targetRef="${conn.target}" />`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false" name="${template.name}">
${elementsXml}
${connectionsXml}
  </bpmn:process>
</bpmn:definitions>`;
};
