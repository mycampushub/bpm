
import { BpmnElement, BpmnConnection } from '../types';

export class BpmnExporter {
  static exportToBpmn20Xml(elements: BpmnElement[], connections: BpmnConnection[], processName: string = 'Business Process'): string {
    const processId = 'Process_' + Date.now();
    
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                  id="Definitions_${processId}"
                  targetNamespace="http://bpmn.io/schema/bpmn">`;

    const processElements = elements.map(el => this.elementToXml(el)).join('\n    ');
    const processConnections = connections.map(conn => this.connectionToXml(conn)).join('\n    ');

    const processXml = `
  <bpmn:process id="${processId}" name="${processName}" isExecutable="false">
    ${processElements}
    ${processConnections}
  </bpmn:process>`;

    const diagramElements = elements.map(el => this.elementToDiagram(el)).join('\n      ');
    const diagramConnections = connections.map(conn => this.connectionToDiagram(conn, elements)).join('\n      ');

    const diagramXml = `
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="${processId}">
      ${diagramElements}
      ${diagramConnections}
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>`;

    return `${xmlHeader}${processXml}${diagramXml}
</bpmn:definitions>`;
  }

  static exportToJson(elements: BpmnElement[], connections: BpmnConnection[]): string {
    const exportData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      process: {
        elements: elements.map(el => ({
          id: el.id,
          name: el.name,
          type: el.type,
          position: { x: el.x, y: el.y },
          size: { width: el.width || 100, height: el.height || 50 },
          properties: el.properties || {}
        })),
        connections: connections.map(conn => ({
          id: conn.id,
          name: conn.name || '',
          type: conn.type,
          source: conn.source,
          target: conn.target
        }))
      },
      metadata: {
        elementsCount: elements.length,
        connectionsCount: connections.length,
        complexity: this.calculateComplexity(elements, connections)
      }
    };

    return JSON.stringify(exportData, null, 2);
  }

  private static elementToXml(element: BpmnElement): string {
    const commonAttrs = `id="${element.id}" name="${element.name}"`;
    
    switch (element.type) {
      case 'start-event':
        return `<bpmn:startEvent ${commonAttrs}>
      ${this.getOutgoingFlows(element.id)}
    </bpmn:startEvent>`;
      
      case 'end-event':
        return `<bpmn:endEvent ${commonAttrs}>
      ${this.getIncomingFlows(element.id)}
    </bpmn:endEvent>`;
      
      case 'task':
        return `<bpmn:task ${commonAttrs}>
      ${this.getIncomingFlows(element.id)}
      ${this.getOutgoingFlows(element.id)}
    </bpmn:task>`;
      
      case 'user-task':
        return `<bpmn:userTask ${commonAttrs}>
      ${this.getIncomingFlows(element.id)}
      ${this.getOutgoingFlows(element.id)}
    </bpmn:userTask>`;
      
      case 'service-task':
        return `<bpmn:serviceTask ${commonAttrs}>
      ${this.getIncomingFlows(element.id)}
      ${this.getOutgoingFlows(element.id)}
    </bpmn:serviceTask>`;
      
      case 'exclusive-gateway':
        return `<bpmn:exclusiveGateway ${commonAttrs}>
      ${this.getIncomingFlows(element.id)}
      ${this.getOutgoingFlows(element.id)}
    </bpmn:exclusiveGateway>`;
      
      case 'parallel-gateway':
        return `<bpmn:parallelGateway ${commonAttrs}>
      ${this.getIncomingFlows(element.id)}
      ${this.getOutgoingFlows(element.id)}
    </bpmn:parallelGateway>`;
      
      default:
        return `<bpmn:task ${commonAttrs}>
      ${this.getIncomingFlows(element.id)}
      ${this.getOutgoingFlows(element.id)}
    </bpmn:task>`;
    }
  }

  private static connectionToXml(connection: BpmnConnection): string {
    return `<bpmn:sequenceFlow id="${connection.id}" name="${connection.name || ''}" sourceRef="${connection.source}" targetRef="${connection.target}" />`;
  }

  private static elementToDiagram(element: BpmnElement): string {
    return `<bpmndi:BPMNShape id="${element.id}_di" bpmnElement="${element.id}">
        <dc:Bounds x="${element.x}" y="${element.y}" width="${element.width || 100}" height="${element.height || 50}" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>`;
  }

  private static connectionToDiagram(connection: BpmnConnection, elements: BpmnElement[]): string {
    const sourceElement = elements.find(el => el.id === connection.source);
    const targetElement = elements.find(el => el.id === connection.target);
    
    if (!sourceElement || !targetElement) return '';
    
    const sourceX = sourceElement.x + (sourceElement.width || 100) / 2;
    const sourceY = sourceElement.y + (sourceElement.height || 50) / 2;
    const targetX = targetElement.x + (targetElement.width || 100) / 2;
    const targetY = targetElement.y + (targetElement.height || 50) / 2;
    
    return `<bpmndi:BPMNEdge id="${connection.id}_di" bpmnElement="${connection.id}">
        <di:waypoint x="${sourceX}" y="${sourceY}" />
        <di:waypoint x="${targetX}" y="${targetY}" />
      </bpmndi:BPMNEdge>`;
  }

  private static getIncomingFlows(elementId: string): string {
    // This would be populated with actual incoming flows in a real implementation
    return '';
  }

  private static getOutgoingFlows(elementId: string): string {
    // This would be populated with actual outgoing flows in a real implementation
    return '';
  }

  private static calculateComplexity(elements: BpmnElement[], connections: BpmnConnection[]): 'low' | 'medium' | 'high' {
    const totalItems = elements.length + connections.length;
    if (totalItems <= 10) return 'low';
    if (totalItems <= 25) return 'medium';
    return 'high';
  }
}
