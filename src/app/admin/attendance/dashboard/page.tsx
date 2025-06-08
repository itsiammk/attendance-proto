import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithPresets } from "@/components/ui/date-picker-with-presets" // Assuming this exists or will be created
import { ManageEmployeesModal } from "@/components/manage-employees-modal"
import { ManageLeavesModal } from "@/components/manage-leaves-modal"
import { MetricsCards } from "./components/metrics-cards"
import { AttendanceTable } from "./components/attendance-table"
import { AttendanceChart } from "./components/attendance-chart"
import { AttendanceInsightsCard } from "@/components/attendance-insights-card"
import { Download, Search } from "lucide-react"

export default function AttendanceDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Attendance Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your company's attendance records and insights.
        </p>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:flex xl:flex-wrap xl:items-end xl:gap-3 p-4 border rounded-lg bg-card shadow">
        <div>
          <Label htmlFor="month-picker">Select Month</Label>
          {/* Replace with actual month picker or a date picker configured for month selection */}
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
          <Label htmlFor="show-inactive" className="text-sm font-medium">
            Show Inactive Staff
          </Label>
        </div>
         <Button variant="outline" className="xl:ml-auto">Apply Filters</Button>
      </div>

      {/* Header Actions Section */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Input type="search" placeholder="Search employees..." className="pl-8" />
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <ManageEmployeesModal />
          <ManageLeavesModal />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <MetricsCards />
      
      {/* AI Insights Card */}
      <AttendanceInsightsCard />

      {/* Attendance Table */}
      <AttendanceTable />

      {/* Attendance Chart */}
      <AttendanceChart />

    </div>
  );
}
