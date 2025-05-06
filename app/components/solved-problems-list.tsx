import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ChevronRight } from "lucide-react"

interface SolvedProblem {
  problem_id: number
  problem_title: string
  is_completed: boolean
  score: number
}

export function SolvedProblemsList({ problems }: { problems: SolvedProblem[] }) {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Solved Problems</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {problems.map((problem) => (
            <Link
              key={problem.problem_id}
              href={`/problems/${problem.problem_id}`}
              className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-colors"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">{problem.problem_title}</span>
                {problem.is_completed && (
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  >
                    Completed
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{problem.score} pts</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
