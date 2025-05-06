import Link from "next/link"
import { ArrowRight, Calendar, Clock, Trophy, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ContestsPage() {
  return (
    <div className="container py-10">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coding Contests</h1>
          <p className="text-muted-foreground mt-2">
            Participate in coding challenges to test your skills and compete with other students.
          </p>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-6 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingContests.map((contest, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-1">{contest.title}</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                      >
                        Upcoming
                      </Badge>
                    </div>
                    <CardDescription>{contest.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Starts: {contest.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Duration: {contest.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span>Difficulty: {contest.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{contest.participants} registered</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/contests/${contest.id}`}>
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="active" className="space-y-6 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeContests.map((contest, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-1">{contest.title}</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                      >
                        Active
                      </Badge>
                    </div>
                    <CardDescription>{contest.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Ends: {contest.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Time left: {contest.timeLeft}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span>Difficulty: {contest.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{contest.participants} participating</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href={`/contests/${contest.id}/participate`}>
                        Participate Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past" className="space-y-6 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pastContests.map((contest, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-1">{contest.title}</CardTitle>
                      <Badge variant="outline" className="bg-muted text-muted-foreground">
                        Completed
                      </Badge>
                    </div>
                    <CardDescription>{contest.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Ended: {contest.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span>Difficulty: {contest.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{contest.participants} participated</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/contests/${contest.id}/results`}>
                        View Results <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

const upcomingContests = [
  {
    id: "frontend-challenge-2023",
    title: "Frontend Challenge 2023",
    description: "Build a responsive web application using React and CSS",
    startDate: "May 15, 2023",
    duration: "48 hours",
    difficulty: "Intermediate",
    participants: 156,
  },
  {
    id: "algorithm-masters",
    title: "Algorithm Masters",
    description: "Solve complex algorithmic problems with optimal solutions",
    startDate: "May 20, 2023",
    duration: "24 hours",
    difficulty: "Advanced",
    participants: 89,
  },
  {
    id: "data-visualization",
    title: "Data Visualization Challenge",
    description: "Create insightful visualizations from provided datasets",
    startDate: "June 1, 2023",
    duration: "72 hours",
    difficulty: "Intermediate",
    participants: 112,
  },
]

const activeContests = [
  {
    id: "web-accessibility",
    title: "Web Accessibility Hackathon",
    description: "Create accessible web components following WCAG guidelines",
    endDate: "May 8, 2023",
    timeLeft: "23 hours",
    difficulty: "Intermediate",
    participants: 78,
  },
  {
    id: "javascript-challenge",
    title: "JavaScript Coding Challenge",
    description: "Test your JavaScript skills with real-world problems",
    endDate: "May 10, 2023",
    timeLeft: "2 days",
    difficulty: "Beginner",
    participants: 203,
  },
]

const pastContests = [
  {
    id: "css-battle",
    title: "CSS Battle 2023",
    description: "Recreate complex designs using only HTML and CSS",
    endDate: "April 25, 2023",
    difficulty: "Intermediate",
    participants: 187,
  },
  {
    id: "fullstack-challenge",
    title: "Full Stack Development Challenge",
    description: "Build a complete web application with frontend and backend",
    endDate: "April 15, 2023",
    difficulty: "Advanced",
    participants: 94,
  },
  {
    id: "debugging-contest",
    title: "Debugging Contest",
    description: "Find and fix bugs in provided code snippets",
    endDate: "April 5, 2023",
    difficulty: "Beginner",
    participants: 156,
  },
]
