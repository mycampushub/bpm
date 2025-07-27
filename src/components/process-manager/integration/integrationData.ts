
export interface IntegrationSystem {
  id: string;
  name: string;
  type: "sap" | "database" | "api" | "workflow" | "other";
  status: "connected" | "disconnected" | "pending";
  lastSync?: string;
  description?: string;
  icon?: string;
}

export const integrations: IntegrationSystem[] = [
  {
    id: "sap-s4",
    name: "SAP S/4HANA",
    type: "sap",
    status: "connected",
    lastSync: "Today at 09:15 AM",
    description: "Core ERP integration for business processes"
  },
  {
    id: "workflow-engine",
    name: "Process Workflow Engine",
    type: "workflow",
    status: "connected",
    lastSync: "Yesterday at 3:22 PM",
    description: "Automates workflow processes across systems"
  },
  {
    id: "oracle-db",
    name: "Oracle Database",
    type: "database",
    status: "disconnected",
    description: "Enterprise database connection"
  },
  {
    id: "rest-api",
    name: "External REST API",
    type: "api",
    status: "pending",
    description: "External service integration via REST"
  },
  {
    id: "sap-bw",
    name: "SAP BW/4HANA",
    type: "sap",
    status: "connected",
    lastSync: "Today at 11:30 AM",
    description: "Data warehouse integration"
  }
];
