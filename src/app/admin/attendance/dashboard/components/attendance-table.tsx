
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

// Placeholder data
const attendanceData = [
  { id: "EMP001", name: "Alice Johnson", phone: "555-0101", jobTitle: "Software Engineer", present: 20, absent: 1, halfDay: 1, weekOff: 8, holiday: 0, avatar: "https://placehold.co/40x40.png?text=AJ" },
  { id: "EMP002", name: "Bob Williams", phone: "555-0102", jobTitle: "Product Manager", present: 22, absent: 0, halfDay: 0, weekOff: 8, holiday: 0, avatar: "https://placehold.co/40x40.png?text=BW" },
  { id: "EMP003", name: "Carol Davis", phone: "555-0103", jobTitle: "UX Designer", present: 19, absent: 2, halfDay: 1, weekOff: 8, holiday: 0, avatar: "https://placehold.co/40x40.png?text=CD" },
  { id: "EMP004", name: "David Brown", phone: "555-0104", jobTitle: "QA Tester", present: 21, absent: 0, halfDay: 1, weekOff: 8, holiday: 0, avatar: "https://placehold.co/40x40.png?text=DB" },
];

export function AttendanceTable() {
  const router = useRouter();

  const handleRowClick = (employeeId: string) => {
    router.push(`/admin/attendance/employee/${employeeId}`);
  };

  return (
    <Card className="shadow-lg"> 
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="font-headline text-xl sm:text-2xl">Monthly Attendance Summary</CardTitle>
        <CardDescription className="text-sm sm:text-base">Overview of employee attendance. Click a row for details.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px] sm:min-w-[220px] px-3 py-3 sm:px-4 sm:py-4">Name</TableHead>
                <TableHead className="hidden md:table-cell min-w-[140px] px-3 py-3 sm:px-4 sm:py-4">Phone Number</TableHead>
                <TableHead className="hidden lg:table-cell min-w-[120px] px-3 py-3 sm:px-4 sm:py-4">Employee ID</TableHead>
                <TableHead className="hidden sm:table-cell min-w-[150px] px-3 py-3 sm:px-4 sm:py-4">Job Title</TableHead>
                <TableHead className="text-center min-w-[70px] px-3 py-3 sm:px-4 sm:py-4">Present</TableHead>
                <TableHead className="text-center min-w-[70px] px-3 py-3 sm:px-4 sm:py-4">Absent</TableHead>
                <TableHead className="text-center hidden md:table-cell min-w-[70px] px-3 py-3 sm:px-4 sm:py-4">Half-Day</TableHead>
                <TableHead className="text-center hidden lg:table-cell min-w-[70px] px-3 py-3 sm:px-4 sm:py-4">Week Off</TableHead>
                <TableHead className="text-center hidden lg:table-cell min-w-[70px] px-3 py-3 sm:px-4 sm:py-4">Holiday</TableHead>
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
                  <TableCell className="hidden md:table-cell whitespace-nowrap px-3 py-3 sm:px-4 sm:py-4">{employee.phone}</TableCell>
                  <TableCell className="hidden lg:table-cell whitespace-nowrap px-3 py-3 sm:px-4 sm:py-4">{employee.id}</TableCell>
                  <TableCell className="hidden sm:table-cell whitespace-nowrap px-3 py-3 sm:px-4 sm:py-4">{employee.jobTitle}</TableCell>
                  <TableCell className="text-center px-3 py-3 sm:px-4 sm:py-4">
                    <Badge variant="outline" className="border-green-500 text-green-600 text-xs sm:text-sm py-1 px-2.5">{employee.present}</Badge>
                  </TableCell>
                  <TableCell className="text-center px-3 py-3 sm:px-4 sm:py-4">
                     <Badge variant="outline" className="border-red-500 text-red-600 text-xs sm:text-sm py-1 px-2.5">{employee.absent}</Badge>
                  </TableCell>
                  <TableCell className="text-center hidden md:table-cell px-3 py-3 sm:px-4 sm:py-4">
                     <Badge variant="outline" className="border-yellow-500 text-yellow-600 text-xs sm:text-sm py-1 px-2.5">{employee.halfDay}</Badge>
                  </TableCell>
                  <TableCell className="text-center hidden lg:table-cell px-3 py-3 sm:px-4 sm:py-4">
                     <Badge variant="secondary" className="text-xs sm:text-sm py-1 px-2.5">{employee.weekOff}</Badge>
                  </TableCell>
                  <TableCell className="text-center hidden lg:table-cell px-3 py-3 sm:px-4 sm:py-4">
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
