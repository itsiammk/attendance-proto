
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, Briefcase, CalendarCheck, CalendarDays, CalendarOff, CheckCircle, Clock, Users, XCircle, History, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Extended placeholder data for all employees
const allEmployeesData = [
  {
    id: "EMP001", name: "Alice Johnson", email: "alice.johnson@example.com", phone: "555-0101", department:"Engineering", jobTitle: "Software Engineer",
    present: 20, absent: 1, halfDay: 1, weekOff: 8, holiday: 1, avatar: "https://placehold.co/100x100.png?text=AJ",
    monthlyAttendance: { // July 2024 - Current month summary
      present: [1, 2, 3, 5, 6, 8, 9, 10, 12, 13, 15, 16, 17, 19, 20, 22, 23, 24, 26, 29].map(day => new Date(2024, 6, day)),
      absent: [25].map(day => new Date(2024, 6, day)),
      halfDay: [4].map(day => new Date(2024, 6, day)),
      leave: [30, 31].map(day => new Date(2024, 6, day)), // Paid leave for demo
      weekOff: [7, 14, 21, 28].map(day => new Date(2024, 6, day)),
      holiday: [11].map(day => new Date(2024, 6, day)),
    },
    historicalAttendance: [
      { month: "June 2024", present: 20, absent: 1, halfDay: 1, weekOff: 8, holiday: 0, paidLeave: 2, unpaidLeave: 0, otWorkDay: 4, otWeekOff: 0, otHoliday: 0, late: 3, early: 1 },
      { month: "May 2024", present: 22, absent: 0, halfDay: 0, weekOff: 8, holiday: 1, paidLeave: 0, unpaidLeave: 0, otWorkDay: 2, otWeekOff: 0, otHoliday: 0, late: 1, early: 0 },
      { month: "April 2024", present: 18, absent: 2, halfDay: 2, weekOff: 8, holiday: 0, paidLeave: 0, unpaidLeave: 1, otWorkDay: 6, otWeekOff: 8, otHoliday: 0, late: 5, early: 2 },
      { month: "March 2024", present: 21, absent: 1, halfDay: 0, weekOff: 9, holiday: 1, paidLeave: 1, unpaidLeave: 0, otWorkDay: 3, otWeekOff: 0, otHoliday: 4, late: 2, early: 0 },
    ]
  },
  {
    id: "EMP002", name: "Bob Williams", email: "bob.williams@example.com", phone: "555-0102", department:"Product", jobTitle: "Product Manager",
    present: 22, absent: 0, halfDay: 0, weekOff: 8, holiday: 1, avatar: "https://placehold.co/100x100.png?text=BW",
    monthlyAttendance: {
      present: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 13, 15, 16, 17, 19, 20, 22, 23, 24, 25, 26, 29].map(day => new Date(2024, 6, day)),
      absent: [].map(day => new Date(2024, 6, day)),
      halfDay: [].map(day => new Date(2024, 6, day)),
      leave: [30].map(day => new Date(2024, 6, day)),
      weekOff: [7, 14, 21, 28].map(day => new Date(2024, 6, day)),
      holiday: [11].map(day => new Date(2024, 6, day)),
    },
    historicalAttendance: [ // Added for EMP002
      { month: "June 2024", present: 21, absent: 0, halfDay: 1, weekOff: 8, holiday: 0, paidLeave: 1, unpaidLeave: 0, otWorkDay: 3, otWeekOff: 0, otHoliday: 0, late: 2, early: 0 },
    ]
  },
  {
    id: "EMP003", name: "Carol Davis", email: "carol.davis@example.com", phone: "555-0103", department:"Design", jobTitle: "UX Designer",
    present: 19, absent: 2, halfDay: 1, weekOff: 8, holiday: 1, avatar: "https://placehold.co/100x100.png?text=CD",
    monthlyAttendance: {
      present: [1, 2, 3, 5, 6, 8, 9, 10, 12, 13, 15, 16, 17, 19, 20, 22, 23, 24, 26].map(day => new Date(2024, 6, day)),
      absent: [25, 29].map(day => new Date(2024, 6, day)),
      halfDay: [4].map(day => new Date(2024, 6, day)),
      leave: [30, 31].map(day => new Date(2024, 6, day)),
      weekOff: [7, 14, 21, 28].map(day => new Date(2024, 6, day)),
      holiday: [11].map(day => new Date(2024, 6, day)),
    },
    // No historical data for EMP003 for demo
  },
  {
    id: "EMP004", name: "David Brown", email: "david.brown@example.com", phone: "555-0104", department:"QA", jobTitle: "QA Tester",
    present: 21, absent: 0, halfDay: 1, weekOff: 8, holiday: 1, avatar: "https://placehold.co/100x100.png?text=DB",
    monthlyAttendance: {
      present: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 13, 15, 16, 17, 19, 20, 22, 23, 24, 25, 26].map(day => new Date(2024, 6, day)),
      absent: [].map(day => new Date(2024, 6, day)),
      halfDay: [29].map(day => new Date(2024, 6, day)),
      leave: [30].map(day => new Date(2024, 6, day)),
      weekOff: [7, 14, 21, 28].map(day => new Date(2024, 6, day)),
      holiday: [11].map(day => new Date(2024, 6, day)),
    },
     historicalAttendance: [
      { month: "June 2024", present: 22, absent: 0, halfDay: 0, weekOff: 8, holiday: 0, paidLeave: 0, unpaidLeave: 0, otWorkDay: 5, otWeekOff: 0, otHoliday: 0, late: 0, early: 0 },
    ]
  },
];

