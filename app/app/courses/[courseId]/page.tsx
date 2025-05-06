import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CoursePage({ params }: { params: { courseId: string } }) {
  // In a real app, you would fetch the course data based on the courseId
  const course = courses.find((c) => c.id === params.courseId) || courses[0]

  return (
    <div className="container py-10">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-muted-foreground mt-2">{course.description}</p>
          </div>

          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image src={course.image || "/placeholder.svg"} alt={course.title} className="object-cover" fill priority />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button size="icon" className="h-16 w-16 rounded-full">
                <Play className="h-8 w-8" />
                <span className="sr-only">Play course introduction</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 pt-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">About This Course</h3>
                <p className="text-muted-foreground">{course.longDescription}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">What You'll Learn</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {course.learningOutcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="curriculum" className="space-y-4 pt-4">
              <div>
                <h3 className="text-xl font-semibold mb-4">Course Content</h3>
                <div className="space-y-4">
                  {course.modules.map((module, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Module {i + 1}: {module.title}
                        </CardTitle>
                        <CardDescription>
                          {module.lessons.length} lessons • {module.duration}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {module.lessons.map((lesson, j) => (
                            <li key={j}>
                              <Link
                                href={`/courses/${course.id}/lessons/${lesson.id}`}
                                className="flex items-center justify-between py-2 hover:bg-muted px-2 rounded-md transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <Play className="h-4 w-4 text-muted-foreground" />
                                  <span>{lesson.title}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-4 pt-4">
              <div>
                <h3 className="text-xl font-semibold mb-4">Student Reviews</h3>
                <div className="space-y-4">
                  {course.reviews.map((review, i) => (
                    <Card key={i}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden">
                            <Image
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.name}
                              className="object-cover"
                              fill
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="font-medium">{review.name}</div>
                            <div className="text-sm text-muted-foreground">{review.date}</div>
                            <p className="text-sm mt-2">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="text-3xl font-bold">{course.price}</div>
                <Button className="w-full">Enroll Now</Button>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Course Duration</span>
                    <span className="text-sm font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Lessons</span>
                    <span className="text-sm font-medium">{course.lessons} lessons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Skill Level</span>
                    <span className="text-sm font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Certificate</span>
                    <span className="text-sm font-medium">Yes</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={course.instructor.avatar || "/placeholder.svg"}
                    alt={course.instructor.name}
                    className="object-cover"
                    fill
                  />
                </div>
                <div>
                  <div className="font-medium">{course.instructor.name}</div>
                  <div className="text-sm text-muted-foreground">{course.instructor.title}</div>
                </div>
              </div>
              <p className="text-sm mt-4">{course.instructor.bio}</p>
            </CardContent>
          </Card>
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
    longDescription:
      "This comprehensive course will take you from a complete beginner to being able to create fully functional websites. You'll learn HTML for structure, CSS for styling, and JavaScript for interactivity. By the end of this course, you'll have the skills to build responsive websites that work across all devices.",
    image: "/placeholder.svg?height=400&width=800",
    duration: "8 weeks",
    lessons: 24,
    category: "Development",
    level: "Beginner",
    price: "$49.99",
    learningOutcomes: [
      "Build responsive websites using HTML5 and CSS3",
      "Create interactive web pages with JavaScript",
      "Understand web development best practices",
      "Deploy websites to production environments",
      "Optimize websites for performance and SEO",
      "Implement modern CSS frameworks",
    ],
    modules: [
      {
        title: "Introduction to HTML",
        duration: "1 week",
        lessons: [
          { id: "html-basics", title: "HTML Basics", duration: "15 min" },
          { id: "html-elements", title: "HTML Elements", duration: "20 min" },
          { id: "html-forms", title: "HTML Forms", duration: "25 min" },
        ],
      },
      {
        title: "CSS Fundamentals",
        duration: "2 weeks",
        lessons: [
          { id: "css-basics", title: "CSS Basics", duration: "20 min" },
          { id: "css-layout", title: "CSS Layout", duration: "30 min" },
          { id: "css-responsive", title: "Responsive Design", duration: "35 min" },
        ],
      },
      {
        title: "JavaScript Essentials",
        duration: "3 weeks",
        lessons: [
          { id: "js-basics", title: "JavaScript Basics", duration: "25 min" },
          { id: "js-dom", title: "DOM Manipulation", duration: "30 min" },
          { id: "js-events", title: "Event Handling", duration: "25 min" },
        ],
      },
    ],
    reviews: [
      {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "October 15, 2023",
        comment:
          "This course was exactly what I needed to start my web development journey. The instructor explains concepts clearly and the projects are practical.",
      },
      {
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "September 28, 2023",
        comment:
          "I've tried several web development courses, but this one stands out for its practical approach and clear explanations. I feel much more confident in my skills now.",
      },
      {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "August 12, 2023",
        comment:
          "Great course content and structure. The projects helped me apply what I learned immediately. Highly recommended for beginners.",
      },
    ],
    instructor: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=100&width=100",
      title: "Senior Web Developer",
      bio: "David has over 10 years of experience in web development and has worked with companies like Google and Facebook. He's passionate about teaching and has helped thousands of students start their web development careers.",
    },
  },
  {
    id: "data-science",
    title: "Introduction to Data Science",
    description: "Master the fundamentals of data analysis and visualization.",
    longDescription:
      "This course provides a comprehensive introduction to data science, covering essential concepts and tools. You'll learn how to collect, analyze, and visualize data to extract meaningful insights. By the end of this course, you'll have the skills to tackle real-world data problems.",
    image: "/placeholder.svg?height=400&width=800",
    duration: "10 weeks",
    lessons: 32,
    category: "Data Science",
    level: "Intermediate",
    price: "$59.99",
    learningOutcomes: [
      "Understand data science fundamentals",
      "Analyze and visualize data using Python",
      "Apply statistical methods to data problems",
      "Build predictive models",
      "Communicate data insights effectively",
      "Work with real-world datasets",
    ],
    modules: [
      {
        title: "Introduction to Data Science",
        duration: "1 week",
        lessons: [
          { id: "ds-intro", title: "What is Data Science?", duration: "20 min" },
          { id: "ds-tools", title: "Data Science Tools", duration: "25 min" },
          { id: "ds-workflow", title: "Data Science Workflow", duration: "30 min" },
        ],
      },
      {
        title: "Data Analysis with Python",
        duration: "3 weeks",
        lessons: [
          { id: "python-basics", title: "Python Basics", duration: "30 min" },
          { id: "pandas-intro", title: "Introduction to Pandas", duration: "35 min" },
          { id: "data-cleaning", title: "Data Cleaning", duration: "40 min" },
        ],
      },
      {
        title: "Data Visualization",
        duration: "2 weeks",
        lessons: [
          { id: "viz-basics", title: "Visualization Basics", duration: "25 min" },
          { id: "matplotlib", title: "Matplotlib", duration: "30 min" },
          { id: "seaborn", title: "Seaborn", duration: "35 min" },
        ],
      },
    ],
    reviews: [
      {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "November 5, 2023",
        comment:
          "This course gave me a solid foundation in data science. The instructor explains complex concepts in an easy-to-understand way.",
      },
      {
        name: "James Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "October 20, 2023",
        comment:
          "Great introduction to data science. The hands-on projects were particularly helpful in reinforcing the concepts.",
      },
      {
        name: "Lisa Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "September 15, 2023",
        comment:
          "I started this course with no prior experience in data science, and now I feel confident in my ability to analyze data. Highly recommended!",
      },
    ],
    instructor: {
      name: "Jennifer Lee",
      avatar: "/placeholder.svg?height=100&width=100",
      title: "Data Scientist",
      bio: "Jennifer has a PhD in Statistics and has worked as a data scientist for over 8 years. She has experience in healthcare, finance, and e-commerce industries and loves making complex data concepts accessible to everyone.",
    },
  },
]
