import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ManageLeavesModal } from "@/components/manage-leaves-modal"; 

export default function ManageLeavesPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-headline font-bold tracking-tight">Manage Leaves</h1>
        <p className="text-muted-foreground">
          Review and process employee leave requests.
        </p>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Leave Requests</CardTitle>
          <CardDescription>Approve or reject pending leave applications using the modal below.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex justify-start mb-6">
            <ManageLeavesModal />
          </div>
          <div className="p-6 border rounded-lg text-center bg-muted/50">
            <p className="text-muted-foreground">
                Click "Manage Leaves" to view and process leave requests. 
                A full, filterable table of requests will be displayed here in a future update.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
