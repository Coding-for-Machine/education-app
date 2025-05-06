"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, CheckCircle, XCircle, Calendar, Award, ArrowRight, Download, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function QuizAttemptResultPage({ params }: { params: { quizId: string; attemptId: string } }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [attempt, setAttempt] = useState<any>(null)
  const [quiz, setQuiz] = useState<any>(null)

  useEffect(() => {
    setIsLoaded(true)
    // In a real app, you would fetch attempt details from an API
    setAttempt(attemptData)
    setQuiz(quizData)
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

  if (!attempt || !quiz) {
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

  // Calculate correct answers count
  const correctAnswersCount = Object.values(attempt.details.question_details).filter((q: any) => q.correct).length
  const totalQuestions = quiz.questions.length
  const scorePercentage = attempt.score || Math.round((correctAnswersCount / totalQuestions) * 100)

  return (
    <div className="container py-10">
      <motion.div className="space-y-8" initial="hidden" animate={isLoaded ? "show" : "hidden"} variants={container}>
        <motion.div variants={item} className="flex items-center justify-between">
          <Link
            href={`/quizzes/${params.quizId}`}
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Testga qaytish
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Yuklab olish
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Ulashish
            </Button>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-none shadow-md">
            <div
              className={`p-6 ${attempt.passed ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}
            >
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold tracking-tight">{quiz.title}</h1>
                  <p className="text-muted-foreground mt-1">Test natijasi</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-1">{scorePercentage}%</div>
                  <Badge
                    variant="outline"
                    className={
                      attempt.passed
                        ? "bg-green-200 text-green-800 dark:bg-green-800/50 dark:text-green-300"
                        : "bg-red-200 text-red-800 dark:bg-red-800/50 dark:text-red-300"
                    }
                  >
                    {attempt.passed ? "Muvaffaqiyatli" : "Muvaffaqiyatsiz"}
                  </Badge>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="text-sm text-muted-foreground">Boshlangan vaqt</div>
                  <div className="font-medium flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    {new Date(attempt.started_at).toLocaleString("uz-UZ")}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Yakunlangan vaqt</div>
                  <div className="font-medium flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    {new Date(attempt.completed_at).toLocaleString("uz-UZ")}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Sarflangan vaqt</div>
                  <div className="font-medium flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    {attempt.duration < 60
                      ? `${Math.round(attempt.duration)} soniya`
                      : `${Math.floor(attempt.duration / 60)} daqiqa ${Math.round(attempt.duration % 60)} soniya`}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">O'tish bali</div>
                  <div className="font-medium flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-muted-foreground" />
                    {quiz.passing_score}%
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Natija</span>
                  <span>
                    {correctAnswersCount}/{totalQuestions} to'g'ri ({scorePercentage}%)
                  </span>
                </div>
                <Progress value={scorePercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn}>
          <h2 className="text-xl font-bold mb-4">Savollar va javoblar</h2>
          <div className="space-y-6">
            {quiz.questions.map((question: any) => {
              const questionDetail = attempt.details.question_details[question.id]
              const userAnswerId = questionDetail?.answered
              const isCorrect = questionDetail?.correct
              const correctAnswerIds = questionDetail?.correct_answers || []

              return (
                <Card key={question.id} className="overflow-hidden border-none shadow-sm">
                  <CardHeader
                    className={`pb-3 ${isCorrect ? "bg-green-50 dark:bg-green-950/20" : userAnswerId ? "bg-red-50 dark:bg-red-950/20" : "bg-yellow-50 dark:bg-yellow-950/20"}`}
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{question.id}-savol</Badge>
                      {isCorrect ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 gap-1">
                          <CheckCircle className="h-3.5 w-3.5" />
                          To'g'ri
                        </Badge>
                      ) : userAnswerId ? (
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 gap-1">
                          <XCircle className="h-3.5 w-3.5" />
                          Noto'g'ri
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                          Javob berilmagan
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base mt-2">{question.description}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {question.answers.map((answer: any) => {
                        const isUserAnswer = userAnswerId === answer.id
                        const isCorrectAnswer = correctAnswerIds.includes(answer.id)

                        return (
                          <div
                            key={answer.id}
                            className={`p-3 rounded-md border ${
                              isUserAnswer && isCorrectAnswer
                                ? "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800"
                                : isUserAnswer && !isCorrectAnswer
                                  ? "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800"
                                  : isCorrectAnswer
                                    ? "bg-green-50 dark:bg-green-950/10 border-green-200 dark:border-green-800"
                                    : ""
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              {isUserAnswer && isCorrectAnswer && (
                                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                              )}
                              {!isUserAnswer && isCorrectAnswer && (
                                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              )}
                              <div className="flex-1">
                                <p>{answer.description}</p>
                                {isCorrectAnswer && (
                                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">To'g'ri javob</p>
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">Sizning javobingiz</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href={`/quizzes/${params.quizId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Testga qaytish
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/quizzes/${params.quizId}/take`}>
              Qayta urinish
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
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

const attemptData = {
  id: 3,
  user_id: 2,
  quiz_id: 1,
  score: 0,
  passed: false,
  started_at: "2025-05-06T14:29:53.610Z",
  completed_at: "2025-05-06T14:29:53.610Z",
  duration: 0.000023,
  details: {
    user_answers: {
      additionalProp1: 0,
      additionalProp2: 0,
      additionalProp3: 0,
    },
    correct_answers: {
      "1": [1],
      "2": [6],
      "3": [11],
      "4": [15],
    },
    question_details: {
      "1": {
        question_id: 1,
        answered: null,
        correct: false,
        correct_answers: [1],
      },
      "2": {
        question_id: 2,
        answered: null,
        correct: false,
        correct_answers: [6],
      },
      "3": {
        question_id: 3,
        answered: null,
        correct: false,
        correct_answers: [11],
      },
      "4": {
        question_id: 4,
        answered: null,
        correct: false,
        correct_answers: [15],
      },
    },
  },
}
