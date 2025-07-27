
export function getItemEducationalDescription(item: {
  name: string;
  type: string;
  owner: string;
  lastModified: string;
  status?: string;
}): string {
  const baseDesc = `${item.name}. This is a ${item.type.toUpperCase()} ${item.type === 'folder' ? 'for organizing process artifacts' : 'file'}. `;
  let typeDesc = '';
  
  switch (item.type) {
    case 'bpmn':
      typeDesc = "BPMN processes help visualize and standardize business workflows using industry-standard notation. These diagrams are essential for process optimization and automation initiatives.";
      break;
    case 'journey':
      typeDesc = "Journey maps document customer experiences across touchpoints, helping identify improvement opportunities. They reveal customer pain points and moments of delight throughout their interaction with your organization.";
      break;
    case 'dmn':
      typeDesc = "Decision models document business rules and decision logic for consistent organizational decision-making. They enable you to standardize complex decisions and automate rule-based processes.";
      break;
    case 'folder':
      typeDesc = "Folders help maintain an organized repository structure for efficient process management. Good organization is essential for process governance and knowledge sharing.";
      break;
    default:
      typeDesc = "Process documentation ensures knowledge sharing and standardization across the organization. Well-documented processes reduce training time and ensure consistent execution.";
  }
  
  return `${baseDesc}${typeDesc} Created by ${item.owner}, last modified ${item.lastModified}${item.status ? `. Current status: ${item.status}` : ''}.`;
}
