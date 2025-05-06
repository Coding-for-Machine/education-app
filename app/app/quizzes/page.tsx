"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Clock, FileText, Search, SlidersHorizontal, BarChart, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function QuizzesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [quizzes, setQuizzes] = useState<any[]>([])

  useEffect(() => {
    setIsLoaded(true)
    // In a real app, you would fetch quizzes from an API
    setQuizzes(quizData)
  }, [])

  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
              Testlar
            </h1>
            <p className="text-muted-foreground mt-2">
              Bilimingizni sinash uchun testlarni yeching va natijalaringizni kuzating
            </p>
          </div>
          <Button asChild className="self-start md:self-auto">
            <Link href="/quizzes/history">
              Natijalarim <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-4 items-start">
          <div className="relative flex w-full md:max-w-md items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Testlarni qidirish..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </Button>
        </motion.div>

        <motion.div variants={fadeIn}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredQuizzes.map((quiz) => (
              <motion.div key={quiz.id} variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between">
                      <CardTitle className="line-clamp-1">{quiz.title}</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                      >
                        {quiz.questions_count} savollar
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Vaqt chegarasi: {Math.floor(quiz.time_limit / 60)} daqiqa</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>O'tish bali: {quiz.passing_score}%</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>
                          Urinishlar: {quiz.user_attempts_count}/{quiz.attempts_allowed}
                        </span>
                      </div>

                      {quiz.user_attempts_count > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Eng yaxshi natija</span>
                            <span className="font-medium">70%</span>
                          </div>
                          <Progress value={70} className="h-2" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gap-1 group" asChild>
                      <Link href={`/quizzes/${quiz.id}`}>
                        Testni boshlash{" "}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {filteredQuizzes.length === 0 && (
          <motion.div variants={fadeIn} className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Testlar topilmadi</h3>
            <p className="text-muted-foreground mb-6">Qidiruv so'rovingizga mos testlar topilmadi.</p>
            <Button onClick={() => setSearchQuery("")}>Barcha testlarni ko'rsatish</Button>
          </motion.div>
        )}

        <motion.div variants={fadeIn} className="bg-muted/50 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Test statistikasi</h3>
              <p className="text-muted-foreground mb-4">
                Testlarni yechib, o'z bilimingizni sinang va natijalaringizni kuzating.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-md text-center">
                  <div className="text-2xl font-bold text-green-700 dark:text-green-400">{quizzes.length}</div>
                  <div className="text-xs text-green-800 dark:text-green-500">Jami testlar</div>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-md text-center">
                  <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">2</div>
                  <div className="text-xs text-yellow-800 dark:text-yellow-500">Urinishlar</div>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-md text-center">
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">0</div>
                  <div className="text-xs text-blue-800 dark:text-blue-500">Muvaffaqiyatli</div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-40 h-40 relative">
                <BarChart className="w-full h-full text-muted-foreground/30" />
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    0%
                  </div>
                  <div className="text-xs text-muted-foreground">O'rtacha ball</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Mock data
const quizData = [
  {
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
  },
]
