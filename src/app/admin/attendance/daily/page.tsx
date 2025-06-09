import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithPresets } from "@/components/ui/date-picker-with-presets" 
import { DailyAttendanceTable } from "./components/daily-attendance-table"
import { Download, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DailyAttendancePage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-headline font-bold tracking-tight">Daily Attendance</h1>
        <p className="text-muted-foreground">
          View and manage daily attendance records for your employees.
        </p>
      </div>

      {/* Filters Section */}
      <Card>
        <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Refine the daily log by date, branch, department, or shift.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:flex xl:flex-wrap xl:items-end xl:gap-3">
                <div>
                <Label htmlFor="date-picker">Select Date</Label>
                <DatePickerWithPresets id="date-picker" />
                </div>
                <div>
                <Label htmlFor="branch-filter">Branch</Label>
                <Select defaultValue="all">
                    <SelectTrigger id="branch-filter">
                    <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="main">Main Office</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div>
                <Label htmlFor="department-filter">Department</Label>
                <Select defaultValue="all">
                    <SelectTrigger id="department-filter">
                    <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div>
                <Label htmlFor="shift-filter">Shift</Label>
                <Select defaultValue="all">
                    <SelectTrigger id="shift-filter">
                    <SelectValue placeholder="Select Shift" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">All Shifts</SelectItem>
                    <SelectItem value="morning">Morning Shift</SelectItem>
                    <SelectItem value="evening">Evening Shift</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <Button variant="outline" className="xl:ml-auto">Apply Filters</Button>
            </div>
        </CardContent>
      </Card>
      

      {/* Header Actions Section */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-4">
        <div className="relative w-full sm:max-w-xs">
          <Input type="search" placeholder="Search staff..." className="pl-8" />
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Summary Tabs & Table */}
      <Tabs defaultValue="present" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex mb-4">
          <TabsTrigger value="present">Present (100)</TabsTrigger>
          <TabsTrigger value="absent">Absent (10)</TabsTrigger>
          <TabsTrigger value="half-day">Half-Day (5)</TabsTrigger>
        </TabsList>
        <TabsContent value="present">
          <DailyAttendanceTable />
        </TabsContent>
        <TabsContent value="absent">
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
                No absent staff for the selected criteria.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="half-day">
           <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
                No staff on half-day for the selected criteria.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
