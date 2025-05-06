import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Award, Flame } from "lucide-react"

interface UserStats {
  total_solved: number
  easy_solved: number
  medium_solved: number
  hard_solved: number
  total_score: number
  current_streak: number
  max_streak: number
  last_activity: string
}

export function ProblemStatsCard({ stats }: { stats: UserStats }) {
  // Format the last activity date
  const formatLastActivity = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Calculate percentages for the progress bars
  const easyPercentage = stats.total_solved > 0 ? (stats.easy_solved / stats.total_solved) * 100 : 0
  const mediumPercentage = stats.total_solved > 0 ? (stats.medium_solved / stats.total_solved) * 100 : 0
  const hardPercentage = stats.total_solved > 0 ? (stats.hard_solved / stats.total_solved) * 100 : 0

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Problem Solving Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">Problems Solved</span>
              </div>
              <span className="font-bold text-lg">{stats.total_solved}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  >
                    Easy
                  </Badge>
                  <span>{stats.easy_solved}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  >
                    Medium
                  </Badge>
                  <span>{stats.medium_solved}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    Hard
                  </Badge>
                  <span>{stats.hard_solved}</span>
                </div>
              </div>
              <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                <div className="bg-green-500 dark:bg-green-600" style={{ width: `${easyPercentage}%` }}></div>
                <div className="bg-yellow-500 dark:bg-yellow-600" style={{ width: `${mediumPercentage}%` }}></div>
                <div className="bg-red-500 dark:bg-red-600" style={{ width: `${hardPercentage}%` }}></div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Total Score</span>
              </div>
              <span className="font-bold text-lg">{stats.total_score}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Current Streak</span>
              </div>
              <span className="font-medium">{stats.current_streak} days</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Max Streak</span>
              </div>
              <span className="font-medium">{stats.max_streak} days</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Last Activity</span>
            </div>
            <span className="text-sm">{formatLastActivity(stats.last_activity)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
