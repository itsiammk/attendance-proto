import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/layout/user-nav"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { BriefcaseIcon } from "@/components/icons"

export function AdminHeader() {
  // Placeholder data
  const companyCode = "ATTPRO123"

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-6 lg:px-8">
        <div className="mr-4 hidden md:flex">
           <SidebarTrigger className="md:hidden" />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <BriefcaseIcon className="h-4 w-4" />
            <span>Company Code: {companyCode}</span>
          </div>
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
