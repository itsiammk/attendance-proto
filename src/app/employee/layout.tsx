
"use client";

import * as React from "react";
import { EmployeeHeader } from "@/components/layout/employee-header";
import { EmployeeSidebar } from "@/components/layout/employee-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileEmployeeHeader } from "@/components/layout/mobile-employee-header";
import { MobileEmployeeNavSheet } from "@/components/layout/mobile-employee-nav-sheet";
import { PanelLeft } from "lucide-react"; // For loading state icon

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  // Handle loading state for useIsMobile
  if (isMobile === undefined) {
     return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
        <PanelLeft className="h-10 w-10 animate-pulse text-primary" />
        <p className="mt-2 text-muted-foreground">Loading layout...</p>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-background">
        <MobileEmployeeHeader onMenuClick={() => setMobileNavOpen(true)} />
        <MobileEmployeeNavSheet isOpen={mobileNavOpen} onOpenChange={setMobileNavOpen} />
         <main className="flex-1 p-4 pt-[calc(3.5rem+1rem)] sm:p-6 sm:pt-[calc(3.5rem+1.5rem)]"> {/* Adjust top padding for fixed mobile header */}
          {children}
        </main>
      </div>
    );
  }

  // Desktop layout
  return (
    <SidebarProvider defaultOpen={true}>
      <EmployeeSidebar />
      <SidebarInset>
        <EmployeeHeader />
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
