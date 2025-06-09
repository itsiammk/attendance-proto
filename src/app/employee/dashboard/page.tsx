
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, CalendarDays, Clock, Loader2, Briefcase, User, ListChecks } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { recordCheckIn, recordCheckOut } from "@/app/employee/actions";
import Link from "next/link";

type AttendanceStatus = "Checked In" | "Checked Out" | "Not Checked In";

export default function EmployeeDashboardPage() {
  const employeeName = "Jane Doe"; // Placeholder
  const { toast } = useToast();

  const [employeeActionStatus, setEmployeeActionStatus] = useState<AttendanceStatus>("Not Checked In");
  const [lastActionDisplayTime, setLastActionDisplayTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const storedStatus = localStorage.getItem('employeeAttendanceStatus') as AttendanceStatus | null;
    const storedTimestamp = localStorage.getItem('employeeLastActionTimestamp');

    if (storedStatus) {
      setEmployeeActionStatus(storedStatus);
    }
    if (storedTimestamp) {
      try {
        const dateObj = new Date(storedTimestamp);
        if (!isNaN(dateObj.getTime())) {
          setLastActionDisplayTime(formatTime(dateObj));
        } else {
          localStorage.removeItem('employeeLastActionTimestamp');
        }
      } catch (error) {
        console.error("Error parsing stored timestamp:", error);
        localStorage.removeItem('employeeLastActionTimestamp');
      }
    }
  }, []);

  const handleCheckIn = async () => {
    setIsSubmitting(true);
    try {
      const result = await recordCheckIn();
      if (result.success && result.timestamp) {
        const currentTime = new Date(result.timestamp);
        setEmployeeActionStatus("Checked In");
        setLastActionDisplayTime(formatTime(currentTime));
        localStorage.setItem('employeeAttendanceStatus', "Checked In");
        localStorage.setItem('employeeLastActionTimestamp', currentTime.toISOString());
        toast({ title: "Success", description: "Successfully checked in." });
      } else {
        toast({ variant: "destructive", title: "Error", description: result.message || "Failed to check in." });
      }
    } catch (error) {
      console.error("Check-in error:", error);
      toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred during check-in." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckOut = async () => {
    setIsSubmitting(true);
    try {
      const result = await recordCheckOut();
      if (result.success && result.timestamp) {
        const currentTime = new Date(result.timestamp);
        setEmployeeActionStatus("Checked Out");
        setLastActionDisplayTime(formatTime(currentTime));
        localStorage.setItem('employeeAttendanceStatus', "Checked Out");
        localStorage.setItem('employeeLastActionTimestamp', currentTime.toISOString());
        toast({ title: "Success", description: "Successfully checked out." });
      } else {
        toast({ variant: "destructive", title: "Error", description: result.message || "Failed to check out." });
      }
    } catch (error) {
      console.error("Check-out error:", error);
      toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred during check-out." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayStatusText = employeeActionStatus;
  const displayTimeText = lastActionDisplayTime;
  const displayLocationText = employeeActionStatus === "Checked In" ? "Main Office (GPS Verified - Mock)" : "N/A";

  const upcomingLeave = null; // or { type: "Annual Leave", dates: "Jul 20 - Jul 25" }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-headline font-bold tracking-tight">Welcome, {employeeName}!</h1>
        <p className="text-muted-foreground">
          Here's a quick overview of your attendance and upcoming events.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-headline">Today's Status</CardTitle>
            <CardDescription>Your current check-in information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/60 rounded-lg">
              <div>
                <p className="font-semibold text-lg">{displayStatusText}</p>
                <p className="text-sm text-muted-foreground">{displayTimeText || "N/A"}</p>
              </div>
              {employeeActionStatus === "Checked In" ? (
                <CheckCircle className="h-10 w-10 text-green-500" />
              ) : employeeActionStatus === "Checked Out" ? (
                <XCircle className="h-10 w-10 text-red-500" />
              ) : (
                <Clock className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <p className="text-xs text-muted-foreground pl-1">{displayLocationText}</p>
            <div className="flex gap-3 pt-2">
              <Button
                className="w-full text-base py-2.5"
                onClick={handleCheckIn}
                disabled={employeeActionStatus === "Checked In" || isSubmitting}
              >
                {isSubmitting && employeeActionStatus !== "Checked In" ? <Loader2 className="animate-spin mr-2" /> : <CheckCircle className="mr-2 h-5 w-5"/>}
                Check In
              </Button>
              <Button
                variant="outline"
                className="w-full text-base py-2.5"
                onClick={handleCheckOut}
                disabled={employeeActionStatus !== "Checked In" || isSubmitting}
              >
                {isSubmitting && employeeActionStatus === "Checked In" ? <Loader2 className="animate-spin mr-2" /> : <XCircle className="mr-2 h-5 w-5"/>}
                 Check Out
              </Button>
            </div>
             <Button variant="link" className="w-full px-1 justify-start text-sm text-primary hover:underline">View Full Day Log</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle  className="text-xl font-headline">Upcoming Leave</CardTitle>
             <CardDescription>Your approved time off.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-[calc(100%-76px)] justify-between"> {/* Adjust height based on header */}
            {upcomingLeave ? (
              <div className="p-4 bg-muted/60 rounded-lg">
                <p className="font-semibold">{upcomingLeave.type}</p>
                <p className="text-sm text-muted-foreground">{upcomingLeave.dates}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center grow">
                <CalendarDays className="h-12 w-12 text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No upcoming leaves scheduled.</p>
              </div>
            )}
            <Button variant="outline" className="w-full mt-4 text-base py-2.5">
              <Briefcase className="mr-2 h-5 w-5"/> Apply for Leave
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-headline">Quick Links</CardTitle>
            <CardDescription>Access common actions and information.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start text-base py-2.5 h-auto" asChild>
                <Link href="/employee/attendance"><ListChecks className="mr-2 h-5 w-5 text-primary"/> View My Attendance</Link>
            </Button>
            <Button variant="ghost" className="justify-start text-base py-2.5 h-auto" asChild>
                <Link href="/employee/leaves"><Briefcase className="mr-2 h-5 w-5 text-primary"/> View My Leaves</Link>
            </Button>
            <Button variant="ghost" className="justify-start text-base py-2.5 h-auto" asChild>
                <Link href="/employee/profile"><User className="mr-2 h-5 w-5 text-primary"/> Update My Profile</Link>
            </Button>
            <Button variant="ghost" className="justify-start text-base py-2.5 h-auto">
                <CalendarDays className="mr-2 h-5 w-5 text-primary"/> Company Holiday Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
