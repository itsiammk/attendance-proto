import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar"; 

export default function EmployeeAttendancePage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-headline font-bold tracking-tight">My Attendance</h1>
        <p className="text-muted-foreground">
          View your daily and monthly attendance records.
        </p>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Attendance Calendar</CardTitle>
          <CardDescription>Your attendance log for the month. Click a date to see details (future feature).</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-4 sm:p-6">
          <Calendar
            mode="single"
            selected={new Date()}
            className="rounded-md border shadow-sm w-full max-w-md"
            disabled={(date) => date < new Date("2024-01-01") || date > new Date()} 
          />
        </CardContent>
      </Card>
       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Detailed Log</CardTitle>
          <CardDescription>Recent check-in and check-out times for selected dates.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 border rounded-lg text-center bg-muted/50">
            <p className="text-muted-foreground">Detailed daily logs will appear here when a date is selected from the calendar above (future feature).</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
