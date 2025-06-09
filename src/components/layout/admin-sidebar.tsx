
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CalendarDays, LogOut, Users, Briefcase, Settings } from "lucide-react"
import { CompanyLogo } from "@/components/icons"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/admin/attendance/dashboard", label: "Attendance Dashboard", icon: BarChart3 },
  { href: "/admin/attendance/daily", label: "Daily Attendance", icon: CalendarDays },
  { href: "/admin/employees", label: "Manage Employees", icon: Users },
  { href: "/admin/leaves", label: "Manage Leaves", icon: Briefcase },
  { href: "/admin/settings", label: "Company Settings", icon: Settings },

];

export function AdminSidebar() {
  const pathname = usePathname();
  const companyName = "AttendancePro"; // Placeholder
  const adminName = "Admin User";
  const adminInitials = adminName.split(" ").map(n => n[0]).join("");

  return (
    <Sidebar variant="sidebar" collapsible="icon" side="left">
      <SidebarHeader>
        <div className="flex items-center gap-2.5 p-3">
          <CompanyLogo className="h-9 w-9 text-primary shrink-0" />
          <span className="font-headline text-xl font-semibold group-data-[collapsible=icon]:hidden">{companyName}</span>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:sr-only">Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <div className="flex flex-col items-start gap-2 p-2">
          <div className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-sidebar-accent/80 transition-colors">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://placehold.co/40x40.png?text=AU" alt={adminName} data-ai-hint="admin avatar" />
              <AvatarFallback>{adminInitials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-medium">{adminName}</span>
              <span className="text-xs text-muted-foreground">Administrator</span>
            </div>
          </div>
           <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-auto hover:bg-sidebar-accent/80">
            <LogOut className="mr-2 h-4 w-4 group-data-[collapsible=icon]:mr-0" />
            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
