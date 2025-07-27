
import React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  className?: string;
  fullHeight?: boolean;
}

export function MainLayout({ 
  children, 
  pageTitle, 
  className,
  fullHeight = false
}: MainLayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      
      {/* Main content area that adjusts to sidebar */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header pageTitle={pageTitle} />
        
        <main className={cn(
          "flex-1 overflow-hidden",
          fullHeight ? "h-full" : "min-h-0",
          isMobile ? "p-3" : fullHeight ? "p-0" : "p-6",
          className
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}
