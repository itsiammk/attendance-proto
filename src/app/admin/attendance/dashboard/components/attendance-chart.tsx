
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "January", present: 186, absent: 30, leave: 10 },
  { month: "February", present: 205, absent: 25, leave: 12 },
  { month: "March", present: 237, absent: 20, leave: 8 },
  { month: "April", present: 173, absent: 35, leave: 15 },
  { month: "May", present: 209, absent: 28, leave: 11 },
  { month: "June", present: 214, absent: 22, leave: 9 },
]

const chartConfig = {
  present: {
    label: "Present",
    color: "hsl(var(--chart-1))",
  },
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-2))",
  },
  leave: {
    label: "Leave",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function AttendanceChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl">Monthly Attendance Trends</CardTitle>
        <CardDescription className="text-sm sm:text-base">Bar chart showing present, absent, and leave days per month.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <ChartContainer config={chartConfig} className="min-h-[300px] sm:min-h-[350px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={10}
                fontSize={12}
                interval={0} 
                angle={-30} 
                textAnchor="end"
                height={50}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8}
                fontSize={12}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Legend content={({ payload }) => {
                return (
                  <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4">
                    {payload?.map((entry) => (
                       <div key={`item-${entry.value}`} className="flex items-center space-x-1.5">
                         <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                         <span className="text-xs sm:text-sm text-muted-foreground">{entry.value}</span>
                       </div>
                    ))}
                  </div>
                )
              }} />
              <Bar dataKey="present" fill="var(--color-present)" radius={4} barSize={20} />
              <Bar dataKey="absent" fill="var(--color-absent)" radius={4} barSize={20} />
              <Bar dataKey="leave" fill="var(--color-leave)" radius={4} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
