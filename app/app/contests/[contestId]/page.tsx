import Link from "next/link"
import { ArrowLeft, Calendar, Clock, FileText, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ContestPage({ params }: { params: { contestId: string } }) {
  // In a real app, you would fetch the contest data based on the contestId
  const contest = contests.find((c) => c.id === params.contestId) || contests[0]

  return (
    <div className="container py-10">
      <div className="flex items-center mb-6">
        <Link
          href="/contests"
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Contests
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">{contest.title}</h1>
              <Badge
                variant="outline"
                className={
                  contest.status === "upcoming"
                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                    : contest.status === "active"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                      : "bg-muted text-muted-foreground"
                }
              >
                {contest.status === "upcoming" ? "Upcoming" : contest.status === "active" ? "Active" : "Completed"}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-2">{contest.description}</p>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="prizes">Prizes</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contest Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Start Date</div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{contest.startDate}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">End Date</div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{contest.endDate}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Duration</div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{contest.duration}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Difficulty</div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span>{contest.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="text-sm font-medium mb-2">Description</div>
                    <p>{contest.longDescription}</p>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Requirements</div>
                    <ul className="list-disc pl-5 space-y-1">
                      {contest.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="relative border-l border-muted-foreground/20 ml-3 space-y-6">
                    {contest.timeline.map((event, index) => (
                      <li key={index} className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full -left-3">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </span>
                        <h3 className="font-medium">{event.title}</h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-muted-foreground">
                          {event.time}
                        </time>
                        <p className="text-sm">{event.description}</p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="rules" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contest Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="mb-4">{contest.rulesIntro}</p>
                    <ul className="list-disc pl-5 space-y-2">
                      {contest.rules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Judging Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>{contest.judgingIntro}</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      {contest.judgingCriteria.map((criteria, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h3 className="font-medium mb-2">
                            {criteria.name} ({criteria.weight}%)
                          </h3>
                          <p className="text-sm text-muted-foreground">{criteria.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="prizes" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Prizes and Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p>{contest.prizesIntro}</p>
                    <div className="grid gap-6 md:grid-cols-3">
                      {contest.prizes.map((prize, index) => (
                        <div
                          key={index}
                          className={`border rounded-lg p-6 text-center ${index === 0 ? "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800" : index === 1 ? "bg-slate-50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800" : index === 2 ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800" : ""}`}
                        >
                          <div className="text-lg font-bold mb-2">{prize.place}</div>
                          <div className="text-2xl font-bold mb-4">{prize.reward}</div>
                          <div className="text-sm text-muted-foreground">{prize.description}</div>
                        </div>
                      ))}
                    </div>

                    {contest.additionalPrizes && (
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Additional Prizes</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {contest.additionalPrizes.map((prize, index) => (
                            <li key={index}>{prize}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Status</span>
                  <Badge
                    variant="outline"
                    className={
                      contest.status === "upcoming"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        : contest.status === "active"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          : "bg-muted text-muted-foreground"
                    }
                  >
                    {contest.status === "upcoming" ? "Upcoming" : contest.status === "active" ? "Active" : "Completed"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Participants</span>
                  <span className="text-sm font-medium">{contest.participants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Registration Deadline</span>
                  <span className="text-sm font-medium">{contest.registrationDeadline}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {contest.status === "upcoming" ? (
                <Button className="w-full">Register Now</Button>
              ) : contest.status === "active" ? (
                <Button className="w-full" asChild>
                  <Link href={`/contests/${contest.id}/participate`}>Participate Now</Link>
                </Button>
              ) : (
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/contests/${contest.id}/results`}>View Results</Link>
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contest.resources.map((resource, index) => (
                  <Link
                    key={index}
                    href={resource.url}
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{resource.name}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organizers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contest.organizers.map((organizer, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      {organizer.initials}
                    </div>
                    <div>
                      <div className="font-medium">{organizer.name}</div>
                      <div className="text-xs text-muted-foreground">{organizer.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const contests = [
  {
    id: "frontend-challenge-2023",
    title: "Frontend Challenge 2023",
    description: "Build a responsive web application using React and CSS",
    longDescription:
      "This challenge focuses on creating a modern, responsive web application using React and CSS. Participants will be given a design mockup and API specifications, and will need to implement a fully functional frontend application that matches the design and interacts with the provided API endpoints.",
    status: "upcoming",
    startDate: "May 15, 2023, 9:00 AM UTC",
    endDate: "May 17, 2023, 9:00 AM UTC",
    duration: "48 hours",
    difficulty: "Intermediate",
    participants: 156,
    registrationDeadline: "May 14, 2023, 11:59 PM UTC",
    requirements: [
      "Knowledge of React and modern JavaScript",
      "Experience with CSS and responsive design",
      "Familiarity with RESTful APIs",
      "Understanding of web accessibility principles",
      "Git version control",
    ],
    timeline: [
      {
        title: "Registration Opens",
        time: "May 1, 2023, 9:00 AM UTC",
        description: "Contest registration begins",
      },
      {
        title: "Registration Closes",
        time: "May 14, 2023, 11:59 PM UTC",
        description: "Last chance to register for the contest",
      },
      {
        title: "Contest Starts",
        time: "May 15, 2023, 9:00 AM UTC",
        description: "Challenge details and requirements released",
      },
      {
        title: "Contest Ends",
        time: "May 17, 2023, 9:00 AM UTC",
        description: "Deadline for all submissions",
      },
      {
        title: "Results Announced",
        time: "May 24, 2023, 3:00 PM UTC",
        description: "Winners and honorable mentions announced",
      },
    ],
    rulesIntro: "To ensure a fair and enjoyable experience for all participants, please adhere to the following rules:",
    rules: [
      "All code must be original and created during the contest period",
      "You may use open-source libraries and frameworks, but must cite them",
      "You must work individually, not as a team",
      "Your submission must be compatible with modern browsers",
      "You must submit your code to the provided GitHub repository",
      "Your solution must follow the provided design specifications",
      "You must include documentation on how to run your application",
    ],
    judgingIntro: "Submissions will be evaluated based on the following criteria:",
    judgingCriteria: [
      {
        name: "Functionality",
        weight: 30,
        description: "Does the application work as expected? Are all features implemented correctly?",
      },
      {
        name: "Design Fidelity",
        weight: 25,
        description: "How closely does the implementation match the provided design?",
      },
      {
        name: "Code Quality",
        weight: 20,
        description: "Is the code well-structured, maintainable, and following best practices?",
      },
      {
        name: "Responsiveness",
        weight: 15,
        description: "Does the application work well on different screen sizes?",
      },
      {
        name: "Accessibility",
        weight: 10,
        description: "Does the application follow web accessibility guidelines?",
      },
    ],
    prizesIntro: "The top performers in this contest will receive the following prizes:",
    prizes: [
      {
        place: "1st Place",
        reward: "$500",
        description: "Cash prize and featured on our platform",
      },
      {
        place: "2nd Place",
        reward: "$250",
        description: "Cash prize and featured on our platform",
      },
      {
        place: "3rd Place",
        reward: "$100",
        description: "Cash prize and featured on our platform",
      },
    ],
    additionalPrizes: [
      "Top 10 participants will receive a certificate of excellence",
      "All participants will receive a digital badge for their profile",
      "Best UI/UX implementation will receive a special mention",
    ],
    resources: [
      {
        name: "Contest Brief",
        url: "#",
      },
      {
        name: "Design Mockups",
        url: "#",
      },
      {
        name: "API Documentation",
        url: "#",
      },
      {
        name: "Submission Guidelines",
        url: "#",
      },
    ],
    organizers: [
      {
        name: "Sarah Johnson",
        initials: "SJ",
        role: "Contest Director",
      },
      {
        name: "Michael Chen",
        initials: "MC",
        role: "Technical Lead",
      },
      {
        name: "Emily Rodriguez",
        initials: "ER",
        role: "Design Judge",
      },
    ],
  },
  {
    id: "web-accessibility",
    title: "Web Accessibility Hackathon",
    description: "Create accessible web components following WCAG guidelines",
    longDescription:
      "This hackathon challenges participants to create accessible web components that follow the Web Content Accessibility Guidelines (WCAG). You'll be tasked with building common UI components that are fully accessible to users with disabilities, including those using screen readers, keyboard navigation, and other assistive technologies.",
    status: "active",
    startDate: "May 6, 2023, 9:00 AM UTC",
    endDate: "May 8, 2023, 9:00 AM UTC",
    duration: "48 hours",
    difficulty: "Intermediate",
    participants: 78,
    registrationDeadline: "May 5, 2023, 11:59 PM UTC",
    requirements: [
      "Knowledge of HTML, CSS, and JavaScript",
      "Understanding of WCAG guidelines",
      "Experience with ARIA attributes",
      "Familiarity with screen readers and keyboard navigation",
      "Git version control",
    ],
    timeline: [
      {
        title: "Registration Opens",
        time: "April 20, 2023, 9:00 AM UTC",
        description: "Contest registration begins",
      },
      {
        title: "Registration Closes",
        time: "May 5, 2023, 11:59 PM UTC",
        description: "Last chance to register for the contest",
      },
      {
        title: "Contest Starts",
        time: "May 6, 2023, 9:00 AM UTC",
        description: "Challenge details and requirements released",
      },
      {
        title: "Contest Ends",
        time: "May 8, 2023, 9:00 AM UTC",
        description: "Deadline for all submissions",
      },
      {
        title: "Results Announced",
        time: "May 15, 2023, 3:00 PM UTC",
        description: "Winners and honorable mentions announced",
      },
    ],
    rulesIntro: "To ensure a fair and inclusive hackathon, please follow these rules:",
    rules: [
      "All components must be original and created during the hackathon",
      "You may use open-source libraries and frameworks, but must cite them",
      "Your components must pass WCAG 2.1 AA compliance checks",
      "You must include documentation on how to use your components",
      "Your submission must include test cases for accessibility",
      "You must submit your code to the provided GitHub repository",
    ],
    judgingIntro: "Submissions will be evaluated based on the following criteria:",
    judgingCriteria: [
      {
        name: "Accessibility",
        weight: 40,
        description: "How well do the components meet WCAG guidelines and work with assistive technologies?",
      },
      {
        name: "Usability",
        weight: 25,
        description: "Are the components intuitive and easy to use for all users?",
      },
      {
        name: "Code Quality",
        weight: 20,
        description: "Is the code well-structured, maintainable, and following best practices?",
      },
      {
        name: "Documentation",
        weight: 15,
        description: "Is the documentation clear, comprehensive, and helpful?",
      },
    ],
    prizesIntro: "The top performers in this hackathon will receive the following prizes:",
    prizes: [
      {
        place: "1st Place",
        reward: "$300",
        description: "Cash prize and featured on our platform",
      },
      {
        place: "2nd Place",
        reward: "$150",
        description: "Cash prize and featured on our platform",
      },
      {
        place: "3rd Place",
        reward: "$50",
        description: "Cash prize and featured on our platform",
      },
    ],
    additionalPrizes: [
      "All participants will receive a digital accessibility badge for their profile",
      "Best innovation in accessibility will receive a special mention",
      "Top 5 components may be featured in our accessibility showcase",
    ],
    resources: [
      {
        name: "Hackathon Brief",
        url: "#",
      },
      {
        name: "WCAG Guidelines",
        url: "#",
      },
      {
        name: "Accessibility Testing Tools",
        url: "#",
      },
      {
        name: "Submission Guidelines",
        url: "#",
      },
    ],
    organizers: [
      {
        name: "David Wilson",
        initials: "DW",
        role: "Accessibility Expert",
      },
      {
        name: "Lisa Chang",
        initials: "LC",
        role: "Technical Lead",
      },
      {
        name: "Robert Martinez",
        initials: "RM",
        role: "UX Specialist",
      },
    ],
  },
]
