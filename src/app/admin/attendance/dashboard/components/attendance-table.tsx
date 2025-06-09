
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { EmployeeAttendanceSummary } from "./attendance-table-types"; 
import { getMockAttendanceData } from "../actions";
import { Loader2 } from "lucide-react";

export function AttendanceTable() {
  const router = useRouter();
  const [attendanceData, setAttendanceData] = useState<EmployeeAttendanceSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getMockAttendanceData();
      setAttendanceData(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleRowClick = (employeeId: string) => {
    router.push(`/admin/attendance/employee/${employeeId}`);
  };

  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="font-headline text-xl sm:text-2xl">Monthly Attendance Summary</CardTitle>
          <CardDescription className="text-sm sm:text-base mt-1">Loading attendance data...</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 min-h-[200px] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg"> 
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="font-headline text-xl sm:text-2xl">Monthly Attendance Summary</CardTitle>
        <CardDescription className="text-sm sm:text-base mt-1">Overview of employee attendance. Click a row for details.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px] sm:min-w-[220px] px-3 py-3 sm:px-4 sm:py-4">Name</TableHead>
                <TableHead className="min-w-[140px] px-3 py-3 sm:px-4 sm:py-4">Phone Number</TableHead>
                <TableHead className="min-w-[120px] px-3 py-3 sm:px-4 sm:py-4">Employee ID</TableHead>
                <TableHead className="min-w-[150px] px-3 py-3 sm:px-4 sm:py-4">Job Title</TableHead>
                <TableHead className="text-center min-w-[70px] px-3 py-3 sm:px-4 sm:py-4">Present</TableHead>
                <TableHead className="text-center min-w-[70px] px-3 py-3 sm:px-4 sm:py-4">Absent</TableHead>
                <TableHead className="text-center min-w-[70px] px-3 py-3 sm:px-4 sm:py-4">Half-Day</TableHead>
                <TableHead className="text-center min-w-[70px] px-3 py-3 sm:px-4 sm:py-4">Week Off</TableHead>
                <TableHead className="text-center min-w-[70px] px-3 py-3 sm:px-4 sm:py-4">Holiday</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((employee) => (
                <TableRow 
                  key={employee.id} 
                  onClick={() => handleRowClick(employee.id)}
                  className="cursor-pointer hover:bg-muted/80"
                >
                  <TableCell className="px-3 py-3 sm:px-4 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shrink-0">
                        <AvatarImage src={employee.avatar} alt={employee.name} data-ai-hint="employee photo" />
                        <AvatarFallback>{employee.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm sm:text-base whitespace-nowrap">{employee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3 sm:px-4 sm:py-4">{employee.phone}</TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3 sm:px-4 sm:py-4">{employee.id}</TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3 sm:px-4 sm:py-4">{employee.jobTitle}</TableCell>
                  <TableCell className="text-center px-3 py-3 sm:px-4 sm:py-4">
                    <Badge variant="outline" className="border-green-500 text-green-600 text-xs sm:text-sm py-1 px-2.5">{employee.present}</Badge>
                  </TableCell>
                  <TableCell className="text-center px-3 py-3 sm:px-4 sm:py-4">
                     <Badge variant="outline" className="border-red-500 text-red-600 text-xs sm:text-sm py-1 px-2.5">{employee.absent}</Badge>
                  </TableCell>
                  <TableCell className="text-center px-3 py-3 sm:px-4 sm:py-4">
                     <Badge variant="outline" className="border-yellow-500 text-yellow-600 text-xs sm:text-sm py-1 px-2.5">{employee.halfDay}</Badge>
                  </TableCell>
                  <TableCell className="text-center px-3 py-3 sm:px-4 sm:py-4">
                     <Badge variant="secondary" className="text-xs sm:text-sm py-1 px-2.5">{employee.weekOff}</Badge>
                  </TableCell>
                  <TableCell className="text-center px-3 py-3 sm:px-4 sm:py-4">
                     <Badge variant="secondary" className="text-xs sm:text-sm py-1 px-2.5">{employee.holiday}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
