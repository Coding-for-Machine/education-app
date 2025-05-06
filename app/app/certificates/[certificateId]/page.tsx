"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Award,
  Calendar,
  Download,
  Mail,
  Share2,
  User,
  Check,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function CertificatePage({ params }: { params: { certificateId: string } }) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [copied, setCopied] = useState(false)
  const certificateRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // In a real app, you would fetch the certificate data based on the certificateId
  // For this example, we'll use a hardcoded certificate
  const certificate = certificates.find((cert) => cert.id === params.certificateId) || certificates[0]

  const handleDownload = () => {
    setIsDownloading(true)
    // In a real app, you would implement actual PDF generation and download
    setTimeout(() => {
      setIsDownloading(false)
    }, 1500)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://edulearn.example/certificates/${certificate.id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
      <motion.div initial="hidden" animate={isLoaded ? "show" : "hidden"} variants={container} className="space-y-6">
        <motion.div variants={item} className="flex items-center justify-between mb-6">
          <Link
            href="/certificates"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Certificates
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload} disabled={isDownloading} className="group">
              <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              {isDownloading ? "Downloading..." : "Download PDF"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="group">
                  <Share2 className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleCopyLink} className="gap-2 cursor-pointer">
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <Facebook className="h-4 w-4 text-blue-600" />
                  Share on Facebook
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <Twitter className="h-4 w-4 text-blue-400" />
                  Share on Twitter
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <Linkedin className="h-4 w-4 text-blue-700" />
                  Share on LinkedIn
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div variants={item} className="lg:col-span-2 space-y-6">
            <motion.div
              ref={certificateRef}
              className="bg-white dark:bg-slate-900 border rounded-lg overflow-hidden shadow-xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="p-8 md:p-12 relative">
                {/* Certificate Header */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <motion.div
                      className="h-16 w-16 bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-800 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                    >
                      <Award className="h-8 w-8 text-white" />
                    </motion.div>
                  </div>
                  <motion.h1
                    className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Certificate of {certificate.type}
                  </motion.h1>
                  <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    This certifies that
                  </motion.p>
                </div>

                {/* Recipient Name */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h2 className="text-xl md:text-2xl font-bold border-b pb-2 border-dashed inline-block px-8">
                    {certificate.recipient.name}
                  </h2>
                </motion.div>

                {/* Certificate Body */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-muted-foreground mb-4">
                    has successfully completed the {certificate.type === "Achievement" ? "contest" : "course"}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold mb-4">
                    {certificate.type === "Achievement" ? certificate.contest : certificate.course}
                  </h3>
                  {certificate.type === "Achievement" && (
                    <Badge className="mb-4 text-base px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                      {certificate.placement}
                    </Badge>
                  )}
                  <p className="text-muted-foreground">
                    Issued on <span className="font-medium">{certificate.issueDate}</span>
                  </p>
                </motion.div>

                {/* Certificate Footer */}
                <motion.div
                  className="flex flex-col md:flex-row justify-between items-center mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <div className="h-12 relative mb-2">
                      <Image
                        src="/placeholder.svg?height=50&width=150"
                        alt="Issuer logo"
                        width={150}
                        height={50}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{certificate.issuer.name}</p>
                  </div>

                  <div className="text-center">
                    <div className="h-16 relative mb-2">
                      <Image
                        src="/placeholder.svg?height=60&width=150"
                        alt="Signature"
                        width={150}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Authorized Signature</p>
                  </div>

                  <div className="text-center md:text-right mt-4 md:mt-0">
                    <p className="text-sm font-medium mb-1">Credential ID</p>
                    <p className="text-sm text-muted-foreground">{certificate.credentialId}</p>
                  </div>
                </motion.div>

                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                  <Award className="h-96 w-96" />
                </div>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-md">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="verification">Verification</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 pt-4">
                  <Card className="border-none shadow-md">
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-muted-foreground">Certificate Type</div>
                          <div className="font-medium">{certificate.type}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-muted-foreground">Issue Date</div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{certificate.issueDate}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-muted-foreground">Credential ID</div>
                          <div className="font-medium">{certificate.credentialId}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-muted-foreground">Validity</div>
                          <div className="font-medium">{certificate.validity || "Lifetime"}</div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <div className="text-sm font-medium mb-2">Additional Information</div>
                        {certificate.type === "Achievement" ? (
                          <div className="grid gap-2 md:grid-cols-2">
                            <div className="flex justify-between p-2 bg-muted/50 rounded-md hover:bg-muted transition-colors">
                              <span className="text-sm">Contest Date</span>
                              <span className="text-sm font-medium">{certificate.metadata.contestDate}</span>
                            </div>
                            <div className="flex justify-between p-2 bg-muted/50 rounded-md hover:bg-muted transition-colors">
                              <span className="text-sm">Participants</span>
                              <span className="text-sm font-medium">{certificate.metadata.participants}</span>
                            </div>
                            <div className="flex justify-between p-2 bg-muted/50 rounded-md hover:bg-muted transition-colors">
                              <span className="text-sm">Score</span>
                              <span className="text-sm font-medium">{certificate.metadata.score}/100</span>
                            </div>
                            <div className="flex justify-between p-2 bg-muted/50 rounded-md hover:bg-muted transition-colors">
                              <span className="text-sm">Prize</span>
                              <span className="text-sm font-medium">{certificate.metadata.prize}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="grid gap-2 md:grid-cols-2">
                            <div className="flex justify-between p-2 bg-muted/50 rounded-md hover:bg-muted transition-colors">
                              <span className="text-sm">Completion Date</span>
                              <span className="text-sm font-medium">{certificate.metadata.completionDate}</span>
                            </div>
                            <div className="flex justify-between p-2 bg-muted/50 rounded-md hover:bg-muted transition-colors">
                              <span className="text-sm">Hours Spent</span>
                              <span className="text-sm font-medium">{certificate.metadata.hoursSpent}</span>
                            </div>
                            <div className="flex justify-between p-2 bg-muted/50 rounded-md hover:bg-muted transition-colors">
                              <span className="text-sm">Grade</span>
                              <span className="text-sm font-medium">{certificate.metadata.grade}</span>
                            </div>
                            <div className="flex justify-between p-2 bg-muted/50 rounded-md hover:bg-muted transition-colors">
                              <span className="text-sm">Instructor</span>
                              <span className="text-sm font-medium">{certificate.metadata.instructorName}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="skills" className="space-y-4 pt-4">
                  <Card className="border-none shadow-md">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="text-sm font-medium mb-2">Skills Certified</div>
                        <div className="flex flex-wrap gap-2">
                          {certificate.skills.map((skill, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Badge
                                variant="secondary"
                                className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>

                        <Separator />

                        <div>
                          <div className="text-sm font-medium mb-2">About this Certification</div>
                          <p className="text-sm text-muted-foreground">
                            This certificate validates proficiency in the skills listed above. It was earned through
                            {certificate.type === "Achievement"
                              ? " successful participation and performance in a competitive contest environment."
                              : " completion of a comprehensive course with practical assessments and projects."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="verification" className="space-y-4 pt-4">
                  <Card className="border-none shadow-md">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-medium mb-2">Recipient Information</div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{certificate.recipient.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{certificate.recipient.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-muted-foreground" />
                              <span>Student ID: {certificate.recipient.id}</span>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <div className="text-sm font-medium mb-2">Verify this Certificate</div>
                          <p className="text-sm text-muted-foreground mb-4">
                            To verify the authenticity of this certificate, you can use the credential ID and the
                            verification link below.
                          </p>
                          <div className="flex items-center justify-between p-3 bg-muted rounded-md text-sm font-mono overflow-auto group relative">
                            <span>https://edulearn.example/verify/{certificate.credentialId}</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={handleCopyLink}
                                  >
                                    {copied ? (
                                      <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>

          <motion.div variants={item} className="space-y-6">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-800 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Certificate Actions</div>
                    <div className="text-xs text-muted-foreground">Download or share your certificate</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full gap-1 group" onClick={handleDownload} disabled={isDownloading}>
                    <Download className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    {isDownloading ? "Downloading..." : "Download PDF"}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full gap-1 group">
                        <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        Share Certificate
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={handleCopyLink} className="gap-2 cursor-pointer">
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        Copy Link
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Facebook className="h-4 w-4 text-blue-600" />
                        Share on Facebook
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Twitter className="h-4 w-4 text-blue-400" />
                        Share on Twitter
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Linkedin className="h-4 w-4 text-blue-700" />
                        Share on LinkedIn
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Issuer logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{certificate.issuer.name}</div>
                      <div className="text-xs text-muted-foreground">Certificate Issuer</div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {certificate.issuer.name} is an accredited educational institution providing high-quality online
                    courses and certifications in technology and professional skills.
                  </p>

                  <Button variant="outline" size="sm" className="w-full group">
                    View Issuer Profile{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-sm font-medium">Related Certificates</div>

                  <div className="space-y-3">
                    {relatedCertificates.map((relCert, index) => (
                      <Link
                        key={index}
                        href={`/certificates/${relCert.id}`}
                        className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors"
                      >
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">{relCert.title}</div>
                          <div className="text-xs text-muted-foreground">{relCert.issueDate}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

const certificates = [
  {
    id: "web-dev-cert-2023",
    type: "Completion",
    course: "Web Development Fundamentals",
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
    id: "css-battle-cert-2023",
    type: "Achievement",
    contest: "CSS Battle 2023",
    placement: "1st Place",
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
]

const relatedCertificates = [
  {
    id: "js-advanced-cert-2023",
    title: "JavaScript Advanced Concepts",
    issueDate: "May 22, 2023",
  },
  {
    id: "responsive-design-cert-2023",
    title: "Responsive Web Design",
    issueDate: "July 10, 2023",
  },
  {
    id: "js-challenge-cert-2023",
    title: "JavaScript Coding Challenge",
    issueDate: "May 12, 2023",
  },
]
