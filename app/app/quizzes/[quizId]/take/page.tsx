"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, CheckCircle, AlertTriangle, ChevronLeft, ChevronRight, Flag, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function QuizTakePage({ params }: { params: { quizId: string } }) {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [quiz, setQuiz] = useState<any>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [attemptId, setAttemptId] = useState<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsLoaded(true)
    // In a real app, you would fetch quiz details and create an attempt from an API
    setQuiz(quizData)
    setTimeLeft(quizData.time_limit)

    // Mock API call to create an attempt
    setAttemptId(3)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (timeLeft > 0 && quiz) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout)
            handleSubmitQuiz()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [quiz, timeLeft])

  const handleAnswerSelect = (questionId: number, answerId: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmitQuiz = () => {
    setIsSubmitting(true)

    // In a real app, you would submit the answers to an API
    setTimeout(() => {
      setIsSubmitting(false)
      // Redirect to results page
      router.push(`/quizzes/${params.quizId}/attempts/${attemptId}`)
    }, 1500)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const answeredQuestionsCount = Object.keys(userAnswers).length
  const progress = (answeredQuestionsCount / (quiz?.questions?.length || 1)) * 100

  if (!quiz) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Yuklanmoqda...</p>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]

  return (
    <div className="container py-6">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Testdan chiqish
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Testdan chiqishni xohlaysizmi?</AlertDialogTitle>
                <AlertDialogDescription>
                  Agar testdan chiqsangiz, joriy javoblaringiz saqlanmaydi va bu urinish bekor qilinadi.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Link href={`/quizzes/${params.quizId}`}>Testdan chiqish</Link>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-1 py-1.5">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{formatTime(timeLeft)}</span>
            </Badge>
            <Badge variant="outline" className="gap-1 py-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-muted-foreground" />
              <span>
                {answeredQuestionsCount}/{quiz.questions.length} javob berildi
              </span>
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Jarayon</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline">
                {currentQuestionIndex + 1}/{quiz.questions.length}-savol
              </Badge>
              <Button variant="ghost" size="sm" className="gap-1">
                <Flag className="h-4 w-4" />
                Belgilash
              </Button>
            </div>
            <CardTitle className="text-lg mt-2">{currentQuestion.description}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={userAnswers[currentQuestion.id]?.toString() || ""}
              onValueChange={(value) => handleAnswerSelect(currentQuestion.id, Number.parseInt(value))}
              className="space-y-3"
            >
              {currentQuestion.answers.map((answer: any) => (
                <div
                  key={answer.id}
                  className="flex items-center space-x-2 border p-4 rounded-md hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={answer.id.toString()} id={`answer-${answer.id}`} />
                  <Label htmlFor={`answer-${answer.id}`} className="flex-grow cursor-pointer">
                    {answer.description}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Oldingi
            </Button>
            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <Button onClick={handleNextQuestion} className="gap-1">
                Keyingi
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
                <DialogTrigger asChild>
                  <Button className="gap-1">
                    <Save className="h-4 w-4" />
                    Testni yakunlash
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Testni yakunlashni tasdiqlang</DialogTitle>
                    <DialogDescription>
                      Siz {quiz.questions.length} ta savoldan {answeredQuestionsCount} tasiga javob berdingiz.
                      {answeredQuestionsCount < quiz.questions.length && (
                        <div className="mt-2 flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                          <span>Siz hali barcha savollarga javob bermagansiz. Davom etishni xohlaysizmi?</span>
                        </div>
                      )}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
                      Bekor qilish
                    </Button>
                    <Button onClick={handleSubmitQuiz} disabled={isSubmitting}>
                      {isSubmitting ? "Yuklanmoqda..." : "Testni yakunlash"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </CardFooter>
        </Card>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {quiz.questions.map((_: any, index: number) => (
            <Button
              key={index}
              variant={userAnswers[quiz.questions[index].id] ? "default" : "outline"}
              className={`h-10 w-10 p-0 ${currentQuestionIndex === index ? "ring-2 ring-primary" : ""}`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>

        <div className="flex justify-end">
          <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Save className="h-4 w-4" />
                Testni yakunlash
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </motion.div>
    </div>
  )
}

// Mock data
const quizData = {
  id: 1,
  title: "Python dasturlash tildan test",
  slug: "python-dasturlash-tildan-test",
  description: "Python dasturlash tilidan 30 ta test",
  time_limit: 600,
  passing_score: 70,
  show_correct_answers: true,
  attempts_allowed: 10,
  created_at: "2025-05-05T11:33:24.443Z",
  updated_at: "2025-05-05T19:54:47.647Z",
  questions_count: 4,
  user_attempts_count: 2,
  questions: [
    {
      id: 4,
      description: "Quyidagilardan qaysi biri Python'da ro'yxatni bildiradi?",
      answers: [
        {
          id: 13,
          description: "{1, 2, 3}",
          is_correct: false,
        },
        {
          id: 14,
          description: "(1, 2, 3)",
          is_correct: false,
        },
        {
          id: 15,
          description: "[1, 2, 3]",
          is_correct: true,
        },
        {
          id: 16,
          description: "<1, 2, 3>",
          is_correct: false,
        },
      ],
    },
    {
      id: 3,
      description: "Python dasturida o'zgaruvchi e'lon qilish qaysi qatorda to'g'ri?",
      answers: [
        {
          id: 9,
          description: "let x = 5",
          is_correct: false,
        },
        {
          id: 10,
          description: "int x = 5",
          is_correct: false,
        },
        {
          id: 11,
          description: "x = 5",
          is_correct: true,
        },
        {
          id: 12,
          description: "var x = 5",
          is_correct: false,
        },
      ],
    },
    {
      id: 2,
      description: "input() nima?",
      answers: [
        {
          id: 5,
          description: "chiqarish",
          is_correct: false,
        },
        {
          id: 6,
          description: "kirgazish",
          is_correct: true,
        },
        {
          id: 7,
          description: "utkazish",
          is_correct: false,
        },
        {
          id: 8,
          description: "olish",
          is_correct: false,
        },
      ],
    },
    {
      id: 1,
      description: "print() nima?",
      answers: [
        {
          id: 1,
          description: "chiqarish funksiyasi",
          is_correct: true,
        },
        {
          id: 2,
          description: "kirgazish",
          is_correct: false,
        },
        {
          id: 3,
          description: "utkazish",
          is_correct: false,
        },
        {
          id: 4,
          description: "va hkoza",
          is_correct: false,
        },
      ],
    },
  ],
}
