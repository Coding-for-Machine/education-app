import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Code, CheckCircle } from "lucide-react"

interface ActivityItem {
  id: number
  date: string
  activity_count: number
  total_duration: number
  score: number
  problem_solved: number
}

export function RecentActivityList({ activities }: { activities: ActivityItem[] }) {
  // Format duration from seconds to minutes and hours
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds} sec`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
              <div className="p-2 rounded-full bg-muted shrink-0">
                <Code className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{formatDate(activity.date)}</div>
                  <div className="text-sm text-muted-foreground">{activity.activity_count} activities</div>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{formatDuration(activity.total_duration)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>{activity.problem_solved} problems solved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
