
'use client';

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Briefcase, CalendarCheck, CalendarDays, CalendarOff, CheckCircle, Clock, Users, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Extended placeholder data for all employees including monthly breakdown for July 2024
const allEmployeesData = [
  {
    id: "EMP001", name: "Alice Johnson", email: "alice.johnson@example.com", phone: "555-0101", department:"Engineering", jobTitle: "Software Engineer",
    present: 20, absent: 1, halfDay: 1, weekOff: 8, holiday: 1, avatar: "https://placehold.co/100x100.png?text=AJ",
    monthlyAttendance: { // July 2024
      present: [1, 2, 3, 5, 6, 8, 9, 10, 12, 13, 15, 16, 17, 19, 20, 22, 23, 24, 26, 29].map(day => new Date(2024, 6, day)),
      absent: [25].map(day => new Date(2024, 6, day)),
      halfDay: [4].map(day => new Date(2024, 6, day)),
      leave: [30, 31].map(day => new Date(2024, 6, day)),
      weekOff: [7, 14, 21, 28].map(day => new Date(2024, 6, day)),
      holiday: [11].map(day => new Date(2024, 6, day)),
    }
  },
  {
    id: "EMP002", name: "Bob Williams", email: "bob.williams@example.com", phone: "555-0102", department:"Product", jobTitle: "Product Manager",
    present: 22, absent: 0, halfDay: 0, weekOff: 8, holiday: 1, avatar: "https://placehold.co/100x100.png?text=BW",
    monthlyAttendance: { // July 2024
      present: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 13, 15, 16, 17, 19, 20, 22, 23, 24, 25, 26, 29].map(day => new Date(2024, 6, day)),
      absent: [].map(day => new Date(2024, 6, day)),
      halfDay: [].map(day => new Date(2024, 6, day)),
      leave: [30].map(day => new Date(2024, 6, day)),
      weekOff: [7, 14, 21, 28].map(day => new Date(2024, 6, day)),
      holiday: [11].map(day => new Date(2024, 6, day)),
    }
  },
  {
    id: "EMP003", name: "Carol Davis", email: "carol.davis@example.com", phone: "555-0103", department:"Design", jobTitle: "UX Designer",
    present: 19, absent: 2, halfDay: 1, weekOff: 8, holiday: 1, avatar: "https://placehold.co/100x100.png?text=CD",
    monthlyAttendance: { // July 2024
      present: [1, 2, 3, 5, 6, 8, 9, 10, 12, 13, 15, 16, 17, 19, 20, 22, 23, 24, 26].map(day => new Date(2024, 6, day)),
      absent: [25, 29].map(day => new Date(2024, 6, day)),
      halfDay: [4].map(day => new Date(2024, 6, day)),
      leave: [30, 31].map(day => new Date(2024, 6, day)),
      weekOff: [7, 14, 21, 28].map(day => new Date(2024, 6, day)),
      holiday: [11].map(day => new Date(2024, 6, day)),
    }
  },
  {
    id: "EMP004", name: "David Brown", email: "david.brown@example.com", phone: "555-0104", department:"QA", jobTitle: "QA Tester",
    present: 21, absent: 0, halfDay: 1, weekOff: 8, holiday: 1, avatar: "https://placehold.co/100x100.png?text=DB",
    monthlyAttendance: { // July 2024
      present: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 13, 15, 16, 17, 19, 20, 22, 23, 24, 25, 26].map(day => new Date(2024, 6, day)),
      absent: [].map(day => new Date(2024, 6, day)),
      halfDay: [29].map(day => new Date(2024, 6, day)),
      leave: [30].map(day => new Date(2024, 6, day)),
      weekOff: [7, 14, 21, 28].map(day => new Date(2024, 6, day)),
      holiday: [11].map(day => new Date(2024, 6, day)),
    }
  },
];

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
}

const attendanceTypeDetails = [
    { label: "Present", key: "present", icon: CheckCircle, colorClass: "bg-green-500", textClass:"text-green-600 dark:text-green-400" },
    { label: "Absent", key: "absent", icon: XCircle, colorClass: "bg-red-500", textClass:"text-red-600 dark:text-red-400" },
    { label: "Half-Day", key: "halfDay", icon: Clock, colorClass: "bg-yellow-400", textClass:"text-yellow-500 dark:text-yellow-400" },
    { label: "On Leave", key: "leave", icon: CalendarOff, colorClass: "bg-purple-500", textClass:"text-purple-600 dark:text-purple-400" },
    { label: "Week Off", key: "weekOff", icon: CalendarDays, colorClass: "bg-gray-400 dark:bg-gray-600", textClass:"text-gray-600 dark:text-gray-400" },
    { label: "Holiday", key: "holiday", icon: Briefcase, colorClass: "bg-blue-400", textClass:"text-blue-500 dark:text-blue-400" },
];


