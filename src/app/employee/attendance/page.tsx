
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar"; 
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function EmployeeAttendancePage() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [todayDate, setTodayDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const now = new Date();
    setSelectedDay(now);
    setTodayDate(now);
    setIsLoading(false);
  }, []);

  const disabledDays = (date: Date): boolean => {
    if (!todayDate) {
      return true; 
    }
    const firstDayOfYear = new Date(todayDate.getFullYear(), 0, 1);
    return date < firstDayOfYear || date > todayDate;
  };

  if (isLoading) {
    return (
      <div className="space-y-6 sm:space-y-8"> 
        <div className="mb-6 sm:mb-8"> 
          <h1 className="text-2xl sm:text-3xl font-headline font-bold tracking-tight">My Attendance</h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
            View your daily and monthly attendance records.
          </p>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="font-headline text-xl sm:text-2xl">Attendance Calendar</CardTitle>
            <CardDescription className="text-sm sm:text-base mt-1">Your attendance log for the month.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-4 sm:p-6 min-h-[300px]">
            <div className="rounded-md border shadow-sm w-full h-full flex items-center justify-center bg-muted/30">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground ml-3">Loading calendar...</p>
            </div>
          </CardContent>
        </Card>
         <Card className="shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="font-headline text-xl sm:text-2xl">Detailed Log</CardTitle>
            <CardDescription className="text-sm sm:text-base mt-1">Recent check-in and check-out times.</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="p-6 border rounded-lg text-center bg-muted/30 min-h-[100px] flex items-center justify-center">
              <p className="text-muted-foreground">Detailed daily logs will appear here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8"> 
      <div className="mb-6 sm:mb-8"> 
        <h1 className="text-2xl sm:text-3xl font-headline font-bold tracking-tight">My Attendance</h1>
        <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
          View your daily and monthly attendance records.
        </p>
      </div>
      <Card className="shadow-lg">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="font-headline text-xl sm:text-2xl">Attendance Calendar</CardTitle>
          <CardDescription className="text-sm sm:text-base mt-1">Your attendance log for the month. Click a date to see details (future feature).</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-2 sm:p-4 md:p-6">
          <Calendar
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            className="rounded-md border shadow-sm w-full" 
            numberOfMonths={1} 
            disabled={disabledDays} 
          />
        </CardContent>
      </Card>
       <Card className="shadow-lg">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="font-headline text-xl sm:text-2xl">Detailed Log</CardTitle>
          <CardDescription className="text-sm sm:text-base mt-1">Recent check-in and check-out times for selected dates.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="p-6 border rounded-lg text-center bg-muted/30 min-h-[100px] flex items-center justify-center">
            <p className="text-muted-foreground">Detailed daily logs will appear here when a date is selected (future feature).</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
