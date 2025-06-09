
"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CompanyLogo } from "@/components/icons";
import { BarChart3, CalendarDays, Users, Briefcase, Settings, LogOut, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const navItems = [
  { href: "/admin/attendance/dashboard", label: "Attendance Dashboard", icon: BarChart3 },
  { href: "/admin/attendance/daily", label: "Daily Attendance", icon: CalendarDays },
  { href: "/admin/employees", label: "Manage Employees", icon: Users },
  { href: "/admin/leaves", label: "Manage Leaves", icon: Briefcase },
  { href: "/admin/settings", label: "Company Settings", icon: Settings },
];

interface MobileAdminNavSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function MobileAdminNavSheet({ isOpen, onOpenChange }: MobileAdminNavSheetProps) {
  const pathname = usePathname();
  const companyName = "AttendancePro"; // Placeholder
  const adminName = "Admin User";
  const adminInitials = adminName.split(" ").map(n => n[0]).join("");

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0 sm:w-80">
        <SheetHeader className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CompanyLogo className="h-7 w-7 text-primary" />
              <SheetTitle className="text-lg font-headline">{companyName}</SheetTitle>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-140px)]"> {/* Adjust height considering header and footer */}
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <SheetClose asChild key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <Button
                    variant={pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href)) ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2 text-base"
                    onClick={() => onOpenChange(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              </SheetClose>
            ))}
          </nav>
        </ScrollArea>
        <Separator />
         <div className="p-4 border-t">
            <div className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-muted transition-colors mb-2">
                <Avatar className="h-10 w-10">
                <AvatarImage src="https://placehold.co/40x40.png?text=AU" alt={adminName} data-ai-hint="admin avatar mobile" />
                <AvatarFallback>{adminInitials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                <span className="text-sm font-medium">{adminName}</span>
                <span className="text-xs text-muted-foreground">Administrator</span>
                </div>
            </div>
            <SheetClose asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 text-base text-red-600 hover:text-red-700 hover:bg-red-500/10">
                    <LogOut className="h-5 w-5" />
                    Logout
                </Button>
            </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
