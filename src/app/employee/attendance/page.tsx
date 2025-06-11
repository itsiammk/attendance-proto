
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { getEmployeeAttendanceHistory } from "@/app/employee/actions";
import { Loader2, CheckCircle, XCircle, Clock, Plane, Briefcase, CalendarDays, BarChartHorizontalBig, UserCheck } from "lucide-react";
import { format, parse, isValid } from "date-fns";

interface CareerSummary {
  totalPresent: number;
  totalAbsent: number;
  totalHalfDay: number;
  totalLeave: number;
  totalWorkingDays: number;
  averageWorkHours: string;
}

interface MonthlyAttendanceRecord {
  month: string;
  year: number;
  present: number;
  absent: number;
  halfDay: number;
  leave: number;
  holidays: number;
  weekOffs: number;
  totalWorkableDays: number;
  actualWorkDays: number;
  averageHoursPerDay?: string;
}

interface EmployeeAttendanceHistory {
  employeeId: string;
  employeeName: string;
  careerSummary: CareerSummary;
  monthlyRecords: MonthlyAttendanceRecord[];
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ElementType; colorClass: string; unit?: string }> = ({ title, value, icon: Icon, colorClass, unit }) => (
  <Card className={`shadow-md ${colorClass} bg-opacity-10 dark:${colorClass} dark:bg-opacity-20 border-0`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4">
      <CardTitle className={`text-xs sm:text-sm font-medium ${colorClass}`}>{title}</CardTitle>
      <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${colorClass}`} />
    </CardHeader>
    <CardContent className="p-3 sm:p-4 pt-0">
      <div className={`text-lg sm:text-xl font-bold ${colorClass}`}>
        {value}
        {unit && <span className="text-xs sm:text-sm font-normal ml-1">{unit}</span>}
      </div>
    </CardContent>
  </Card>
);


export default function EmployeeAttendancePage() {
  const [attendanceHistory, setAttendanceHistory] = useState<EmployeeAttendanceHistory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | undefined>(new Date());
  
  const [todayDate, setTodayDate] = useState<Date | undefined>(undefined);
   useEffect(() => {
    const now = new Date();
    setTodayDate(now);
  }, []);

  const disabledCalendarDays = (date: Date): boolean => {
    if (!todayDate) {
      return true; 
    }
    const firstDayOfYear = new Date(todayDate.getFullYear(), 0, 1);
    return date < firstDayOfYear || date > todayDate;
  };


  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const history = await getEmployeeAttendanceHistory();
      setAttendanceHistory(history);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground text-lg">Loading your attendance records...</p>
      </div>
    );
  }

  if (!attendanceHistory) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-4 text-center">
        <UserCheck className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">No Attendance Data</h2>
        <p className="text-muted-foreground">We couldn't find any attendance records for you.</p>
      </div>
    );
  }

  const { careerSummary, monthlyRecords, employeeName } = attendanceHistory;

  const summaryItems = [
    { title: "Total Present", value: careerSummary.totalPresent, icon: CheckCircle, colorClass: "text-green-500", unit: "days" },
    { title: "Total Absent", value: careerSummary.totalAbsent, icon: XCircle, colorClass: "text-red-500", unit: "days" },
    { title: "Total Half-Days", value: careerSummary.totalHalfDay, icon: Clock, colorClass: "text-yellow-500", unit: "days" },
    { title: "Total On Leave", value: careerSummary.totalLeave, icon: Plane, colorClass: "text-purple-500", unit: "days" },
    { title: "Total Work Days", value: careerSummary.totalWorkingDays, icon: Briefcase, colorClass: "text-blue-500", unit: "days" },
    { title: "Avg. Work Hours", value: careerSummary.averageWorkHours, icon: BarChartHorizontalBig, colorClass: "text-indigo-500", unit: "/ day" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-headline font-bold tracking-tight">My Attendance Record</h1>
        <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
          Hello {employeeName}, here's an overview of your attendance.
        </p>
      </div>

      <Card className="shadow-lg">
        <Accordion type="single" collapsible className="w-full" defaultValue="lifetime-summary-section">
          <AccordionItem value="lifetime-summary-section" className="border-none">
            <AccordionTrigger className="w-full hover:no-underline p-0 text-left">
              <CardHeader className="flex flex-row justify-between items-center w-full p-4 sm:p-6">
                <div>
                  <CardTitle className="text-xl sm:text-2xl font-headline">Lifetime Summary</CardTitle>
                  <CardDescription className="text-sm sm:text-base mt-1">Your overall attendance statistics.</CardDescription>
                </div>
              </CardHeader>
            </AccordionTrigger>
            <AccordionContent className="p-0">
              <div className="p-4 sm:p-6 pt-0 border-t">
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {summaryItems.map(item => (
                    <StatCard key={item.title} title={item.title} value={item.value} icon={item.icon} colorClass={item.colorClass} unit={item.unit}/>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <Card className="shadow-lg lg:col-span-2">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-headline">Monthly Breakdown</CardTitle>
            <CardDescription className="text-sm sm:text-base mt-1">Your attendance summary for each month.</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            {monthlyRecords.length > 0 ? (
              <Accordion type="single" collapsible className="w-full space-y-3">
                {monthlyRecords.map((record, index) => {
                  const progressPercentage = record.totalWorkableDays > 0 ? (record.actualWorkDays / record.totalWorkableDays) * 100 : 0;
                  const monthDate = parse(`${record.month} ${record.year}`, "MMMM yyyy", new Date());
                  const monthLabel = isValid(monthDate) ? format(monthDate, "MMMM yyyy") : `${record.month} ${record.year}`;

                  return (
                    <AccordionItem value={`month-${index}`} key={index} className="border bg-card rounded-lg shadow-md data-[state=open]:shadow-xl transition-shadow">
                      <AccordionTrigger className="text-sm sm:text-base px-4 py-3 hover:no-underline hover:bg-muted/50 rounded-t-lg">
                        <div className="flex items-center justify-between w-full">
                           <span className="font-medium">{monthLabel}</span>
                           <Badge variant={progressPercentage >= 80 ? "default" : "secondary"} className={progressPercentage >= 95 ? "bg-green-500 hover:bg-green-600" : (progressPercentage < 80 ? "bg-yellow-500 hover:bg-yellow-600" : "")}>
                            {record.actualWorkDays}/{record.totalWorkableDays} days
                           </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-0">
                        <div className="border-t p-4 space-y-3">
                          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3">
                            <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                              <CheckCircle className="h-4 w-4 text-green-500"/>
                              <span className="text-xs sm:text-sm">Present: <span className="font-semibold">{record.present}</span></span>
                            </div>
                             <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                              <XCircle className="h-4 w-4 text-red-500"/>
                              <span className="text-xs sm:text-sm">Absent: <span className="font-semibold">{record.absent}</span></span>
                            </div>
                             <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                              <Clock className="h-4 w-4 text-yellow-500"/>
                              <span className="text-xs sm:text-sm">Half-Days: <span className="font-semibold">{record.halfDay}</span></span>
                            </div>
                             <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                              <Plane className="h-4 w-4 text-purple-500"/>
                              <span className="text-xs sm:text-sm">On Leave: <span className="font-semibold">{record.leave}</span></span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                              <Briefcase className="h-4 w-4 text-blue-500"/>
                              <span className="text-xs sm:text-sm">Holidays: <span className="font-semibold">{record.holidays}</span></span>
                            </div>
                             <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                              <CalendarDays className="h-4 w-4 text-gray-500"/>
                              <span className="text-xs sm:text-sm">Week Offs: <span className="font-semibold">{record.weekOffs}</span></span>
                            </div>
                          </div>
                          <div className="pt-1">
                            <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-1">
                                <span>Work Day Progress</span>
                                <span>{record.actualWorkDays.toFixed(1)} / {record.totalWorkableDays} days</span>
                            </div>
                            <Progress value={progressPercentage} className="h-2.5" />
                            {record.averageHoursPerDay && (
                                <p className="text-xs text-muted-foreground mt-2 text-right">Avg. {record.averageHoursPerDay} / day</p>
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            ) : (
              <div className="p-6 border rounded-lg text-center bg-muted/30 min-h-[150px] flex items-center justify-center">
                 <p className="text-muted-foreground">No monthly records found.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg lg:col-span-1">
            <Accordion type="single" collapsible className="w-full" defaultValue="calendar-section">
                <AccordionItem value="calendar-section" className="border-none">
                    <AccordionTrigger className="w-full hover:no-underline p-0 text-left">
                        <CardHeader className="flex flex-row justify-between items-center w-full p-4 sm:p-6">
                            <div>
                                <CardTitle className="text-xl sm:text-2xl font-headline">Attendance Calendar</CardTitle>
                                <CardDescription className="text-sm sm:text-base mt-1">Visual overview of your attendance (select a day for details - future feature).</CardDescription>
                            </div>
                        </CardHeader>
                    </AccordionTrigger>
                    <AccordionContent className="p-0">
                        <div className="border-t">
                            <div className="flex justify-center p-2 sm:p-4">
                                <Calendar
                                mode="single"
                                selected={selectedCalendarDate}
                                onSelect={setSelectedCalendarDate}
                                className="rounded-md border shadow-sm w-full"
                                numberOfMonths={1}
                                disabled={disabledCalendarDays}
                                />
                            </div>
                            <div className="p-4 sm:p-6 pt-0">
                                <div className="p-4 border rounded-lg text-center bg-muted/30 min-h-[80px] flex items-center justify-center">
                                    <p className="text-muted-foreground text-xs sm:text-sm">Detailed daily logs for the selected date will appear here (future enhancement).</p>
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
      </div>
    </div>
  );
}
