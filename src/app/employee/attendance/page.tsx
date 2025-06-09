
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
    // Allow selecting dates up to the current date within the current year for demo
    const firstDayOfYear = new Date(todayDate.getFullYear(), 0, 1);
    return date < firstDayOfYear || date > todayDate;
  };

  if (!selectedDay || !todayDate) {
    return (
      <div className="space-y-8"> 
        <div className="mb-8"> 
          <h1 className="text-2xl sm:text-3xl font-headline font-bold tracking-tight">My Attendance</h1>
          <p className="text-muted-foreground">
            View your daily and monthly attendance records.
          </p>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Attendance Calendar</CardTitle>
            <CardDescription>Your attendance log for the month.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-4 sm:p-6">
            <div className="rounded-md border shadow-sm w-full h-[350px] flex items-center justify-center bg-muted/50 animate-pulse">
                <p className="text-muted-foreground">Loading calendar...</p>
            </div>
          </CardContent>
        </Card>
         <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Detailed Log</CardTitle>
            <CardDescription>Recent check-in and check-out times.</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="p-6 border rounded-lg text-center bg-muted/50">
              <p className="text-muted-foreground">Detailed daily logs will appear here (future feature).</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8"> 
      <div className="mb-8"> 
        <h1 className="text-2xl sm:text-3xl font-headline font-bold tracking-tight">My Attendance</h1>
        <p className="text-muted-foreground">
          View your daily and monthly attendance records.
        </p>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Attendance Calendar</CardTitle>
          <CardDescription>Your attendance log for the month. Click a date to see details (future feature).</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-2 sm:p-4 md:p-6">
          <Calendar
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            className="rounded-md border shadow-sm w-full" 
            numberOfMonths={1} // Ensure only one month shows on mobile for better fit
            disabled={disabledDays} 
          />
        </CardContent>
      </Card>
       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Detailed Log</CardTitle>
          <CardDescription>Recent check-in and check-out times for selected dates.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="p-6 border rounded-lg text-center bg-muted/50">
            <p className="text-muted-foreground">Detailed daily logs will appear here when a date is selected (future feature).</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
