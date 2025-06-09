
"use client";

import { Button } from "@/components/ui/button";
import { CompanyLogo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/layout/user-nav";
import { Menu } from "lucide-react";

interface MobileEmployeeHeaderProps {
  onMenuClick: () => void;
}

export function MobileEmployeeHeader({ onMenuClick }: MobileEmployeeHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
        <CompanyLogo className="h-7 w-7 text-primary" />
        <span className="font-headline text-lg font-semibold text-foreground">AttendancePro</span>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