interface MonthlyRecord {
  month: string;
  present: number;
  absent: number;
  halfDay: number;
  weekOff: number;
  holiday: number;
  paidLeave: number;
  unpaidLeave: number;
  otWorkDay: number;
  otWeekOff: number;
  otHoliday: number;
  late: number;
  early: number;
}

interface EmployeeData {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  jobTitle: string;
  present: number; 
  absent: number;  
  halfDay: number; 
  weekOff: number; 
  holiday: number; 
  avatar: string;
  monthlyAttendance: { 
    present: Date[];
    absent: Date[];
    halfDay: Date[];
    leave: Date[]; 
    weekOff: Date[];
    holiday: Date[];
  };
  historicalAttendance?: MonthlyRecord[];
}

const attendanceTypeDetails = [
    { label: "Present", key: "present", icon: CheckCircle, colorClass: "bg-green-500", textClass:"text-green-600 dark:text-green-400" },
    { label: "Absent", key: "absent", icon: XCircle, colorClass: "bg-red-500", textClass:"text-red-600 dark:text-red-400" },
    { label: "Half-Day", key: "halfDay", icon: Clock, colorClass: "bg-yellow-400", textClass:"text-yellow-500 dark:text-yellow-400" },
    { label: "On Leave", key: "leave", icon: CalendarOff, colorClass: "bg-purple-500", textClass:"text-purple-600 dark:text-purple-400" },
    { label: "Week Off", key: "weekOff", icon: CalendarDays, colorClass: "bg-gray-400 dark:bg-gray-600", textClass:"text-gray-600 dark:text-gray-400" },
    { label: "Holiday", key: "holiday", icon: Briefcase, colorClass: "bg-blue-400", textClass:"text-blue-500 dark:text-blue-400" },
];

const historicalTableColumns = [
  { key: "month", label: "Month", fullLabel: "Month" },
  { key: "present", label: "P", fullLabel: "Present Days" },
  { key: "absent", label: "A", fullLabel: "Absent Days" },
  { key: "halfDay", label: "HD", fullLabel: "Half Days" },
  { key: "weekOff", label: "WO", fullLabel: "Week Offs" },
  { key: "holiday", label: "H", fullLabel: "Holidays" },
  { key: "paidLeave", label: "PL", fullLabel: "Paid Leave" },
  { key: "unpaidLeave", label: "UL", fullLabel: "Unpaid Leave" },
  { key: "otWorkDay", label: "OT Work", fullLabel: "Overtime (Working Day)" },
  { key: "otWeekOff", label: "OT WO", fullLabel: "Overtime (Week Off)" },
  { key: "otHoliday", label: "OT H", fullLabel: "Overtime (Holiday)" },
  { key: "late", label: "Late", fullLabel: "Late Comings" },
  { key: "early", label: "Early", fullLabel: "Early Leavings" },
];


