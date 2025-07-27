
export function getEducationalContent(type: string): string {
  switch (type) {
    case "bpmn":
      return "This BPMN diagram represents a business process workflow. BPMN is a standardized modeling notation that helps teams visualize, document, and improve their business processes.";
    case "journey":
      return "This customer journey map visualizes the customer experience across different touchpoints. Understanding the customer journey helps identify opportunities for improvement and innovation.";
    case "dmn":
      return "This decision model documents business rules and decision logic. DMN helps organizations maintain consistent decision-making and automate business rules.";
    case "folder":
      return "This folder organizes related process artifacts. Good organization is key to maintaining a clear and efficient process repository.";
    default:
      return "This document contains important process documentation. Clear documentation helps ensure process knowledge is preserved and shared effectively.";
  }
}
