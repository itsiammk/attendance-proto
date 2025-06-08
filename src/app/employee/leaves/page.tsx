import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithPresets } from "@/components/ui/date-picker-with-presets"; // Assuming this can be adapted for single date or range

export default function EmployeeLeavesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">My Leaves</h1>
        <p className="text-muted-foreground">
          Manage your leave requests and view your leave balance.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Apply for Leave</CardTitle>
          <CardDescription>Submit a new leave request.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="leaveType">Leave Type</Label>
              <Select>
                <SelectTrigger id="leaveType">
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="leaveDates">Select Dates</Label>
              {/* This date picker might need adjustment for single day vs range */}
              <DatePickerWithPresets id="leaveDates" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea id="reason" placeholder="Provide a reason for your leave (optional)" />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">Submit Request</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leave History & Balance</CardTitle>
          <CardDescription>Your past leave requests and available leave days.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your leave history and balance details will be displayed here.
          </p>
          {/* Placeholder for leave history table and balance summary */}
        </CardContent>
      </Card>
    </div>
  );
}
