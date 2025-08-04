// Utility to add missing sourceHandle and targetHandle to all connections
export const fixDemoConnections = (demoProcesses: any[]) => {
  return demoProcesses.map(process => ({
    ...process,
    connections: process.connections.map((connection: any) => ({
      ...connection,
      sourceHandle: connection.sourceHandle ?? null,
      targetHandle: connection.targetHandle ?? null
    }))
  }));
};