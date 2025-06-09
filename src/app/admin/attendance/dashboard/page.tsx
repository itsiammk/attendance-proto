
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
    <div className="space-y-8"> {/* Increased overall spacing */}
      <div className="mb-8"> {/* Increased bottom margin */}
        <h1 className="text-3xl font-headline font-bold tracking-tight">Attendance Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your company's attendance records and insights.
        </p>
      </div>

      {/* Filters Section */}
      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Refine the attendance data shown below.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:flex xl:flex-wrap xl:items-end xl:gap-3">
                <div>
                <Label htmlFor="month-picker">Select Month</Label>
                <DatePickerWithPresets id="month-picker" />
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
                    <SelectItem value="branch-a">Branch A</SelectItem>
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
                    <SelectItem value="hr">Human Resources</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div className="flex items-center space-x-2 pt-5 xl:pt-0 self-end">
                <Checkbox id="show-inactive" />
                <Label htmlFor="show-inactive" className="text-sm font-medium whitespace-nowrap">
                    Show Inactive Staff
                </Label>
                </div>
                <Button variant="outline" className="xl:ml-auto">Apply Filters</Button>
            </div>
        </CardContent>
      </Card>

      {/* Action Bar Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-4">
        <div className="relative w-full sm:max-w-sm"> {/* Consistent width for search */}
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search employees..." className="pl-8" />
        </div>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap justify-start sm:justify-end">
          <ManageEmployeesModal />
          <ManageLeavesModal />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <MetricsCards /> {/* This component itself handles the grid of cards */}

      {/* Attendance Table */}
      <AttendanceTable /> {/* This component is a Card */}

      {/* Attendance Chart */}
      <AttendanceChart /> {/* This component is a Card */}

    </div>
  );
}
