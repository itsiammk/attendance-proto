
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithPresets } from "@/components/ui/date-picker-with-presets";

export default function EmployeeLeavesPage() {
  return (
    <div className="space-y-8"> {/* Consistent spacing */}
      <div className="mb-8"> {/* Consistent spacing */}
        <h1 className="text-3xl font-headline font-bold tracking-tight">My Leaves</h1>
        <p className="text-muted-foreground">
          Manage your leave requests and view your leave balance.
        </p>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Apply for Leave</CardTitle>
          <CardDescription>Submit a new leave request for approval.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
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
              <DatePickerWithPresets id="leaveDates" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea id="reason" placeholder="Provide a brief reason for your leave (optional)" />
            </div>
            <div className="md:col-span-2 flex justify-end pt-2">
              <Button type="submit">Submit Request</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Leave History & Balance</CardTitle>
          <CardDescription>Your past leave requests and available leave days.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 border rounded-lg text-center bg-muted/50">
            <p className="text-muted-foreground">
                Your leave history and balance details will be displayed here (future feature).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    