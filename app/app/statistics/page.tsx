import Link from "next/link"
import { ArrowRight, BarChart3, BookOpen, Clock, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  BarChart,
  LineChart as Chart,
  PieChart as Pie,
} from "@/components/ui/chart"

export default function StatisticsPage() {
  return (
    <div className="container py-10">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Statistics</h1>
          <p className="text-muted-foreground mt-2">Track your progress and learning activity over time.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Learning Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127.5</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Quiz Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Learning Hours</CardTitle>
                <CardDescription>Your learning activity over the past 30 days</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    hours: {
                      label: "Hours",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <Chart
                    data={[
                      { date: "2023-04-01", hours: 2.5 },
                      { date: "2023-04-02", hours: 3.2 },
                      { date: "2023-04-03", hours: 1.8 },
                      { date: "2023-04-04", hours: 2.0 },
                      { date: "2023-04-05", hours: 2.7 },
                      { date: "2023-04-06", hours: 3.5 },
                      { date: "2023-04-07", hours: 4.1 },
                      { date: "2023-04-08", hours: 3.8 },
                      { date: "2023-04-09", hours: 2.5 },
                      { date: "2023-04-10", hours: 1.9 },
                      { date: "2023-04-11", hours: 2.2 },
                      { date: "2023-04-12", hours: 3.0 },
                      { date: "2023-04-13", hours: 3.4 },
                      { date: "2023-04-14", hours: 2.8 },
                    ]}
                    xAxis={[{ scaleType: "time", dataKey: "date" }]}
                    series={[{ dataKey: "hours", area: true, color: "var(--color-hours)" }]}
                    height={250}
                  >
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </Chart>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Course Distribution</CardTitle>
                  <CardDescription>Time spent on different course categories</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ChartContainer
                    config={{
                      development: {
                        label: "Development",
                        color: "hsl(var(--chart-1))",
                      },
                      design: {
                        label: "Design",
                        color: "hsl(var(--chart-2))",
                      },
                      dataScience: {
                        label: "Data Science",
                        color: "hsl(var(--chart-3))",
                      },
                      marketing: {
                        label: "Marketing",
                        color: "hsl(var(--chart-4))",
                      },
                    }}
                  >
                    <Pie
                      data={[
                        { id: 0, value: 45, label: "Development" },
                        { id: 1, value: 25, label: "Design" },
                        { id: 2, value: 20, label: "Data Science" },
                        { id: 3, value: 10, label: "Marketing" },
                      ]}
                      series={[
                        {
                          dataKey: "value",
                          colorKey: "label",
                          highlightScope: { faded: "global", highlighted: "item" },
                        },
                      ]}
                      height={250}
                    >
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </Pie>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quiz Performance</CardTitle>
                  <CardDescription>Your scores across different course quizzes</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ChartContainer
                    config={{
                      score: {
                        label: "Score",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <BarChart
                      data={[
                        { quiz: "HTML Basics", score: 90 },
                        { quiz: "CSS Layout", score: 85 },
                        { quiz: "JavaScript", score: 78 },
                        { quiz: "React Intro", score: 92 },
                        { quiz: "Data Analysis", score: 88 },
                      ]}
                      xAxis={[{ scaleType: "band", dataKey: "quiz" }]}
                      series={[{ dataKey: "score", color: "var(--color-score)" }]}
                      height={250}
                    >
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="courses" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
                <CardDescription>Your progress across all enrolled courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {courseProgress.map((course, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-muted-foreground">{course.progress}%</div>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div>
                          {course.completedLessons}/{course.totalLessons} lessons
                        </div>
                        <div>Last accessed: {course.lastAccessed}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Spent per Course</CardTitle>
                <CardDescription>Hours spent on each course</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    hours: {
                      label: "Hours",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <BarChart
                    data={[
                      { course: "Web Development", hours: 42.5 },
                      { course: "Data Science", hours: 28.3 },
                      { course: "UI/UX Design", hours: 35.7 },
                      { course: "Mobile App Dev", hours: 15.2 },
                      { course: "Digital Marketing", hours: 5.8 },
                    ]}
                    xAxis={[{ scaleType: "band", dataKey: "course" }]}
                    series={[{ dataKey: "hours", color: "var(--color-hours)" }]}
                    height={250}
                  >
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activity" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Your learning activity by day of week</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    hours: {
                      label: "Hours",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <BarChart
                    data={[
                      { day: "Monday", hours: 3.5 },
                      { day: "Tuesday", hours: 2.8 },
                      { day: "Wednesday", hours: 4.2 },
                      { day: "Thursday", hours: 3.1 },
                      { day: "Friday", hours: 2.5 },
                      { day: "Saturday", hours: 5.3 },
                      { day: "Sunday", hours: 4.7 },
                    ]}
                    xAxis={[{ scaleType: "band", dataKey: "day" }]}
                    series={[{ dataKey: "hours", color: "var(--color-hours)" }]}
                    height={250}
                  >
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Calendar</CardTitle>
                <CardDescription>Your daily learning activity for the past month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 30 }).map((_, index) => {
                    const intensity = Math.floor(Math.random() * 5)
                    return (
                      <div
                        key={index}
                        className={`h-8 w-8 rounded-sm ${
                          intensity === 0
                            ? "bg-muted"
                            : intensity === 1
                              ? "bg-emerald-100 dark:bg-emerald-900/30"
                              : intensity === 2
                                ? "bg-emerald-200 dark:bg-emerald-800/40"
                                : intensity === 3
                                  ? "bg-emerald-300 dark:bg-emerald-700/60"
                                  : "bg-emerald-400 dark:bg-emerald-600/70"
                        }`}
                        title={`${intensity} hours on April ${index + 1}, 2023`}
                      />
                    )
                  })}
                </div>
                <div className="mt-4 flex items-center justify-end gap-2">
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded-sm bg-muted" />
                    <span className="text-xs text-muted-foreground">0h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded-sm bg-emerald-100 dark:bg-emerald-900/30" />
                    <span className="text-xs text-muted-foreground">1-2h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded-sm bg-emerald-200 dark:bg-emerald-800/40" />
                    <span className="text-xs text-muted-foreground">2-3h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded-sm bg-emerald-300 dark:bg-emerald-700/60" />
                    <span className="text-xs text-muted-foreground">3-4h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded-sm bg-emerald-400 dark:bg-emerald-600/70" />
                    <span className="text-xs text-muted-foreground">4h+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center">
          <Button asChild>
            <Link href="/profile">
              View Your Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

const courseProgress = [
  {
    title: "Web Development Fundamentals",
    progress: 65,
    completedLessons: 16,
    totalLessons: 24,
    lastAccessed: "Yesterday",
  },
  {
    title: "Introduction to Data Science",
    progress: 15,
    completedLessons: 5,
    totalLessons: 32,
    lastAccessed: "3 days ago",
  },
  {
    title: "UI/UX Design Principles",
    progress: 100,
    completedLessons: 18,
    totalLessons: 18,
    lastAccessed: "2 weeks ago",
  },
  {
    title: "Mobile App Development",
    progress: 35,
    completedLessons: 12,
    totalLessons: 36,
    lastAccessed: "1 week ago",
  },
]
