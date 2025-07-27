
export class BpmnExporter {
  static exportToBpmn20Xml(elements: any[], connections: any[], processName: string = 'Business Process'): string {
    const elementsXml = elements.map(el => {
      const type = el.type.replace('-', '');
      return `    <bpmn:${type} id="${el.id}" name="${el.name}" />`;
    }).join('\n');

    const connectionsXml = connections.map(conn => 
      `    <bpmn:sequenceFlow id="${conn.id}" sourceRef="${conn.source}" targetRef="${conn.target}" />`
    ).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false" name="${processName}">
${elementsXml}
${connectionsXml}
  </bpmn:process>
</bpmn:definitions>`;
  }

  static exportToJson(elements: any[], connections: any[]): string {
    return JSON.stringify({
      elements,
      connections,
      metadata: {
        version: "1.0",
        exported: new Date().toISOString()
      }
    }, null, 2);
  }
}
