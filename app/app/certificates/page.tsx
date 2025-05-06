"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Award, Calendar, Download, Eye, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
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
      <motion.div className="space-y-8" initial="hidden" animate={isLoaded ? "show" : "hidden"} variants={container}>
        <motion.div variants={fadeIn} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent pb-1">
              Your Certificates
            </h1>
            <p className="text-muted-foreground mt-2">
              View and download certificates for your completed courses and contests
            </p>
          </div>
          <Button asChild className="self-start md:self-auto">
            <Link href="/profile">
              View Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-4 items-start">
          <div className="relative flex w-full md:max-w-md items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search certificates..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Date (Newest First)</DropdownMenuItem>
              <DropdownMenuItem>Date (Oldest First)</DropdownMenuItem>
              <DropdownMenuItem>Type (Course)</DropdownMenuItem>
              <DropdownMenuItem>Type (Contest)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="courses">Course Certificates</TabsTrigger>
              <TabsTrigger value="contests">Contest Certificates</TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="pt-6">
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {courseCertificates.map((certificate, index) => (
                  <motion.div key={index} variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                    <Card className="overflow-hidden h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="aspect-[1.4/1] relative bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-800 p-6 flex items-center justify-center">
                        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff8,transparent)]" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                          <Award className="h-40 w-40 text-white" />
                        </div>
                        <div className="relative text-center space-y-1 text-white">
                          <div className="text-xs uppercase tracking-wider opacity-80">Certificate of Completion</div>
                          <div className="text-xl font-bold line-clamp-2">{certificate.course}</div>
                          <div className="text-sm opacity-80">{certificate.issueDate}</div>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">{certificate.course}</CardTitle>
                          <Badge
                            variant="outline"
                            className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                          >
                            {certificate.type}
                          </Badge>
                        </div>
                        <CardDescription>Issued on {certificate.issueDate}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Valid for {certificate.validity}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button variant="outline" size="sm" className="w-full gap-1 group" asChild>
                          <Link href={`/certificates/${certificate.id}`}>
                            <Eye className="h-4 w-4 group-hover:scale-110 transition-transform" /> View
                          </Link>
                        </Button>
                        <Button size="sm" className="w-full gap-1 group">
                          <Download className="h-4 w-4 group-hover:scale-110 transition-transform" /> Download
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="contests" className="pt-6">
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {contestCertificates.map((certificate, index) => (
                  <motion.div key={index} variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                    <Card className="overflow-hidden h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="aspect-[1.4/1] relative bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800 p-6 flex items-center justify-center">
                        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff8,transparent)]" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                          <Award className="h-40 w-40 text-white" />
                        </div>
                        <div className="relative text-center space-y-1 text-white">
                          <div className="text-xs uppercase tracking-wider opacity-80">Certificate of Achievement</div>
                          <div className="text-xl font-bold line-clamp-2">{certificate.contest}</div>
                          <div className="text-sm opacity-80">{certificate.issueDate}</div>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">{certificate.contest}</CardTitle>
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                          >
                            {certificate.placement}
                          </Badge>
                        </div>
                        <CardDescription>Issued on {certificate.issueDate}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span>{certificate.achievement}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button variant="outline" size="sm" className="w-full gap-1 group" asChild>
                          <Link href={`/certificates/${certificate.id}`}>
                            <Eye className="h-4 w-4 group-hover:scale-110 transition-transform" /> View
                          </Link>
                        </Button>
                        <Button size="sm" className="w-full gap-1 group">
                          <Download className="h-4 w-4 group-hover:scale-110 transition-transform" /> Download
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div variants={fadeIn} className="flex justify-center pt-4">
          <Button variant="outline" asChild className="group">
            <Link href="/profile">
              View Your Profile <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

const courseCertificates = [
  {
    id: "web-dev-cert-2023",
    course: "Web Development Fundamentals",
    type: "Course Completion",
    issueDate: "March 15, 2023",
    validity: "Lifetime",
    credentialId: "WD-2023-1234-ABCD",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    issuer: {
      name: "EduLearn Academy",
      logo: "/placeholder.svg?height=50&width=50",
      signature: "/placeholder.svg?height=100&width=200",
    },
    recipient: {
      name: "John Doe",
      email: "john.doe@example.com",
      id: "STU-2023-5678",
    },
    metadata: {
      completionDate: "March 10, 2023",
      hoursSpent: 42.5,
      grade: "A",
      instructorName: "David Wilson",
    },
  },
  {
    id: "js-advanced-cert-2023",
    course: "JavaScript Advanced Concepts",
    type: "Course Completion",
    issueDate: "May 22, 2023",
    validity: "Lifetime",
    credentialId: "JS-2023-5678-EFGH",
    skills: ["Advanced JavaScript", "ES6+", "Async Programming", "Design Patterns"],
    issuer: {
      name: "EduLearn Academy",
      logo: "/placeholder.svg?height=50&width=50",
      signature: "/placeholder.svg?height=100&width=200",
    },
    recipient: {
      name: "John Doe",
      email: "john.doe@example.com",
      id: "STU-2023-5678",
    },
    metadata: {
      completionDate: "May 18, 2023",
      hoursSpent: 38.2,
      grade: "A-",
      instructorName: "Emily Rodriguez",
    },
  },
  {
    id: "responsive-design-cert-2023",
    course: "Responsive Web Design",
    type: "Course Completion",
    issueDate: "July 10, 2023",
    validity: "Lifetime",
    credentialId: "RWD-2023-9012-IJKL",
    skills: ["CSS Grid", "Flexbox", "Media Queries", "Mobile-First Design"],
    issuer: {
      name: "EduLearn Academy",
      logo: "/placeholder.svg?height=50&width=50",
      signature: "/placeholder.svg?height=100&width=200",
    },
    recipient: {
      name: "John Doe",
      email: "john.doe@example.com",
      id: "STU-2023-5678",
    },
    metadata: {
      completionDate: "July 5, 2023",
      hoursSpent: 35.7,
      grade: "A+",
      instructorName: "Sarah Miller",
    },
  },
  {
    id: "html-css-cert-2023",
    course: "HTML5 and CSS3 Mastery",
    type: "Course Completion",
    issueDate: "September 5, 2023",
    validity: "Lifetime",
    credentialId: "HC-2023-3456-MNOP",
    skills: ["HTML5 APIs", "CSS3 Animations", "Semantic HTML", "CSS Architecture"],
    issuer: {
      name: "EduLearn Academy",
      logo: "/placeholder.svg?height=50&width=50",
      signature: "/placeholder.svg?height=100&width=200",
    },
    recipient: {
      name: "John Doe",
      email: "john.doe@example.com",
      id: "STU-2023-5678",
    },
    metadata: {
      completionDate: "August 30, 2023",
      hoursSpent: 40.3,
      grade: "B+",
      instructorName: "Michael Chen",
    },
  },
]

const contestCertificates = [
  {
    id: "css-battle-cert-2023",
    contest: "CSS Battle 2023",
    placement: "1st Place",
    achievement: "Winner of the CSS Battle 2023 competition",
    issueDate: "April 28, 2023",
    credentialId: "CB-2023-1234-QRST",
    skills: ["CSS", "Design", "Problem Solving", "Optimization"],
    issuer: {
      name: "EduLearn Contests",
      logo: "/placeholder.svg?height=50&width=50",
      signature: "/placeholder.svg?height=100&width=200",
    },
    recipient: {
      name: "John Doe",
      email: "john.doe@example.com",
      id: "STU-2023-5678",
    },
    metadata: {
      contestDate: "April 25, 2023",
      participants: 187,
      score: 98,
      prize: "$500",
    },
  },
  {
    id: "js-challenge-cert-2023",
    contest: "JavaScript Coding Challenge",
    placement: "2nd Place",
    achievement: "Runner-up in the JavaScript Coding Challenge",
    issueDate: "May 12, 2023",
    credentialId: "JC-2023-5678-UVWX",
    skills: ["JavaScript", "Algorithms", "Data Structures", "Performance"],
    issuer: {
      name: "EduLearn Contests",
      logo: "/placeholder.svg?height=50&width=50",
      signature: "/placeholder.svg?height=100&width=200",
    },
    recipient: {
      name: "John Doe",
      email: "john.doe@example.com",
      id: "STU-2023-5678",
    },
    metadata: {
      contestDate: "May 10, 2023",
      participants: 203,
      score: 95,
      prize: "$250",
    },
  },
  {
    id: "hackathon-cert-2023",
    contest: "Web Accessibility Hackathon",
    placement: "Honorable Mention",
    achievement: "Special recognition for accessibility innovation",
    issueDate: "May 15, 2023",
    credentialId: "WA-2023-9012-YZAB",
    skills: ["Accessibility", "ARIA", "Semantic HTML", "User Experience"],
    issuer: {
      name: "EduLearn Contests",
      logo: "/placeholder.svg?height=50&width=50",
      signature: "/placeholder.svg?height=100&width=200",
    },
    recipient: {
      name: "John Doe",
      email: "john.doe@example.com",
      id: "STU-2023-5678",
    },
    metadata: {
      contestDate: "May 8, 2023",
      participants: 78,
      score: 88,
      specialAward: "Accessibility Innovation Award",
    },
  },
]
