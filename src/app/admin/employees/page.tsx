import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ManageEmployeesModal } from "@/components/manage-employees-modal"; // Re-use modal trigger for main page content for now

export default function ManageEmployeesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Manage Employees</h1>
        <p className="text-muted-foreground">
          Administer employee records, roles, and access.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>View, add, or edit employee information.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-start mb-4">
             {/* The modal itself will contain the table and forms */}
            <ManageEmployeesModal />
          </div>
          <p className="text-muted-foreground">
            Click "Manage Employees" to view the employee list and add new staff. Full table will be displayed here in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
