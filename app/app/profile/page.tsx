"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  User,
  Eye,
  ChevronRight,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ActivityCalendar } from "@/components/activity-calendar"
import { ProblemStatsCard } from "@/components/problem-stats-card"
import { RecentActivityList } from "@/components/recent-activity-list"
import { SolvedProblemsList } from "@/components/solved-problems-list"

// Mock data for the activity calendar
const contributionData = {
  year: 2025,
  total: 62,
  calendar: [
    {
      month: "Jan",
      days: Array.from({ length: 31 }, (_, i) => ({
        date: `2025-01-${String(i + 1).padStart(2, "0")}`,
        count: 0,
      })),
    },
    {
      month: "Feb",
      days: Array.from({ length: 28 }, (_, i) => ({
        date: `2025-02-${String(i + 1).padStart(2, "0")}`,
        count: 0,
      })),
    },
    {
      month: "Mar",
      days: Array.from({ length: 31 }, (_, i) => ({
        date: `2025-03-${String(i + 1).padStart(2, "0")}`,
        count: 0,
      })),
    },
    {
      month: "Apr",
      days: Array.from({ length: 30 }, (_, i) => {
        const day = i + 1
        let count = 0
        if (day === 21) count = 9
        if (day === 22) count = 15
        if (day === 28) count = 11
        if (day === 29) count = 1
        if (day === 30) count = 4
        return {
          date: `2025-04-${String(day).padStart(2, "0")}`,
          count,
        }
      }),
    },
    {
      month: "May",
      days: Array.from({ length: 31 }, (_, i) => {
        const day = i + 1
        let count = 0
        if (day === 5) count = 21
        if (day === 6) count = 1
        return {
          date: `2025-05-${String(day).padStart(2, "0")}`,
          count,
        }
      }),
    },
    {
      month: "Jun",
      days: Array.from({ length: 30 }, (_, i) => ({
        date: `2025-06-${String(i + 1).padStart(2, "0")}`,
        count: 0,
      })),
    },
    {
      month: "Jul",
      days: Array.from({ length: 31 }, (_, i) => ({
        date: `2025-07-${String(i + 1).padStart(2, "0")}`,
        count: 0,
      })),
    },
    {
      month: "Aug",
      days: Array.from({ length: 31 }, (_, i) => ({
        date: `2025-08-${String(i + 1).padStart(2, "0")}`,
        count: 0,
      })),
    },
    {
      month: "Sep",
      days: Array.from({ length: 30 }, (_, i) => ({
        date: `2025-09-${String(i + 1).padStart(2, "0")}`,
        count: 0,
      })),
    },
    {
      month: "Oct",
      days: Array.from({ length: 31 }, (_, i) => ({
        date: `2025-10-${String(i + 1).padStart(2, "0")}`,
        count: 0,
      })),
    },
    {
      month: "Nov",
      days: Array.from({ length: 30 }, (_, i) => ({
        date: `2025-11-${String(i + 1).padStart(2, "0")}`,
        count: 0,
      })),
    },
    {
      month: "Dec",
      days: Array.from({ length: 31 }, (_, i) => ({
        date: `2025-12-${String(i + 1).padStart(2, "0")}`,
        count: 0,
      })),
    },
  ],
}

// User activity data
const userActivities = [
  {
    id: 8,
    date: "2025-05-06",
    activity_count: 1,
    total_duration: 542,
    score: 0,
    problem_solved: 1,
  },
  {
    id: 7,
    date: "2025-05-05",
    activity_count: 21,
    total_duration: 897,
    score: 0,
    problem_solved: 21,
  },
  {
    id: 6,
    date: "2025-04-30",
    activity_count: 4,
    total_duration: 157,
    score: 0,
    problem_solved: 4,
  },
  {
    id: 5,
    date: "2025-04-29",
    activity_count: 1,
    total_duration: 32,
    score: 0,
    problem_solved: 1,
  },
  {
    id: 3,
    date: "2025-04-28",
    activity_count: 11,
    total_duration: 499,
    score: 0,
    problem_solved: 11,
  },
  {
    id: 2,
    date: "2025-04-22",
    activity_count: 15,
    total_duration: 366,
    score: 0,
    problem_solved: 15,
  },
  {
    id: 1,
    date: "2025-04-21",
    activity_count: 9,
    total_duration: 301,
    score: 0,
    problem_solved: 9,
  },
]