export default function EmployeeAttendanceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params.employeeId as string;

  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [displayMonth, setDisplayMonth] = useState(new Date(2024, 6, 1)); 

  useEffect(() => {
    const foundEmployee = allEmployeesData.find(emp => emp.id === employeeId) as EmployeeData | undefined;
    setEmployee(foundEmployee || null);
  }, [employeeId]);

  if (!employee) {
    return (
      <div className="flex h-screen items-center justify-center p-4 text-center">
        <div>
          <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Employee Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The employee with ID "{employeeId}" could not be found.
          </p>
          <Button onClick={() => router.push("/admin/attendance/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const { name, jobTitle, department, avatar, monthlyAttendance, phone, email, historicalAttendance } = employee;
  const employeeInitials = name.split(" ").map((n:string)=>n[0]).join("");

  const summaryValues: { [key: string]: number } = {
    present: monthlyAttendance.present.length,
    absent: monthlyAttendance.absent.length,
    halfDay: monthlyAttendance.halfDay.length,
    leave: monthlyAttendance.leave.length,
    weekOff: monthlyAttendance.weekOff.length,
    holiday: monthlyAttendance.holiday.length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
            <h1 className="text-2xl sm:text-3xl font-headline font-bold tracking-tight">Employee Attendance</h1>
            <p className="text-muted-foreground">Detailed view of {name}'s attendance.</p>
        </div>
        <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/admin/attendance/dashboard"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-primary/50">
              <AvatarImage src={avatar} alt={name} data-ai-hint="employee avatar"/>
              <AvatarFallback className="text-2xl sm:text-3xl">{employeeInitials}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-xl sm:text-2xl">{name}</CardTitle>
              <CardDescription className="text-sm sm:text-base">{jobTitle} - {department}</CardDescription>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 space-y-0.5">
                <p>ID: {employee.id}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
              </div>
            </div>
        </CardHeader>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Monthly Summary - {format(displayMonth, "MMMM yyyy")}</CardTitle>
          <CardDescription className="text-sm">Overview of {name}'s attendance for {format(displayMonth, "MMMM yyyy")}.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {attendanceTypeDetails.map(item => (
              <div key={item.key} className={`p-3 sm:p-4 rounded-lg flex flex-col items-center justify-center text-center shadow-md ${item.colorClass} bg-opacity-10 dark:${item.colorClass} dark:bg-opacity-20`}>
                <item.icon className={`h-6 w-6 sm:h-8 sm:w-8 mb-1 sm:mb-2 ${item.textClass}`} />
                <p className={`text-xl sm:text-2xl font-bold ${item.textClass}`}>{summaryValues[item.key]}</p>
                <p className={`text-xs sm:text-sm font-medium ${item.textClass}`}>{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <CardTitle className="text-lg sm:text-xl">Historical Attendance Records</CardTitle>
          </div>
          <CardDescription className="text-sm">
            Summary of {name}'s attendance for previous months.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="rounded-md border w-full">
            <TooltipProvider>
              <Table>
                <TableHeader>
                  <TableRow>
                    {historicalTableColumns.map(col => (
                     <TableHead 
                        key={col.key} 
                        className={cn(
                          "whitespace-nowrap px-2 py-3 text-xs sm:px-3 sm:text-sm", 
                          col.key !== 'month' && "text-center",
                          // Hide less critical columns on smaller screens
                          (col.key === 'otWeekOff' || col.key === 'otHoliday' || col.key === 'early') && "hidden lg:table-cell",
                          (col.key === 'unpaidLeave' || col.key === 'otWorkDay' || col.key === 'late') && "hidden md:table-cell"
                        )}
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>{col.label}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{col.fullLabel}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historicalAttendance && historicalAttendance.length > 0 ? (
                    historicalAttendance.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium whitespace-nowrap px-2 py-3 text-xs sm:px-3 sm:text-sm">{record.month}</TableCell>
                        <TableCell className="text-center px-1 py-3 sm:px-2"><Badge variant={record.present > 0 ? "outline" : "secondary"} className={cn("text-xs sm:text-sm", record.present > 0 ? "border-green-500 text-green-600" : "")}>{record.present}</Badge></TableCell>
                        <TableCell className="text-center px-1 py-3 sm:px-2"><Badge variant={record.absent > 0 ? "outline" : "secondary"} className={cn("text-xs sm:text-sm", record.absent > 0 ? "border-red-500 text-red-600" : "")}>{record.absent}</Badge></TableCell>
                        <TableCell className="text-center px-1 py-3 sm:px-2"><Badge variant={record.halfDay > 0 ? "outline" : "secondary"} className={cn("text-xs sm:text-sm", record.halfDay > 0 ? "border-yellow-500 text-yellow-600" : "")}>{record.halfDay}</Badge></TableCell>
                        <TableCell className="text-center px-1 py-3 sm:px-2"><Badge variant="secondary" className="text-xs sm:text-sm">{record.weekOff}</Badge></TableCell>
                        <TableCell className="text-center px-1 py-3 sm:px-2"><Badge variant="secondary" className="text-xs sm:text-sm">{record.holiday}</Badge></TableCell>
                        <TableCell className="text-center px-1 py-3 sm:px-2"><Badge variant={record.paidLeave > 0 ? "outline" : "secondary"} className={cn("text-xs sm:text-sm", record.paidLeave > 0 ? "border-purple-500 text-purple-600" : "")}>{record.paidLeave}</Badge></TableCell>
                        <TableCell className="text-center px-1 py-3 sm:px-2 hidden md:table-cell"><Badge variant={record.unpaidLeave > 0 ? "outline" : "secondary"} className={cn("text-xs sm:text-sm", record.unpaidLeave > 0 ? "border-orange-500 text-orange-600" : "")}>{record.unpaidLeave}</Badge></TableCell>
                        <TableCell className="text-center px-1 py-3 sm:px-2 hidden md:table-cell"><Badge variant={record.otWorkDay > 0 ? "outline" : "secondary"} className={cn("text-xs sm:text-sm", record.otWorkDay > 0 ? "border-sky-500 text-sky-600" : "")}>{record.otWorkDay}</Badge></TableCell>
                        <TableCell className="text-center px-1 py-3 sm:px-2 hidden lg:table-cell"><Badge variant={record.otWeekOff > 0 ? "outline" : "secondary"} className={cn("text-xs sm:text-sm", record.otWeekOff > 0 ? "border-sky-500 text-sky-600" : "")}>{record.otWeekOff}</Badge></TableCell>
                        <TableCell className="text-center px-1 py-3 sm:px-2 hidden lg:table-cell"><Badge variant={record.otHoliday > 0 ? "outline" : "secondary"} className={cn("text-xs sm:text-sm", record.otHoliday > 0 ? "border-sky-500 text-sky-600" : "")}>{record.otHoliday}</Badge></TableCell>
                        <TableCell className="text-center px-1 py-3 sm:px-2 hidden md:table-cell"><Badge variant={record.late > 0 ? "outline" : "secondary"} className={cn("text-xs sm:text-sm", record.late > 0 ? "border-amber-500 text-amber-600" : "")}>{record.late}</Badge></TableCell>
                        <TableCell className="text-center px-1 py-3 sm:px-2 hidden lg:table-cell"><Badge variant={record.early > 0 ? "outline" : "secondary"} className={cn("text-xs sm:text-sm", record.early > 0 ? "border-teal-500 text-teal-600" : "")}>{record.early}</Badge></TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={historicalTableColumns.length} className="h-24 text-center text-muted-foreground">
                        <div className="flex flex-col items-center justify-center">
                          <AlertTriangle className="w-8 h-8 mb-2 text-yellow-500" />
                          No historical attendance data available.
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
