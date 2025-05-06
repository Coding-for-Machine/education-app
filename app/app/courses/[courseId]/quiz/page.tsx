"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CourseQuizPage({ params }: { params: { courseId: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes in seconds

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: value,
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let score = 0
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score++
      }
    })
    return score
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            href={`/courses/${params.courseId}`}
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Link>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{formatTime(timeRemaining)}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Module Quiz: Web Development Basics</h1>
            <p className="text-muted-foreground mt-1">
              Test your knowledge of the core concepts covered in this module.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </div>
            <div className="text-sm font-medium">
              {Object.keys(selectedAnswers).length} of {quizQuestions.length} answered
            </div>
          </div>

          <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />

          {!showResults ? (
            <Card>
              <CardHeader>
                <CardTitle>Question {currentQuestion + 1}</CardTitle>
                <CardDescription>{quizQuestions[currentQuestion].question}</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAnswers[currentQuestion] || ""}
                  onValueChange={handleAnswerSelect}
                  className="space-y-3"
                >
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 border p-4 rounded-md">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                  Previous
                </Button>
                <Button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestion]}>
                  {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Quiz Results</CardTitle>
                <CardDescription>
                  You scored {calculateScore()} out of {quizQuestions.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {quizQuestions.map((question, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-start gap-2">
                        {selectedAnswers[index] === question.correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="font-medium">
                            Question {index + 1}: {question.question}
                          </div>
                          <div className="text-sm mt-1">
                            <span className="font-medium">Your answer:</span> {selectedAnswers[index]}
                          </div>
                          {selectedAnswers[index] !== question.correctAnswer && (
                            <div className="text-sm text-green-600 mt-1">
                              <span className="font-medium">Correct answer:</span> {question.correctAnswer}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/courses/${params.courseId}`}>Back to Course</Link>
                </Button>
                <Button asChild>
                  <Link href={`/courses/${params.courseId}/task`}>Continue to Task</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Multi Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    question: "Which CSS property is used to change the text color of an element?",
    options: ["color", "text-color", "font-color", "text-style"],
    correctAnswer: "color",
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Character", "Number"],
    correctAnswer: "Character",
  },
  {
    question: "What is the correct HTML element for the largest heading?",
    options: ["<h1>", "<heading>", "<head>", "<h6>"],
    correctAnswer: "<h1>",
  },
  {
    question: "Which CSS property controls the space between elements?",
    options: ["margin", "padding", "spacing", "border"],
    correctAnswer: "margin",
  },
]
