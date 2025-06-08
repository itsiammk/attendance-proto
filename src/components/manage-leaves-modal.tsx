"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, MessageSquare } from "lucide-react"

// Placeholder data
const leaveRequests = [
  { id: "1", employeeName: "Alice Wonderland", startDate: "2024-07-15", endDate: "2024-07-17", reason: "Vacation", status: "Pending" },
  { id: "2", employeeName: "Bob The Builder", startDate: "2024-07-20", endDate: "2024-07-20", reason: "Sick Leave", status: "Approved" },
  { id: "3", employeeName: "Charlie Brown", startDate: "2024-08-01", endDate: "2024-08-02", reason: "Personal", status: "Rejected" },
];

export function ManageLeavesModal() {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white">Approved</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Manage Leaves</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Manage Leave Requests</DialogTitle>
          <DialogDescription>
            Approve or reject employee leave requests.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.employeeName}</TableCell>
                    <TableCell>{request.startDate} to {request.endDate}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell className="text-right">
                      {request.status === "Pending" && (
                        <>
                          <Button variant="ghost" size="icon" className="mr-1 text-green-600 hover:text-green-700">
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="mr-1 text-red-600 hover:text-red-700">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                       <Button variant="ghost" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="space-y-4 p-1 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold px-4 pt-3">Approve/Reject Comment</h3>
            <form className="space-y-4 p-4">
              <div>
                <Label htmlFor="comment">Comment (Optional)</Label>
                <Textarea id="comment" placeholder="Add a comment for the employee..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Submit Comment</Button>
              </div>
            </form>
          </div>
        </div>
        <DialogFooter>
           <Button variant="outline" onClick={() => { /* Close dialog */ }}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
