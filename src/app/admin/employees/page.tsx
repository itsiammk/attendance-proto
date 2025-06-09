import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ManageEmployeesModal } from "@/components/manage-employees-modal"; 

export default function ManageEmployeesPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-headline font-bold tracking-tight">Manage Employees</h1>
        <p className="text-muted-foreground">
          Administer employee records, roles, and access.
        </p>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Employee Directory</CardTitle>
          <CardDescription>View, add, or edit employee information using the modal below.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-start mb-6">
            <ManageEmployeesModal />
          </div>
          <div className="p-6 border rounded-lg text-center bg-muted/50">
            <p className="text-muted-foreground">
              Click "Manage Employees" to view the employee list and add new staff. 
              A full, filterable table will be displayed here in a future update.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
