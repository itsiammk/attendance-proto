
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, CalendarDays, Clock, Loader2, Briefcase, User, ListChecks, MapPin } from "lucide-react";
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
      toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." });
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
      toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayStatusText = employeeActionStatus;
  const displayTimeText = lastActionDisplayTime;
  const displayLocationText = employeeActionStatus === "Checked In" ? "Main Office (GPS Mock)" : "N/A";

  const upcomingLeave = null; // or { type: "Annual Leave", dates: "Jul 20 - Jul 25" }

  return (
    <div className="space-y-6 sm:space-y-8"> 
      <div className="mb-6 sm:mb-8"> 
        <h1 className="text-2xl sm:text-3xl font-headline font-bold tracking-tight">Welcome, {employeeName}!</h1>
        <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
          Your attendance overview and quick actions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg lg:col-span-1">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl font-headline">Today's Status</CardTitle>
            <CardDescription className="text-sm sm:text-base mt-1">Your current check-in information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-muted/60 rounded-lg">
              <div>
                <p className="font-semibold text-base sm:text-lg">{displayStatusText}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{displayTimeText || "N/A"}</p>
              </div>
              {employeeActionStatus === "Checked In" ? (
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-500" />
              ) : employeeActionStatus === "Checked Out" ? (
                <XCircle className="h-8 w-8 sm:h-10 sm:w-10 text-red-500" />
              ) : (
                <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
              )}
            </div>
            <div className="flex items-center text-xs sm:text-sm text-muted-foreground pl-1 gap-1.5">
                <MapPin className="h-3.5 w-3.5"/> 
                <span>{displayLocationText}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
              <Button
                className="w-full text-sm sm:text-base py-2.5 h-10"
                onClick={handleCheckIn}
                disabled={employeeActionStatus === "Checked In" || isSubmitting}
              >
                {isSubmitting && employeeActionStatus !== "Checked In" ? <Loader2 className="animate-spin mr-2 h-4 w-4 sm:h-5 sm:w-5" /> : <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5"/>}
                Check In
              </Button>
              <Button
                variant="outline"
                className="w-full text-sm sm:text-base py-2.5 h-10"
                onClick={handleCheckOut}
                disabled={employeeActionStatus !== "Checked In" || isSubmitting}
              >
                {isSubmitting && employeeActionStatus === "Checked In" ? <Loader2 className="animate-spin mr-2 h-4 w-4 sm:h-5 sm:w-5" /> : <XCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5"/>}
                 Check Out
              </Button>
            </div>
             <Button variant="link" className="w-full px-1 justify-start text-xs sm:text-sm text-primary hover:underline h-auto py-1">View Full Day Log</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg lg:col-span-1">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle  className="text-lg sm:text-xl font-headline">Upcoming Leave</CardTitle>
             <CardDescription className="text-sm sm:text-base mt-1">Your approved time off.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-[calc(100%-98px)] justify-between p-4 sm:p-6"> 
            {upcomingLeave ? (
              <div className="p-3 sm:p-4 bg-muted/60 rounded-lg">
                <p className="font-semibold text-sm sm:text-base">{upcomingLeave.type}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{upcomingLeave.dates}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center grow py-4">
                <CalendarDays className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-2 sm:mb-3" />
                <p className="text-muted-foreground text-sm">No upcoming leaves scheduled.</p>
              </div>
            )}
            <Button variant="outline" className="w-full mt-auto text-sm sm:text-base py-2.5 h-10"> 
              <Briefcase className="mr-2 h-4 w-4 sm:h-5 sm:w-5"/> Apply for Leave
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg lg:col-span-1">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl font-headline">Quick Links</CardTitle>
            <CardDescription className="text-sm sm:text-base mt-1">Access common actions and information.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 sm:gap-3 pt-4 p-4 sm:p-6"> 
            <Button asChild variant="ghost" className="justify-start text-sm sm:text-base py-2.5 h-auto px-3">
                <Link href="/employee/attendance" className="flex items-center w-full"><ListChecks className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary"/> View My Attendance</Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start text-sm sm:text-base py-2.5 h-auto px-3">
                <Link href="/employee/leaves" className="flex items-center w-full"><Briefcase className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary"/> View My Leaves</Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start text-sm sm:text-base py-2.5 h-auto px-3">
                <Link href="/employee/profile" className="flex items-center w-full"><User className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary"/> Update My Profile</Link>
            </Button>
            <Button variant="ghost" className="justify-start text-sm sm:text-base py-2.5 h-auto px-3">
                <CalendarDays className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary"/> Company Holiday Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
