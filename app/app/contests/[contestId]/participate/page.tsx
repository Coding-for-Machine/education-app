"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock, Code, FileCode, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function ContestParticipationPage({ params }: { params: { contestId: string } }) {
  const [code, setCode] = useState(`// Your solution here
function solution() {
  // Implement your solution
  return "Hello, Contest!";
}

// Test your solution
console.log(solution());
`)

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState("23:45:12")

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/contests/${params.contestId}`}
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Contest
        </Link>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            Active
          </Badge>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Time left: {timeLeft}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Web Accessibility Hackathon</h1>
            <p className="text-muted-foreground mt-1">Create accessible web components following WCAG guidelines</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Challenge: Accessible Dropdown Menu</CardTitle>
              <CardDescription>
                Create a fully accessible dropdown menu component that works with keyboard navigation and screen
                readers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Requirements</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>The dropdown must be operable using only a keyboard</li>
                  <li>It must work with screen readers and announce its state</li>
                  <li>It should support arrow key navigation between menu items</li>
                  <li>The menu should close when Escape key is pressed</li>
                  <li>The component should follow WCAG 2.1 AA guidelines</li>
                  <li>Include proper ARIA attributes and roles</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Evaluation Criteria</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Accessibility compliance (40%)</li>
                  <li>Usability and user experience (25%)</li>
                  <li>Code quality and best practices (20%)</li>
                  <li>Documentation and comments (15%)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="code">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code">
                <Code className="mr-2 h-4 w-4" />
                Code Editor
              </TabsTrigger>
              <TabsTrigger value="preview">
                <FileCode className="mr-2 h-4 w-4" />
                Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="code" className="border rounded-md p-4 min-h-[400px]">
              <Textarea value={code} onChange={handleCodeChange} className="font-mono text-sm h-[400px]" />
            </TabsContent>
            <TabsContent value="preview" className="border rounded-md p-4 min-h-[400px]">
              <div className="bg-white h-[400px] overflow-auto">
                <iframe
                  srcDoc={`
                  <!DOCTYPE html>
                  <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Preview</title>
                    <style>
                      body {
                        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        padding: 20px;
                      }
                    </style>
                  </head>
                  <body>
                    <div id="root"></div>
                    <script>
                      ${code}
                    </script>
                  </body>
                  </html>
                `}
                  title="Preview"
                  className="w-full h-full border-0"
                  sandbox="allow-scripts"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between">
            <Button variant="outline">Save Draft</Button>
            <Button onClick={handleSubmit} disabled={isSubmitted}>
              <Send className="mr-2 h-4 w-4" />
              Submit Solution
            </Button>
          </div>

          {isSubmitted && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Solution Submitted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Your solution has been submitted successfully. You can continue to make changes until the contest
                  ends.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="ml-auto">
                  <Link href={`/contests/${params.contestId}`}>Back to Contest</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contest Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Status</span>
                  <Badge
                    variant="outline"
                    className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                  >
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">End Date</span>
                  <span className="text-sm font-medium">May 8, 2023, 9:00 AM UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Time Left</span>
                  <span className="text-sm font-medium">{timeLeft}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Submission Status</h3>
                <div className="flex items-center gap-2">
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Solution submitted</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Not submitted yet</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="#" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors">
                  <FileCode className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">WCAG Guidelines</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors">
                  <FileCode className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">ARIA Best Practices</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors">
                  <FileCode className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Keyboard Navigation Guide</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors">
                  <FileCode className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Submission Guidelines</span>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                If you have any questions or need assistance, you can reach out to the contest organizers.
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
