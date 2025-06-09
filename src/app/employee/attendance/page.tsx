
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar"; 
import { useState, useEffect } from "react";

export default function EmployeeAttendancePage() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [todayDate, setTodayDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const now = new Date();
    setSelectedDay(now);
    setTodayDate(now);
  }, []);

  const disabledDays = (date: Date): boolean => {
    if (!todayDate) {
      return true;
    }
    return date < new Date("2024-01-01") || date > todayDate;
  };

  if (!selectedDay || !todayDate) {
    return (
      <div className="space-y-8"> {/* Consistent spacing */}
        <div className="mb-8"> {/* Consistent spacing */}
          <h1 className="text-3xl font-headline font-bold tracking-tight">My Attendance</h1>
          <p className="text-muted-foreground">
            View your daily and monthly attendance records.
          </p>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Attendance Calendar</CardTitle>
            <CardDescription>Your attendance log for the month. Click a date to see details (future feature).</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-4 sm:p-6">
            <div className="rounded-md border shadow-sm w-full max-w-md h-[350px] flex items-center justify-center bg-muted/50 animate-pulse">
                <p className="text-muted-foreground">Loading calendar...</p>
            </div>
          </CardContent>
        </Card>
         <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Detailed Log</CardTitle>
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

  return (
    <div className="space-y-8"> {/* Consistent spacing */}
      <div className="mb-8"> {/* Consistent spacing */}
        <h1 className="text-3xl font-headline font-bold tracking-tight">My Attendance</h1>
        <p className="text-muted-foreground">
          View your daily and monthly attendance records.
        </p>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Attendance Calendar</CardTitle>
          <CardDescription>Your attendance log for the month. Click a date to see details (future feature).</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-4 sm:p-6">
          <Calendar
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            className="rounded-md border shadow-sm w-full max-w-md"
            disabled={disabledDays} 
          />
        </CardContent>
      </Card>
       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Detailed Log</CardTitle>
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

    