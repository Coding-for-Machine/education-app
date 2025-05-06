import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Award, Medal, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function ContestResultsPage({ params }: { params: { contestId: string } }) {
  return (
    <div className="container py-10">
      <div className="flex items-center mb-6">
        <Link
          href={`/contests/${params.contestId}`}
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Contest
        </Link>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CSS Battle 2023 Results</h1>
          <p className="text-muted-foreground mt-2">Contest completed on April 25, 2023 with 187 participants</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-8">
          <Card className="bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  1st Place
                </CardTitle>
                <Badge
                  variant="outline"
                  className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                >
                  Winner
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mt-2">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Winner avatar"
                    className="object-cover"
                    fill
                  />
                </div>
                <div>
                  <div className="font-bold text-lg">Alex Johnson</div>
                  <div className="text-sm text-muted-foreground">Score: 98/100</div>
                </div>
              </div>
              <div className="mt-4 text-sm">
                <p>
                  Created a pixel-perfect implementation with exceptional attention to detail and creative use of CSS
                  techniques.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5 text-slate-500" />
                  2nd Place
                </CardTitle>
                <Badge
                  variant="outline"
                  className="bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300"
                >
                  Runner-up
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mt-2">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Runner-up avatar"
                    className="object-cover"
                    fill
                  />
                </div>
                <div>
                  <div className="font-bold text-lg">Sarah Miller</div>
                  <div className="text-sm text-muted-foreground">Score: 95/100</div>
                </div>
              </div>
              <div className="mt-4 text-sm">
                <p>Demonstrated excellent CSS skills with innovative approaches to complex design challenges.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  3rd Place
                </CardTitle>
                <Badge
                  variant="outline"
                  className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                >
                  Third Place
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mt-2">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Third place avatar"
                    className="object-cover"
                    fill
                  />
                </div>
                <div>
                  <div className="font-bold text-lg">Michael Chen</div>
                  <div className="text-sm text-muted-foreground">Score: 92/100</div>
                </div>
              </div>
              <div className="mt-4 text-sm">
                <p>Created an elegant solution with clean code and excellent performance optimization.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="leaderboard">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="leaderboard" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Full Leaderboard</CardTitle>
                <CardDescription>All participants ranked by their scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboardData.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="font-medium w-8">{entry.rank}</div>
                        <div className="relative h-8 w-8 rounded-full overflow-hidden">
                          <Image
                            src="/placeholder.svg?height=50&width=50"
                            alt={`${entry.name} avatar`}
                            className="object-cover"
                            fill
                          />
                        </div>
                        <div>{entry.name}</div>
                      </div>
                      <div className="font-medium">{entry.score}/100</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="submissions" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Submissions</CardTitle>
                <CardDescription>View the best solutions from the contest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {topSubmissions.map((submission, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">{submission.title}</CardTitle>
                          <Badge variant="outline">{submission.rank}</Badge>
                        </div>
                        <CardDescription>{submission.author}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video relative rounded-md overflow-hidden bg-muted">
                          <Image
                            src="/placeholder.svg?height=200&width=350"
                            alt={submission.title}
                            className="object-cover"
                            fill
                          />
                        </div>
                        <div className="mt-2 text-sm">
                          <p>{submission.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="statistics" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Contest Statistics</CardTitle>
                <CardDescription>Insights and data from the contest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Total Participants</div>
                    <div className="text-3xl font-bold">187</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Average Score</div>
                    <div className="text-3xl font-bold">76.3</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Completion Rate</div>
                    <div className="text-3xl font-bold">92%</div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <h3 className="font-medium">Score Distribution</h3>
                  <div className="h-40 flex items-end gap-1">
                    {scoreDistribution.map((count, score) => (
                      <div
                        key={score}
                        className="bg-primary/80 rounded-t-sm w-full"
                        style={{ height: `${(count / Math.max(...scoreDistribution)) * 100}%` }}
                        title={`${score * 10}-${score * 10 + 9} points: ${count} participants`}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0-9</span>
                    <span>10-19</span>
                    <span>20-29</span>
                    <span>30-39</span>
                    <span>40-49</span>
                    <span>50-59</span>
                    <span>60-69</span>
                    <span>70-79</span>
                    <span>80-89</span>
                    <span>90-100</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center">
          <Button asChild>
            <Link href="/contests">Browse More Contests</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

const leaderboardData = [
  { rank: 1, name: "Alex Johnson", score: 98 },
  { rank: 2, name: "Sarah Miller", score: 95 },
  { rank: 3, name: "Michael Chen", score: 92 },
  { rank: 4, name: "Emily Rodriguez", score: 90 },
  { rank: 5, name: "David Kim", score: 89 },
  { rank: 6, name: "Jessica Taylor", score: 87 },
  { rank: 7, name: "Ryan Patel", score: 85 },
  { rank: 8, name: "Olivia Wilson", score: 84 },
  { rank: 9, name: "James Lee", score: 82 },
  { rank: 10, name: "Sophia Martinez", score: 81 },
]

const topSubmissions = [
  {
    title: "Responsive Card Component",
    author: "Alex Johnson",
    rank: "1st Place",
    description: "A beautifully designed card component with smooth animations and perfect accessibility.",
  },
  {
    title: "Interactive Navigation Menu",
    author: "Sarah Miller",
    rank: "2nd Place",
    description: "A creative navigation menu with unique transitions and excellent mobile responsiveness.",
  },
  {
    title: "Form Input Components",
    author: "Michael Chen",
    rank: "3rd Place",
    description: "A collection of form inputs with validation and elegant error handling.",
  },
  {
    title: "Dashboard Layout",
    author: "Emily Rodriguez",
    rank: "4th Place",
    description: "A clean and efficient dashboard layout with responsive grid system.",
  },
]

const scoreDistribution = [2, 5, 8, 12, 18, 25, 35, 42, 28, 12]
