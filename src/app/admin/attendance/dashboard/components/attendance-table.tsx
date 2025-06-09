
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
    <Card className="shadow-lg"> {/* Ensured shadow-lg */}
      <CardHeader>
        <CardTitle>Monthly Attendance Summary</CardTitle>
        <CardDescription>Overview of employee attendance for the current month. Click a row for details.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead className="text-center">Present</TableHead>
                <TableHead className="text-center">Absent</TableHead>
                <TableHead className="text-center">Half-Day</TableHead>
                <TableHead className="text-center">Week Off</TableHead>
                <TableHead className="text-center">Holiday</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((employee) => (
                <TableRow 
                  key={employee.id} 
                  onClick={() => handleRowClick(employee.id)}
                  className="cursor-pointer hover:bg-muted/80"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={employee.avatar} alt={employee.name} data-ai-hint="employee photo" />
                        <AvatarFallback>{employee.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{employee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.jobTitle}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="border-green-500 text-green-600">{employee.present}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge variant="outline" className="border-red-500 text-red-600">{employee.absent}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge variant="outline" className="border-yellow-500 text-yellow-600">{employee.halfDay}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge variant="secondary">{employee.weekOff}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge variant="secondary">{employee.holiday}</Badge>
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
