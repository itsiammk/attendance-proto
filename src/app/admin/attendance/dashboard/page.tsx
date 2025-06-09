
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithPresets } from "@/components/ui/date-picker-with-presets"
import { ManageEmployeesModal } from "@/components/manage-employees-modal"
import { ManageLeavesModal } from "@/components/manage-leaves-modal"
import { MetricsCards } from "./components/metrics-cards"
import { AttendanceTable } from "./components/attendance-table"
import { AttendanceChart } from "./components/attendance-chart"

import { Download, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


export default function AttendanceDashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8"> 
      <div className="mb-6 sm:mb-8"> 
        <h1 className="text-2xl sm:text-3xl font-headline font-bold tracking-tight">Attendance Dashboard</h1>
        <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
          Overview of your company's attendance records and insights.
        </p>
      </div>

      {/* Filters Section */}
      <Card className="shadow-lg">
        <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl">Filters</CardTitle>
            <CardDescription className="text-sm sm:text-base">Refine the attendance data shown below.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-wrap xl:items-end xl:gap-3">
                <div className="w-full space-y-1.5">
                <Label htmlFor="month-picker">Select Month</Label>
                <DatePickerWithPresets id="month-picker" />
                </div>
                <div className="w-full space-y-1.5">
                <Label htmlFor="branch-filter">Branch</Label>
                <Select defaultValue="all">
                    <SelectTrigger id="branch-filter" className="w-full">
                    <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="main">Main Office</SelectItem>
                    <SelectItem value="branch-a">Branch A</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div className="w-full space-y-1.5">
                <Label htmlFor="department-filter">Department</Label>
                <Select defaultValue="all">
                    <SelectTrigger id="department-filter" className="w-full">
                    <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div className="flex items-center space-x-2 pt-5 sm:pt-0 self-end w-full sm:w-auto">
                <Checkbox id="show-inactive" />
                <Label htmlFor="show-inactive" className="text-sm font-medium whitespace-nowrap">
                    Show Inactive Staff
                </Label>
                </div>
                <Button variant="outline" className="w-full xl:w-auto xl:ml-auto mt-4 xl:mt-0 h-10">Apply Filters</Button>
            </div>
        </CardContent>
      </Card>

      {/* Action Bar Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-2 sm:py-4">
        <div className="relative w-full sm:max-w-xs md:max-w-sm">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search employees..." className="pl-8 w-full h-10" />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:flex-nowrap justify-start sm:justify-end w-full sm:w-auto">
          <ManageEmployeesModal />
          <ManageLeavesModal />
          <Button variant="outline" className="w-full sm:w-auto h-10">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <MetricsCards /> 
      <AttendanceTable /> 
      <AttendanceChart /> 

    </div>
  );
}