// Solved problems data
const solvedProblems = [
  {
    problem_id: 1,
    problem_title: "A+B",
    is_completed: true,
    score: 100,
  },
  {
    problem_id: 2,
    problem_title: "1 bo'lgan bitlar soni",
    is_completed: true,
    score: 100,
  },
  {
    problem_id: 3,
    problem_title: "Son 4 ning darajasimi?",
    is_completed: true,
    score: 100,
  },
  {
    problem_id: 4,
    problem_title: "Raqamlar yig'indisi",
    is_completed: true,
    score: 250,
  },
  {
    problem_id: 6,
    problem_title: "Palindrom son",
    is_completed: true,
    score: 450,
  },
  {
    problem_id: 5,
    problem_title: "Teskari raqam",
    is_completed: true,
    score: 450,
  },
]

// User stats data
const userStats = {
  total_solved: 6,
  easy_solved: 3,
  medium_solved: 1,
  hard_solved: 2,
  total_score: 1450,
  current_streak: 2,
  max_streak: 2,
  last_activity: "2025-05-06T09:17:53.914Z",
}

export default function ProfilePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <div className="container py-10">
      <motion.div
        className="grid gap-8 lg:grid-cols-3"
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        variants={container}
      >
        <motion.div variants={item} className="lg:col-span-1">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Profile picture" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    John Doe
                  </CardTitle>
                  <CardDescription>Web Development Student</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Joined January 2023</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">3 Courses Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">5 Certificates Earned</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full group">
                Edit Profile <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6 space-y-6">
            <ProblemStatsCard stats={userStats} />
            <RecentActivityList activities={userActivities.slice(0, 3)} />
          </div>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="problems">Problems</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-6 pt-4">
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <ActivityCalendar data={contributionData} />
                </CardContent>
              </Card>

              <RecentActivityList activities={userActivities} />
            </TabsContent>

            <TabsContent value="problems" className="space-y-6 pt-4">
              <SolvedProblemsList problems={solvedProblems} />

              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Problem Solving Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Easy Problems</span>
                        <span className="font-medium">{userStats.easy_solved}/100</span>
                      </div>
                      <Progress
                        value={userStats.easy_solved}
                        max={100}
                        className="h-2"
                        indicatorClassName="bg-gradient-to-r from-green-400 to-green-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Medium Problems</span>
                        <span className="font-medium">{userStats.medium_solved}/75</span>
                      </div>
                      <Progress
                        value={userStats.medium_solved}
                        max={75}
                        className="h-2"
                        indicatorClassName="bg-gradient-to-r from-yellow-400 to-yellow-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Hard Problems</span>
                        <span className="font-medium">{userStats.hard_solved}/50</span>
                      </div>
                      <Progress
                        value={userStats.hard_solved}
                        max={50}
                        className="h-2"
                        indicatorClassName="bg-gradient-to-r from-red-400 to-red-600"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="pt-4">
              <div className="grid gap-4">
                {enrolledCourses.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row gap-4 p-6">
                          <div className="relative h-32 md:h-auto md:w-48 rounded-md overflow-hidden">
                            <Image
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              className="object-cover"
                              fill
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                              <div className="flex items-center gap-1 text-white text-xs">
                                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                                <span>{course.rating}</span>
                                <span className="text-white/70">({course.reviews})</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{course.title}</h3>
                              <Badge
                                variant="outline"
                                className={
                                  course.status === "In Progress"
                                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                                    : course.status === "Just Started"
                                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                                      : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                                }
                              >
                                {course.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{course.description}</p>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span>Progress</span>
                                <span className="font-medium">{course.progress}%</span>
                              </div>
                              <Progress
                                value={course.progress}
                                className="h-2"
                                indicatorClassName={
                                  course.progress === 100
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-600"
                                    : course.progress > 50
                                      ? "bg-gradient-to-r from-blue-500 to-emerald-500"
                                      : "bg-gradient-to-r from-yellow-500 to-blue-500"
                                }
                              />
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{course.lastAccessed}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {course.completedLessons}/{course.totalLessons} lessons
                                </span>
                              </div>
                            </div>
                            <div className="pt-2">
                              <Link href={`/courses/${course.id}`}>
                                <Button variant="outline" size="sm" className="gap-1 group">
                                  Continue Learning{" "}
                                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="certificates" className="pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                {certificates.map((certificate, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Card className="overflow-hidden h-full border-none shadow-md hover:shadow-lg transition-shadow">
                      <div className="aspect-[1.4/1] relative bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-800 p-6 flex items-center justify-center">
                        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff8,transparent)]" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                          <Award className="h-40 w-40 text-white" />
                        </div>
                        <div className="relative text-center space-y-1 text-white">
                          <div className="text-xs uppercase tracking-wider opacity-80">Certificate of Completion</div>
                          <div className="text-xl font-bold line-clamp-2">{certificate.title}</div>
                          <div className="text-sm opacity-80">{certificate.issueDate}</div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="text-sm">{certificate.description}</div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="outline" size="sm" className="w-full gap-1 group" asChild>
                          <Link href={`/certificates/${certificate.id}`}>
                            <Eye className="h-4 w-4 group-hover:scale-110 transition-transform" /> View Certificate
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}

