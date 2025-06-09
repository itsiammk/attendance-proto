
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose, // Added DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, MessageSquare, CalendarClock } from "lucide-react" // Added CalendarClock
import { ScrollArea } from "@/components/ui/scroll-area" // Added ScrollArea

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
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white text-xs">Approved</Badge>;
      case "pending":
        return <Badge variant="secondary" className="text-xs">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="text-xs">Rejected</Badge>;
      default:
        return <Badge className="text-xs">{status}</Badge>;
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><CalendarClock className="mr-2 h-4 w-4"/> Manage Leaves</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[750px] lg:max-w-[900px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Manage Leave Requests</DialogTitle>
          <DialogDescription>
            Approve or reject employee leave requests.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2 flex-grow overflow-y-auto pr-2"> {/* Added pr-2 for scrollbar */}
          <div className="rounded-md border">
            <ScrollArea className="h-[250px] sm:h-[300px]"> {/* Added ScrollArea for table */}
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="py-2 px-2 sm:px-4">Employee</TableHead>
                    <TableHead className="py-2 px-2 sm:px-4">Dates</TableHead>
                    <TableHead className="py-2 px-2 sm:px-4 hidden md:table-cell">Reason</TableHead>
                    <TableHead className="py-2 px-2 sm:px-4">Status</TableHead>
                    <TableHead className="text-right py-2 px-2 sm:px-4">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leaveRequests.map((request) => (
                    <TableRow key={request.id}>
                        <TableCell className="py-2 px-2 sm:px-4 text-xs sm:text-sm font-medium">{request.employeeName || (request as any).name}</TableCell>
                        <TableCell className="py-2 px-2 sm:px-4 text-xs sm:text-sm">{request.startDate} to {request.endDate}</TableCell>
                        <TableCell className="py-2 px-2 sm:px-4 text-xs sm:text-sm max-w-[150px] truncate hidden md:table-cell">{request.reason}</TableCell>
                        <TableCell className="py-2 px-2 sm:px-4">{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="text-right py-2 px-2 sm:px-4">
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
            </ScrollArea>
          </div>
          
          <div className="space-y-3 p-1 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold px-3 pt-2 sm:px-4 sm:pt-3">Approve/Reject Comment</h3>
            <form className="space-y-3 sm:space-y-4 p-3 sm:p-4">
              <div>
                <Label htmlFor="comment">Comment (Optional)</Label>
                <Textarea id="comment" placeholder="Add a comment for the employee..." className="min-h-[60px] sm:min-h-[80px]"/>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                <Button type="submit" className="w-full sm:w-auto">Submit Comment</Button>
              </div>
            </form>
          </div>
        </div>
        <DialogFooter className="mt-auto pt-4 border-t"> {/* Ensure footer is at bottom */}
           <DialogClose asChild>
            <Button variant="outline">Close</Button>
           </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
