"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Code, FileCode, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function CourseTaskPage({ params }: { params: { courseId: string } }) {
  const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Webpage</title>
  <style>
    /* Add your CSS here */
  </style>
</head>
<body>
  <!-- Add your HTML here -->
  
  <script>
    // Add your JavaScript here
  </script>
</body>
</html>`)

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [feedback, setFeedback] = useState("")

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    // In a real app, you would send the code to a server for evaluation
    setFeedback(
      "Great job! Your solution meets all the requirements. The HTML structure is correct, and you've included the necessary elements. Consider adding more CSS styling to make your page more visually appealing.",
    )
  }

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            href={`/courses/${params.courseId}`}
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Link>
          <Badge variant="outline" className="gap-1">
            <CheckCircle className="h-3.5 w-3.5 text-green-500" />
            Quiz Completed
          </Badge>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Practical Task: Create a Simple Webpage</h1>
            <p className="text-muted-foreground mt-1">
              Apply what you've learned by creating a simple webpage with HTML, CSS, and JavaScript.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Task Instructions</CardTitle>
              <CardDescription>Create a simple webpage that includes the following elements:</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>A heading with the title "My First Webpage"</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>A paragraph introducing yourself</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>A list of your favorite hobbies or interests</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>An image (you can use a placeholder)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>CSS styling to make the page look nice</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>A simple JavaScript function that displays an alert when a button is clicked</span>
                </li>
              </ul>
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
                <iframe srcDoc={code} title="Preview" className="w-full h-full border-0" sandbox="allow-scripts" />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href={`/courses/${params.courseId}/quiz`}>Back to Quiz</Link>
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitted}>
              <Save className="mr-2 h-4 w-4" />
              Submit Task
            </Button>
          </div>

          {isSubmitted && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feedback}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/courses/${params.courseId}`}>Back to Course</Link>
                </Button>
                <Button asChild>
                  <Link href="/contests">Try a Contest</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