export default function EmployeeAttendanceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params.employeeId as string;

  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [displayMonth, setDisplayMonth] = useState(new Date(2024, 6, 1)); // Default to July 2024 for demo

  useEffect(() => {
    const foundEmployee = allEmployeesData.find(emp => emp.id === employeeId) as EmployeeData | undefined;
    setEmployee(foundEmployee || null);
  }, [employeeId]);

  if (!employee) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
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

  const { name, jobTitle, department, avatar, monthlyAttendance, phone, email } = employee;
  const employeeInitials = name.split(" ").map((n:string)=>n[0]).join("");

  const modifiers = {
    present: monthlyAttendance?.present || [],
    absent: monthlyAttendance?.absent || [],
    halfDay: monthlyAttendance?.halfDay || [],
    leave: monthlyAttendance?.leave || [],
    weekOff: monthlyAttendance?.weekOff || [],
    holiday: monthlyAttendance?.holiday || [],
  };

  const modifiersClassNames = {
    present: 'bg-green-500 text-primary-foreground rounded-md hover:bg-green-600',
    absent: 'bg-red-500 text-destructive-foreground rounded-md hover:bg-red-600',
    halfDay: 'bg-yellow-400 text-black rounded-md hover:bg-yellow-500',
    leave: 'bg-purple-500 text-primary-foreground rounded-md hover:bg-purple-600',
    weekOff: 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600',
    holiday: 'bg-blue-400 text-primary-foreground rounded-md hover:bg-blue-500',
    outside: "text-muted-foreground opacity-50", // For days outside the current month
  };

  const summaryValues: { [key: string]: number } = {
    present: monthlyAttendance.present.length,
    absent: monthlyAttendance.absent.length,
    halfDay: monthlyAttendance.halfDay.length,
    leave: monthlyAttendance.leave.length,
    weekOff: monthlyAttendance.weekOff.length,
    holiday: monthlyAttendance.holiday.length,
  };


  const legendItems = attendanceTypeDetails.map(item => ({
    label: item.label,
    colorClass: item.colorClass.replace("bg-", "border-2 ").concat(" bg-opacity-30"), 
    actualColorClass: item.colorClass
  }));


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Employee Attendance Details</h1>
            <p className="text-muted-foreground">Detailed view of {name}'s attendance for {format(displayMonth, "MMMM yyyy")}.</p>
        </div>
        <Button variant="outline" asChild>
            <Link href="/admin/attendance/dashboard"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
        </Button>
      </div>


      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-2 border-primary/50">
              <AvatarImage src={avatar} alt={name} data-ai-hint="employee avatar"/>
              <AvatarFallback className="text-3xl">{employeeInitials}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl">{name}</CardTitle>
              <CardDescription className="text-base">{jobTitle} - {department}</CardDescription>
              <div className="text-sm text-muted-foreground mt-1">
                <p>ID: {employee.id}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
              </div>
            </div>
        </CardHeader>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Monthly Summary - {format(displayMonth, "MMMM yyyy")}</CardTitle>
          <CardDescription>Overview of {name}'s attendance stats for this month.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {attendanceTypeDetails.map(item => (
              <div key={item.key} className={`p-4 rounded-lg flex flex-col items-center justify-center text-center shadow-md ${item.colorClass} bg-opacity-10 dark:${item.colorClass} dark:bg-opacity-20`}>
                <item.icon className={`h-8 w-8 mb-2 ${item.textClass}`} />
                <p className={`text-2xl font-bold ${item.textClass}`}>{summaryValues[item.key]}</p>
                <p className={`text-sm font-medium ${item.textClass}`}>{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Attendance Calendar - {format(displayMonth, "MMMM yyyy")}</CardTitle>
          <CardDescription>
            Visual log of {name}'s attendance. Days are color-coded as per the legend below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-stretch p-4 sm:p-6">
          <Calendar
            mode="single"
            month={displayMonth}
            onMonthChange={setDisplayMonth} 
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            className="rounded-md border shadow-sm w-full"
            showOutsideDays
            fixedWeeks
            components={{
                DayContent: ({ date, displayMonth: currentDisplayMonth }) => {
                    const dayOfMonth = date.getDate();
                    let dayHasModifier = false;
                    for (const key in modifiers) {
                        if (modifiers[key as keyof typeof modifiers].some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear())) {
                            dayHasModifier = true;
                            break;
                        }
                    }

                    const defaultDayClass = !dayHasModifier && date.getMonth() === currentDisplayMonth.getMonth() ? "text-foreground" : "";
                    const outsideDayClass = date.getMonth() !== currentDisplayMonth.getMonth() ? modifiersClassNames.outside : "";

                    return (
                        <div className={cn(defaultDayClass, outsideDayClass, "relative w-full h-full flex items-center justify-center")}>
                            {dayOfMonth}
                        </div>
                    );
                }
            }}
          />
          <div className="mt-6 w-full p-4 border rounded-lg bg-muted/30">
            <h4 className="text-sm font-semibold mb-3 text-center">Legend</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm">
              {legendItems.map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`h-4 w-4 rounded-full ${item.actualColorClass} border-2 border-muted-foreground/30`}></span>
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

