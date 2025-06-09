
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DatePickerWithPresets } from "@/components/ui/date-picker-with-presets";
import { DailyAttendanceTable } from "./components/daily-attendance-table";
import { Download, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

type ActiveView = "present" | "absent" | "half-day";

export default function DailyAttendancePage() {
  const isMobile = useIsMobile();
  const [activeView, setActiveView] = React.useState<ActiveView>("present");

  const presentCount = 100; // Placeholder
  const absentCount = 10; // Placeholder
  const halfDayCount = 5; // Placeholder

  const tabItems = [
    { value: "present", label: "Present", count: presentCount, content: <DailyAttendanceTable /> },
    { value: "absent", label: "Absent", count: absentCount, content: (
      <Card className="shadow-lg">
        <CardContent className="p-6 text-center text-muted-foreground">
          No absent staff for the selected criteria.
        </CardContent>
      </Card>
    )},
    { value: "half-day", label: "Half-Day", count: halfDayCount, content: (
      <Card className="shadow-lg">
        <CardContent className="p-6 text-center text-muted-foreground">
          No staff on half-day for the selected criteria.
        </CardContent>
      </Card>
    )},
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-headline font-bold tracking-tight">Daily Attendance</h1>
        <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
          View and manage daily attendance records for your employees.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl">Filters</CardTitle>
          <CardDescription className="text-sm sm:text-base">Refine the daily log by date, branch, department, or shift.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:flex-wrap xl:items-end xl:gap-3">
            <div className="w-full space-y-1.5">
              <Label htmlFor="date-picker">Select Date</Label>
              <DatePickerWithPresets id="date-picker" />
            </div>
            <div className="w-full space-y-1.5">
              <Label htmlFor="branch-filter">Branch</Label>
              <Select defaultValue="all">
                <SelectTrigger id="branch-filter" className="w-full h-10">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="main">Main Office</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full space-y-1.5">
              <Label htmlFor="department-filter">Department</Label>
              <Select defaultValue="all">
                <SelectTrigger id="department-filter" className="w-full h-10">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full space-y-1.5">
              <Label htmlFor="shift-filter">Shift</Label>
              <Select defaultValue="all">
                <SelectTrigger id="shift-filter" className="w-full h-10">
                  <SelectValue placeholder="Select Shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shifts</SelectItem>
                  <SelectItem value="morning">Morning Shift</SelectItem>
                  <SelectItem value="evening">Evening Shift</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="w-full xl:w-auto xl:ml-auto mt-4 xl:mt-0 h-10">Apply Filters</Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2 sm:pt-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search staff..." className="pl-8 w-full h-10" />
        </div>
        <Button variant="outline" className="w-full sm:w-auto h-10">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      {isMobile ? (
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-2"
          value={activeView}
          onValueChange={(value) => setActiveView(value as ActiveView)}
        >
          {tabItems.map(item => (
            <AccordionItem value={item.value} key={item.value} className="border bg-card rounded-lg shadow-lg">
              <AccordionTrigger className="text-sm sm:text-base px-4 py-3 hover:no-underline">
                {item.label} ({item.count})
              </AccordionTrigger>
              <AccordionContent className="p-0 pt-2">
                {/* AccordionContent has default pb-4, remove outer padding for card content to handle it */}
                <div className="px-4 pb-4"> 
                    {item.content}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Tabs
          defaultValue="present"
          className="w-full"
          value={activeView}
          onValueChange={(value) => setActiveView(value as ActiveView)}
        >
          <TabsList className="grid w-full grid-cols-1 xs:grid-cols-3 md:w-auto md:inline-flex mb-4">
            {tabItems.map(item => (
                 <TabsTrigger key={item.value} value={item.value} className="text-xs sm:text-sm">
                    {item.label} ({item.count})
                 </TabsTrigger>
            ))}
          </TabsList>
           {tabItems.map(item => (
                <TabsContent key={item.value} value={item.value}>
                    {item.content}
                </TabsContent>
            ))}
        </Tabs>
      )}
    </div>
  );
}
