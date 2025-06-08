
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, CalendarDays, Clock } from "lucide-react";

export default function EmployeeDashboardPage() {
  const employeeName = "Jane Doe"; // Placeholder

  const [employeeActionStatus, setEmployeeActionStatus] = useState<"Checked In" | "Checked Out" | "Not Checked In">("Not Checked In");
  const [lastActionDisplayTime, setLastActionDisplayTime] = useState<string | null>(null);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCheckIn = () => {
    setEmployeeActionStatus("Checked In");
    setLastActionDisplayTime(formatTime(new Date()));
  };

  const handleCheckOut = () => {
    setEmployeeActionStatus("Checked Out");
    setLastActionDisplayTime(formatTime(new Date()));
  };

  const displayStatusText = employeeActionStatus;
  const displayTimeText = lastActionDisplayTime;
  const displayLocationText = employeeActionStatus === "Checked In" ? "Main Office (GPS Verified - Mock)" : "N/A";

  const upcomingLeave = null; // or { type: "Annual Leave", dates: "Jul 20 - Jul 25" }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Welcome, {employeeName}!</h1>
        <p className="text-muted-foreground">
          Here's a quick overview of your attendance and upcoming events.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Today's Status</CardTitle>
            <CardDescription>Your current check-in information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-semibold text-lg">{displayStatusText}</p>
                <p className="text-sm text-muted-foreground">{displayTimeText || "N/A"}</p>
              </div>
              {employeeActionStatus === "Checked In" ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : employeeActionStatus === "Checked Out" ? (
                <XCircle className="h-8 w-8 text-red-500" />
              ) : (
                <Clock className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">{displayLocationText}</p>
            <div className="flex gap-2 pt-2">
              <Button
                className="w-full"
                onClick={handleCheckIn}
                disabled={employeeActionStatus === "Checked In"}
              >
                Check In
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleCheckOut}
                disabled={employeeActionStatus !== "Checked In"}
              >
                Check Out
              </Button>
            </div>
             <Button variant="link" className="w-full px-0 justify-start text-sm">View Full Day Log</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle  className="text-xl">Upcoming Leave</CardTitle>
             <CardDescription>Your approved time off.</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingLeave ? (
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold">{upcomingLeave.type}</p>
                <p className="text-sm text-muted-foreground">{upcomingLeave.dates}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <CalendarDays className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No upcoming leaves scheduled.</p>
              </div>
            )}
            <Button variant="outline" className="w-full mt-4">Apply for Leave</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Quick Links</CardTitle>
            <CardDescription>Access common actions.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start">View My Attendance Calendar</Button>
            <Button variant="ghost" className="justify-start">View My Leave History</Button>
            <Button variant="ghost" className="justify-start">Update My Profile</Button>
            <Button variant="ghost" className="justify-start">Company Holiday Calendar</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
