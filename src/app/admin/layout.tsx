
"use client";

import * as React from "react";
import { AdminHeader } from "@/components/layout/admin-header";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileAdminHeader } from "@/components/layout/mobile-admin-header";
import { MobileAdminNavSheet } from "@/components/layout/mobile-admin-nav-sheet";
import { PanelLeft } from "lucide-react"; // For loading state icon

export default function AdminLayout({
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
        <MobileAdminHeader onMenuClick={() => setMobileNavOpen(true)} />
        <MobileAdminNavSheet isOpen={mobileNavOpen} onOpenChange={setMobileNavOpen} />
        <main className="flex-1 p-4 pt-[calc(3.5rem+1rem)] sm:p-6 sm:pt-[calc(3.5rem+1.5rem)]"> {/* Adjust top padding for fixed mobile header */}
          {children}
        </main>
      </div>
    );
  }

  // Desktop layout
  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
