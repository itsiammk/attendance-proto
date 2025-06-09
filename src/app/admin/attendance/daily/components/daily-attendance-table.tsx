
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Placeholder data
const dailyData = [
  { id: "EMP001", name: "Alice Johnson", firstIn: "09:02 AM", lastOut: "05:58 PM", hoursWorked: "8h 56m", status: "Present", avatar: "https://placehold.co/40x40.png?text=AJ" },
  { id: "EMP002", name: "Bob Williams", firstIn: "N/A", lastOut: "N/A", hoursWorked: "0h 0m", status: "Absent", avatar: "https://placehold.co/40x40.png?text=BW" },
  { id: "EMP003", name: "Carol Davis", firstIn: "09:15 AM", lastOut: "01:30 PM", hoursWorked: "4h 15m", status: "Half-Day", avatar: "https://placehold.co/40x40.png?text=CD" },
  { id: "EMP005", name: "Eve Green", firstIn: "08:55 AM", lastOut: "06:05 PM", hoursWorked: "9h 10m", status: "Present", avatar: "https://placehold.co/40x40.png?text=EG" },
];

const statusColors: { [key: string]: string } = {
  Present: "bg-green-100 text-green-700 border-green-300",
  Absent: "bg-red-100 text-red-700 border-red-300",
  "Half-Day": "bg-yellow-100 text-yellow-700 border-yellow-300",
  Leave: "bg-purple-100 text-purple-700 border-purple-300",
};

export function DailyAttendanceTable() {
  return (
    <Card className="shadow-lg">
       <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl">Daily Log</CardTitle>
        <CardDescription>Detailed attendance log for the selected date.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px] sm:min-w-[220px] px-3 py-3 sm:px-4 sm:py-4">Staff</TableHead>
                <TableHead className="min-w-[100px] px-3 py-3 sm:px-4 sm:py-4">First In</TableHead>
                <TableHead className="min-w-[100px] px-3 py-3 sm:px-4 sm:py-4">Last Out</TableHead>
                <TableHead className="min-w-[120px] px-3 py-3 sm:px-4 sm:py-4">Hours Worked</TableHead>
                <TableHead className="min-w-[100px] px-3 py-3 sm:px-4 sm:py-4">Status</TableHead>
                <TableHead className="text-right min-w-[140px] px-3 py-3 sm:px-4 sm:py-4">Mark/Unmark</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dailyData.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="px-3 py-3 sm:px-4 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shrink-0">
                        <AvatarImage src={entry.avatar} alt={entry.name} data-ai-hint="staff photo" />
                        <AvatarFallback>{entry.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm sm:text-base whitespace-nowrap">{entry.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3 sm:px-4 sm:py-4">{entry.firstIn}</TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3 sm:px-4 sm:py-4">{entry.lastOut}</TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3 sm:px-4 sm:py-4">{entry.hoursWorked}</TableCell>
                  <TableCell className="px-3 py-3 sm:px-4 sm:py-4">
                    <Badge variant="outline" className={`${statusColors[entry.status] || "border-muted-foreground text-muted-foreground"} text-xs sm:text-sm whitespace-nowrap py-1 px-2.5`}>
                      {entry.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-3 py-3 sm:px-4 sm:py-4">
                    <Select defaultValue={entry.status.toLowerCase().replace('-', '')}>
                      <SelectTrigger className="w-full min-w-[100px] sm:w-[120px] h-9 text-xs sm:text-sm">
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="halfday">Half-Day</SelectItem>
                        <SelectItem value="leave">Leave</SelectItem>
                      </SelectContent>
                    </Select>
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
