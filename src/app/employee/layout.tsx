import { EmployeeHeader } from "@/components/layout/employee-header";
import { EmployeeSidebar } from "@/components/layout/employee-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
