import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, Clock, CalendarOff } from "lucide-react"

const metrics = [
  { title: "Total Staff", value: "120", icon: Users, color: "text-primary" },
  { title: "Present Today", value: "100", icon: UserCheck, color: "text-green-500" },
  { title: "Absent Today", value: "10", icon: UserX, color: "text-red-500" },
  { title: "Half-Day", value: "5", icon: Clock, color: "text-yellow-500" },
  { title: "On Leave", value: "5", icon: CalendarOff, color: "text-purple-500" },
];

export function MetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-6">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-5 w-5 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
