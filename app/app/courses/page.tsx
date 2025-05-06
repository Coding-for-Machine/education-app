import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, Clock, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function CoursesPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-4 md:space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">Browse our collection of courses to find what interests you.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search courses..." className="w-full bg-background pl-8" />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id} className="group">
              <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="object-cover transition-transform group-hover:scale-105"
                    fill
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                      {course.category}
                    </span>
                    <span className="text-xs font-medium bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="gap-1 w-full">
                    View Course <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const courses = [
  {
    id: "web-development",
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    image: "/placeholder.svg?height=200&width=350",
    duration: "8 weeks",
    lessons: 24,
    category: "Development",
    level: "Beginner",
  },
  {
    id: "data-science",
    title: "Introduction to Data Science",
    description: "Master the fundamentals of data analysis and visualization.",
    image: "/placeholder.svg?height=200&width=350",
    duration: "10 weeks",
    lessons: 32,
    category: "Data Science",
    level: "Intermediate",
  },
  {
    id: "mobile-app",
    title: "Mobile App Development",
    description: "Build cross-platform mobile applications using React Native.",
    image: "/placeholder.svg?height=200&width=350",
    duration: "12 weeks",
    lessons: 36,
    category: "Development",
    level: "Intermediate",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Principles",
    description: "Learn the fundamentals of user interface and experience design.",
    image: "/placeholder.svg?height=200&width=350",
    duration: "6 weeks",
    lessons: 18,
    category: "Design",
    level: "Beginner",
  },
  {
    id: "machine-learning",
    title: "Machine Learning Basics",
    description: "Introduction to machine learning algorithms and applications.",
    image: "/placeholder.svg?height=200&width=350",
    duration: "14 weeks",
    lessons: 42,
    category: "Data Science",
    level: "Advanced",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Strategies",
    description: "Learn effective digital marketing techniques for business growth.",
    image: "/placeholder.svg?height=200&width=350",
    duration: "8 weeks",
    lessons: 24,
    category: "Marketing",
    level: "Beginner",
  },
]
