"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, MessageSquare, CalendarClock } from "lucide-react"

// Placeholder data
const leaveRequests = [
  { id: "1", employeeName: "Alice Wonderland", startDate: "2024-07-15", endDate: "2024-07-17", reason: "Vacation with family for an extended period to visit relatives overseas.", status: "Pending" },
  { id: "2", employeeName: "Bob The Builder", startDate: "2024-07-20", endDate: "2024-07-20", reason: "Sick Leave - Flu", status: "Approved" },
  { id: "3", employeeName: "Charlie Brown", startDate: "2024-08-01", endDate: "2024-08-02", reason: "Personal appointment", status: "Rejected" },
  { id: "4", name: "Diana Prince", startDate: "2024-08-05", endDate: "2024-08-10", reason: "Annual Leave for much needed rest and relaxation.", status: "Pending" },
  { id: "5", name: "Edward Scissorhands", startDate: "2024-08-12", endDate: "2024-08-12", reason: "Medical Checkup", status: "Approved" },
];

export function ManageLeavesModal() {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white text-xs py-0.5 px-2">Approved</Badge>;
      case "pending":
        return <Badge variant="secondary" className="text-xs py-0.5 px-2">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="text-xs py-0.5 px-2">Rejected</Badge>;
      default:
        return <Badge className="text-xs py-0.5 px-2">{status}</Badge>;
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10"><CalendarClock className="mr-2 h-4 w-4"/> Manage Leaves</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl sm:text-2xl">Manage Leave Requests</DialogTitle>
          <DialogDescription className="text-sm sm:text-base mt-1">
            Approve or reject employee leave requests.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto py-4 px-6 space-y-4">
          <div className="rounded-md border overflow-hidden"> {/* Added overflow-hidden here */}
            <div className="overflow-x-auto"> {/* This div handles horizontal scrolling */}
              <Table> {/* Table relies on TH min-widths to expand */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="py-2.5 px-3 sm:px-4 min-w-[150px] sticky top-0 bg-background z-10">Employee</TableHead>
                    <TableHead className="py-2.5 px-3 sm:px-4 min-w-[180px] sticky top-0 bg-background z-10">Dates</TableHead>
                    <TableHead className="py-2.5 px-3 sm:px-4 min-w-[200px] sticky top-0 bg-background z-10">Reason</TableHead>
                    <TableHead className="py-2.5 px-3 sm:px-4 min-w-[100px] sticky top-0 bg-background z-10">Status</TableHead>
                    <TableHead className="text-right py-2.5 px-3 sm:px-4 min-w-[120px] sticky top-0 bg-background z-10">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium whitespace-nowrap">{request.employeeName || (request as any).name}</TableCell>
                      <TableCell className="py-2 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap">{request.startDate} to {request.endDate}</TableCell>
                      <TableCell className="py-2 px-3 sm:px-4 text-xs sm:text-sm max-w-[150px] sm:max-w-[200px] truncate">{request.reason}</TableCell>
                      <TableCell className="py-2 px-3 sm:px-4">{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right py-2 px-3 sm:px-4">
                        {request.status === "Pending" && (
                          <>
                            <Button variant="ghost" size="icon" className="mr-1 text-green-600 hover:text-green-700 h-7 w-7 sm:h-8 sm:w-8">
                              <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="mr-1 text-red-600 hover:text-red-700 h-7 w-7 sm:h-8 sm:w-8">
                              <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
                          <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="space-y-3 p-4 rounded-lg border shadow-sm bg-muted/30">
            <h3 className="text-lg font-semibold">Approve/Reject Comment</h3>
            <form className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="comment">Comment (Optional)</Label>
                <Textarea id="comment" placeholder="Add a comment for the employee..." className="min-h-[70px] sm:min-h-[80px]"/>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-1">
                <Button variant="outline" className="w-full sm:w-auto h-9">Cancel</Button>
                <Button type="submit" className="w-full sm:w-auto h-9">Submit Comment</Button>
              </div>
            </form>
          </div>
        </div>
        <DialogFooter className="mt-auto p-6 pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline" className="h-9">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
