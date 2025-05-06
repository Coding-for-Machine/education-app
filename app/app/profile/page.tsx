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
  CheckCircle,
  Clock,
  GraduationCap,
  User,
  Eye,
  Trophy,
  ChevronRight,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

          <Card className="mt-6 border-none shadow-lg">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <div className="p-1.5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-800">
                      {achievement.icon}
                    </div>
                    <div>
                      <div className="font-medium">{achievement.title}</div>
                      <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full group" asChild>
                <Link href="/achievements">
                  View All Achievements{" "}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="contests">Contests</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="space-y-4 pt-4">
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
              <div className="flex justify-center">
                <Button variant="outline" asChild className="group">
                  <Link href="/courses">
                    Browse More Courses{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="certificates" className="space-y-4 pt-4">
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
              <div className="flex justify-center">
                <Button asChild className="group">
                  <Link href="/certificates">
                    View All Certificates{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="contests" className="space-y-4 pt-4">
              <div className="grid gap-4">
                {participatedContests.map((contest, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4 items-start">
                          <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800 flex items-center justify-center">
                            <Trophy className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold">{contest.title}</h3>
                              <Badge
                                variant="outline"
                                className={
                                  contest.placement === "1st Place"
                                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                                    : contest.placement === "2nd Place"
                                      ? "bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300"
                                      : contest.placement === "3rd Place"
                                        ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                                        : "bg-muted text-muted-foreground"
                                }
                              >
                                {contest.placement}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{contest.description}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{contest.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Award className="h-4 w-4 text-muted-foreground" />
                                <span>Score: {contest.score}/100</span>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Button variant="outline" size="sm" asChild className="group">
                                <Link href={`/contests/${contest.id}/results`}>
                                  View Results{" "}
                                  <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                              </Button>
                              {contest.certificateId && (
                                <Button size="sm" asChild className="group">
                                  <Link href={`/certificates/${contest.certificateId}`}>
                                    View Certificate{" "}
                                    <Eye className="ml-1 h-3 w-3 group-hover:scale-110 transition-transform" />
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center">
                <Button variant="outline" asChild className="group">
                  <Link href="/contests">
                    Browse More Contests{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="activity" className="space-y-4 pt-4">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="p-2 rounded-full bg-muted shrink-0">{activity.icon}</div>
                        <div>
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-muted-foreground">{activity.description}</div>
                          <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Learning Statistics</CardTitle>
              <CardDescription>Your learning activity over the past month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-sm font-medium text-muted-foreground">Hours Spent</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    42.5
                  </div>
                </motion.div>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-sm font-medium text-muted-foreground">Lessons Completed</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    78
                  </div>
                </motion.div>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-sm font-medium text-muted-foreground">Quizzes Passed</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    15
                  </div>
                </motion.div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full group" asChild>
                <Link href="/statistics">
                  View Detailed Statistics{" "}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

const achievements = [
  {
    icon: <Award className="h-5 w-5 text-white" />,
    title: "First Course Completed",
    description: "Completed your first course on the platform",
  },
  {
    icon: <CheckCircle className="h-5 w-5 text-white" />,
    title: "Perfect Quiz Score",
    description: "Achieved 100% on a course quiz",
  },
  {
    icon: <BookOpen className="h-5 w-5 text-white" />,
    title: "Learning Streak",
    description: "Completed lessons for 7 consecutive days",
  },
  {
    icon: <GraduationCap className="h-5 w-5 text-white" />,
    title: "Web Development Certificate",
    description: "Earned the Web Development Fundamentals certificate",
  },
]

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

const participatedContests = [
  {
    id: "css-battle",
    title: "CSS Battle 2023",
    description: "Recreate complex designs using only HTML and CSS",
    date: "April 25, 2023",
    placement: "1st Place",
    score: 98,
    participants: 187,
    certificateId: "css-battle-cert-2023",
    prize: "$500",
    skills: ["CSS", "Design", "Problem Solving", "Optimization"],
  },
  {
    id: "javascript-challenge",
    title: "JavaScript Coding Challenge",
    description: "Test your JavaScript skills with real-world problems",
    date: "May 10, 2023",
    placement: "2nd Place",
    score: 95,
    participants: 203,
    certificateId: "js-challenge-cert-2023",
    prize: "$250",
    skills: ["JavaScript", "Algorithms", "Data Structures", "Performance"],
  },
  {
    id: "web-accessibility",
    title: "Web Accessibility Hackathon",
    description: "Create accessible web components following WCAG guidelines",
    date: "May 8, 2023",
    placement: "Honorable Mention",
    score: 88,
    participants: 78,
    certificateId: "hackathon-cert-2023",
    specialAward: "Accessibility Innovation Award",
    skills: ["Accessibility", "ARIA", "Semantic HTML", "User Experience"],
  },
]

const activities = [
  {
    icon: <BookOpen className="h-4 w-4" />,
    title: "Completed Lesson",
    description: "JavaScript Basics in Web Development Fundamentals",
    time: "Today at 10:30 AM",
    type: "lesson_completion",
    courseId: "web-development",
    lessonId: "js-basics",
  },
  {
    icon: <CheckCircle className="h-4 w-4" />,
    title: "Passed Quiz",
    description: "HTML Fundamentals Quiz with 90% score",
    time: "Yesterday at 3:15 PM",
    type: "quiz_completion",
    courseId: "web-development",
    quizId: "html-fundamentals",
    score: 90,
  },
  {
    icon: <Award className="h-4 w-4" />,
    title: "Earned Certificate",
    description: "Completed UI/UX Design Principles course",
    time: "2 days ago at 5:45 PM",
    type: "certificate_earned",
    certificateId: "responsive-design-cert-2023",
    courseId: "ui-ux-design",
  },
  {
    icon: <Trophy className="h-4 w-4" />,
    title: "Contest Participation",
    description: "Participated in CSS Battle 2023 and won 1st place",
    time: "April 25, 2023 at 2:30 PM",
    type: "contest_participation",
    contestId: "css-battle",
    placement: "1st Place",
    certificateId: "css-battle-cert-2023",
  },
  {
    icon: <Clock className="h-4 w-4" />,
    title: "Started Course",
    description: "Enrolled in Introduction to Data Science",
    time: "1 week ago at 9:20 AM",
    type: "course_enrollment",
    courseId: "data-science",
  },
]
