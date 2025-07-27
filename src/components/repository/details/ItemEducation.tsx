
export const getEducationalContent = (type: string): string => {
  const educational = {
    process: "Processes define step-by-step workflows that guide how work gets done in your organization. They help ensure consistency, compliance, and efficiency across your operations.",
    model: "Models represent structured frameworks or templates that can be reused across different scenarios. They provide standardized approaches to common business challenges.",
    template: "Templates are pre-built starting points that accelerate process creation. They contain best practices and can be customized for your specific needs.",
    framework: "Frameworks provide comprehensive methodologies and guidelines for complex business initiatives. They offer structured approaches to governance and compliance.",
    document: "Documents contain important reference materials, specifications, and documentation that support your processes and provide context for stakeholders."
  };

  return educational[type as keyof typeof educational] || "This item contains important business information that supports your process management activities.";
};
