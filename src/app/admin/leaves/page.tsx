import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ManageLeavesModal } from "@/components/manage-leaves-modal"; // Re-use modal trigger

export default function ManageLeavesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Manage Leaves</h1>
        <p className="text-muted-foreground">
          Review and process employee leave requests.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>Approve or reject pending leave applications.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex justify-start mb-4">
            <ManageLeavesModal />
          </div>
          <p className="text-muted-foreground">
            Click "Manage Leaves" to view and process leave requests. Full table will be displayed here in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
