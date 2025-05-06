"use client"

import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Code,
  Copy,
  ExternalLink,
  Heart,
  Info,
  Lightbulb,
  ListChecks,
  MessageSquare,
  Play,
  RefreshCw,
  Share2,
  ThumbsDown,
  ThumbsUp,
  XCircle,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCodemirror } from "@/hooks/use-codemirror"
import Split from "react-split"

export default function ProblemPage({ params }: { params: { problemId: string } }) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [code, setCode] = useState(`def reverseString(s: list) -> list:
    # Yechimingizni shu yerga yozing
    return []`)
  const [language, setLanguage] = useState("python")
  const [fontSize, setFontSize] = useState("16px")
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResults, setTestResults] = useState<null | {
    passed: boolean
    message: string
    time: string
    memory: string
    testCases: Array<{
      input: string
      expected: string
      output: string
      passed: boolean
    }>
  }>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [activeTestTab, setActiveTestTab] = useState("test1")

  // CodeMirror ni ishga tushirish
  useCodemirror({
    container: editorRef.current,
    value: code,
    onChange: (value) => setCode(value),
    language,
    theme: "dark",
    fontSize,
  })

  // Haqiqiy ilovada, problemId asosida muammo ma'lumotlarini olish kerak
  const problem = problems.find((p) => p.id.toString() === params.problemId) || problems[0]

  useEffect(() => {
    setIsLoaded(true)

    // Muammoga asoslangan boshlang'ich kodni o'rnatish
    if (problem.id === 1) {
      // Reverse String
      setCode(`def reverseString(s: list) -> list:
    # Yechimingizni shu yerga yozing
    return []`)
    } else if (problem.id === 2) {
      // Two Sum
      setCode(`def twoSum(nums: list, target: int) -> list:
    # Yechimingizni shu yerga yozing
    return []`)
    }
  }, [problem.id])

  const handleLanguageChange = (value: string) => {
    setLanguage(value)

    // Tanlangan tilga asoslangan boshlang'ich kodni yangilash
    if (value === "python") {
      if (problem.id === 1) {
        setCode(`def reverseString(s: list) -> list:
    # Yechimingizni shu yerga yozing
    return []`)
      } else if (problem.id === 2) {
        setCode(`def twoSum(nums: list, target: int) -> list:
    # Yechimingizni shu yerga yozing
    return []`)
      }
    } else if (value === "javascript") {
      if (problem.id === 1) {
        setCode(`/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    // Yechimingizni shu yerga yozing
};`)
      } else if (problem.id === 2) {
        setCode(`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Yechimingizni shu yerga yozing
};`)
      }
    } else if (value === "java") {
      if (problem.id === 1) {
        setCode(`class Solution {
    public void reverseString(char[] s) {
        // Yechimingizni shu yerga yozing
    }
}`)
      } else if (problem.id === 2) {
        setCode(`class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Yechimingizni shu yerga yozing
        return new int[]{};
    }
}`)
      }
    } else if (value === "cpp") {
      if (problem.id === 1) {
        setCode(`class Solution {
public:
    void reverseString(vector<char>& s) {
        // Yechimingizni shu yerga yozing
    }
};`)
      } else if (problem.id === 2) {
        setCode(`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Yechimingizni shu yerga yozing
        return {};
    }
};`)
      }
    }
  }

  const handleRunCode = () => {
    setIsRunning(true)
    setTestResults(null)

    // Kodni bajarishni simulyatsiya qilish
    setTimeout(() => {
      setIsRunning(false)

      // Test natijalarini mock qilish
      if (problem.id === 1 && (code.includes("return s[::-1]") || code.includes("return list(reversed(s))"))) {
        setTestResults({
          passed: true,
          message: "Barcha test holatlari muvaffaqiyatli o'tdi!",
          time: "4 ms",
          memory: "13.8 MB",
          testCases: [
            {
              input: '["h","e","l","l","o"]',
              expected: '["o","l","l","e","h"]',
              output: '["o","l","l","e","h"]',
              passed: true,
            },
            {
              input: '["H","a","n","n","a","h"]',
              expected: '["h","a","n","n","a","H"]',
              output: '["h","a","n","n","a","H"]',
              passed: true,
            },
          ],
        })
      } else {
        setTestResults({
          passed: false,
          message: "Ba'zi test holatlari muvaffaqiyatsiz tugadi",
          time: "N/A",
          memory: "N/A",
          testCases: [
            {
              input: '["h","e","l","l","o"]',
              expected: '["o","l","l","e","h"]',
              output: "[]",
              passed: false,
            },
            {
              input: '["H","a","n","n","a","h"]',
              expected: '["h","a","n","n","a","H"]',
              output: "[]",
              passed: false,
            },
          ],
        })
      }
    }, 1500)
  }

  const handleSubmitCode = () => {
    setIsSubmitting(true)
    setTestResults(null)

    // Kodni yuborishni simulyatsiya qilish
    setTimeout(() => {
      setIsSubmitting(false)

      // Yuborish natijalarini mock qilish
      if (problem.id === 1 && (code.includes("return s[::-1]") || code.includes("return list(reversed(s))"))) {
        setTestResults({
          passed: true,
          message: "Barcha test holatlari muvaffaqiyatli o'tdi! Sizning yechimingiz topshiriqlarning 92% dan ustun.",
          time: "4 ms",
          memory: "13.8 MB",
          testCases: [
            {
              input: '["h","e","l","l","o"]',
              expected: '["o","l","l","e","h"]',
              output: '["o","l","l","e","h"]',
              passed: true,
            },
            {
              input: '["H","a","n","n","a","h"]',
              expected: '["h","a","n","n","a","H"]',
              output: '["h","a","n","n","a","H"]',
              passed: true,
            },
          ],
        })
      } else {
        setTestResults({
          passed: false,
          message: "Ba'zi test holatlari muvaffaqiyatsiz tugadi",
          time: "N/A",
          memory: "N/A",
          testCases: [
            {
              input: '["h","e","l","l","o"]',
              expected: '["o","l","l","e","h"]',
              output: "[]",
              passed: false,
            },
            {
              input: '["H","a","n","n","a","h"]',
              expected: '["h","a","n","n","a","H"]',
              output: "[]",
              passed: false,
            },
          ],
        })
      }
    }, 2000)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
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
    <div className="container py-6">
      <motion.div className="space-y-6" initial="hidden" animate={isLoaded ? "show" : "hidden"} variants={container}>
        <motion.div variants={item} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/problems"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Muammolarga qaytish
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1 text-sm">
              <span className="text-muted-foreground">Muammo:</span>
              <span className="font-medium">{problem.id}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500 transition-colors" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sevimlilarga qo'shish</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(window.location.href)}>
                  Havolani nusxalash
                </DropdownMenuItem>
                <DropdownMenuItem>Twitterda ulashish</DropdownMenuItem>
                <DropdownMenuItem>Facebookda ulashish</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{problem.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant="outline"
                  className={
                    problem.difficulty === "Easy"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : problem.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }
                >
                  {problem.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{problem.acceptanceRate}%</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{problem.timeComplexity}</span>
                </div>
              </div>
            </div>
            {problem.status === "Solved" ? (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Yechilgan</Badge>
            ) : problem.status === "Attempted" ? (
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                Urunilgan
              </Badge>
            ) : null}
          </div>
        </motion.div>

        <Split
          className="split flex flex-col lg:flex-row gap-6"
          sizes={[50, 50]}
          minSize={300}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
        >
          <motion.div variants={item} className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description" className="text-xs sm:text-sm">
                  Tavsif
                </TabsTrigger>
                <TabsTrigger value="solution" className="text-xs sm:text-sm">
                  Yechim
                </TabsTrigger>
                <TabsTrigger value="submissions" className="text-xs sm:text-sm">
                  Topshiriqlar
                </TabsTrigger>
                <TabsTrigger value="discussion" className="text-xs sm:text-sm">
                  Muhokama
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <Card className="border-none shadow-md">
                  <CardContent className="p-6">
                    <div className="prose dark:prose-invert max-w-none">
                      <p>{problem.description}</p>

                      <h3 className="text-lg font-semibold mt-4">Funksiya imzosi</h3>
                      <div className="bg-muted/50 p-3 rounded-md font-mono text-sm overflow-x-auto">
                        {problem.functionSignature}
                      </div>

                      <h3 className="text-lg font-semibold mt-4">Misollar</h3>
                      <div className="space-y-4">
                        {problem.examples.map((example, index) => (
                          <div key={index} className="bg-muted/50 p-4 rounded-md">
                            <div className="font-mono text-sm">
                              <div className="mb-2">
                                <span className="font-semibold">Kirish:</span> {example.input}
                              </div>
                              <div className="mb-2">
                                <span className="font-semibold">Chiqish:</span> {example.output}
                              </div>
                              {example.explanation && (
                                <div>
                                  <span className="font-semibold">Tushuntirish:</span> {example.explanation}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <h3 className="text-lg font-semibold mt-4">Cheklovlar</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {problem.constraints.map((constraint, index) => (
                          <li key={index} className="font-mono text-sm">
                            {constraint}
                          </li>
                        ))}
                      </ul>

                      {problem.followUp && (
                        <>
                          <h3 className="text-lg font-semibold mt-4">Keyingi qadam</h3>
                          <p>{problem.followUp}</p>
                        </>
                      )}
                    </div>

                    <Accordion type="single" collapsible className="mt-6">
                      <AccordionItem value="hints">
                        <AccordionTrigger className="text-primary">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="h-4 w-4" />
                            <span>Maslahatlar</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {problem.hints.map((hint, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => setShowHint(index)}
                                className="w-full justify-between"
                              >
                                <span>Maslahat {index + 1}</span>
                                <ChevronDown
                                  className={`h-4 w-4 transition-transform ${showHint === index ? "rotate-180" : ""}`}
                                />
                              </Button>
                            ))}

                            {showHint !== false && (
                              <div className="bg-muted/50 p-4 rounded-md mt-2 text-sm">
                                <p>{problem.hints[showHint]}</p>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="related">
                        <AccordionTrigger className="text-primary">
                          <div className="flex items-center gap-2">
                            <ListChecks className="h-4 w-4" />
                            <span>Tegishli muammolar</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {problem.relatedProblems.map((relatedProblem, index) => (
                              <Link
                                key={index}
                                href={`/problems/${relatedProblem.id}`}
                                className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">#{relatedProblem.id}</span>
                                  <span>{relatedProblem.title}</span>
                                  <Badge
                                    variant="outline"
                                    className={
                                      relatedProblem.difficulty === "Easy"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                        : relatedProblem.difficulty === "Medium"
                                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                    }
                                  >
                                    {relatedProblem.difficulty}
                                  </Badge>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <ThumbsUp className="h-4 w-4" /> Foydali
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <ThumbsDown className="h-4 w-4" /> Foydali emas
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <Link href="#" className="hover:underline flex items-center gap-1">
                      <ExternalLink className="h-3.5 w-3.5" /> Tahririyatni ko'rish
                    </Link>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="solution" className="pt-4">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Yechim usullari</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="approach1">
                        <AccordionTrigger>
                          <div className="flex flex-col items-start">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Usul 1: Joyda teskari aylantirish</span>
                              <Badge variant="outline" className="ml-2">
                                O(n) Vaqt, O(1) Xotira
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <p>
                              Ushbu muammoni hal qilish uchun ikki ko'rsatkichli yondashuvdan foydalanishimiz mumkin.
                              Biz massivning boshi va oxirida ikkita ko'rsatkichni o'rnatamiz va ushbu pozitsiyalardagi
                              elementlarni almashtiramiz. Keyin ko'rsatkichlarni o'rtada uchrashguncha bir-biriga
                              yaqinlashtiramiz.
                            </p>
                            <div className="bg-muted/50 p-4 rounded-md font-mono text-sm">
                              <pre>{`def reverseString(s: list) -> list:
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
    return s`}</pre>
                            </div>
                            <div className="bg-muted/30 p-4 rounded-md">
                              <h4 className="font-medium mb-2">Murakkablik tahlili</h4>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>
                                  <span className="font-medium">Vaqt murakkabligi:</span> O(n), bu yerda n kirish
                                  massivining uzunligi. Har bir elementni bir marta qayta ishlaymiz.
                                </li>
                                <li>
                                  <span className="font-medium">Xotira murakkabligi:</span> O(1), chunki biz qo'shimcha
                                  xotira ishlatmasdan massivni joyida o'zgartiramiz.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="approach2">
                        <AccordionTrigger>
                          <div className="flex flex-col items-start">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Usul 2: Pythonning ichki usullari</span>
                              <Badge variant="outline" className="ml-2">
                                O(n) Vaqt, O(1) Xotira
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <p>
                              Python ro'yxatni teskari aylantirish uchun bir nechta ichki usullarni taqdim etadi.
                              Biz manfiy qadamli kesish yoki ichki reversed() funksiyasidan foydalanishimiz mumkin.
                            </p>
                            <div className="bg-muted/50 p-4 rounded-md font-mono text-sm">
                              <pre>{`# 1-usul: Kesish yozuvidan foydalanish
def reverseString(s: list) -> list:
    return s[::-1]

# 2-usul: reversed() funksiyasidan foydalanish
def reverseString(s: list) -> list:
    return list(reversed(s))`}</pre>
                            </div>
                            <div className="bg-muted/30 p-4 rounded-md">
                              <h4 className="font-medium mb-2">Murakkablik tahlili</h4>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>
                                  <span className="font-medium">Vaqt murakkabligi:</span> O(n), bu yerda n kirish
                                  massivining uzunligi.
                                </li>
                                <li>
                                  <span className="font-medium">Xotira murakkabligi:</span> O(n) yangi teskari ro'yxat
                                  yaratish uchun. Agar muammo joyida teskari aylantirishni talab qilsa, bu usullar
                                  mos kelmaydi.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="submissions" className="pt-4">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Sizning topshiriqlaringiz</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="py-3 px-4 text-left font-medium text-sm">Holat</th>
                            <th className="py-3 px-4 text-left font-medium text-sm">Ishlash vaqti</th>
                            <th className="py-3 px-4 text-left font-medium text-sm">Xotira</th>
                            <th className="py-3 px-4 text-left font-medium text-sm">Til</th>
                            <th className="py-3 px-4 text-left font-medium text-sm">Yuborilgan</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                <span>Qabul qilindi</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">4 ms</td>
                            <td className="py-3 px-4">13.8 MB</td>
                            <td className="py-3 px-4">Python</td>
                            <td className="py-3 px-4">2 kun oldin</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <XCircle className="h-4 w-4 text-red-500 mr-2" />
                                <span>Noto'g'ri javob</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">N/A</td>
                            <td className="py-3 px-4">N/A</td>
                            <td className="py-3 px-4">Python</td>
                            <td className="py-3 px-4">2 kun oldin</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussion" className="pt-4">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Muhokama</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Button className="gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Yangi muhokama
                        </Button>
                        <Select defaultValue="newest">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Saralash" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newest">Yangi</SelectItem>
                            <SelectItem value="popular">Mashhur</SelectItem>
                            <SelectItem value="recent">Yaqinda faol</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <div className="border rounded-md p-4">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                              JD
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">John Doe</h4>
                                <span className="text-xs text-muted-foreground">2 kun oldin</span>
                              </div>
                              <p className="text-sm mt-1">
                                Men Pythonning kesish yozuvidan foydalanib juda chiroyli bir qatorli yechimni topdim:{" "}
                                <code>return s[::-1]</code>
                              </p>
                              <div className="flex items-center gap-4 mt-2">
                                <Button variant="ghost" size="sm" className="gap-1 h-7">
                                  <ThumbsUp className="h-3.5 w-3.5" />
                                  <span className="text-xs">12</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-1 h-7">
                                  <MessageSquare className="h-3.5 w-3.5" />
                                  <span className="text-xs">Javob</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-md p-4">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                              AS
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Alice Smith</h4>
                                <span className="text-xs text-muted-foreground">1 hafta oldin</span>
                              </div>
                              <p className="text-sm mt-1">
                                Eslatib o'tamiz, muammo joyida yechimni talab qiladi. Kesish yozuvidan foydalanish yangi
                                ro'yxat yaratadi, bu esa O(n) qo'shimcha xotirani ishlatadi.
                              </p>
                              <div className="flex items-center gap-4 mt-2">
                                <Button variant="ghost" size="sm" className="gap-1 h-7">
                                  <ThumbsUp className="h-3.5 w-3.5" />
                                  <span className="text-xs">24</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-1 h-7">
                                  <MessageSquare className="h-3.5 w-3.5" />
                                  <span className="text-xs">Javob</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Til" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="Shrift hajmi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12px">12px</SelectItem>
                    <SelectItem value="14px">14px</SelectItem>
                    <SelectItem value="16px">16px</SelectItem>
                    <SelectItem value="18px">18px</SelectItem>
                    <SelectItem value="20px">20px</SelectItem>
                  </SelectContent>
                </Select>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-9 w-9" onClick={handleCopyCode}>
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{copied ? "Nusxalandi!" : "Kodni nusxalash"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-9 w-9">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Kodni tiklash</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1" onClick={handleRunCode} disabled={isRunning}>
                  <Play className="h-4 w-4" />
                  {isRunning ? "Ishlayapti..." : "Kodni ishga tushirish"}
                </Button>
                <Button size="sm" className="gap-1" onClick={handleSubmitCode} disabled={isSubmitting}>
                  <Code className="h-4 w-4" />
                  {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
                </Button>
              </div>
            </div>

            <Card className="border-none shadow-md">
              <CardContent className="p-0">
                <div className="relative">
                  <div
                    ref={editorRef}
                    className="min-h-[400px] rounded-md border focus-visible:ring-1 focus-visible:ring-primary"
                    style={{ fontSize }}
                  />
                  <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                    {code.split("\n").length} qator
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="testcases" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="testcases">Test holatlari</TabsTrigger>
                <TabsTrigger value="results">Natijalar</TabsTrigger>
              </TabsList>
              <TabsContent value="testcases" className="pt-4">
                <Card className="border-none shadow-md">
                  <CardContent className="p-6">
                    <Tabs value={activeTestTab} onValueChange={setActiveTestTab} className="w-full">
                      <TabsList className="mb-4">
                        <TabsTrigger value="test1" className="text-xs">
                          Test 1
                        </TabsTrigger>
                        <TabsTrigger value="test2" className="text-xs">
                          Test 2
                        </TabsTrigger>
                        <TabsTrigger value="custom" className="text-xs">
                          Maxsus
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="test1">
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Kirish:</div>
                          <div className="bg-muted/50 p-3 rounded-md font-mono text-sm overflow-x-auto">
                            s = ["h","e","l","l","o"]
                          </div>
                          <div className="text-sm font-medium mt-4">Kutilayotgan chiqish:</div>
                          <div className="bg-muted/50 p-3 rounded-md font-mono text-sm overflow-x-auto">
                            ["o","l","l","e","h"]
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="test2">
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Kirish:</div>
                          <div className="bg-muted/50 p-3 rounded-md font-mono text-sm overflow-x-auto">
                            s = ["H","a","n","n","a","h"]
                          </div>
                          <div className="text-sm font-medium mt-4">Kutilayotgan chiqish:</div>
                          <div className="bg-muted/50 p-3 rounded-md font-mono text-sm overflow-x-auto">
                            ["h","a","n","n","a","H"]
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="custom">
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-medium mb-2">Kirish:</div>
                            <Textarea
                              placeholder="Maxsus kirishni shu yerga yozing..."
                              className="font-mono text-sm h-24"
                              defaultValue='["c","u","s","t","o","m"]'
                            />
                          </div>
                          <Button size="sm">Maxsus testni ishga tushirish</Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="results" className="pt-4">
                {testResults ? (
                  <Card
                    className={`border-none shadow-md ${testResults.passed ? "bg-green-50 dark:bg-green-950/20" : "bg-red-50 dark:bg-red-950/20"}`}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        {testResults.passed ? (
                          <>
                            <Check className="h-5 w-5 text-green-500" />
                            <span className="text-green-700 dark:text-green-400">Muvaffaqiyat!</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5 text-red-500" />
                            <span className="text-red-700 dark:text-red-400">Muvaffaqiyatsiz</span>
                          </>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p
                        className={
                          testResults.passed ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
                        }
                      >
                        {testResults.message}
                      </p>

                      <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-background/50 p-3 rounded-md">
                            <div className="text-xs text-muted-foreground mb-1">Ishlash vaqti</div>
                            <div className="font-medium">{testResults.time}</div>
                            {testResults.passed && (
                              <div className="text-xs text-muted-foreground mt-1">Topshiriqlarning 92% dan ustun</div>
                            )}
                          </div>
                          <div className="bg-background/50 p-3 rounded-md">
                            <div className="text-xs text-muted-foreground mb-1">Xotira</div>
                            <div className="font-medium">{testResults.memory}</div>
                            {testResults.passed && (
                              <div className="text-xs text-muted-foreground mt-1">Topshiriqlarning 78% dan ustun</div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Test holati natijalari</h4>
                          <div className="space-y-3">
                            {testResults.testCases.map((testCase, index) => (
                              <div
                                key={index}
                                className={`border p-3 rounded-md ${testCase.passed ? "border-green-200 dark:border-green-800" : "border-red-200 dark:border-red-800"}`}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-sm font-medium">Test holati {index + 1}:</span>
                                  {testCase.passed ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-red-500" />
                                  )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                                  <div>
                                    <div className="font-medium mb-1">Kirish:</div>
                                    <div className="font-mono bg-muted/30 p-2 rounded">{testCase.input}</div>
                                  </div>
                                  <div>
                                    <div className="font-medium mb-1">Kutilgan:</div>
                                    <div className="font-mono bg-muted/30 p-2 rounded">{testCase.expected}</div>
                                  </div>
                                  <div>
                                    <div className="font-medium mb-1">Chiqish:</div>
                                    <div
                                      className={`font-mono p-2 rounded ${
                                        testCase.passed
                                          ? "bg-green-100 dark:bg-green-900/30"
                                          : "bg-red-100 dark:bg-red-900/30"
                                      }`}
                                    >
                                      {testCase.output}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-none shadow-md">
                    <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                      <Info className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Hali natijalar yo'q</h3>
                      <p className="text-muted-foreground">
                        Test holatlariga qarshi kodingizni ishga tushiring va natijalarni shu yerda ko'ring.
                      </p>
                      <Button className="mt-4 gap-2" onClick={handleRunCode}>
                        <Play className="h-4 w-4" />
                        Kodni ishga tushirish
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </Split>

        <motion.div variants={fadeIn} className="bg-muted/50 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Muammo statistikasi</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Qabul qilish darajasi</span>
                    <span className="font-medium">{problem.acceptanceRate}%</span>
                  </div>
                  <Progress value={problem.acceptanceRate} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Topshiriqlar</span>
                    <span className="font-medium">1.2M+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Qiyinlik</span>
                    <span
                      className={
                        problem.difficulty === "Easy"
                          ? "text-green-600 dark:text-green-400"
                          : problem.difficulty === "Medium"
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-red-600 dark:text-red-400"
                      }
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-background p-4 rounded-lg shadow-sm w-full max-w-xs">
                <h4 className="font-medium mb-2">Bu muammoni so'raydigan kompaniyalar</h4>
                <div className="grid grid-cols-2 gap-2">
                  {problem.companies.map((company, index) => (
                    <Badge key={index} variant="outline" className="justify-center">
                      {company}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

const problems = [
  {
    id: 1,
    title: "Teskari satr",
    description:
      "Satrni teskari aylantiruvchi funksiya yozing. Kirish satri s belgilar massivi sifatida berilgan. Siz buni kirish massivini O(1) qo'shimcha xotira bilan joyida o'zgartirish orqali amalga oshirishingiz kerak.",
    functionSignature: "def reverseString(s: list) -> list:",
    difficulty: "Oson",
    acceptanceRate: 76,
    timeComplexity: "O(n)",
    tags: ["Ikki ko'rsatkich", "Satr"],
    status: "Attempted",
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    constraints: ["1 <= s.length <= 10^5", "s[i] bosiladigan ascii belgisi."],
    followUp: "Buni O(1) qo'shimcha xotira bilan hal qila olasizmi?",
    hints: [
      "Satrni teskari aylantirishning butun mantiqi qarama-qarshi yo'nalishdagi ikki ko'rsatkich yondashuviga asoslangan!",
      "Chap va o'ng ko'rsatkichlardan foydalanishga harakat qiling va ular o'rtada uchrashgunicha elementlarni almashtiring.",
      "Eslatib o'tamiz, ko'pgina tillarda satrlar o'zgarmas, lekin muammo sizga o'zgaruvchan bo'lgan belgilar massivini beradi.",
    ],
    relatedProblems: [
      {
        id: 2,
        title: "Ikki yig'indi",
        difficulty: "Oson",
      },
      {
        id: 3,
        title: "Satrdagi so'zlarni teskari aylantirish",
        difficulty: "O'rta",
      },
      {
        id: 4,
        title: "Teskari bog'langan ro'yxat",
        difficulty: "Oson",
      },
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Google", "Meta", "Adobe"],
  },
  {
    id: 2,
    title: "Ikki yig'indi",
    description:
      "Butun sonlar nums massivi va butun son target berilgan bo'lsa, ikkita sonning indekslarini qaytaring, shunda ularning yig'indisi target ga teng bo'ladi. Har bir kirishda aynan bitta yechim bo'lishini va siz bir xil elementni ikki marta ishlatmasligingizni taxmin qilishingiz mumkin.",
    functionSignature: "def twoSum(nums: list, target: int) -> list:",
    difficulty: "Oson",
    acceptanceRate: 48,
    timeComplexity: "O(n)",
    tags: ["Massiv", "Hash jadvali"],
    status: "Solved",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] == 9 bo'lgani uchun [0, 1] ni qaytaramiz.",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "nums[1] + nums[2] == 6 bo'lgani uchun [1, 2] ni qaytaramiz.",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Faqat bitta to'g'ri javob mavjud.",
    ],
    followUp: "O(n²) dan kamroq vaqt murakkabligiga ega algoritmni topa olasizmi?",
    hints: [
      "Oddiy yondashuv har bir son juftini tekshirish uchun ikkita ichki tsikldan foydalanish bo'lishi mumkin, lekin bu O(n²) bo'ladi.",
      "Ko'rib chiqqan sonlarni saqlash uchun hash map dan foydalanish haqida o'ylang.",
      "Har bir son uchun, target dan joriy sonni ayirganingizda hash map da mavjudligini tekshiring.",
    ],
    relatedProblems: [
      {
        id: 1,
        title: "Teskari satr",
        difficulty: "Oson",
      },
      {
        id: 5,
        title: "3 yig'indi",
        difficulty: "O'rta",
      },
      {
        id: 6,
        title: "4 yig'indi",
        difficulty: "O'rta",
      },
    ],
    companies: ["Google", "Amazon", "Facebook", "Apple", "Microsoft", "Bloomberg"],
  },
]