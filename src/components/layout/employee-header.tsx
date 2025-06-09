
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/layout/user-nav"
// SidebarTrigger is intentionally removed from here as it's for desktop collapsing,
// mobile hamburger menu is handled by MobileEmployeeHeader

export function EmployeeHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-6 lg:px-8">
         {/* SidebarTrigger for desktop is part of EmployeeSidebar component structure via SidebarProvider */}
         {/* Forcing a div here to ensure flex layout behaves as expected if SidebarTrigger was here */}
        <div className="mr-4 hidden md:flex">
          {/* <SidebarTrigger className="md:hidden" /> This was originally for md:hidden but not used */}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
