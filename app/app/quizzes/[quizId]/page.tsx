"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Clock,
  FileText,
  CheckCircle,
  AlertTriangle,
  Award,
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function QuizDetailPage({ params }: { params: { quizId: string } }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [quiz, setQuiz] = useState<any>(null)

  useEffect(() => {
    setIsLoaded(true)
    // In a real app, you would fetch quiz details from an API
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

  return (
    <div className="container py-10">
      <motion.div className="space-y-8" initial="hidden" animate={isLoaded ? "show" : "hidden"} variants={container}>
        <motion.div variants={item} className="flex items-center justify-between">
          <Link
            href="/quizzes"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Testlar ro'yxatiga qaytish
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{quiz.title}</h1>
              <p className="text-muted-foreground mt-2">{quiz.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge
                  variant="outline"
                  className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                >
                  {quiz.questions_count} savollar
                </Badge>
                <Badge variant="outline">{Math.floor(quiz.time_limit / 60)} daqiqa</Badge>
                <Badge variant="outline">O'tish bali: {quiz.passing_score}%</Badge>
              </div>
            </div>
            <Button size="lg" className="gap-2" asChild>
              <Link href={`/quizzes/${quiz.id}/take`}>
                Testni boshlash <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div variants={item} className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Umumiy ma'lumot</TabsTrigger>
                <TabsTrigger value="attempts">Urinishlar</TabsTrigger>
                <TabsTrigger value="statistics">Statistika</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Test haqida</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-muted-foreground">Savollar soni</div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{quiz.questions_count} ta savol</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-muted-foreground">Vaqt chegarasi</div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{Math.floor(quiz.time_limit / 60)} daqiqa</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-muted-foreground">O'tish bali</div>
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span>{quiz.passing_score}%</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-muted-foreground">Ruxsat etilgan urinishlar</div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{quiz.attempts_allowed} marta</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <div className="text-sm font-medium mb-2">Qo'shimcha ma'lumot</div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Test yakunlangandan so'ng to'g'ri javoblar ko'rsatiladi</li>
                        <li>Har bir savol uchun faqat bitta javob to'g'ri</li>
                        <li>Testni boshlashdan oldin barcha ma'lumotlarni diqqat bilan o'qing</li>
                        <li>Test vaqti tugagandan so'ng, javoblar avtomatik ravishda saqlanadi</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tavsiyalar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Vaqtni to'g'ri taqsimlang</h4>
                          <p className="text-sm text-muted-foreground">
                            Har bir savolga taxminan 1-2 daqiqa vaqt ajrating. Qiyin savollarga ko'proq vaqt sarflang.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Savollarni diqqat bilan o'qing</h4>
                          <p className="text-sm text-muted-foreground">
                            Har bir savolni to'liq o'qing va tushunganingizga ishonch hosil qiling.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Testni yakunlashni unutmang</h4>
                          <p className="text-sm text-muted-foreground">
                            Barcha savollarga javob berganingizdan so'ng, testni yakunlash tugmasini bosing.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="attempts" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sizning urinishlaringiz</CardTitle>
                    <CardDescription>
                      Siz bu testni {quiz.user_attempts_count} marta yechgansiz. Ruxsat etilgan urinishlar soni:{" "}
                      {quiz.attempts_allowed}.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {quiz.attempts && quiz.attempts.length > 0 ? (
                        quiz.attempts.map((attempt: any, index: number) => (
                          <Card key={index} className="overflow-hidden">
                            <CardContent className="p-0">
                              <div className="flex flex-col md:flex-row">
                                <div
                                  className={`p-4 md:w-1/4 flex items-center justify-center ${attempt.passed ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}
                                >
                                  <div className="text-center">
                                    <div className="text-3xl font-bold mb-1">{attempt.score}%</div>
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
                                <div className="p-4 flex-1">
                                  <div className="grid grid-cols-2 gap-4">
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
                                      <div className="font-medium">
                                        {attempt.duration < 60
                                          ? `${Math.round(attempt.duration)} soniya`
                                          : `${Math.floor(attempt.duration / 60)} daqiqa ${Math.round(attempt.duration % 60)} soniya`}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-4">
                                    <Button size="sm" variant="outline" asChild>
                                      <Link href={`/quizzes/${quiz.id}/attempts/${attempt.id}`}>
                                        Natijalarni ko'rish
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">Urinishlar yo'q</h3>
                          <p className="text-muted-foreground mb-4">Siz hali bu testni yechmagansiz.</p>
                          <Button asChild>
                            <Link href={`/quizzes/${quiz.id}/take`}>Testni boshlash</Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="statistics" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Test statistikasi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-muted/50 p-4 rounded-md text-center">
                          <div className="text-2xl font-bold">{quiz.user_attempts_count}</div>
                          <div className="text-sm text-muted-foreground">Urinishlar</div>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-md text-center">
                          <div className="text-2xl font-bold">0%</div>
                          <div className="text-sm text-muted-foreground">O'rtacha ball</div>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-md text-center">
                          <div className="text-2xl font-bold">0%</div>
                          <div className="text-sm text-muted-foreground">Muvaffaqiyat darajasi</div>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-md text-center">
                          <div className="text-2xl font-bold">0</div>
                          <div className="text-sm text-muted-foreground">Eng yaxshi natija</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Savollar bo'yicha statistika</h4>
                        <div className="space-y-3">
                          {[1, 2, 3, 4].map((questionId) => (
                            <div key={questionId} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{questionId}-savol</span>
                                <span className="text-muted-foreground">0% to'g'ri</span>
                              </div>
                              <Progress value={0} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div variants={item} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test ma'lumotlari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Yaratilgan sana</span>
                    <span className="text-sm font-medium">{new Date(quiz.created_at).toLocaleDateString("uz-UZ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Yangilangan sana</span>
                    <span className="text-sm font-medium">{new Date(quiz.updated_at).toLocaleDateString("uz-UZ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Urinishlar</span>
                    <span className="text-sm font-medium">
                      {quiz.user_attempts_count}/{quiz.attempts_allowed}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">To'g'ri javoblar</span>
                    <span className="text-sm font-medium">
                      {quiz.show_correct_answers ? "Ko'rsatiladi" : "Ko'rsatilmaydi"}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/quizzes/${quiz.id}/take`}>Testni boshlash</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sizning natijalaringiz</CardTitle>
              </CardHeader>
              <CardContent>
                {quiz.user_attempts_count > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Eng yaxshi natija</div>
                        <div className="font-medium">0%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">O'rtacha ball</div>
                        <div className="font-medium">0%</div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Natija tarixingiz</div>
                      <Progress value={0} className="h-2" />
                    </div>
                    <Button size="sm" variant="outline" className="w-full" asChild>
                      <Link href={`/quizzes/${quiz.id}/attempts`}>Barcha urinishlarni ko'rish</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="text-sm text-muted-foreground mb-4">Siz hali bu testni yechmagansiz</div>
                    <Button size="sm" className="w-full" asChild>
                      <Link href={`/quizzes/${quiz.id}/take`}>Testni boshlash</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tavsiya etilgan testlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link
                    href="#"
                    className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-colors"
                  >
                    <div>
                      <div className="font-medium">JavaScript asoslari</div>
                      <div className="text-xs text-muted-foreground">20 ta savol</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-colors"
                  >
                    <div>
                      <div className="font-medium">HTML va CSS</div>
                      <div className="text-xs text-muted-foreground">15 ta savol</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-colors"
                  >
                    <div>
                      <div className="font-medium">SQL asoslari</div>
                      <div className="text-xs text-muted-foreground">10 ta savol</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
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
  attempts: [
    {
      id: 2,
      score: 0,
      passed: false,
      started_at: "2025-05-05T20:16:42.180Z",
      completed_at: "2025-05-05T20:16:42.180Z",
      duration: 0.000064,
    },
    {
      id: 1,
      score: 0,
      passed: false,
      started_at: "2025-05-05T19:30:37.898Z",
      completed_at: "2025-05-05T19:30:37.898Z",
      duration: 0.000036,
    },
  ],
}