const enrolledCourses = [
  {
    id: "web-development",
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    image: "/placeholder.svg?height=200&width=350",
    status: "In Progress",
    progress: 65,
    lastAccessed: "Yesterday",
    completedLessons: 16,
    totalLessons: 24,
    instructor: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Senior Web Developer",
    },
    startDate: "January 15, 2023",
    endDate: null,
    category: "Development",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    rating: 4.8,
    reviews: 156,
    nextLesson: {
      id: "js-dom",
      title: "DOM Manipulation",
      duration: "30 min",
    },
  },
  {
    id: "data-science",
    title: "Introduction to Data Science",
    description: "Master the fundamentals of data analysis and visualization.",
    image: "/placeholder.svg?height=200&width=350",
    status: "Just Started",
    progress: 15,
    lastAccessed: "3 days ago",
    completedLessons: 5,
    totalLessons: 32,
    instructor: {
      name: "Jennifer Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Data Scientist",
    },
    startDate: "April 10, 2023",
    endDate: null,
    category: "Data Science",
    tags: ["Python", "Data Analysis", "Statistics", "Visualization"],
    rating: 4.7,
    reviews: 124,
    nextLesson: {
      id: "pandas-intro",
      title: "Introduction to Pandas",
      duration: "35 min",
    },
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Principles",
    description: "Learn the fundamentals of user interface and experience design.",
    image: "/placeholder.svg?height=200&width=350",
    status: "Completed",
    progress: 100,
    lastAccessed: "2 weeks ago",
    completedLessons: 18,
    totalLessons: 18,
    instructor: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "UX Designer",
    },
    startDate: "February 5, 2023",
    endDate: "March 20, 2023",
    category: "Design",
    tags: ["UI Design", "UX Design", "Wireframing", "Prototyping"],
    rating: 4.9,
    reviews: 203,
    certificate: {
      id: "responsive-design-cert-2023",
      issueDate: "March 22, 2023",
    },
  },
]

const certificates = [
  {
    id: "web-dev-cert-2023",
    title: "Web Development Fundamentals",
    description: "Completed the comprehensive web development course covering HTML, CSS, and JavaScript.",
    issueDate: "March 15, 2023",
    type: "Course Completion",
    credentialId: "WD-2023-1234-ABCD",
  },
  {
    id: "js-advanced-cert-2023",
    title: "JavaScript Advanced Concepts",
    description: "Mastered advanced JavaScript concepts including ES6+, async programming, and design patterns.",
    issueDate: "May 22, 2023",
    type: "Course Completion",
    credentialId: "JS-2023-5678-EFGH",
  },
  {
    id: "css-battle-cert-2023",
    title: "CSS Battle 2023",
    description: "Achieved 1st place in the CSS Battle competition, demonstrating exceptional CSS skills.",
    issueDate: "April 28, 2023",
    type: "Contest Achievement",
    credentialId: "CB-2023-1234-QRST",
  },
  {
    id: "responsive-design-cert-2023",
    title: "Responsive Web Design",
    description: "Completed the UI/UX design course with focus on responsive design principles.",
    issueDate: "July 10, 2023",
    type: "Course Completion",
    credentialId: "RWD-2023-9012-IJKL",
  },
]
