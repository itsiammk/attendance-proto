
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
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {metrics.map((metric) => (
        <Card key={metric.title} className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
            <CardTitle className="text-sm sm:text-base font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${metric.color}`} />
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-2xl sm:text-3xl font-bold">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
