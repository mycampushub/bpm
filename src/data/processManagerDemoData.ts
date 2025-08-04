import { fixDemoConnections } from '../utils/demoDataFixer';

const rawDemoProcesses = [
  {
    id: "demo-simple-1",
    name: "Simple Purchase Request",
    category: "Easy",
    complexity: "Basic",
    description: "A straightforward purchase request approval process",
    status: "active",
    version: "1.0",
    lastModified: new Date().toISOString(),
    elements: [
      {
        id: "start-simple-1",
        type: "startEvent",
        name: "Purchase Request Submitted",
        x: 100,
        y: 150,
        width: 36,
        height: 36,
        position: { x: 100, y: 150 },
        data: { label: "Start", type: "start" }
      },
      {
        id: "task-simple-1",
        type: "task",
        name: "Review Request",
        x: 200,
        y: 130,
        width: 100,
        height: 80,
        position: { x: 200, y: 130 },
        data: { label: "Review Request", type: "user", assignee: "Manager" }
      },
      {
        id: "task-simple-2",
        type: "task",
        name: "Approve Purchase",
        x: 350,
        y: 130,
        width: 100,
        height: 80,
        position: { x: 350, y: 130 },
        data: { label: "Approve Purchase", type: "user", assignee: "Finance" }
      },
      {
        id: "end-simple-1",
        type: "endEvent",
        name: "Purchase Approved",
        x: 500,
        y: 150,
        width: 36,
        height: 36,
        position: { x: 500, y: 150 },
        data: { label: "End", type: "end" }
      }
    ],
    connections: [
      {
        id: "flow-simple-1",
        source: "start-simple-1",
        target: "task-simple-1",
        sourceId: "start-simple-1",
        targetId: "task-simple-1",
        sourceHandle: null,
        targetHandle: null,
        type: "smoothstep"
      },
      {
        id: "flow-simple-2",
        source: "task-simple-1",
        target: "task-simple-2",
        sourceId: "task-simple-1",
        targetId: "task-simple-2",
        sourceHandle: null,
        targetHandle: null,
        type: "smoothstep"
      },
      {
        id: "flow-simple-3",
        source: "task-simple-2",
        target: "end-simple-1",
        sourceId: "task-simple-2",
        targetId: "end-simple-1",
        sourceHandle: null,
        targetHandle: null,
        type: "smoothstep"
      }
    ]
  },
  {
    id: "demo-easy-1",
    name: "Employee Leave Request",
    category: "Easy",
    complexity: "Basic",
    description: "Simple employee leave approval workflow",
    status: "active",
    version: "1.0",
    lastModified: new Date().toISOString(),
    elements: [
      {
        id: "start-easy-1",
        type: "startEvent",
        name: "Leave Request",
        x: 80,
        y: 180,
        width: 36,
        height: 36,
        position: { x: 80, y: 180 },
        data: { label: "Request Submitted", type: "start" }
      },
      {
        id: "task-easy-1",
        type: "task",
        name: "Manager Review",
        x: 180,
        y: 160,
        width: 100,
        height: 80,
        position: { x: 180, y: 160 },
        data: { label: "Manager Review", type: "user", assignee: "Direct Manager" }
      },
      {
        id: "gateway-easy-1",
        type: "gateway",
        name: "Approved?",
        x: 330,
        y: 175,
        width: 50,
        height: 50,
        position: { x: 330, y: 175 },
        data: { label: "Approved?", gatewayType: "exclusive" }
      },
      {
        id: "task-easy-2",
        type: "task",
        name: "Update Calendar",
        x: 430,
        y: 120,
        width: 100,
        height: 80,
        position: { x: 430, y: 120 },
        data: { label: "Update Calendar", type: "service", automated: true }
      },
      {
        id: "task-easy-3",
        type: "task",
        name: "Notify Rejection",
        x: 430,
        y: 240,
        width: 100,
        height: 80,
        position: { x: 430, y: 240 },
        data: { label: "Notify Rejection", type: "user", assignee: "HR" }
      },
      {
        id: "end-easy-1",
        type: "endEvent",
        name: "Process Complete",
        x: 580,
        y: 180,
        width: 36,
        height: 36,
        position: { x: 580, y: 180 },
        data: { label: "Complete", type: "end" }
      }
    ],
    connections: [
      {
        id: "flow-easy-1",
        source: "start-easy-1",
        target: "task-easy-1",
        sourceId: "start-easy-1",
        targetId: "task-easy-1",
        sourceHandle: null,
        targetHandle: null,
        type: "smoothstep"
      },
      {
        id: "flow-easy-2",
        source: "task-easy-1",
        target: "gateway-easy-1",
        sourceId: "task-easy-1",
        targetId: "gateway-easy-1",
        sourceHandle: null,
        targetHandle: null,
        type: "smoothstep"
      },
      {
        id: "flow-easy-3",
        source: "gateway-easy-1",
        target: "task-easy-2",
        sourceId: "gateway-easy-1",
        targetId: "task-easy-2",
        sourceHandle: null,
        targetHandle: null,
        type: "smoothstep",
        label: "Yes"
      },
      {
        id: "flow-easy-4",
        source: "gateway-easy-1",
        target: "task-easy-3",
        sourceId: "gateway-easy-1",
        targetId: "task-easy-3",
        sourceHandle: null,
        targetHandle: null,
        type: "smoothstep",
        label: "No"
      },
      {
        id: "flow-easy-5",
        source: "task-easy-2",
        target: "end-easy-1",
        sourceId: "task-easy-2",
        targetId: "end-easy-1",
        sourceHandle: null,
        targetHandle: null,
        type: "smoothstep"
      },
      {
        id: "flow-easy-6",
        source: "task-easy-3",
        target: "end-easy-1",
        sourceId: "task-easy-3",
        targetId: "end-easy-1",
        sourceHandle: null,
        targetHandle: null,
        type: "smoothstep"
      }
    ]
  },
  {
    id: "demo-complex-1",
    name: "Customer Onboarding Process",
    category: "Hard",
    complexity: "Advanced",
    description: "Comprehensive customer onboarding with compliance checks",
    status: "active",
    version: "2.1",
    lastModified: new Date().toISOString(),
    elements: [
      {
        id: "start-complex-1",
        type: "startEvent",
        name: "Customer Registration",
        x: 50,
        y: 200,
        width: 36,
        height: 36,
        position: { x: 50, y: 200 },
        data: { label: "Registration Started", type: "start" }
      },
      {
        id: "task-complex-1",
        type: "task",
        name: "Collect Customer Data",
        x: 150,
        y: 180,
        width: 120,
        height: 80,
        position: { x: 150, y: 180 },
        data: { label: "Collect Customer Data", type: "user", assignee: "Sales Team" }
      },
      {
        id: "task-complex-2",
        type: "task",
        name: "Verify Identity",
        x: 320,
        y: 120,
        width: 120,
        height: 80,
        position: { x: 320, y: 120 },
        data: { label: "Verify Identity", type: "service", service: "IdentityService" }
      },
      {
        id: "task-complex-3",
        type: "task",
        name: "Credit Check",
        x: 320,
        y: 240,
        width: 120,
        height: 80,
        position: { x: 320, y: 240 },
        data: { label: "Credit Check", type: "service", service: "CreditService" }
      },
      {
        id: "gateway-complex-1",
        type: "gateway",
        name: "Parallel Check",
        x: 290,
        y: 190,
        width: 50,
        height: 50,
        position: { x: 290, y: 190 },
        data: { label: "Parallel Gateway", gatewayType: "parallel" }
      },
      {
        id: "gateway-complex-2",
        type: "gateway",
        name: "Join Results",
        x: 490,
        y: 190,
        width: 50,
        height: 50,
        position: { x: 490, y: 190 },
        data: { label: "Join Gateway", gatewayType: "parallel" }
      },
      {
        id: "gateway-complex-3",
        type: "gateway",
        name: "All Checks Pass?",
        x: 590,
        y: 190,
        width: 50,
        height: 50,
        position: { x: 590, y: 190 },
        data: { label: "Checks Pass?", gatewayType: "exclusive" }
      },
      {
        id: "task-complex-4",
        type: "task",
        name: "Create Account",
        x: 690,
        y: 130,
        width: 120,
        height: 80,
        position: { x: 690, y: 130 },
        data: { label: "Create Account", type: "service", service: "AccountService" }
      },
      {
        id: "task-complex-5",
        type: "task",
        name: "Send Welcome Package",
        x: 860,
        y: 130,
        width: 120,
        height: 80,
        position: { x: 860, y: 130 },
        data: { label: "Send Welcome Package", type: "user", assignee: "Customer Success" }
      },
      {
        id: "task-complex-6",
        type: "task",
        name: "Request Additional Docs",
        x: 690,
        y: 270,
        width: 120,
        height: 80,
        position: { x: 690, y: 270 },
        data: { label: "Request Additional Docs", type: "user", assignee: "Compliance Team" }
      },
      {
        id: "end-complex-1",
        type: "endEvent",
        name: "Customer Onboarded",
        x: 1030,
        y: 200,
        width: 36,
        height: 36,
        position: { x: 1030, y: 200 },
        data: { label: "Onboarding Complete", type: "end" }
      },
      {
        id: "end-complex-2",
        type: "endEvent",
        name: "Onboarding Failed",
        x: 870,
        y: 290,
        width: 36,
        height: 36,
        position: { x: 870, y: 290 },
        data: { label: "Onboarding Failed", type: "end" }
      }
    ],
    connections: [
      {
        id: "flow-complex-1",
        source: "start-complex-1",
        target: "task-complex-1",
        sourceId: "start-complex-1",
        targetId: "task-complex-1",
        sourceHandle: null,
        targetHandle: null,
        type: "smoothstep"
      },
      {
        id: "flow-complex-2",
        source: "task-complex-1",
        target: "gateway-complex-1",
        sourceId: "task-complex-1",
        targetId: "gateway-complex-1",
        sourceHandle: null,
        targetHandle: null,
        type: "smoothstep"
      },
      {
        id: "flow-complex-3",
        source: "gateway-complex-1",
        target: "task-complex-2",
        sourceId: "gateway-complex-1",
        targetId: "task-complex-2",
        type: "smoothstep"
      },
      {
        id: "flow-complex-4",
        source: "gateway-complex-1",
        target: "task-complex-3",
        sourceId: "gateway-complex-1",
        targetId: "task-complex-3",
        type: "smoothstep"
      },
      {
        id: "flow-complex-5",
        source: "task-complex-2",
        target: "gateway-complex-2",
        sourceId: "task-complex-2",
        targetId: "gateway-complex-2",
        type: "smoothstep"
      },
      {
        id: "flow-complex-6",
        source: "task-complex-3",
        target: "gateway-complex-2",
        sourceId: "task-complex-3",
        targetId: "gateway-complex-2",
        type: "smoothstep"
      },
      {
        id: "flow-complex-7",
        source: "gateway-complex-2",
        target: "gateway-complex-3",
        sourceId: "gateway-complex-2",
        targetId: "gateway-complex-3",
        type: "smoothstep"
      },
      {
        id: "flow-complex-8",
        source: "gateway-complex-3",
        target: "task-complex-4",
        sourceId: "gateway-complex-3",
        targetId: "task-complex-4",
        type: "smoothstep",
        label: "Pass"
      },
      {
        id: "flow-complex-9",
        source: "gateway-complex-3",
        target: "task-complex-6",
        sourceId: "gateway-complex-3",
        targetId: "task-complex-6",
        type: "smoothstep",
        label: "Fail"
      },
      {
        id: "flow-complex-10",
        source: "task-complex-4",
        target: "task-complex-5",
        sourceId: "task-complex-4",
        targetId: "task-complex-5",
        type: "smoothstep"
      },
      {
        id: "flow-complex-11",
        source: "task-complex-5",
        target: "end-complex-1",
        sourceId: "task-complex-5",
        targetId: "end-complex-1",
        type: "smoothstep"
      },
      {
        id: "flow-complex-12",
        source: "task-complex-6",
        target: "end-complex-2",
        sourceId: "task-complex-6",
        targetId: "end-complex-2",
        type: "smoothstep"
      }
    ]
  },
  {
    id: "demo-complex-2",
    name: "Order Fulfillment Process",
    category: "Hard",
    complexity: "Advanced",
    description: "Complete order processing with inventory and payment",
    status: "active",
    version: "3.0",
    lastModified: new Date().toISOString(),
    elements: [
      {
        id: "start-order-1",
        type: "startEvent",
        name: "Order Received",
        x: 60,
        y: 250,
        width: 36,
        height: 36,
        position: { x: 60, y: 250 },
        data: { label: "Order Received", type: "start" }
      },
      {
        id: "task-order-1",
        type: "task",
        name: "Validate Order",
        x: 150,
        y: 230,
        width: 120,
        height: 80,
        position: { x: 150, y: 230 },
        data: { label: "Validate Order", type: "service", service: "OrderService" }
      },
      {
        id: "gateway-order-1",
        type: "gateway",
        name: "Order Valid?",
        x: 320,
        y: 245,
        width: 50,
        height: 50,
        position: { x: 320, y: 245 },
        data: { label: "Order Valid?", gatewayType: "exclusive" }
      },
      {
        id: "subprocess-order-1",
        type: "subprocess",
        name: "Process Payment",
        x: 420,
        y: 180,
        width: 140,
        height: 90,
        position: { x: 420, y: 180 },
        data: { label: "Process Payment", type: "subprocess" }
      },
      {
        id: "subprocess-order-2",
        type: "subprocess",
        name: "Check Inventory",
        x: 420,
        y: 300,
        width: 140,
        height: 90,
        position: { x: 420, y: 300 },
        data: { label: "Check Inventory", type: "subprocess" }
      },
      {
        id: "gateway-order-2",
        type: "gateway",
        name: "Parallel Processing",
        x: 390,
        y: 245,
        width: 50,
        height: 50,
        position: { x: 390, y: 245 },
        data: { label: "Parallel Gateway", gatewayType: "parallel" }
      },
      {
        id: "gateway-order-3",
        type: "gateway",
        name: "Join Processing",
        x: 610,
        y: 245,
        width: 50,
        height: 50,
        position: { x: 610, y: 245 },
        data: { label: "Join Gateway", gatewayType: "parallel" }
      },
      {
        id: "task-order-2",
        type: "task",
        name: "Ship Order",
        x: 710,
        y: 230,
        width: 120,
        height: 80,
        position: { x: 710, y: 230 },
        data: { label: "Ship Order", type: "user", assignee: "Warehouse" }
      },
      {
        id: "task-order-3",
        type: "task",
        name: "Send Notification",
        x: 880,
        y: 230,
        width: 120,
        height: 80,
        position: { x: 880, y: 230 },
        data: { label: "Send Notification", type: "service", service: "NotificationService" }
      },
      {
        id: "end-order-1",
        type: "endEvent",
        name: "Order Complete",
        x: 1050,
        y: 250,
        width: 36,
        height: 36,
        position: { x: 1050, y: 250 },
        data: { label: "Order Complete", type: "end" }
      },
      {
        id: "task-order-4",
        type: "task",
        name: "Reject Order",
        x: 320,
        y: 380,
        width: 120,
        height: 80,
        position: { x: 320, y: 380 },
        data: { label: "Reject Order", type: "user", assignee: "Customer Service" }
      },
      {
        id: "end-order-2",
        type: "endEvent",
        name: "Order Rejected",
        x: 490,
        y: 400,
        width: 36,
        height: 36,
        position: { x: 490, y: 400 },
        data: { label: "Order Rejected", type: "end" }
      }
    ],
    connections: [
      {
        id: "flow-order-1",
        source: "start-order-1",
        target: "task-order-1",
        sourceId: "start-order-1",
        targetId: "task-order-1",
        sourceHandle: null,
        targetHandle: null,
        type: "smoothstep"
      },
      {
        id: "flow-order-2",
        source: "task-order-1",
        target: "gateway-order-1",
        sourceId: "task-order-1",
        targetId: "gateway-order-1",
        sourceHandle: null,
        targetHandle: null,
        type: "smoothstep"
      },
      {
        id: "flow-order-3",
        source: "gateway-order-1",
        target: "gateway-order-2",
        sourceId: "gateway-order-1",
        targetId: "gateway-order-2",
        type: "smoothstep",
        label: "Valid"
      },
      {
        id: "flow-order-4",
        source: "gateway-order-1",
        target: "task-order-4",
        sourceId: "gateway-order-1",
        targetId: "task-order-4",
        type: "smoothstep",
        label: "Invalid"
      },
      {
        id: "flow-order-5",
        source: "gateway-order-2",
        target: "subprocess-order-1",
        sourceId: "gateway-order-2",
        targetId: "subprocess-order-1",
        type: "smoothstep"
      },
      {
        id: "flow-order-6",
        source: "gateway-order-2",
        target: "subprocess-order-2",
        sourceId: "gateway-order-2",
        targetId: "subprocess-order-2",
        type: "smoothstep"
      },
      {
        id: "flow-order-7",
        source: "subprocess-order-1",
        target: "gateway-order-3",
        sourceId: "subprocess-order-1",
        targetId: "gateway-order-3",
        type: "smoothstep"
      },
      {
        id: "flow-order-8",
        source: "subprocess-order-2",
        target: "gateway-order-3",
        sourceId: "subprocess-order-2",
        targetId: "gateway-order-3",
        type: "smoothstep"
      },
      {
        id: "flow-order-9",
        source: "gateway-order-3",
        target: "task-order-2",
        sourceId: "gateway-order-3",
        targetId: "task-order-2",
        type: "smoothstep"
      },
      {
        id: "flow-order-10",
        source: "task-order-2",
        target: "task-order-3",
        sourceId: "task-order-2",
        targetId: "task-order-3",
        type: "smoothstep"
      },
      {
        id: "flow-order-11",
        source: "task-order-3",
        target: "end-order-1",
        sourceId: "task-order-3",
        targetId: "end-order-1",
        type: "smoothstep"
      },
      {
        id: "flow-order-12",
        source: "task-order-4",
        target: "end-order-2",
        sourceId: "task-order-4",
        targetId: "end-order-2",
        type: "smoothstep"
      }
    ]
  }
];

export const demoProcesses = fixDemoConnections(rawDemoProcesses);