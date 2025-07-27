
import { useState, useEffect } from "react";

export const useSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Listen for sidebar state changes
    const handleSidebarToggle = (event: CustomEvent) => {
      setIsCollapsed(event.detail.collapsed);
    };

    window.addEventListener('sidebar-toggle', handleSidebarToggle as EventListener);
    
    return () => {
      window.removeEventListener('sidebar-toggle', handleSidebarToggle as EventListener);
    };
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    
    // Dispatch event for other components to listen
    window.dispatchEvent(new CustomEvent('sidebar-toggle', { 
      detail: { collapsed: newState } 
    }));
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return {
    isCollapsed,
    isMobileOpen,
    toggleSidebar,
    toggleMobileSidebar
  };
};
